public partial class App : Application
{
    public App(DatabaseService dbService)
    {
        InitializeComponent();
        dbService.Init(); // Initialize DB
        MainPage = new NavigationPage(new ProfilePage());
        InitializeServicesAsync().ConfigureAwait(false);
    }
private async Task InitializeServicesAsync()
{
    var dbService = Services.GetService<DatabaseService>();
    var drillService = Services.GetService<DrillService>();
    await Task.WhenAll(dbService.Init(), drillService.Init());
}