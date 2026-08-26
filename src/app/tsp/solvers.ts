// Client-side TSP solvers mirroring the approaches from two papers:
//   CSE 545 Project 5 — Genetics and Wisdom of Crowds Hybrid Algorithm for TSP
//   CSE 620 Final     — Simulated Annealing and Niching GAs for the Bottleneck TSP
// Everything here is pure TypeScript so the demo runs entirely in the browser.

export type Pt = { x: number; y: number };
export type Objective = "total" | "bottleneck";
export type AlgoKey = "nn" | "sa" | "ga" | "gawoc";

/** Deterministic PRNG so a given seed always lays out the same cities. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeCities(n: number, seed: number): Pt[] {
  const rnd = mulberry32(seed);
  const pts: Pt[] = [];
  // Rejection-sample so cities never overlap enough to look like one dot.
  for (let i = 0; i < n; i++) {
    let p: Pt;
    let tries = 0;
    do {
      p = { x: 4 + rnd() * 92, y: 6 + rnd() * 88 };
      tries++;
    } while (tries < 40 && pts.some((q) => (q.x - p.x) ** 2 + (q.y - p.y) ** 2 < 12));
    pts.push(p);
  }
  return pts;
}

export function distMatrix(cities: Pt[]): Float64Array {
  const n = cities.length;
  const D = new Float64Array(n * n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(cities[i].x - cities[j].x, cities[i].y - cities[j].y);
      D[i * n + j] = d;
      D[j * n + i] = d;
    }
  }
  return D;
}

/** Total length of the closed tour. */
export function tourLength(tour: number[], D: Float64Array, n: number): number {
  let s = 0;
  for (let i = 0; i < tour.length; i++) {
    s += D[tour[i] * n + tour[(i + 1) % tour.length]];
  }
  return s;
}

/** Longest single edge in the closed tour — the bottleneck objective. */
export function tourBottleneck(tour: number[], D: Float64Array, n: number): number {
  let m = 0;
  for (let i = 0; i < tour.length; i++) {
    const d = D[tour[i] * n + tour[(i + 1) % tour.length]];
    if (d > m) m = d;
  }
  return m;
}

export function cost(
  tour: number[],
  D: Float64Array,
  n: number,
  objective: Objective,
): number {
  return objective === "total" ? tourLength(tour, D, n) : tourBottleneck(tour, D, n);
}

/** Index of the longest edge, so the view can highlight it. */
export function bottleneckEdge(tour: number[], D: Float64Array, n: number): number {
  let m = -1;
  let idx = 0;
  for (let i = 0; i < tour.length; i++) {
    const d = D[tour[i] * n + tour[(i + 1) % tour.length]];
    if (d > m) {
      m = d;
      idx = i;
    }
  }
  return idx;
}

export function nearestNeighborTour(D: Float64Array, n: number, start = 0): number[] {
  const seen = new Uint8Array(n);
  const tour = [start];
  seen[start] = 1;
  let cur = start;
  for (let k = 1; k < n; k++) {
    let best = -1;
    let bd = Infinity;
    for (let j = 0; j < n; j++) {
      if (!seen[j] && D[cur * n + j] < bd) {
        bd = D[cur * n + j];
        best = j;
      }
    }
    seen[best] = 1;
    tour.push(best);
    cur = best;
  }
  return tour;
}

