<ScrollView>
    <StackLayout Padding="20">
        <!-- Streak Counter -->
        <Frame CornerRadius="20" BackgroundColor="#4CAF50" Padding="15">
            <StackLayout Orientation="Horizontal" HorizontalOptions="Center">
                <Label Text="🔥" FontSize="24"/>
                <Label Text="{Binding CurrentStreak}" 
                       FontSize="36"
                       FontAttributes="Bold"
                       TextColor="White"
                       Margin="10,0"/>
                <Label Text="day streak" 
                       FontSize="24"
                       TextColor="White"
                       VerticalOptions="Center"/>
            </StackLayout>
        </Frame>

        <!-- Weekly Progress -->
        <BoxView HeightRequest="200">
            <BoxView.Background>
                <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                    <GradientStop Color="#2196F3" Offset="0.1"/>
                    <GradientStop Color="#00BCD4" Offset="1.0"/>
                </LinearGradientBrush>
            </BoxView.Background>
            <Chart:Microcharts.Forms.ChartView 
                Chart="{Binding WeeklyProgressChart}"
                HeightRequest="200"/>
        </BoxView>

        <!-- Achievement Badges -->
        <Label Text="Your Badges" FontSize="18" FontAttributes="Bold"/>
        <FlexLayout BindableLayout.ItemsSource="{Binding Badges}"
                    Wrap="Wrap"
                    JustifyContent="SpaceAround">
            <BindableLayout.ItemTemplate>
                <DataTemplate>
                    <Image Source="{Binding Icon}" 
                           WidthRequest="60"
                           HeightRequest="60"
                           Margin="5"/>
                </DataTemplate>
            </BindableLayout.ItemTemplate>
        </FlexLayout>
    </StackLayout>
</ScrollView>