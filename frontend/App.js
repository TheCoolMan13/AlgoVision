import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './app/MainPage'; // use same name for clarity
import BubbleSortPage from './app/Sorting&Searching/BubbleSortPage';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="BubbleSortPage" component={BubbleSortPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
