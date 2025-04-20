// ProgressViewModel.cs
public partial class ProgressViewModel : ObservableObject
{
    private readonly SessionService _sessionService;
    
    [ObservableProperty]
    private int currentStreak;
    
    [ObservableProperty]
    private ObservableCollection<Session> recentSessions;
    
    public ProgressViewModel(SessionService sessionService)
    {
        _sessionService = sessionService;
        LoadData();
    }
    
    private async void LoadData()
    {
        RecentSessions = new ObservableCollection<Session>(
            await _sessionService.GetUserSessions(1)); // TODO: Replace with actual user ID
    }
}