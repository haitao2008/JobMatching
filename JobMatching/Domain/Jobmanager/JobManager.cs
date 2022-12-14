using JobMatching.Domain.Interfaces;
using JobMatching.Domain.Models;
using System.Net.Http;
using System.Text.Json;

namespace JobMatching.Domain.Jobmanager
{
    public class JobManager: IJobManager
    {

        private static List<Job> All_Jobs = new List<Job>();
        private static List<Candidate> All_Candidates = new List<Candidate>();


        public JobCandidate GetJobCandidate(int jobId)
        {
            var result = new JobCandidate();
            var job = GetJobs().FirstOrDefault(x => x.JobId == jobId);
            if(job != null)
            {
                var candidates = JobManager.Get_All_Candidates();          
                var mostMatchedCandidate = candidates.MaxBy(x => x.Skill_Tag.Intersect(job.Skill_Tag).Count());
               
                if (mostMatchedCandidate != null)
                {
                    var matchedTags = candidates
                                       .Select(x => x.Skill_Tag.Intersect(job.Skill_Tag).Count())
                                       .Max();
                    result.Match = true;
                    result.Job = job;
                    result.MatchedCandidate = mostMatchedCandidate;
                    result.TagMatched = matchedTags;
                }
            }

            return result;
        }

        public List<Job> GetJobs()
        {
            return Get_All_Jobs();
        }

        public static List<Job> Get_All_Jobs()
        {
            if(All_Jobs.Count == 0)
            {
                All_Jobs = Get_All_Jobs_From_API().GetAwaiter().GetResult();
            }
            return All_Jobs;
        }

        private static async Task<List<Job>> Get_All_Jobs_From_API()
        {
            var baseAddress = new Uri("http://private-76432-jobadder1.apiary-mock.com/");
            string jobResponseData = String.Empty;

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {

                using (var response = await httpClient.GetAsync("jobs"))
                {
                    jobResponseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(jobResponseData))
                    {

                        JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
                        {
                            WriteIndented = true
                        };
                        var list = JsonSerializer.Deserialize<List<Job>>(jobResponseData, options);
                        return list;
                    }
                }
            }

            return new List<Job>();
        }

        public static List<Candidate> Get_All_Candidates()
        {
            if (All_Candidates.Count == 0)
            {
                All_Candidates = Get_All_Candidates_From_API().GetAwaiter().GetResult();
            }
            return All_Candidates;
        }

        private static async Task<List<Candidate>> Get_All_Candidates_From_API()
        {
            var baseAddress = new Uri("http://private-76432-jobadder1.apiary-mock.com/");
            string candidateResponseData = String.Empty;

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {

                using (var response = await httpClient.GetAsync("candidates"))
                {
                    candidateResponseData = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(candidateResponseData))
                    {

                        JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
                        {
                            WriteIndented = true
                        };
                        var list = JsonSerializer.Deserialize<List<Candidate>>(candidateResponseData, options);
                        return list;
                    }
                }
            }

            return new List<Candidate>();
        }
    }
}
