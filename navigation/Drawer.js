import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePatientScreen from '../screens/CreatePatientScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TurnList from '../screens/TurnList';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Drawer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Add patient') {
            iconName = focused ? 'adduser' : 'adduser';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#50bb52',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={WelcomeScreen}/>
      <Tab.Screen name="Add patient" component={CreatePatientScreen} />
      <Tab.Screen name="Appointments" component={TurnList} />
    </Tab.Navigator>
  );
};

export default Drawer;
