public class Drill 
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Title { get; set; }
    public string SkillType { get; set; } // "Dribbling", "Passing"
    public string Difficulty { get; set; } // "Beginner", "Intermediate"
    public string VideoUrl { get; set; } // YouTube embed link
    public string Instructions { get; set; }
}public class DrillGroup : List<Drill>
{
    public string SkillType { get; set; }
    public DrillGroup(string skillType, IEnumerable<Drill> drills) 
        : base(drills) => SkillType = skillType;
}