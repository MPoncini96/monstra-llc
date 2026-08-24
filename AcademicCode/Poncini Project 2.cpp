#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <chrono>
#include <thread>

using namespace std;
using namespace chrono;

const string filename = "Job.txt";

vector<vector<int>> get_jobs_from_file() {

  	ifstream file(filename);

  	if (!file.is_open()) {
    	cerr << "Error opening file: " << filename << endl;
    	return vector<vector<int>>();
  	}

  	vector<vector<int>> job_list;
  	string line;

	while (getline(file, line)) {
	    vector<int> job;
	    stringstream ss(line);
	    string element;

	    while (getline(ss, element, ',')) {
	    	try {
	    		int value = stoi(element);
	        	job.push_back(value);
	      	} 
		  	catch (const invalid_argument& e) {
	        	cerr << "Error parsing job data: " << element << endl;
	      	}
	    }
	    if (!job.empty()) {  
	    	job_list.push_back(job);
	    }
	}

  	file.close();
  	return job_list;
}

const int quantum = 5;

void round_robin(vector<vector<int>> input_job_list)    {
    float time = 0;
    int jobs_complete_count = 0;
    int run_time;
    int num_of_jobs = input_job_list.size();
    float wait_time = 0;
	float estimated_run_time = 0;
	
	for (int i=0; i < input_job_list.size(); i++)	{
		estimated_run_time += input_job_list[i][2];
	}

	auto start_time = steady_clock::now();

    while (jobs_complete_count < num_of_jobs )	{
        for (int i = 0; i < input_job_list.size(); i++)    {
            if (time >= input_job_list[i][1] )    {
                run_time = min(input_job_list[i][2], quantum);
                cout << "$>Job " << input_job_list[i][0] << " scheduled for " << run_time << " ms";
                input_job_list[i][2] = input_job_list[i][2] - run_time;
                time = time + run_time;
                if (input_job_list[i][2] == 0 )    {
                    jobs_complete_count++;
                    cout << ", completed" << endl;
                    wait_time = wait_time + time - input_job_list[i][1] - input_job_list[i][2];
                    input_job_list.erase(input_job_list.begin()+i);
                    i--;
                }
                else    {
                    cout << endl;
                }
            }
            else	{
            	time += 1;
			}
			while (duration_cast<milliseconds>(steady_clock::now() - start_time).count() < time) {
				// Job Proccess
			}
		}
    }
    float actual_time = duration_cast<milliseconds>(steady_clock::now() - start_time).count();
    cout << "\n\nEstimated run time: " << estimated_run_time / 1000 << " seconds" << endl;
    cout << "Jobs completed: " << jobs_complete_count << endl;
    cout << "Actual Run Time: " << actual_time / 1000 << " seconds" << endl;
    cout << "Average wait time: " << wait_time / jobs_complete_count / 1000 << " seconds" << endl;
}

int main() {
    
	vector<vector<int>> job_list = get_jobs_from_file();
	
	round_robin(job_list);
		

    return 0;
}