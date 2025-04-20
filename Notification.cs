public void ScheduleReminders(IEnumerable<DayOfWeek> trainingDays)
{
    foreach (var day in trainingDays)
    {
        NotificationCenter.Current.Show(new NotificationRequest
        {
            Title = "⚽ Practice Time!",
            Description = "Complete your 30-min session today",
            Schedule = new NotificationRequestSchedule
            {
                Day = day,
                Time = new TimeSpan(17, 0, 0) // 5 PM
            }
        });
    }
}