namespace JobMatching.Domain.Models
{
    public class Candidate
    {
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string SkillTags { get; set; }

        public List<string> Skill_Tag
        {
            get
            {
                if (!string.IsNullOrEmpty(SkillTags))
                {
                    return SkillTags.Split(",", StringSplitOptions.TrimEntries).ToList();
                }
                return new List<string>();
            }
        }
    }
}
