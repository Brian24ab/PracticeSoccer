public async Task SeedDefaultDrills()
{
    if (await _db.Table<Drill>().CountAsync() == 0)
    {
        var defaultDrills = new List<Drill>
        {
            // Dribbling Drills
            new Drill {
                Name = "Cone Weave",
                Type = "Dribbling",
                Difficulty = "Beginner",
                DurationMinutes = 5,
                Instructions = "1. Set up 5 cones in a line 2ft apart\n2. Dribble through using inside/outside touches",
                Equipment = "Cones, Ball"
            },
            new Drill {
                Name = "Box Dribble",
                Type = "Dribbling",
                Difficulty = "Intermediate",
                DurationMinutes = 7,
                Instructions = "1. Create 4-cone square (5yd sides)\n2. Dribble around using sole rolls",
                Equipment = "4 Cones, Ball"
            },

            // Passing Drills
            new Drill {
                Name = "Wall Passing",
                Type = "Passing",
                Difficulty = "Beginner",
                DurationMinutes = 6,
                Instructions = "1. Stand 5yd from wall\n2. Alternate feet, focus on accuracy",
                Equipment = "Wall, Ball"
            },
            new Drill {
                Name = "Triangle Passing",
                Type = "Passing",
                Difficulty = "Intermediate",
                DurationMinutes = 8,
                Instructions = "1. Set up 3 cones (10yd triangle)\n2. Move between cones while passing",
                Equipment = "3 Cones, Ball, Partner"
            }
        };

        await _db.InsertAllAsync(defaultDrills);
    }
}