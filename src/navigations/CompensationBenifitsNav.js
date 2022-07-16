import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompensationBenifits from '../screens/CompensationAndBenifits/CompensationBenifits';
import SalarySlip from '../screens/CompensationAndBenifits/SalarySlip';
import Plencashment from '../screens/CompensationAndBenifits/Plencashment';
import ConveyanceBillsSubmission from '../screens/CompensationAndBenifits/ConveyanceBillsSubmission';

const Stack = createNativeStackNavigator();

function CompensationBenifitsNav() {
  return (
      <Stack.Navigator initialRouteName='CompensationBenifits' screenOptions={{headerShown:false}}>
        <Stack.Screen name='CompensationBenifits' component={CompensationBenifits}/>
        <Stack.Screen name='SalarySlip' component={SalarySlip}/>
        <Stack.Screen name='Plencashment' component={Plencashment}/>
        <Stack.Screen name='ConveyanceBillsSubmission' component={ConveyanceBillsSubmission}/>

      </Stack.Navigator>
  );
}

export default CompensationBenifitsNav;