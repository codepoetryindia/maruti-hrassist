//import liraries
import React, {Component, useEffect, useState,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,SafeAreaView, ActivityIndicator,Linking} from 'react-native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
const NearByHospital = () => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [hosLink,setHosLink] = useState('');
  const GetHospitalLinkApi = () => {
    let token = AppUserData.token
    let UserId = AppUserData.data
    setLoader(true);
    ApiService.PostMethode('/GetHospitalLink', UserId, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value[0].LINK
        console.log("setHospitallList", ApiValue);
        setHosLink(ApiValue)
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
    GetHospitalLinkApi()
  }, [])
  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    ) :(
      <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={{fontSize:16, fontWeight:'bold'}}>
          Near By Panel Hospital
        </Text>
        <TouchableOpacity
         onPress={() => {
          console.log("hoslink",hosLink);
         Linking.openURL(hosLink)
          }}
           style={styles.circle}>
          <Text style={{textAlign:'center',}}>Click here to</Text>
          <Text  style={{textAlign:'center',}}>Search</Text>
        </TouchableOpacity>
        <Image source={require('../.././assets/Images/pin.png')} style={{width:40,height:40,marginVertical:8}}/>
        <Text>Use Any web browser/Google Maps for better experience</Text>
       <View style={{width:'100%',paddingHorizontal:10, flexDirection:'row',justifyContent:'space-between',marginVertical:8}}>
       <Image source={require('../.././assets/Images/medicine.png')} style={{width:30,height:30,marginLeft:-8}}/>
        <Text>Symbols in the maps are Geo-location of our panel Hospital</Text>
       </View>
      </View>
    </SafeAreaView>)
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  box: {
    padding: 10,
    width:'90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth:0.2,
    borderRadius:10,
    borderColor:'#fff'
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderColor: '#2757C3',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginVertical: 10,
  },
});

//make this component available to the app
export default NearByHospital;
