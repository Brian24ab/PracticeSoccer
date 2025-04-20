public partial class App : Application
{
    public App(DatabaseService dbService)
    {
        InitializeComponent();
        dbService.Init(); // Initialize DB
        MainPage = new NavigationPage(new ProfilePage());
    }
}