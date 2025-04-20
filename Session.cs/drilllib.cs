<!-- DrillsPage.xaml -->
<CollectionView ItemsSource="{Binding DrillGroups}">
    <CollectionView.GroupHeaderTemplate>
        <DataTemplate>
            <Label Text="{Binding SkillType}" 
                   FontSize="18" 
                   FontAttributes="Bold"
                   BackgroundColor="{StaticResource Primary}"/>
        </DataTemplate>
    </CollectionView.GroupHeaderTemplate>
    
    <CollectionView.ItemTemplate>
        <DataTemplate>
            <Frame Padding="10" Margin="5">
                <StackLayout>
                    <Label Text="{Binding Title}" FontSize="16"/>
                    <Label Text="{Binding Difficulty}" TextColor="Gray"/>
                </StackLayout>
                <Frame.GestureRecognizers>
                    <TapGestureRecognizer 
                        Command="{Binding Source={RelativeSource AncestorType={x:Type viewmodel:DrillsViewModel}}, Path=SelectDrillCommand}"
                        CommandParameter="{Binding .}"/>
                </Frame.GestureRecognizers>
            </Frame>
        </DataTemplate>
    </CollectionView.ItemTemplate>
</CollectionView>