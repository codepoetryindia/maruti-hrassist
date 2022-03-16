// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmergencyHospital from '../screenss/EmergencyAndHospital/Emergency&Hospital';
import EmergencyContacts from '../screenss/EmergencyAndHospital/EmergencyContact';
import Hospital from '../screenss/EmergencyAndHospital/Hospital';
import NearByHospital from '../screenss/EmergencyAndHospital/NearByHospital';
import DoctorsContacts from '../components/DoctorsContacts';

const Stack = createNativeStackNavigator();

function HospitalNavs() {
  return (
      <Stack.Navigator initialRouteName='EmergencyHospital' screenOptions={{headerShown:false}}>
        <Stack.Screen name='EmergencyHospital' component={EmergencyHospital}/>
        <Stack.Screen name='EmergencyContacts' component={EmergencyContacts}/>
        <Stack.Screen name='Hospital' component={Hospital}/>
        <Stack.Screen name='NearByHospital' component={NearByHospital}/>
        <Stack.Screen name='DoctorsContacts' component={DoctorsContacts}/>
      </Stack.Navigator>
  );
}

export default HospitalNavs;