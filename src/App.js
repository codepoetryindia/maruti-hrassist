import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigations/Drawer';
import Employee from './navigations/EmployeeNavs';
import TopTabs from './navigations/TopTab';
import EmployeeNavs from './navigations/EmployeeNavs';
import Tabs from './navigations/TabNavigation';
export default function App() {
  return (
    <NavigationContainer>
      {/* <Tabs/> */}
      <MyDrawer />
      {/* <EmployeeNavs/> */}
      {/* <TopTabs/> */}
      
    </NavigationContainer>
  );
}
