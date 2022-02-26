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
              size={15}
              color={'white'}
              onPress={() => navigation.navigate(Home)}
            />
            <Ionicons
              name="menu-outline"
              size={20}
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

      <TouchableOpacity
        style={{
            marginVertical:10,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal:15,
          paddingVertical: 25,
          alignSelf: 'center',
          backgroundColor: '#f3f3',
          alignItems:'center'
        }}>
        <Image
          source={require('../assets/Images/man.png')}
          style={{width:50,height:50}}
        />
        <Text style={{fontSize: 20}}>SAP SF (NEEV)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
            marginVertical:5,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal:15,
          paddingVertical: 25,
          alignSelf: 'center',
          backgroundColor: '#f3f3',
          alignItems:'center'
        }}>
        <Image
          source={require('../assets/Images/smile.jpg')}
          style={{width:50,height:50,borderRadius:40}}
        />
        <Text style={{fontSize: 20}}>Ask HR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
            marginVertical:5,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal:15,
          paddingVertical: 25,
          alignSelf: 'center',
          backgroundColor: '#f3f3',
          alignItems:'center'
        }}>
        <Image
          source={require('../assets/Images/profile2.jpg')}
          style={{width:50,height:50,borderRadius:40}}
        />
        <Text style={{fontSize: 20}}>Wellness Mitra</Text>
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
});

//make this component available to the app
export default More;
