// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceAdmin from '../screens/Attendance/Attendance&Admin';
import ManagerMode from '../screens/Attendance/ManagerMode';
import AttendancePer from '../screens/Attendance/AttendancePer';
import CompayShiftDe from '../screens/Attendance/CompayShiftDe';
import LeaveBalance from '../screens/Attendance/LeaveBalance';
import SalaryDeduct from '../screens/Attendance/SalaryDeduct';
import ManagerTaxiApproval from '../screens/Attendance/managermode/ManagerTaxiApproval';
import ManagerAttandancePercentage from '../screens/Attendance/managermode/ManagerAttandancePercentage';


const Stack = createNativeStackNavigator();

function AttendanceAdminNav() {
  return (
    <Stack.Navigator initialRouteName='AttendanceAdmin' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AttendanceAdmin' component={AttendanceAdmin} />
      <Stack.Screen name='ManagerMode' component={ManagerMode} />
      <Stack.Screen name='AttendancePer' component={AttendancePer} />
      <Stack.Screen name='CompayShiftDe' component={CompayShiftDe} />
      <Stack.Screen name='LeaveBalance' component={LeaveBalance} />
      <Stack.Screen name='SalaryDeduct' component={SalaryDeduct} />
      <Stack.Screen name='ManagerTaxiApproval' component={ManagerTaxiApproval}/>
      <Stack.Screen name='ManagerAttandancePercentage' component={ManagerAttandancePercentage}/>  
    </Stack.Navigator>
  );
}

export default AttendanceAdminNav;