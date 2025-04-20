<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:viewmodel="clr-namespace:PSoccer.App.ViewModels"
             x:Class="PSoccer.App.Pages.ProfilePage">
    <ContentPage.BindingContext>
        <viewmodel:ProfileViewModel />
    </ContentPage.BindingContext>
    
    <VerticalStackLayout>
        <Entry Placeholder="Your name" 
               Text="{Binding Name}" />
        <Picker Title="Preferred Foot"
                ItemsSource="{Binding FootOptions}"
                SelectedItem="{Binding SelectedFoot}"/>
        <Button Text="Save" 
                Command="{Binding SaveProfileCommand}" />
    </VerticalStackLayout>
</ContentPage>