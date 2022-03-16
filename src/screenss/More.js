//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';

// create a component
const More = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{padding: 20}}
        colors={['#2757C3', '#80406A', '#ad3231']}>
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
            Other Mobile Apps
          </Text>
        </View>
      </LinearGradient>

      {/* body */}
      <View style={{width: '100%', top: 50}}>
        <TouchableOpacity
          style={{
            cursor: 'pointer',
            width: '50%',
            paddingHorizontal: 15,
            paddingVertical: 25,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 1.29,
            shadowRadius: 10.65,

            elevation: 5,

            alignItems: 'center',
            marginVertical: 15,
            borderRadius: 18,
          }}>
          <Image
            source={require('../assets/Images/man.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={{fontSize: 20, paddingVertical: 5, color: 'grey'}}>
            SAP SF (NEEV)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            cursor: 'pointer',
            width: '50%',
            paddingHorizontal: 15,
            paddingVertical: 25,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1.29,
            shadowRadius: 10.65,

            elevation: 5,

            alignItems: 'center',
            marginVertical: 15,
            borderRadius: 18,
          }}>
          <Image
            source={require('../assets/Images/smile.jpg')}
            style={{width: 50, height: 50, borderRadius: 40}}
          />
          <Text style={{fontSize: 20, paddingVertical: 5}}>Ask HR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            cursor: 'pointer',
            width: '50%',
            paddingHorizontal: 15,
            paddingVertical: 25,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1.29,
            shadowRadius: 10.65,

            elevation: 5,

            alignItems: 'center',
            marginVertical: 15,
            borderRadius: 18,
          }}>
          <Image
            source={require('../assets/Images/profile2.jpg')}
            style={{width: 50, height: 50, borderRadius: 40}}
          />
          <Text style={{fontSize: 20, paddingVertical: 5}}>Wellness Mitra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default More;
