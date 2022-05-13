import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Home';
import Gatepass from '../screens/Gatspass/Gatepass';
import More from '../screens/More';
import LinearGradient from 'react-native-linear-gradient';
import AttendanceAdminNav from './AttendanceAdminNav';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{

      headerShown: false,
      tabBarActiveTintColor: '#000',
      tabBarStyle:{position:'absolute', height:70,backgroundColor:'transparent',borderTopLeftRadius:15,borderTopRightRadius:15,paddingBottom:10,} ,
      tabBarBackground:() =>(
        <LinearGradient    colors={['#fff', '#fff']} style={{height:80,borderTopLeftRadius:15,borderTopRightRadius:15}}/>
      )
    }}>
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={'#2D79AD'} size={size} />
        ),
      }}/>
      <Tab.Screen name="AttendanceAdmin" component={AttendanceAdminNav}
       options={{
        tabBarLabel: 'AttendanceAdmin',
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar" color={'#2D79AD'} size={size} />
        ),
      }} />
      <Tab.Screen name="Gatepass" component={Gatepass}
      options={{
        tabBarLabel: 'Gatepass',
        tabBarIcon: ({ color, size }) => (
          <Material name="portrait" color={'#2D79AD'} size={size} />
        ),
      }}
       />
      <Tab.Screen name="More" component={More} 
      options={{
        tabBarLabel: 'More',
       
        tabBarIcon: ({ color, size }) => (
          <Material name="sort" color={'#2D79AD'} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}
export default Tabs;