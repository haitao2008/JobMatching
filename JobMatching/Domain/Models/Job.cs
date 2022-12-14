namespace JobMatching.Domain.Models
{
    public class Job
    {
        public int JobId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Skills { get; set; }

        public List<string> Skill_Tag
        {
            get 
            {
                if(!string.IsNullOrEmpty(Skills))
                {
                    return Skills.Split(",", StringSplitOptions.TrimEntries).ToList();
                }
                return new List<string>();
            }
        }
    }
}
