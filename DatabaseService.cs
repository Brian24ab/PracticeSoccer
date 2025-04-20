using SQLite;

public class DatabaseService {
    private SQLiteAsyncConnection _db;

    public async Task Init() {
        _db = new SQLiteAsyncConnection(Path.Combine(FileSystem.AppDataDirectory, "psoccer.db"));
        await _db.CreateTableAsync<User>();
    }
}