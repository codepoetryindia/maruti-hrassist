//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Accordion from './CanteenComponent/Accordion';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { GlobalFontSize } from '../../constants/FontSize';
import { GlobalColor } from '../../constants/Colors';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import { Location } from './Locations/Location';


const Tab = createMaterialTopTabNavigator();

const CanteenMenu = ({ navigation }) => {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title="Canteen Menu" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: GlobalFontSize.P,
          tabBarActiveTintColor: GlobalColor.White,
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: GlobalColor.White },
          tabBarStyle: { backgroundColor: GlobalColor.PrimaryGradient, elevation: 0 },
        }}
      >
        <Tab.Screen name="Gurgaon" component={Location}  initialParams={{ MenuLocation: "002", MenuType: "Canteen" }}/>
        <Tab.Screen name="Manesar" component={Location} initialParams={{ MenuLocation: "010", MenuType: "Canteen" }}/>
        <Tab.Screen name="MPT" component={Location}  initialParams={{ MenuLocation: "011", MenuType: "Canteen" }}/>
        <Tab.Screen name="Rothak" component={Location} initialParams={{ MenuLocation: "041", MenuType: "Canteen" }}/>
      </Tab.Navigator>
    </View>
  );
};



// Define your styles
const styles = StyleSheet.create({

});

// //make this component available to the app
export default CanteenMenu;
