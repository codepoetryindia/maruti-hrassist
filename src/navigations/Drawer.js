import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Attendance from '../screenss/Attendance';
import Gatepass from '../screenss/Gatepass';
import More from '../screenss/More';
import Tabs from './TabNavigation';
import CustomDrawer from '../components/CustomDrawer';
import EmployeeNavs from './EmployeeNavs';
import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="EmployeeNavs" component={EmployeeNavs} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
