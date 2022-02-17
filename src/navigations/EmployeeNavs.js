// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeDirect from '../screenss/employeLookUp/EmployeeDirect';
import EmployeProfile from '../screenss/employeLookUp/EmployeProfile';
import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';
import TopTabs from './TopTab';
const Stack = createNativeStackNavigator();

function EmployeeNavs() {
  return (
      <Stack.Navigator initialRouteName='EmployeLookUp' screenOptions={{headerShown:false}}>
        <Stack.Screen name='EmployeLookUp' component={EmployeLookUp}/>
      </Stack.Navigator>
  );
}

export default EmployeeNavs;