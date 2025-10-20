import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './app/MainPage'; // use same name for clarity

import DataStructureVisualsMainPage from './app/DataStructureVisuals/DataStructureVisualsMainPage';
import GraphnPathfindingMainPage from './app/GraphnPathfinding/GraphnPathfindingMainPage';
import RecursionMainPage from './app/Recursion/RecursionMainPage';
import SearchingMainPage from './app/Searching/SearchingMainPage';
import SortingMainPage from './app/Sorting/SortingMainPage';




import BubbleSortPage from './app/Sorting/BubbleSortPage';
import HeapSortPage from './app/Sorting/HeapSortPage';
import InsertionSortPage from './app/Sorting/InsertionSortPage';
import MergeSortPage from './app/Sorting/MergeSortPage';
import QuickSortPage from './app/Sorting/QuickSortPage';


import BinarySearchPage from './app/Searching/BinarySearchPage';
import JumpSearchPage from './app/Searching/JumpSearchPage';
import LinearSearchPage from './app/Searching/LinearSearchPage';

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
        <Stack.Screen name="LinearSearchPage" component={LinearSearchPage} options={{ headerShown: false }} />
        <Stack.Screen name="BinarySearchPage" component={BinarySearchPage} options={{ headerShown: false }} />
        <Stack.Screen name="QuickSortPage" component={QuickSortPage} options={{ headerShown: false }} />
        <Stack.Screen name="HeapSortPage" component={HeapSortPage} options={{ headerShown: false }} />
        <Stack.Screen name="InsertionSortPage" component={InsertionSortPage} options={{ headerShown: false }} />
        <Stack.Screen name="JumpSearchPage" component={JumpSearchPage} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
