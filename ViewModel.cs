using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

public partial class ProfileViewModel : ObservableObject
{
    private readonly DatabaseService _dbService;
    
    [ObservableProperty]
    private string name;
    
    [ObservableProperty]
    private string selectedFoot;
    
    public ProfileViewModel(DatabaseService dbService)
    {
        _dbService = dbService;
    }
    
    [RelayCommand]
    private async Task SaveProfile()
    {
        var user = new User { Name = this.Name, PreferredFoot = this.SelectedFoot };
        await _dbService.AddUser(user);
        await Shell.Current.DisplayAlert("Success", "Profile saved!", "OK");
    }
}