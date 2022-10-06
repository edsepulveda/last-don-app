import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Tabs from './screens/Tabs';
import { Provider } from 'react-redux'
import { store } from './store';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={HomeScreen}>
          <Stack.Screen name='Inicio de Sesión' component={LoginScreen}/>
          <Stack.Screen name='Pantalla Principal' component={Tabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

