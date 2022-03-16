//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import BuisnessTravel from './BuisnessTravel';
// create a component
const Gst = ({navigation}) => {
  const gstdata = [
    {
      stateName: 'ANDAMAN AND NICOBAR ISLAND',
      gstNumber: '068461sdfv648',
      companyName: 'Maruti suzuki india Limited ',

      Adress:
        'PALAM GURGAON ROAD , MARUTI SUZUKI INDIA LIMITED , PALAM GURGAON ROAD , GURAGAON , 1122151',
    },
    {
      stateName: 'ANDAMAN AND NICOBAR ISLAND',
      gstNumber: '068461sdfv648',
      companyName: 'Maruti suzuki india Limited ',

      Adress:
        'PALAM GURGAON ROAD , MARUTI SUZUKI INDIA LIMITED , PALAM GURGAON ROAD , GURAGAON , 1122151',
    },
    {
      stateName: 'ANDAMAN AND NICOBAR ISLAND',
      gstNumber: '068461sdfv648',
      companyName: 'Maruti suzuki india Limited ',

      Adress:
        'PALAM GURGAON ROAD , MARUTI SUZUKI INDIA LIMITED , PALAM GURGAON ROAD , GURAGAON , 1122151',
    },
    {
      stateName: 'ANDAMAN AND NICOBAR ISLAND',
      gstNumber: '068461sdfv648',
      companyName: 'Maruti suzuki india Limited ',

      Adress:
        'PALAM GURGAON ROAD , MARUTI SUZUKI INDIA LIMITED , PALAM GURGAON ROAD , GURAGAON , 1122151',
    },
    {
      stateName: 'ANDAMAN AND NICOBAR ISLAND',
      gstNumber: '068461sdfv648',
      companyName: 'Maruti suzuki india Limited ',

      Adress:
        'PALAM GURGAON ROAD , MARUTI SUZUKI INDIA LIMITED , PALAM GURGAON ROAD , GURAGAON , 1122151',
    },
  ];
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
              color: '#fff',
              fontSize: 16,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            GST Details
          </Text>
        </View>
      </LinearGradient>

      {/* BODY */}

      {/* SEARCH BOX */}
      <View
        style={{
          marginVertical: 10,
          width: '90%',
          flexDirection: 'row',
          borderWidth: 1,
          borderTopColor: '#80406A',
          borderStartColor: '#ad3231',
          borderBottomColor: '#2757C3',
          borderEndColor: '#ad3231',
          borderRadius: 5,
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Feather name="search" size={20} color={'#ad3231'} />
        </View>
        <TextInput
          placeholder="Search By Name/Dept/Staff/ID"
          style={{
            width: '70%',
            paddingVertical: 5,
          }}
        />
        <TouchableOpacity
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="send" size={20} color={'#ad3231'} />
        </TouchableOpacity>
      </View>

      {/* FLATLIST */}

      <FlatList
        data={gstdata}
        keyExtractor={item => item.gstNumber}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity style={styles.TouchableOpacity}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#f8eded',
                    alignSelf: 'center',
                    paddingBottom: 5,
                  }}>
                  <Text style={{fontSize: 16, color: '#000', padding: 10}}>
                    {item.stateName}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                  <Text style={styles.GStBox}>GST Number</Text>
                  <Text>{item.gstNumber}</Text>
                  <Text style={styles.GStBox}>Company Name</Text>
                  <Text>{item.companyName}</Text>
                  <Text style={styles.GStBox}>Address</Text>
                  <Text>{item.Adress}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TouchableOpacity: {
    width: '90%',
    paddingTop: 1,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#ad3231',

    borderRadius: 8,
  },
  GStBox: {
    fontSize: 16,
    color: 'grey',
    paddingVertical: 10,
    paddingBottom: 5,
    letterSpacing: 1,
  },
});

//make this component available to the app
export default Gst;
// '#',