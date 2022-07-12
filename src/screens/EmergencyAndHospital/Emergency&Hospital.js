//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Hospital from './Hospital';
import NearByHospital from './NearByHospital';
import EmergencyContacts from './EmergencyContact';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalFontSize } from '../../constants/FontSize';
import { GlobalColor } from '../../constants/Colors';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';



const Tab = createMaterialTopTabNavigator();
const EmergencyHospital = ({ navigation, route }) => {

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title="Emergency & Hospital"/>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff' },
          tabBarStyle: { backgroundColor: '#0083B0', elevation: 0 },
        }}>
        <Tab.Screen name="Emergency Contacts" component={EmergencyContacts} />
        <Tab.Screen name="Hospital" component={Hospital} />
        <Tab.Screen name="NearBy Hospital" component={NearByHospital} />
      </Tab.Navigator>
    </SafeAreaView>



  );
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
    elevation: 0
  },
  container: {
    flexDirection: 'row',
  },
  searchSection: {
    top: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '77%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

// //make this component available to the app
export default EmergencyHospital;