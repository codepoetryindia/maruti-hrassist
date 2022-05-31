//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
const EmergencyContacts = ({ navigation }) => {
  const myNavigation = useNavigation();

  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [emerList, setEmerList] = useState();
  // const [contact, setContact] = useState();
  // const [modal, setModal] = useState(false)

  const GetEmerMain = () => {
    let apiData = {}
    let token = AppUserData.token
    // console.log(apiData)
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
        return require('../../assets/Images/doctorr.png')
        break;
      case "Vigilance":
        return require('../../assets/Images/security-cameraa.png')
        break;
      case "Fire Control":
        return require('../../assets/Images/fire-extinguisher.png')
        break;
      case "Electricity":
        return require('../../assets/Images/electrical-energy.png')
        break;
      case "POSH Cell":
        return require('../../assets/Images/user-interface.png')
        break;
      default:
        return require('../../assets/Images/user-interface.png')
        break;
    }
  }


  return (

    <SafeAreaView style={styles.container}>
      {loader == true ? (
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}
      <FlatList
        data={emerList}
        ListEmptyComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/Images/dataNotFound.png')}
                style={{ width: 300, height: 300, resizeMode: 'contain', marginLeft: -50 }} />
              <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
            </View>
          )
        }}
        renderItem={({ item }) => {
          let image = iconBox(item.EMER_DESC);
          // console.log('post + image==>', image, item.EMER_DESC);
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
                    borderColor: '#6ef7ff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}>
                  <Image
                    source={image}
                    style={{ width: 45, height: 45 }}
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
    </SafeAreaView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spinnerTextStyle: {
    color: '#FFF'
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
