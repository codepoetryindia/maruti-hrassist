
//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
const HosLocation = ({ navigation }) => {

  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [hospitalLoc, setHospitalLoc] = useState([]);

  const GetHospLocnApi = () => {
    let token = AppUserData.token
    let apidata = {}
    setLoader(true);
    ApiService.PostMethode('/GetHospLocn', apidata, token)
      .then(result => {
        setLoader(false);
        // console.log("Apiresult",result);
        let ApiValue = result.Value
        console.log("setHospitalLoc", ApiValue);
        setHospitalLoc(ApiValue)
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
      const unsubscribe = GetHospLocnApi();
      return () => unsubscribe;
    }, [])
  )

  return (

      <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
        {loader == true ? (
                <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
              ):null }
              {loader == true ? (<View style={{ flex: 1, justifyContent: 'center', marginTop: '40%', marginLeft: '20%' }}>
        <Text>We are fetching your data Please wait</Text>
      </View>) : (

    <View>
          <LinearGradient
          colors={['#4174D0', '#6ef7ff']}
          style={styles.gradient}>
          <View style={styles.container}>
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
                onPress={() => navigation.goBack()}
              />
            </View>

            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                letterSpacing: 1,
                marginLeft: 30,
              }}>
              Select Area
            </Text>
          </View>
        </LinearGradient>

        <View>
          <FlatList
            data={hospitalLoc}
            ListEmptyComponent={() => {
              return (
                <View style={{ width:'100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../assets/Images/dataNotFound.png')}
                    style={{ width: 300, height: 300, resizeMode: 'contain',}} />
                  <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                </View>
              )
            }}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EmergencyHospital", {
                      selectedLoc: item.LOCN_DESC,
                    })
                  }}
                  style={{ width: '100%', borderBottomWidth: 0.5, padding: 15 }}>
                  <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>{item.LOCN_DESC}</Text>
                </TouchableOpacity>
              )
            }} />
        </View>
    </View>
      )}
      </SafeAreaView>
    

  );
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  searchSection: {
    top: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '77%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

// //make this component available to the app
export default HosLocation;