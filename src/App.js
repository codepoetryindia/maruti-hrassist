import * as React from 'react';import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './navigations/Drawer';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
export default function App() {
  // const StatusBarHeight = StatusBar.currentHeight
  return (
    <Provider store={Store}>
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
    </Provider>
  );
}
