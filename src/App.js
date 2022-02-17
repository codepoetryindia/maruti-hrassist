import * as React from 'react';import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigations/Drawer';
import Employee from './navigations/EmployeeNavs';
import TopTabs from './navigations/TopTab';
import EmployeeNavs from './navigations/EmployeeNavs';
import Tabs from './navigations/TabNavigation';
import LinearGradient from 'react-native-linear-gradient';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';
export default function App() {
  // const StatusBarHeight = StatusBar.currentHeight
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor={'transparent'}/> */}
     {/* <LinearGradient colors={['#2757C3','#80406A',]}  style={{ height : StatusBarHeight , width : '100%' }}>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
  </LinearGradient > */}
      {/* <Tabs/> */}
      <MyDrawer />
      {/* <EmployeeNavs/> */}
      {/* <TopTabs/> */}
      
    </NavigationContainer>
  );
}
