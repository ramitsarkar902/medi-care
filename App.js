import {Provider as PaperProvider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import StackN from './src/navigator/Navigation';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Loginscreen';
import Signupscreen from './src/screens/Signupscreen';
import Homescreen from './src/screens/Homescreen';
import Basescreen from './src/screens/Basescreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

export default function App() {
  const [isloggedin, setLogged] = useState(null);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptionStyle}>
          <Stack.Screen name="Basescreen" component={Basescreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Homescreen" component={Homescreen} />
          <Stack.Screen name="Signupscreen" component={Signupscreen} />
          {/* <Stack.Screen name="Detail" component={Detail} /> */}
          {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
