import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Tabs from './TabNavigation';
import CustomDrawer from '../components/CustomDrawer';
import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';
import CompensationBenifits from '../screenss/CompensationAndBenifits/CompensationBenifits';
import EmergencyHospital from '../screenss/EmergencyAndHospital/Emergency&Hospital';
import Canteen from '../screenss/Canteen/Canteen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="EmployeLookUp" component={EmployeLookUp} />
      <Drawer.Screen name="CompensationBenifits" component={CompensationBenifits} />
      <Drawer.Screen name="EmergencyHospital" component={EmergencyHospital} />
      <Drawer.Screen name="Canteen" component={Canteen} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