function shuffled(n: number, rnd: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Reverse tour[i..j] — the 2-opt move. */
function reverse(tour: number[], i: number, j: number) {
  while (i < j) {
    [tour[i], tour[j]] = [tour[j], tour[i]];
    i++;
    j--;
  }
}

export interface Solver {
  readonly key: AlgoKey;
  /** Advance one unit of work. */
  step(): void;
  /** Units of work to run per animation frame at 1x speed. */
  readonly stepsPerFrame: number;
  best: number[];
  bestCost: number;
  iteration: number;
  done: boolean;
  /** Short live readout, e.g. "temperature 0.412". */
  status(): string;
}

/* ---------------------------------- nearest neighbour --------------------- */

function makeNN(D: Float64Array, n: number, objective: Objective): Solver {
  const seen = new Uint8Array(n);
  const tour: number[] = [0];
  seen[0] = 1;

  const s: Solver = {
    key: "nn",
    stepsPerFrame: 1,
    best: [0],
    bestCost: 0,
    iteration: 0,
    done: false,
    status: () => (s.done ? "tour complete" : `${tour.length} of ${n} cities placed`),
    step() {
      if (tour.length >= n) {
        s.done = true;
        return;
      }
      const cur = tour[tour.length - 1];
      let best = -1;
      let bd = Infinity;
      for (let j = 0; j < n; j++) {
        if (!seen[j] && D[cur * n + j] < bd) {
          bd = D[cur * n + j];
          best = j;
        }
      }
      seen[best] = 1;
      tour.push(best);
      s.iteration = tour.length;
      s.best = tour.slice();
      s.bestCost = cost(s.best, D, n, objective);
      if (tour.length >= n) s.done = true;
    },
  };
  return s;
}

/* ---------------------------------- simulated annealing ------------------- */

function makeSA(
  D: Float64Array,
  n: number,
  objective: Objective,
  rnd: () => number,
): Solver {
  let cur = shuffled(n, rnd);
  let curCost = cost(cur, D, n, objective);
  // Scale the starting temperature to the problem so cooling behaves the same
  // whether the objective is a summed length or a single max edge.
  let T = curCost / (objective === "total" ? n : 2);
  const T0 = T;
  const coolRate = 0.99985;
  const Tmin = T0 * 1e-4;

  const s: Solver = {
    key: "sa",
    stepsPerFrame: 220,
    best: cur.slice(),
    bestCost: curCost,
    iteration: 0,
    done: false,
    status: () => `temperature ${T.toFixed(3)}`,
    step() {
      if (T <= Tmin) {
        s.done = true;
        return;
      }
      let i = 1 + Math.floor(rnd() * (n - 1));
      let j = 1 + Math.floor(rnd() * (n - 1));
      if (i === j) return;
      if (i > j) [i, j] = [j, i];

      const cand = cur.slice();
      reverse(cand, i, j);
      const candCost = cost(cand, D, n, objective);
      const delta = candCost - curCost;

      // Accept improvements outright, worse tours with probability e^(-d/T).
      if (delta < 0 || rnd() < Math.exp(-delta / T)) {
        cur = cand;
        curCost = candCost;
        if (curCost < s.bestCost) {
          s.bestCost = curCost;
          s.best = cur.slice();
        }
      }
      T *= coolRate;
      s.iteration++;
    },
  };
  return s;
}

/* ---------------------------------- genetic algorithms -------------------- */

function tournament(
  pop: number[][],
  costs: number[],
  k: number,
  rnd: () => number,
): number[] {
  let best = Math.floor(rnd() * pop.length);
  for (let i = 1; i < k; i++) {
    const c = Math.floor(rnd() * pop.length);
    if (costs[c] < costs[best]) best = c;
  }
  return pop[best];
}

/** Order crossover: keep a slice of p1, fill the rest in p2's order. */
function orderCrossover(p1: number[], p2: number[], rnd: () => number): number[] {
  const n = p1.length;
  let i = Math.floor(rnd() * n);
  let j = Math.floor(rnd() * n);
  if (i > j) [i, j] = [j, i];
  const child = new Array<number>(n).fill(-1);
  const taken = new Uint8Array(n);
  for (let k = i; k <= j; k++) {
    child[k] = p1[k];
    taken[p1[k]] = 1;
  }
  let w = (j + 1) % n;
  for (let s = 0; s < n; s++) {
    const c = p2[(j + 1 + s) % n];
    if (!taken[c]) {
      child[w] = c;
      taken[c] = 1;
      w = (w + 1) % n;
    }
  }
  return child;
}

function mutate(tour: number[], rnd: () => number, rate: number) {
  if (rnd() >= rate) return;
  const n = tour.length;
  let i = Math.floor(rnd() * n);
  let j = Math.floor(rnd() * n);
  if (i > j) [i, j] = [j, i];
  reverse(tour, i, j);
}

const edgeKey = (a: number, b: number) => (a < b ? a * 4096 + b : b * 4096 + a);

/**
 * Wisdom of Crowds aggregate. Counts how often each undirected edge appears
 * among the top performers, then greedily builds a tour that prefers
 * high-agreement edges, falling back to nearest neighbour when the crowd
 * offers nothing usable — the completion strategy the paper describes.
 */
function aggregateTour(
  top: number[][],
  D: Float64Array,
  n: number,
  rnd: () => number,
): number[] {
  const freq = new Map<number, number>();
  for (const t of top) {
    for (let i = 0; i < t.length; i++) {
      const k = edgeKey(t[i], t[(i + 1) % t.length]);
      freq.set(k, (freq.get(k) ?? 0) + 1);
    }
  }
  const seen = new Uint8Array(n);
  const start = Math.floor(rnd() * n);
  const tour = [start];
  seen[start] = 1;
  let cur = start;
  for (let k = 1; k < n; k++) {
    let pick = -1;
    let pickFreq = 0;
    let pickDist = Infinity;
    for (let j = 0; j < n; j++) {
      if (seen[j]) continue;
      const f = freq.get(edgeKey(cur, j)) ?? 0;
      const d = D[cur * n + j];
      // Highest crowd agreement wins; distance only breaks ties.
      if (f > pickFreq || (f === pickFreq && d < pickDist)) {
        pick = j;
        pickFreq = f;
        pickDist = d;
      }
    }
    seen[pick] = 1;
    tour.push(pick);
    cur = pick;
  }
  return tour;
}

function makeGA(
  D: Float64Array,
  n: number,
  objective: Objective,
  rnd: () => number,
  woc: boolean,
): Solver {
  const POP = 80;
  const ELITE = 4;
  const TOURN = 5;
  const MUT = 0.25;
  const TOP_FRAC = 0.15; // slice of the population treated as the "crowd"
  const AGG_FRAC = 0.15; // offspring built straight from the aggregate

  let pop: number[][] = Array.from({ length: POP }, () => shuffled(n, rnd));
  // Seed one nearest-neighbour tour so the population starts with a sane anchor.
  pop[0] = nearestNeighborTour(D, n, Math.floor(rnd() * n));
  let costs = pop.map((t) => cost(t, D, n, objective));

  const s: Solver = {
    key: woc ? "gawoc" : "ga",
    stepsPerFrame: 2,
    best: pop[0].slice(),
    bestCost: Math.min(...costs),
    iteration: 0,
    done: false,
    status: () => `generation ${s.iteration}`,
    step() {
      const order = costs
        .map((c, i) => [c, i] as const)
        .sort((a, b) => a[0] - b[0])
        .map(([, i]) => i);

      const next: number[][] = [];
      for (let e = 0; e < ELITE; e++) next.push(pop[order[e]].slice());

      if (woc) {
        const top = order.slice(0, Math.max(3, Math.floor(POP * TOP_FRAC))).map((i) => pop[i]);
        const nAgg = Math.floor(POP * AGG_FRAC);
        for (let a = 0; a < nAgg; a++) {
          const child = aggregateTour(top, D, n, rnd);
          mutate(child, rnd, MUT * 0.5);
          next.push(child);
        }
      }

      while (next.length < POP) {
        const p1 = tournament(pop, costs, TOURN, rnd);
        const p2 = tournament(pop, costs, TOURN, rnd);
        const child = orderCrossover(p1, p2, rnd);
        mutate(child, rnd, MUT);
        next.push(child);
      }

      pop = next;
      costs = pop.map((t) => cost(t, D, n, objective));
      let bi = 0;
      for (let i = 1; i < POP; i++) if (costs[i] < costs[bi]) bi = i;
      if (costs[bi] < s.bestCost) {
        s.bestCost = costs[bi];
        s.best = pop[bi].slice();
      }
      s.iteration++;
    },
  };
  return s;
}

export function createSolver(
  key: AlgoKey,
  D: Float64Array,
  n: number,
  objective: Objective,
  seed: number,
): Solver {
  const rnd = mulberry32(seed);
  if (key === "nn") return makeNN(D, n, objective);
  if (key === "sa") return makeSA(D, n, objective, rnd);
  return makeGA(D, n, objective, rnd, key === "gawoc");
}

export const ALGORITHMS: {
  key: AlgoKey;
  name: string;
  blurb: string;
  detail: string;
}[] = [
  {
    key: "nn",
    name: "Nearest Neighbor",
    blurb: "Greedy construction",
    detail:
      "Start somewhere and always hop to the closest unvisited city. It finishes in one pass and never revisits a decision, so it is fast but locks in early mistakes — the long return edge at the end is its signature. Both papers use it as a baseline and as the fallback that completes a partial tour.",
  },
  {
    key: "sa",
    name: "Simulated Annealing",
    blurb: "Guided random search",
    detail:
      "Hold one tour and repeatedly propose a 2-opt move, reversing a segment. Improvements are always kept; worse tours are accepted with probability e^(−Δ/T). Temperature starts high, so early on it wanders freely, then cools until it only accepts improvements. This is the escape-local-minima method compared in the CSE 620 bottleneck paper.",
  },
  {
    key: "ga",
    name: "Genetic Algorithm",
    blurb: "Population evolution",
    detail:
      "Evolve a population of 80 tours. Each generation keeps the best few unchanged, then fills the rest by tournament-selecting parents, recombining them with order crossover, and mutating by segment reversal. Progress comes from recombining partial structure across many candidates rather than refining a single tour.",
  },
  {
    key: "gawoc",
    name: "GA + Wisdom of Crowds",
    blurb: "Population evolution with crowd consensus",
    detail:
      "The CSE 545 hybrid. Alongside ordinary crossover, each generation counts how often every edge appears among the top-performing tours and builds extra offspring that greedily follow the highest-agreement edges, using nearest neighbor to complete the tour when the crowd offers nothing. Offspring inherit from the whole population, not just two parents.",
  },
];
