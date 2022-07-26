// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VisitorDetails from '../screens/Gatspass/VisitoDetails';
import Gatepass from '../screens/Gatspass/Gatepass';



const Stack = createNativeStackNavigator();

function GatePassNavigator() {
  return (
      <Stack.Navigator initialRouteName='Gatepass' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Gatepass' component={Gatepass}/>
        <Stack.Screen name="VisitorDetails" component={VisitorDetails} />
      </Stack.Navigator>
  );
}

export default GatePassNavigator;