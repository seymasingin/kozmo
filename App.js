import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Urun from './components/Urun';
import Sepet from './components/Sepet';

export default function App() {
  const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
            <Stack.Screen name='Urun' component={Urun} />
            <Stack.Screen name='Sepet' component={Sepet} />
        </Stack.Navigator>

    </NavigationContainer>
  );
}

