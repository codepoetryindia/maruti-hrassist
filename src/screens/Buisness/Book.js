//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
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
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import Button from '../../components/reusable/Button';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';


const Book = () => {
  const navigation = useNavigation();
  const { authContext, AppUserData } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [book, setbook] = useState([]);
  const [loader, setLoader] = useState(false);
  const [ModalLoader, setModalLoader] = useState(false);
  const [seatAvility, setSeatAvility] = useState('')
  const [modalVisible, setModalVisible] = useState(false)


  // const [loader, setLoader] = useState(false);
  // const [refresh, setrefresh] = useState(false);

  const stopLoader = () => {
    try {
      setModalLoader(false)
    } catch (error) {
      console.log(error)
    }
  }



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
    book.map((item) => {
      return BKAVID.push(item.SHTL_ROUT_MAPP_ID)
    })
  }

  const GetSeatsAvailabilityApi = () => {
    setModalVisible(true);
    setModalLoader(true);
    let payloadDate = moment(date).format("DD-MMMM-YYYY").toUpperCase()
    let token = AppUserData.token
    let apiData = {
      BKAVID: BKAVID[0],
      BKAVStartDate: payloadDate,
    }
    console.log("apiPayload", apiData)
    ApiService.PostMethode('/GetSeatsAvailability', apiData, token)
      .then(result => {
        stopLoader()
        let ApiValue = result.Result
        setSeatAvility(ApiValue)
        console.log("GetSeatsAvailabilityApi", ApiValue);
      })
      .catch(error => {
        setModalVisible(false);
        stopLoader();
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

  if (loader) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
        <LoadingScreen />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ flex: 1 }}>
        <Text style={{ paddingVertical: 5, }} Bold>
          Select Date
        </Text>
        <TouchableOpacity
          style={styles.SelectInputContainer}>
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
          <Text style={{ color: GlobalColor.Text }}>{moment(date).format("DD-MMMM-YYYY").toUpperCase()}</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={30} color={GlobalColor.PrimaryGradient} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{ paddingVertical: 10, }}>
          <Text Bold>Available Shuttle Routes</Text>
        </View>
        {book.length > 0 ? (
          <View
            style={styles.ListContainer}>
            <View
              style={styles.ListContainerCards}>
              <Text Bold>Registration No.</Text>
              <Text Bold>Source</Text>
              <Text Bold>Destination</Text>
              <Text Bold>Time</Text>
            </View>
            <View>
              {
                book.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item.SHTL_REGISTRATION_NO}
                      onPress={() => {
                        GetSeatsAvailabilityApi()
                        // setModalVisible(true)
                      }} style={styles.ListContant}>
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
                style={styles.ModalContainer}>
                <View
                  style={styles.ModalContant}>
                  {
                    ModalLoader ? (
                      <View style={{ width: '100%', minHeight: 150 }}>
                        <LoadingScreen />
                      </View>
                    ) : (
                      <View style={{ width: '100%' }}>
                        <Text Bold style={{ fontSize: GlobalFontSize.H4, textAlign: 'left', }}>Available Seats in Shuttle : {seatAvility}</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 10, alignSelf: "center" }}>
                          <View
                            style={{ minWidth: 150 }}>
                            <Button title="Close" onPress={() => {
                              setModalVisible(false)
                            }} />
                          </View>
                          <View
                            style={{ minWidth: 150, marginLeft: 10 }}>
                            <Button title="Book Now" onPress={() => {
                              setModalVisible(false)
                              navigation.navigate("SeatBook")
                            }} />
                          </View>
                        </View>
                      </View>
                    )
                  }
                </View>
              </Pressable>
            </Modal>
          </View>
        ) : <ListEmptyComponent title="No Shuttle Routes Found" enableRefresh={false} subtitle="Please change the date & retry"></ListEmptyComponent>}
      </View>
    </SafeAreaView>
  );
};
export default Book;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: GlobalColor.PrimaryLight
  },

  SelectInputContainer: {
    width: '100%',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 0,
    borderColor: GlobalColor.PrimaryGradient,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GlobalColor.White,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
  },

  ListContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: GlobalColor.ShadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 0,
    paddingBottom: 25
  },
  ListContainerCards: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1.50,
    borderBottomColor: GlobalColor.PrimaryGradient
  },
  ListContant: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColor.PrimaryGradient
  },
  ModalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    width: "100%",
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  ModalContant: {
    backgroundColor: GlobalColor.White,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    justifyContent: 'center',
    width: "100%"
  }


})