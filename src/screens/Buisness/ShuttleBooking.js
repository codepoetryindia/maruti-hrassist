//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,

  TouchableOpacity,
  SafeAreaView


} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FutureBook from './FutureBook';
import PastBook from './PastBook';
import Book from './Book';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import { Header } from '../../components/reusable/Header';

const ShuttleBooking = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const [horizental, setHorizental] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title={"Shuttle Booking"}  />
    <View style={styles.container}>
      {/* <LinearGradient
        colors={[GlobalColor.PrimaryGradient, GlobalColor.SecondryGradient]}
        style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 40,
              alignItems: 'center',
            }}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.navigate("BuisnessTravel")}
            />
            <Ionicons
              name="menu-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
          </View>

          <Text
            style={{
              color:GlobalColor.White,
              fontSize: 16,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            Shuttle Booking
          </Text>
          <TouchableOpacity
            style={{ marginLeft: '30%' }}
            onPress={() => {
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              style={{ marginLeft: '35%' }}
              name="ellipsis-vertical"
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
          {horizental == true ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Guidelines')}
              style={{
                padding: 10,
                backgroundColor: GlobalColor.White,
                position: 'absolute',
                top: 20,
                right: 30,
                zIndex: 1000,
                borderRadius: 8
              }}>
              <Text>Guidelines</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient> */}
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
