using Microsoft.VisualStudio.TestTools.UnitTesting;
using JobMatching.Domain.Jobmanager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobMatching.Domain.Jobmanager.Tests
{
    [TestClass()]
    public class JobManagerTests
    {
        [TestMethod()]
        public void Get_All_JobsTest()
        {
            var jobs =  JobManager.Get_All_Jobs();           
            Assert.AreNotEqual(0, jobs.Count);
        }

        [TestMethod()]
        public void Get_All_CandidatesTest()
        {
            var candidates = JobManager.Get_All_Candidates();
            Assert.AreNotEqual(0, candidates.Count);
        }

        [TestMethod()]
        public void Get_The_Most_Matched_Candidate_Test()
        {
            var candidates = JobManager.Get_All_Candidates();
            var job = JobManager.Get_All_Jobs().First(x => x.JobId == 1);

            var matchedTags = candidates
                .Select(x => new { Count = x.Skill_Tag.Intersect(job.Skill_Tag).Count(), Id = x.CandidateId })
                .Max(x => x.Count);

            var mostMatchedCandidate = candidates.MaxBy(x => x.Skill_Tag.Intersect(job.Skill_Tag).Count());
            Assert.AreEqual(3, matchedTags);
            Assert.AreEqual(3, mostMatchedCandidate.CandidateId);
        }

    }
}