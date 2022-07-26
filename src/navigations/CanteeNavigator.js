// In App.js in a new project
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Canteen from '../screens/Canteen/Canteen';
import CanteenMenu from '../screens/Canteen/CanteenMenu';
import FoodCount from '../screens/Canteen/FoodCount';



const Stack = createNativeStackNavigator();

function CanteeNavigator() {
  return (
      <Stack.Navigator initialRouteName='Canteen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Canteen" component={Canteen} />
        <Stack.Screen name="CanteenMenu" component={CanteenMenu} />
        <Stack.Screen name="FoodCount" component={FoodCount} />  
      </Stack.Navigator>
  );
}

export default CanteeNavigator;