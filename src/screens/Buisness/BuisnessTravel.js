//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Gst from './GST';
import ShuttleBooking from './ShuttleBooking';
// create a component
const BuisnessTravel = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{padding: 20}}
        colors={['#437cd5', '#5dc0e9']}>
        <View style={{flexDirection: 'row'}}>
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
              onPress={() => navigation.navigate("Home")}
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
              color: '#fff',
              fontSize: 16,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            Buisness Travel
          </Text>
        </View>
      </LinearGradient>

      {/* BODY */}
      <TouchableOpacity style={styles.box}
      onPress={() =>{navigation.navigate("Gst")}}>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#6ef7ff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/cash.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            MSIL GST Details
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}
      onPress={() => {navigation.navigate("ShuttleBooking")}}>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#6ef7ff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/bus.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Shuttle Booking
          </Text>
          <Ionicons name="chevron-forward-outline" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '90%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },
  iconBox: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

//make this component available to the app
export default BuisnessTravel;
