"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ALGORITHMS,
  type AlgoKey,
  type Objective,
  type Solver,
  bottleneckEdge,
  cost,
  createSolver,
  distMatrix,
  makeCities,
  type Pt,
} from "./solvers";

const SPEEDS = [
  { label: "0.5×", mult: 0.5 },
  { label: "1×", mult: 1 },
  { label: "4×", mult: 4 },
  { label: "16×", mult: 16 },
];

const MAX_HISTORY = 900;

type Result = { key: AlgoKey; total: number; bottleneck: number; iterations: number };

/** Everything the view needs, including the live solver instance. */
type View = {
  pkey: string;
  solver: Solver;
  tour: number[];
  bestCost: number;
  iteration: number;
  status: string;
  done: boolean;
  history: number[];
};

function initView(
  pkey: string,
  algo: AlgoKey,
  D: Float64Array,
  n: number,
  objective: Objective,
  seed: number,
): View {
  const solver = createSolver(algo, D, n, objective, seed * 1013 + n);
  return {
    pkey,
    solver,
    tour: solver.best,
    bestCost: solver.bestCost,
    iteration: 0,
    status: solver.status(),
    done: solver.done,
    history: [],
  };
}

export default function TspVisualizer() {
  const [n, setN] = useState(28);
  const [seed, setSeed] = useState(7);
  const [algo, setAlgo] = useState<AlgoKey>("gawoc");
  const [objective, setObjective] = useState<Objective>("total");
  const [speedIdx, setSpeedIdx] = useState(1);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const cities: Pt[] = useMemo(() => makeCities(n, seed), [n, seed]);
  const D = useMemo(() => distMatrix(cities), [cities]);

  const pkey = `${algo}|${n}|${objective}|${seed}`;
  const [view, setView] = useState<View>(() => initView(pkey, algo, D, n, objective, seed));

  // Changing the problem or the method rebuilds the solver. Adjusting state
  // during render (rather than in an effect) avoids a cascading re-render.
  if (view.pkey !== pkey) {
    setView(initView(pkey, algo, D, n, objective, seed));
    if (running) setRunning(false);
  }

  const solver = view.solver;

  const pushFrame = useCallback((s: Solver) => {
    setView((v) => ({
      ...v,
      tour: s.best,
      bestCost: s.bestCost,
      iteration: s.iteration,
      status: s.status(),
      done: s.done,
      history:
        v.history.length >= MAX_HISTORY ? v.history : [...v.history, s.bestCost],
    }));
  }, []);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let cancelled = false;

    const frame = () => {
      if (cancelled) return;
      const budget = Math.max(1, Math.round(solver.stepsPerFrame * SPEEDS[speedIdx].mult));
      for (let i = 0; i < budget && !solver.done; i++) solver.step();
      pushFrame(solver);
      if (solver.done) {
        setRunning(false);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [running, speedIdx, solver, pushFrame]);

  const restart = () => {
    setRunning(false);
    setView(initView(pkey, algo, D, n, objective, seed));
  };

  const stepOnce = () => {
    if (solver.done) return;
    for (let i = 0; i < solver.stepsPerFrame && !solver.done; i++) solver.step();
    pushFrame(solver);
  };

  /** Run every method to a fixed budget and tabulate, the papers' comparison table. */
  const compare = () => {
    setRunning(false);
    setResults(
      ALGORITHMS.map(({ key }) => {
        const s = createSolver(key, D, n, objective, seed * 1013 + n);
        const budget = key === "nn" ? n : key === "sa" ? 120_000 : 400;
        for (let i = 0; i < budget && !s.done; i++) s.step();
        return {
          key,
          total: cost(s.best, D, n, "total"),
          bottleneck: cost(s.best, D, n, "bottleneck"),
          iterations: s.iteration,
        };
      }),
    );
  };

  const { tour, history } = view;
  const meta = ALGORITHMS.find((a) => a.key === algo)!;
  const bnIdx = tour.length > 1 ? bottleneckEdge(tour, D, n) : -1;
  const totalNow = tour.length > 1 ? cost(tour, D, n, "total") : 0;
  const bnNow = tour.length > 1 ? cost(tour, D, n, "bottleneck") : 0;
  const bestOfRun = results.length
    ? Math.min(...results.map((r) => (objective === "total" ? r.total : r.bottleneck)))
    : 0;
  const lo = history.length ? Math.min(...history) : 0;
  const hi = history.length ? Math.max(...history) : 1;

  const pill = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
      active
        ? "border-gold bg-gold/15 text-gold"
        : "border-purple-mid/50 text-parchment/80 hover:border-gold/50 hover:text-gold"
    }`;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-5 rounded-2xl border border-purple-mid/40 bg-surface p-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gold">
            Method
          </p>
          <div className="flex flex-wrap gap-2">
            {ALGORITHMS.map((a) => (
              <button key={a.key} onClick={() => setAlgo(a.key)} className={pill(algo === a.key)}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gold">
            Objective
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["total", "Total length"],
                ["bottleneck", "Longest edge"],
              ] as const
            ).map(([k, label]) => (
              <button key={k} onClick={() => setObjective(k)} className={pill(objective === k)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="tsp-cities"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-gold"
          >
            Cities: {n}
          </label>
          <input
            id="tsp-cities"
            type="range"
            min={8}
            max={60}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full accent-[#d4af37]"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gold">
            Speed
          </p>
          <div className="flex flex-wrap gap-2">
            {SPEEDS.map((s, i) => (
              <button key={s.label} onClick={() => setSpeedIdx(i)} className={pill(speedIdx === i)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <button
            onClick={() => setRunning((r) => !r)}
            disabled={view.done && !running}
            className="rounded-full border border-gold bg-gold/15 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {running ? "Pause" : view.done ? "Finished" : "Run"}
          </button>
          {[
            ["Step", stepOnce],
            ["Restart", restart],
            ["New Cities", () => setSeed((s) => s + 1)],
            ["Compare All", compare],
          ].map(([label, fn]) => (
            <button
              key={label as string}
              onClick={fn as () => void}
              className="rounded-full border border-purple-mid/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-parchment transition-colors hover:border-gold/60 hover:text-gold"
            >
              {label as string}
            </button>
          ))}
        </div>
      </div>

      {/* Tour view */}
      <div className="overflow-hidden rounded-2xl border border-purple-mid/40">
        <svg
          viewBox="0 0 100 100"
          className="block w-full"
          role="img"
          aria-label={`Tour through ${n} cities using ${meta.name}`}
        >
          <rect width="100" height="100" fill="#160d26" />
          {tour.length > 1 &&
            tour.map((c, i) => {
              // While nearest neighbour is still building, leave the tour open.
              const closing = i === tour.length - 1;
              if (algo === "nn" && !view.done && closing) return null;
              const a = cities[c];
              const b = cities[tour[(i + 1) % tour.length]];
              const isBn = objective === "bottleneck" && i === bnIdx;
              return (
                <line
                  key={`${c}-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={isBn ? "#ff5d5d" : "#d4af37"}
                  strokeWidth={isBn ? 0.9 : 0.45}
                  strokeOpacity={isBn ? 1 : 0.85}
                  strokeLinecap="round"
                />
              );
            })}
          {cities.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={1.15}
              fill={i === tour[0] ? "#7fe3a1" : "#e8e4f0"}
              stroke="#2a1250"
              strokeWidth={0.3}
            />
          ))}
        </svg>
      </div>

      {objective === "bottleneck" && (
        <p className="-mt-3 text-xs text-parchment/55">
          <span className="font-semibold text-[#ff5d5d]">Red</span> marks the longest edge, the
          only edge this objective is trying to shrink.
        </p>
      )}

      {/* Live readout */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            ["Total length", totalNow.toFixed(1)],
            ["Longest edge", bnNow.toFixed(1)],
            [
              algo === "nn" ? "Cities placed" : algo === "sa" ? "Proposals" : "Generations",
              String(view.iteration),
            ],
            ["Best so far", view.bestCost.toFixed(1)],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-purple-mid/40 bg-surface px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-parchment/50">{label}</p>
            <p className="mt-1 text-lg font-semibold text-gold">{value}</p>
          </div>
        ))}
      </div>

      {/* Convergence */}
      {history.length > 2 && (
        <div className="rounded-2xl border border-purple-mid/40 bg-surface p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold">
            Best cost over time ({view.status})
          </p>
          <svg viewBox="0 0 300 60" className="block w-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              points={history
                .map((v, i) => {
                  const x = (i / (history.length - 1)) * 300;
                  const y = hi === lo ? 30 : 56 - ((v - lo) / (hi - lo)) * 52;
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(" ")}
            />
          </svg>
        </div>
      )}

      {/* What this method does */}
      <div className="rounded-2xl border border-gold/30 bg-surface p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
          {meta.name}: {meta.blurb}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-parchment/75">{meta.detail}</p>
      </div>

      {/* Comparison */}
      {results.length > 0 && (
        <div className="rounded-2xl border border-purple-mid/40 bg-surface p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold">
            Same {n} cities, fixed budget per method
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[26rem] text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-parchment/50">
                  <th className="pb-2 font-semibold">Method</th>
                  <th className="pb-2 text-right font-semibold">Total</th>
                  <th className="pb-2 text-right font-semibold">Longest edge</th>
                  <th className="pb-2 text-right font-semibold">Steps</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const score = objective === "total" ? r.total : r.bottleneck;
                  const win = Math.abs(score - bestOfRun) < 1e-9;
                  return (
                    <tr key={r.key} className="border-t border-purple-mid/30">
                      <td className={`py-2 ${win ? "font-semibold text-gold" : "text-parchment/80"}`}>
                        {ALGORITHMS.find((a) => a.key === r.key)!.name}
                      </td>
                      <td
                        className={`py-2 text-right ${
                          win && objective === "total" ? "text-gold" : "text-parchment/70"
                        }`}
                      >
                        {r.total.toFixed(1)}
                      </td>
                      <td
                        className={`py-2 text-right ${
                          win && objective === "bottleneck" ? "text-gold" : "text-parchment/70"
                        }`}
                      >
                        {r.bottleneck.toFixed(1)}
                      </td>
                      <td className="py-2 text-right text-parchment/50">{r.iterations}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-parchment/60">
            Gold marks the winner on the objective you selected. Switching the objective often
            changes which method wins, because minimizing the longest edge is a different
            problem from minimizing total length. That is the point of the bottleneck TSP paper.
          </p>
        </div>
      )}
    </div>
  );
}
