public List<Drill> GeneratePracticePlan(string type)
{
    return type switch
    {
        "Dribbling" => new List<Drill>
        {
            GetDrillByName("Cone Weave"),
            GetDrillByName("Box Dribble"),
            new Drill {
                Name = "1v1 Moves",
                Type = "Dribbling",
                Instructions = "Practice 5 different feints/moves",
                DurationMinutes = 10
            }
        },
        "Passing" => new List<Drill>
        {
            GetDrillByName("Wall Passing"),
            GetDrillByName("Triangle Passing"),
            new Drill {
                Name = "Long Balls",
                Type = "Passing",
                Instructions = "Practice 20-30yd passes",
                DurationMinutes = 10
            }
        },
        _ => throw new ArgumentException("Invalid drill type")
    };
}