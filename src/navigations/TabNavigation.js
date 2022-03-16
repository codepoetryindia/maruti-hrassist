import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons';
import Home from '../screenss/Home';
import Gatepass from '../screenss/Gatspass/Gatepass';
import More from '../screenss/More';
import LinearGradient from 'react-native-linear-gradient';
import AttendanceAdminNav from './AttendanceAdminNav';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{

      headerShown: false,
      tabBarActiveTintColor: '#fff',
      tabBarStyle:{position:'absolute', height:70,backgroundColor:'transparent',borderTopLeftRadius:15,borderTopRightRadius:15,paddingBottom:10,} ,
      tabBarBackground:() =>(
        <LinearGradient  colors={['#AD3231',  '#2757C3']} style={{height:80,borderTopLeftRadius:15,borderTopRightRadius:15}}/>
      )
    }}>
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={'white'} size={size} />
        ),
      }}/>
      <Tab.Screen name="AttendanceAdmin" component={AttendanceAdminNav}
       options={{
        tabBarLabel: 'AttendanceAdmin',
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar" color={'white'} size={size} />
        ),
      }} />
      <Tab.Screen name="Gatepass" component={Gatepass}
      options={{
        tabBarLabel: 'Gatepass',
        tabBarIcon: ({ color, size }) => (
          <Material name="portrait" color={'white'} size={size} />
        ),
      }}
       />
      <Tab.Screen name="More" component={More} 
      options={{
        tabBarLabel: 'More',
       
        tabBarIcon: ({ color, size }) => (
          <Material name="sort" color={'white'} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}
export default Tabs;