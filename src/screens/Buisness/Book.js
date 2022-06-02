//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const Book = () => {
    const navigation = useNavigation();
    const { authContext, AppUserData } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [book, setbook] = useState([]);
    const [loader, setLoader] = useState(false)
    const [seatAvility, setSeatAvility] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
  
  
    const GetShuttleRoutesApi = () => {
      let payloadDate = moment(date).format("DD-MMMM-YYYY").toUpperCase()
      let apiData = { TravelDate: payloadDate }
      let token = AppUserData.token
      console.log(apiData)
      setLoader(true);
      ApiService.PostMethode('/GetShuttleRoutes', apiData, token)
        .then(result => {
          setLoader(false);
          let ApiValue = result.Value
          console.log("book", ApiValue);
          setbook(ApiValue)
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
  let BKAVID = []
  {
    book.map((item)=> {
        return BKAVID.push(item.SHTL_ROUT_MAPP_ID)
    })
  }
  console.log(BKAVID[0])
    const GetSeatsAvailabilityApi = () => {
      let payloadDate = moment(date).format("DD-MMMM-YYYY").toUpperCase()
      let token = AppUserData.token
      let apiData = {
        BKAVID:BKAVID[0],
        BKAVStartDate: payloadDate,
      }
      console.log("apiPayload", apiData)
      setLoader(true);
      ApiService.PostMethode('/GetSeatsAvailability', apiData, token)
        .then(result => {
          setLoader(false);
          let ApiValue = result.Result
          setSeatAvility(ApiValue)
          console.log("GetSeatsAvailabilityApi", ApiValue);
          setModalVisible(true)
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
      const unsubscribe = GetShuttleRoutesApi();
      return () => unsubscribe;
    }, [date])
  )
    return (
      <SafeAreaView
        style={{ flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5 }}>
        {loader == true ? (
          <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
          />
        ) : null}
  
        {loader == true ? (<View style={{ flex: 1, justifyContent: 'center', marginTop: '40%', marginLeft: '20%' }}>
          <Text>We are fetching your data Please wait</Text>
        </View>) : (
          <View>
            <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: 'bold' }}>
              Select Date
            </Text>
            <TouchableOpacity
              style={{
                width: '100%',
                borderRadius: 8,
                padding: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#2757C3',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date)
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Text style={{ color: '#000' }}>{moment(date).format("DD-MMMM-YYYY").toUpperCase()}</Text>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Ionicons name="calendar-outline" size={30} color={'#5dc0e9'} />
              </TouchableOpacity>
            </TouchableOpacity>
  
            <View style={{ paddingVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
              {book.length > 0 ? <Text>Available Shuttle Routes</Text> : ((<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Available Shuttle Routes Sorry for intruption</Text>
              </View>))}
            </View>
            {loader == true ? (
              <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={{ color: '#fff' }}
              />
            ) : null}
  
            {book.length > 0 ? (
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 1.84,
                  elevation: 5,
                  borderRadius: 8,
                  paddingBottom: 25
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}>
                  <Text>Registration No.</Text>
                  <Text>source</Text>
                  <Text>Destination</Text>
                  <Text>Time</Text>
                </View>
                <View>
                  {
                    book.map((item) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            GetSeatsAvailabilityApi()
                            
                            // setModalVisible(true)
                          }} style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#2757C3'
                          }}>
                          <Text>{item.SHTL_REGISTRATION_NO}</Text>
                          <Text>{item.ROUT_SOURCE}</Text>
                          <Text>{item.ROUT_DESTINATION}</Text>
                          <Text>{item.ROUT_START_TIME}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
  
                </View>
  
                {/* SeatAvility Modal */}
  
                <Modal transparent={true} visible={modalVisible}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(false)
                    }}
                    style={{
                      backgroundColor: '#000000aa',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 15,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>Available Seats in Shuttle : {seatAvility}</Text>
                      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TouchableOpacity
                          style={{ padding: 10, backgroundColor: '#2757C3', marginHorizontal: 10, borderRadius: 8 }} onPress={() => {
                            setModalVisible(false)
                          }}>
                          <Text style={{ color: '#fff' }}>
                            Ok
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(false)
                            navigation.navigate("SeatBook")
                        }}
                          style={{ padding: 10, backgroundColor: '#2757C3', marginLeft: 30, borderRadius: 8 }}>
                          <Text style={{ color: '#fff' }}>BOOK NOW</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Pressable>
                </Modal>
              </View>
            ) : null}
  
          </View>
        )}
      </SafeAreaView>
    );
  };
  export default Book;