public class User {
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Age { get; set; }
    public string? PreferredFoot { get; set; } // "Left"/"Right"/"Both"
}
}