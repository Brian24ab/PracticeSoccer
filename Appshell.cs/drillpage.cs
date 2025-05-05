<RefreshView IsRefreshing="{Binding IsBusy}"
             Command="{Binding LoadDrillsCommand}">
    <CollectionView ItemsSource="{Binding DrillGroups}"
                   SelectionMode="None">
        <CollectionView.GroupHeaderTemplate>
            <DataTemplate>
                <Label Text="{Binding SkillType}" 
                       FontSize="18" 
                       FontAttributes="Bold"
                       Margin="15,10"
                       TextColor="{StaticResource Primary}"/>
            </DataTemplate>
        </CollectionView.GroupHeaderTemplate>

        <CollectionView.ItemTemplate>
            <DataTemplate>
                <Frame Padding="0" Margin="10,5" CornerRadius="10">
                    <Grid ColumnDefinitions="Auto,*,Auto" RowDefinitions="Auto,Auto">
                        <!-- Drill Image -->
                        <Image Source="{Binding ImageUrl}" 
                               Aspect="AspectFill"
                               HeightRequest="120"
                               Grid.ColumnSpan="3"/>

                        <!-- Drill Info -->
                        <Label Text="{Binding Title}" 
                               FontSize="16"
                               FontAttributes="Bold"
                               Margin="10"
                               Grid.Row="1"/>

                        <Label Text="{Binding Duration}" 
                               TextColor="Gray"
                               Margin="10"
                               Grid.Row="1"
                               Grid.Column="1"/>

                        <Button Text="Start" 
                                CornerRadius="20"
                                WidthRequest="80"
                                Margin="10"
                                Grid.Row="1"
                                Grid.Column="2"
                                Command="{Binding Source={RelativeSource AncestorType={x:Type viewmodel:DrillsViewModel}}, Path=StartDrillCommand}"
                                CommandParameter="{Binding .}"/>
                    </Grid>
                </Frame>
            </DataTemplate>
        </CollectionView.ItemTemplate>
    </CollectionView>
</RefreshView>