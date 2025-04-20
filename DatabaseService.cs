using System.IO;
using Microsoft.Maui.Storage; 

public class DatabaseService
{
    private SQLiteAsyncConnection _db;

    public async Task Init()
    {
        _db = new SQLiteAsyncConnection(
            Path.Combine(FileSystem.AppDataDirectory, "psoccer.db3"));
        await _db.CreateTableAsync<User>();
    }
    
    public async Task AddUser(User user) => await _db.InsertAsync(user);
    public async Task<List<User>> GetUsers() => await _db.Table<User>().ToListAsync();
}
}