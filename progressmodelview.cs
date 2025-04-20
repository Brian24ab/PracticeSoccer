[ObservableProperty]
private ObservableCollection<DateTime> completedDates;

[ObservableProperty]
private int todaysMinutes;

[RelayCommand]
async Task StartSession()
{
    var options = await Shell.Current.DisplayActionSheet(
        "Select Session Type", "Cancel", null, "Dribbling", "Passing");
    
    if (options == "Cancel") return;

    var session = new Session
    {
        UserId = CurrentUser.Id,
        DrillType = options,
        DurationMinutes = 30,
        Date = DateTime.Now
    };

    await _sessionService.LogSession(session);
    UpdateProgress();
}