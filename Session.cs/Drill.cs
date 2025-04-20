// DrillService.cs
public class DrillService
{
    private SQLiteAsyncConnection _db;
    
    public async Task Init() => 
        _db = new SQLiteAsyncConnection(Path.Combine(FileSystem.AppDataDirectory, "psoccer.db3"));

    public async Task<List<DrillGroup>> GetDrillsGrouped()
    {
        var drills = await _db.Table<Drill>().ToListAsync();
        return drills
            .GroupBy(d => d.SkillType)
            .Select(g => new DrillGroup(g.Key, g))
            .ToList();
    }
}