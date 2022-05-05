// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceAdmin from '../screens/Attendance/Attendance&Admin';
import ManagerMode from '../screens/Attendance/ManagerMode';

const Stack = createNativeStackNavigator();

function AttendanceAdminNav() {
  return (
      <Stack.Navigator initialRouteName='AttendanceAdmin' screenOptions={{headerShown:false}}>
        <Stack.Screen name='AttendanceAdmin' component={AttendanceAdmin}/>
        <Stack.Screen name='ManagerMode' component={ManagerMode}/>
        <Stack.Screen name='Attendance' component={ManagerMode}/>
      </Stack.Navigator>
  );
}

export default AttendanceAdminNav;