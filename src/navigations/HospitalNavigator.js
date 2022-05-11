// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmergencyHospital from '../screens/EmergencyAndHospital/Emergency&Hospital';
import EmergencyContacts from '../screens/EmergencyAndHospital/EmergencyContact';
import Hospital from '../screens/EmergencyAndHospital/Hospital';
import NearByHospital from '../screens/EmergencyAndHospital/NearByHospital';
import DoctorsContacts from '../components/DoctorsContacts';
import HosLocation from '../screens/EmergencyAndHospital/HosLocation';

const Stack = createNativeStackNavigator();

function HospitalNavs() {
  return (
      <Stack.Navigator initialRouteName='EmergencyHospital' screenOptions={{headerShown:false}}>
        <Stack.Screen name='EmergencyHospital' component={EmergencyHospital}/>
        <Stack.Screen name='EmergencyContacts' component={EmergencyContacts}/>
        <Stack.Screen name='Hospital' component={Hospital}/>
        <Stack.Screen name='NearByHospital' component={NearByHospital}/>
        <Stack.Screen name='DoctorsContacts' component={DoctorsContacts}/>
        <Stack.Screen name='HosLocation' component={HosLocation}/>
      </Stack.Navigator>
  );
}

export default HospitalNavs;