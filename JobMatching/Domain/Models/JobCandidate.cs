namespace JobMatching.Domain.Models
{
    public class JobCandidate
    {
        public Job? Job { get; set; }
        public Candidate? MatchedCandidate { get; set; }

        public bool Match { get; set; }

        public int TagMatched { get; set; }
        public JobCandidate()
        {
            Match = false;
            Job = null;
            MatchedCandidate = null;
            TagMatched = 0;
        }
    }
}
