import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import EditItem from './screens/EditItem';
import SelectLogin from './screens/users/SelectLogin';
import UserLogin from './screens/users/UserLogin';
import UserSignup from './screens/users/UserSignup';
import Home from './screens/users/Home';
import EventDescription from './screens/EventDescription';

// Import your CategoryEvents component
import CategoryEvents from './screens/CategoryEvents';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EditItem}
          name="EditItem"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SelectLogin}
          name="SelectLogin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserLogin}
          name="UserLogin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={UserSignup}
          name="UserSignup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={EventDescription}
          name="EventDescription"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={CategoryEvents}
          name="CategoryEvents"
          options={{ headerShown: false }}
        />

       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
