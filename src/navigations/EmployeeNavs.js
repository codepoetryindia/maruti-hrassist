// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeDirect from '../screens/employeLookUp/EmployeeDirect';
import EmployeLookUp from '../screens/employeLookUp/EmployeLookUp';
import Birthdays from '../screens/employeLookUp/Birthday/Birthdays';
const Stack = createNativeStackNavigator();

function EmployeeNavs() {
  return (
      <Stack.Navigator initialRouteName='EmployeLookUp' screenOptions={{headerShown:false}}>
        <Stack.Screen name='EmployeLookUp' component={EmployeLookUp}/>
        <Stack.Screen name='EmployeeDirect' component={EmployeeDirect}/>
        <Stack.Screen name='Birthdays' component={Birthdays}/>
      </Stack.Navigator>
  );
}

export default EmployeeNavs;