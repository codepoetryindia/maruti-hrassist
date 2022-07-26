import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompensationBenifits from '../screens/CompensationAndBenifits/CompensationBenifits';
import SalarySlip from '../screens/CompensationAndBenifits/SalarySlip';
import Plencashment from '../screens/CompensationAndBenifits/Plencashment';
import ConveyanceBillsSubmission from '../screens/CompensationAndBenifits/ConveyanceBillsSubmission';
import TaxComputationSlip from '../screens/CompensationAndBenifits/TaxComputationSlip';
import PFBalance from '../screens/CompensationAndBenifits/PFBalance';
import TaxSavings from '../screens/CompensationAndBenifits/TaxSavings';

const Stack = createNativeStackNavigator();

function CompensationBenifitsNav() {
  return (
      <Stack.Navigator initialRouteName='CompensationBenifits' screenOptions={{headerShown:false}}>
        <Stack.Screen name='CompensationBenifits' component={CompensationBenifits}/>
        <Stack.Screen name='SalarySlip' component={SalarySlip}/>
        <Stack.Screen name='Plencashment' component={Plencashment}/>
        <Stack.Screen name='ConveyanceBillsSubmission' component={ConveyanceBillsSubmission}/>
        <Stack.Screen name='TaxComputationSlip' component={TaxComputationSlip} />  
        <Stack.Screen name='PFBalance' component={PFBalance} />  
        <Stack.Screen name='TaxSavings' component={TaxSavings} />   
      </Stack.Navigator>
  );
}

export default CompensationBenifitsNav;