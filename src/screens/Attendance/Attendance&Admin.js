//import liraries
import React, {useState, useEffect,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Alert,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Attendance from './Attendence';
import Leave from './Leave';
import Shift from './Shift';
import HolidayCalendar from './HolidayCalendar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalColor } from '../../constants/Colors';
import {Header} from './../../components/reusable/Header';




const Tab = createMaterialTopTabNavigator();
const AttendanceAdmin = ({navigation}) => {

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <Header title={"Attendance & Admin"} onPress={() => {navigation.navigate('ManagerMode')}}/>
      <Tab.Navigator 
       screenOptions={{
        tabBarLabelStyle: { fontSize: 12,fontWeight:'700'},
        tabBarActiveTintColor: '#fff',
        tabBarItemStyle: { paddingHorizontal:0 },
        tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff'},
        tabBarStyle: { backgroundColor: GlobalColor.SecondryGradient, elevation: 0 },
      }}>
        <Tab.Screen name="Attendance" component={Attendance} />
        <Tab.Screen name="Leave" component={Leave} />
        <Tab.Screen name="Shift" component={Shift} />
        <Tab.Screen name="Holiday" component={HolidayCalendar} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({

});

export default AttendanceAdmin;
