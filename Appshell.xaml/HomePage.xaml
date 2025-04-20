<ScrollView>
    <Grid RowDefinitions="Auto,Auto,Auto" Padding="20">
        <!-- Welcome Header -->
        <Frame Grid.Row="0" CornerRadius="15" BackgroundColor="{StaticResource Primary}">
            <VerticalStackLayout>
                <Label Text="Welcome back, Brian!" 
                       FontSize="20" TextColor="White"/>
                <Label Text="Ready for today's practice?" 
                       FontSize="14" TextColor="White"/>
            </VerticalStackLayout>
        </Frame>

        <!-- Quick Actions -->
        <StackLayout Grid.Row="1" Orientation="Horizontal" HorizontalOptions="Center">
            <Button Text="Dribbling" 
                    ImageSource="dribble.png"
                    CornerRadius="30"
                    WidthRequest="150"
                    Command="{Binding NavigateToDrillsCommand}"
                    CommandParameter="Dribbling"/>
            
            <Button Text="Passing" 
                    ImageSource="pass.png"
                    CornerRadius="30"
                    WidthRequest="150"
                    Margin="20,0"
                    Command="{Binding NavigateToDrillsCommand}"
                    CommandParameter="Passing"/>
        </StackLayout>

        <!-- Recent Activity -->
        <CollectionView Grid.Row="2" ItemsSource="{Binding RecentSessions}">
            <CollectionView.Header>
                <Label Text="Recent Sessions" FontSize="18" FontAttributes="Bold"/>
            </CollectionView.Header>
            <CollectionView.ItemTemplate>
                <DataTemplate>
                    <Frame Padding="10" Margin="0,5">
                        <Grid ColumnDefinitions="*,*">
                            <Label Text="{Binding DrillType}" FontAttributes="Bold"/>
                            <Label Text="{Binding Date, StringFormat='{0:MMM dd}'}" 
                                   Grid.Column="1" HorizontalOptions="End"/>
                        </Grid>
                    </Frame>
                </DataTemplate>
            </CollectionView.ItemTemplate>
        </CollectionView>
    </Grid>
</ScrollView>