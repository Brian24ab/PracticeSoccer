// Session.cs
public class Session
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    public string DrillType { get; set; }
    public int DurationMinutes { get; set; }
}

// SessionService.cs
public class SessionService
{
    private SQLiteAsyncConnection _db;
    
    public async Task Init() => 
        _db = new SQLiteAsyncConnection(Path.Combine(FileSystem.AppDataDirectory, "psoccer.db3"));

    public async Task LogSession(Session session) => 
        await _db.InsertAsync(session);

    public async Task<List<Session>> GetUserSessions(int userId) => 
        await _db.Table<Session>().Where(s => s.UserId == userId).ToListAsync();
}