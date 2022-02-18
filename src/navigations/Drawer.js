import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Tabs from './TabNavigation';
import CustomDrawer from '../components/CustomDrawer';
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
      <Drawer.Screen name="EmployeLookUp" component={EmployeLookUp} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
