import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompensationBenifits from '../screens/CompensationAndBenifits/CompensationBenifits';
import SalarySlip from '../screens/CompensationAndBenifits/SalarySlip';

const Stack = createNativeStackNavigator();

function CompensationBenifitsNav() {
  return (
      <Stack.Navigator initialRouteName='CompensationBenifits' screenOptions={{headerShown:false}}>
        <Stack.Screen name='CompensationBenifits' component={CompensationBenifits}/>
        <Stack.Screen name='SalarySlip' component={SalarySlip}/>
      </Stack.Navigator>
  );
}

export default CompensationBenifitsNav;