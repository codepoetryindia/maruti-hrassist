import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons';
import Home from '../screenss/Home';
import Attendance from '../screenss/Attendance';
import Gatepass from '../screenss/Gatepass';
import More from '../screenss/More';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#fff',
      tabBarStyle: {backgroundColor: '#624686',height:70,borderTopLeftRadius:15,borderTopRightRadius:15,},
    }}>
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={'white'} size={size} />
        ),
      }}/>
      <Tab.Screen name="Attendance" component={Attendance}
       options={{
        tabBarLabel: 'Attendance',
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