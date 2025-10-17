import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './app/MainPage'; // use same name for clarity
import SortingMainPage from './app/Sorting/SortingMainPage';
import DataStructureVisualsMainPage from './app/DataStructureVisuals/DataStructureVisualsMainPage'; 
import GraphnPathfindingMainPage from './app/GraphnPathfinding/GraphnPathfindingMainPage';
import SearchingMainPage from './app/Searching/SearchingMainPage';
import RecursionMainPage from './app/Recursion/RecursionMainPage';




import BubbleSortPage from './app/Sorting/BubbleSortPage'
import MergeSortPage from './app/Sorting/MergeSortPage'



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="BubbleSortPage" component={BubbleSortPage} options={{ headerShown: false }} />
        <Stack.Screen name="MergeSortPage" component={MergeSortPage} options={{ headerShown: false }} />
        <Stack.Screen name="SortingMainPage" component={SortingMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="DataStructureVisualsMainPage" component={DataStructureVisualsMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="GraphnPathfindingMainPage" component={GraphnPathfindingMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="SearchingMainPage" component={SearchingMainPage} options={{ headerShown: false }} />
        <Stack.Screen name="RecursionMainPage" component={RecursionMainPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
