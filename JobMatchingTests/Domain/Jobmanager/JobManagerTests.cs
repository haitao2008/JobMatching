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
    }
}