//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';



const LeaveBalance = ({ navigation }) => {


  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [Attendance, setAttendance] = useState('')
  const [initialLeave, setItialLeave] = useState([])

  const GetInitialLeave = () => {
    let userId= AppUserData.data.userId
     let token = AppUserData.token;
    let apiData = { 
      "UserName" : userId
     };
    setLoader(true);
    ApiService.PostMethode('/GetInitialLeave  ', apiData, token)
      .then(result => {
        console.log("APiresult GetInitialLeave", result);
        setLoader(false);
        ApiResult=result.Value.Table1
        setItialLeave(ApiResult)
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
  }
  useEffect(() => {
    GetInitialLeave();
  }, [])
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <LinearGradient
        colors={['#00B4DB', '#0083B0']}
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
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
          Leave Details
          </Text>
        </View>
      </LinearGradient>

      <FlatList
        data={initialLeave}
        keyExtractor={({ item, index }) => index}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.canteen}>
              <Text>{item.TYPE}</Text>
              <Text>{item.LEV_BAL}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
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
  canteen: {
    top: 10,
    marginVertical: 10,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    borderRadius: 5
  },
});

// //make this component available to the app
export default LeaveBalance;
