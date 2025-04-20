public class Drill
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; } // "Dribbling" or "Passing"
    public string Difficulty { get; set; }
    public int DurationMinutes { get; set; }
    public string Instructions { get; set; }
    public string Equipment { get; set; } // "Cones", "Wall",
}
    public string VideoUrl { get; set; } // YouTube embed link
    public string ImageUrl { get; set; } // URL to an image of the drill
    public string SkillType { get; set; } // "Dribbling", "Passing"
}   