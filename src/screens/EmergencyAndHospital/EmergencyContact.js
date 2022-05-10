//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator, Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';

// create a component
const EmergencyContacts = ({ navigation }) => {
  const myNavigation = useNavigation();

  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [emerList, setEmerList] = useState();
  const [contact, setContact] = useState();
  const [modal, setModal] = useState(false)

  const GetEmerMain = () => {
    let apiData = {}
    let token = AppUserData.token
    console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetEmerMain', apiData, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("APi value", ApiValue);
        setEmerList(ApiValue)
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };
  useEffect(() => {

    GetEmerMain()
  }, [])

  const iconBox = (type) => {
    switch (type) {
      case "Doctor":
        return '../../assets/Images/doctorr.png'
        break;
      case "Vigilance":
        return '../../assets/Images/security-cameraa.png'
        break;
      case "Fire Control":
        return '../../assets/Images/fire-extinguisher.png'
        break;
      case "Electricity":
        return '../../assets/Images/electrical-energy.png'
        break;
      case "POSH Cell":
        return '../../assets/Images/user-interface.png'
        break;
      default:
        return '../../assets/Images/user-interface.png'
        break;
    }
  }
  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='red' size={30} />
        <Text>
          Loading...
        </Text>
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={emerList}
          // keyExtractor={({item})=>item.EMER_CODE}
          renderItem={({ item }) => {
            let image = iconBox(item.EMER_DESC);
            console.log('post + image==>', image, item.EMER_DESC);
            return (
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  myNavigation.navigate("DoctorsContacts", {
                    data: item,
                    pageName: item.EMER_DESC == "Doctor" ? "Doctor" : (item.EMER_DESC == "Vigilance" ? "Vigilance" : (item.EMER_DESC == "Fire Control" ? "Fire Control" : (item.EMER_DESC == "Electricity" ? "Electricity" : "POSH Cell")))
                  })
                }}>
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
                      source={{ uri: image }}
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                </View>
                <View style={styles.item}>
                  <Text>{item.EMER_DESC}</Text>
                  <Feather name="corner-up-right" size={20} />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  );
};

// ? (<Text>Vigilance</Text>)
// : (contact.EMER_DESC === 'Fire Control') ? (<Text>Fire Control</Text>)
// :(contact.EMER_DESC ==='Electricity') ? (<Text>Electricity</Text>)
// :(contact.EMER_DESC==="POSH Cell") ? (<Text>POSH Cell</Text>):null
/* <TouchableOpacity
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
</TouchableOpacity> */

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
