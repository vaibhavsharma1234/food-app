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
import MyEvents from './screens/users/MyEvents';
import EventDetailsScreen from './tabs/EventDetailScreen';
import Members from './screens/users/Members';
import PastEvents from './screens/users/PastEvents';
import UpcomingEvents from './screens/users/UpcomingEvents';

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
          <Stack.Screen
          component={MyEvents}
          name="MyEvents"
          options={{ headerShown: false }}
        />
        <Stack.Screen
        component={EventDetailsScreen}

        name="EventDetailsScreen"
        options={{ headerShown: false }}
        />
        <Stack.Screen
        component={Members}
        name="Members"
        options={{ headerShown: false }}
        />
           <Stack.Screen
        component={PastEvents}
        name="PastEvents"
        options={{ headerShown: false }}
        />
         <Stack.Screen
        component={UpcomingEvents}
        name="UpcomingEvents"
        options={{ headerShown: false }}
        />
        {/* UpcomingEvents*/}
        

       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
