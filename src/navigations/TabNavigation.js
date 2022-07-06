import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Gatepass from '../screens/Gatspass/Gatepass';
import OtherApps from '../screens/OtherApps';
import LinearGradient from 'react-native-linear-gradient';
import AttendanceAdminNav from './AttendanceAdminNav';
import AttendanceAdmin from '../screens/Attendance/Attendance&Admin'

import { GlobalColor } from '../constants/Colors';
import { GlobalFontSize } from '../constants/FontSize';
import Text from '../components/reusable/Text';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (    
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: GlobalColor.Secondary,
      tabBarLabelStyle:{ fontSize:GlobalFontSize.Error, color:GlobalColor.Primary},   
      tabBarInactiveTintColor:GlobalColor.Primary,   
      tabBarStyle:{height:70,backgroundColor:'transparent',borderTopLeftRadius:15,borderTopRightRadius:15,paddingBottom:10,} ,
      tabBarBackground:() =>(
        <LinearGradient    
        colors={['#fff', '#fff']} style={{
          height:80,
          // borderTopLeftRadius:15,
          // borderTopRightRadius:15
        }}/>
      )
    }}>
      <Tab.Screen name="Home" component={Home} 
        options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen name="AttendanceAdmin" component={AttendanceAdmin}
       options={{
        tabBarLabel: 'Attendance',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-edit" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Gatepass" component={Gatepass}
       options={{
        tabBarLabel: 'Gatepass',
        tabBarIcon: ({ color, size }) => (
          <Material name="perm-contact-cal" color={color} size={size} />
        ),
      }}
       />
      <Tab.Screen name="OtherApps" component={OtherApps} 
        options={{
        tabBarLabel: 'OtherApps',
        tabBarIcon: ({ color, size }) => (
          <Material name="apps" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}
export default Tabs;