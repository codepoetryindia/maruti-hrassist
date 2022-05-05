//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

// create a component
const EmergencyContacts = ({navigation}) => {
  const myNavigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          myNavigation.navigate('DoctorsContacts', {data: 'Doctor'})
        }>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/doctorr.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Doctor</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          myNavigation.navigate('DoctorsContacts', {data: 'Vigilance'})
        }>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/security-cameraa.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Vigilance</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          myNavigation.navigate('DoctorsContacts', {data: 'Fire Control'})
        }>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/fire-extinguisher.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Fire control</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          myNavigation.navigate('DoctorsContacts', {data: 'Electricity'})
        }>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/electrical-energy.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Electricity</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          myNavigation.navigate('DoctorsContacts', {data: 'PHOS Cell'})
        }>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Images/user-interface.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View style={styles.item}>
          <Text>PHOS Cell</Text>
          <Feather name="corner-up-right" size={20} />
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
    marginVertical: 10,
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
export default EmergencyContacts;
