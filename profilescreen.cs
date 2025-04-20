<ScrollView>
    <StackLayout Padding="20">
        <!-- Profile Header -->
        <Frame HorizontalOptions="Center" CornerRadius="60" HeightRequest="120" WidthRequest="120">
            <Image Source="{Binding ProfileImage}" 
                   Aspect="AspectFill"/>
            <Frame.GestureRecognizers>
                <TapGestureRecognizer Command="{Binding ChangePhotoCommand}"/>
            </Frame.GestureRecognizers>
        </Frame>

        <!-- Editable Fields -->
        <Entry Placeholder="Full Name" Text="{Binding Name}"/>
        <Picker Title="Preferred Foot" ItemsSource="{Binding FootOptions}" 
                SelectedItem="{Binding PreferredFoot}"/>
        <DatePicker Date="{Binding GoalDate}" Format="yyyy-MM-dd"/>

        <!-- Equipment Selection -->
        <Label Text="Available Equipment:" FontAttributes="Bold"/>
        <FlexLayout BindableLayout.ItemsSource="{Binding EquipmentOptions}"
                    Wrap="Wrap">
            <BindableLayout.ItemTemplate>
                <DataTemplate>
                    <CheckBox IsChecked="{Binding IsSelected}"
                              Content="{Binding Name}"
                              Margin="10"/>
                </DataTemplate>
            </BindableLayout.ItemTemplate>
        </FlexLayout>

        <!-- Save Button -->
        <Button Text="Save Profile" 
                Command="{Binding SaveCommand}"
                BackgroundColor="{StaticResource Primary}"
                TextColor="White"
                Margin="0,20"/>
    </StackLayout>
</ScrollView>