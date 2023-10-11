import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CreatePatientScreen from '../screens/CreatePatientScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TurnList from '../screens/TurnList';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen name="Home" component={WelcomeScreen} />
      <DrawerNavigator.Screen
        name="Add patient"
        component={CreatePatientScreen}
      />
      <DrawerNavigator.Screen name="Turn list" component={TurnList} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;