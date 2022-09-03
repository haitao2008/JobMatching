using JobMatching.Domain.Models;

namespace JobMatching.Domain.Interfaces
{
    public interface IJobManager
    {
        public List<Job> GetJobs();

        public JobCandidate GetJobCandidate(int jobId);
    }
}
