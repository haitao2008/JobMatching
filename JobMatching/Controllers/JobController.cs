using JobMatching.Domain.Interfaces;
using JobMatching.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace JobMatching.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private IJobManager _jobManager;

        public JobController(IJobManager jobManager)
        {
            _jobManager = jobManager;
        }

        [HttpGet]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Job>))]
        [Produces("application/json")]
        public IActionResult GetAllJobs()
        {
            return Ok(_jobManager.GetJobs());
        }

        [HttpGet]
        [Route("MatchedCandidate/{jobId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<JobCandidate>))]
        [Produces("application/json")]
        public IActionResult GetMatchedCandidate(int jobId)
        {
            return Ok(_jobManager.GetJobCandidate(jobId));            
        }
    }
}
