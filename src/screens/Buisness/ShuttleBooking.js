//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  
  StyleSheet,

  TouchableOpacity,
  SafeAreaView


} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FutureBook from './FutureBook';
import PastBook from './PastBook';
import Book from './Book';
import { GlobalColor } from '../../constants/Colors';
import { Header } from '../../components/reusable/Header';

const ShuttleBooking = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const [horizental, setHorizental] = useState(false);


  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Shuttle Booking"}  />
      <View style={styles.container}>      
      <Tab.Navigator 
       screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: GlobalColor.White,
        tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: GlobalColor.White },
        tabBarStyle: { backgroundColor: GlobalColor.PrimaryGradient, elevation: 0 },
      }}>
        <Tab.Screen name="Book" component={Book} />
        <Tab.Screen name="PastBook" component={PastBook} />
        <Tab.Screen name="FutureBook" component={FutureBook} />
      </Tab.Navigator>
    </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.White,
  },
});

//make this component available to the app
export default ShuttleBooking;
