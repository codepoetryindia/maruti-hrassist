//import liraries
import React, {Component, useEffect, useState,useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Image,SafeAreaView, ActivityIndicator,Linking} from 'react-native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import Text from '../../components/reusable/Text';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';

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

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = GetHospitalLinkApi();
      return () => unsubscribe;
    }, [])
  )


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
          <Text style={{fontSize:GlobalFontSize.H4, color:GlobalColor.Primary}} Bold>
            Near By Panel Hospital
          </Text>
          <TouchableOpacity
            onPress={() => {
            if(hosLink==''){
              alert("URL Not Found")
              return
            }
            else{
              console.log("hoslink",hosLink);
              Linking.openURL(hosLink)
            }
            }}
            style={styles.circle}>
            <Text   style={{textAlign:'center',}}>Click here to</Text>
            <Text   style={{textAlign:'center',}}>Search</Text>
          </TouchableOpacity>

        {/* <Image source={require('../.././assets/Images/pin.png')} style={{width:40,height:40,marginVertical:8}}/> */}
        <Text Bold>Use Any web browser/Google Maps for better experience</Text>
        <View style={{paddingHorizontal:10, flexDirection:'row',justifyContent:'space-between',marginVertical:8}}>
          {/* <Image source={require('../.././assets/Images/medicine.png')} style={{width:40,height:40, marginRight:15}}/> */}
          <Text Bold>Symbols in the maps are Geo-location of our panel Hospital</Text>
        </View>
        </View>
    </SafeAreaView>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,
    paddingHorizontal:10,
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  box: {
    padding: 10,
    paddingVertical:20,
    width:'100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 5,
    borderWidth:0.2,
    borderRadius:10,
    borderColor:GlobalColor.Secondary
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 5,
    borderColor: GlobalColor.Secondary,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginVertical: 20,
  },
});

//make this component available to the app
export default NearByHospital;
