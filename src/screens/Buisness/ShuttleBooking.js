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
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useNavigation } from '@react-navigation/native';


// create a component
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

  const GetSeatsAvailabilityApi = () => {
    let payloadDate = moment(date).format("DD-MMMM-YYYY").toUpperCase()
    let token = AppUserData.token
    let apiData = {
      BKAVID: 'MAPP104',
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
    GetShuttleRoutesApi();
  }, [date])



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
                        onPress={() => navigation.navigate("SeatBook")}
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

// second Route

export const PastBooking = () => {
  const [fromDate] = useState(new Date());
  const [toDate] = useState(new Date());
  const [firstDate, setFirstDate] = useState('')
  const [secondDate, setSecondDate] = useState('')
  const [open, setOpen] = useState(false);
  const [second, setSecond] = useState(false);
  const [textinputDate, setTextinputDate] = useState('');
  const [textinputSecondDate, setTextinputSecondDate] = useState('');
  const [data, setData] = useState([])
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [bookingDetails, setBookingDetails] = useState([])

  const GetShutlPastFutrReportApi = (data) => {
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/GetShuttlePastFutureReport', data, token)
      .then(result => {
        console.log("GetShutlPastFutrReportApi", result);
        setLoader(false);
        let ApiValue = result.Value
        setData(ApiValue)
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
  const BookingDetailApi = (data) => {
    let token = AppUserData.token
    let apiData = {
      BKDTID: data,
    }
    console.log("apiPayload", apiData)
    setLoader(true);
    ApiService.PostMethode('/BookingDetail', apiData, token)
      .then(result => {
        console.log("BookingDetail", result);
        setLoader(false);
        let ApiValue = result.Value
        setBookingDetails(ApiValue)
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
  const ShuttleEligibilityApi = (data) => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apiData = {
      UserName: userId,
    }
    console.log("apiPayload", apiData)
    setLoader(true);
    ApiService.PostMethode('/ShuttleEligibility', apiData, token)
      .then(result => {
        console.log("ShuttleEligibility", result);
        setLoader(false);
        let ApiResult = result.Result
        alert(ApiResult);
        setModalVisible(false)

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
    handleSubmit()

  }, [])

  const handleSubmit = () => {
    let userId = AppUserData.data.userId
    let payloadDate = moment(firstDate).format("DD-MMMM-YYYY").toUpperCase()
    let payloadDateSecond = moment(secondDate).format("DD-MMMM-YYYY").toUpperCase()
    let apiData = {
      "BKDTEmplID": "297194",
      "BKDTFlag": "P",
      "FromDate": "18-MAR-2021",
      "ToDate": "18-MAR-2022"
    }
    // let apiData = {
    //   BKDTEmplID: userId,
    //   BKDTFlag: "P",
    //   FromDate: firstDate !== '' ? payloadDate : '',
    //   ToDate: secondDate !== '' ? payloadDateSecond : '',
    // }
    console.log("payload", apiData);

    if (firstDate && secondDate == null) {

      alert("please select date")
      return
    }
    else {
      GetShutlPastFutrReportApi(apiData);
    }
  }
  return (
    <View
      style={{ flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5 }}>
      <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: 'bold' }}>
        Select Date
      </Text>

      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: '#fff',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
          marginVertical: 8,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 8
        }}>
        <DatePicker
          modal
          open={open}
          date={fromDate}
          mode="date"
          onConfirm={fromDate => {
            setOpen(false);
            setFirstDate(fromDate);
            let format = moment(fromDate).format('MMM Do YYYY');
            setTextinputDate(format);
            console.log(setTextinputDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '49%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="From"
            style={{ color: '#000', letterSpacing: 1 }}
            editable={false}
            paddingHorizontal={14}
            value={textinputDate}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={30} color={'#6ef7ff'} />
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={second}
          date={toDate}
          mode="date"
          onConfirm={toDate => {
            setSecond(false);
            setSecondDate(toDate);
            let formatSecond = moment(toDate).format('MMM Do YYYY');
            setTextinputSecondDate(formatSecond);
            console.log(setTextinputSecondDate);
          }}
          onCancel={() => {
            setSecond(false);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{ color: '#000', letterSpacing: 1 }}
            placeholder="To"
            editable={false}
            paddingHorizontal={14}
            value={textinputSecondDate}
          />
          <TouchableOpacity onPress={() => setSecond(true)}>
            <Ionicons name="calendar-outline" size={30} color={'#6ef7ff'} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => {
        handleSubmit();
      }}>
        {loader == true ? (
          <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={{ color: '#fff' }}
          />
        ) : null}
        <LinearGradient
          style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
          colors={['#4174D0', '#6ef7ff']}>

          <Text style={{ color: '#fff', fontSize: 16 }}>UPDATE</Text>
        </LinearGradient>
      </TouchableOpacity>

      {data.length > 0 ? (
        <View
          style={{
            width: '110%',
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
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#2757C3'
            }}>
            <Text>Date</Text>
            <Text>Emp ID</Text>
            <Text>Booking ID</Text>
            <Text>Source</Text>
            <Text>Destination</Text>
            <Text>Status</Text>
          </View>
          <View>
            {
              data.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      BookingDetailApi(item.BKDT_ID)
                    }} style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#2757C3'
                    }}>
                    <Text style={{ fontSize: 12 }}>{moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>
                    <Text style={{ fontSize: 12 }}>{item.BKDT_EMPL_ID}</Text>
                    <Text style={{ fontSize: 12 }}>{item.BKDT_ID}</Text>
                    <Text style={{ fontSize: 12 }}>{item.ROUT_SOURCE}</Text>
                    <Text style={{ fontSize: 12 }}>{item.ROUT_DESTINATION}</Text>
                    <Text style={{ fontSize: 12 }}>{item.BKDT_STATUS_FLAG}</Text>
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
                <Text style={{ fontSize: 20 }}>Booking Detail</Text>

                {bookingDetails.map((item) => {
                  return (
                    <View style={{ width: '90%', marginVertical: 15 }}>
                      <Text>Booking Id : {item.BKDT_ID} </Text>
                      <Text>Registration No : {item.SHTL_REGISTRATION_NO} </Text>
                      <Text>Booking For : {item.BKDT_EMPL_ID} </Text>
                      <Text>Name : {item.EMPL_NAME} </Text>
                      <Text>Date : {moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>
                      <Text>Source : {item.ROUT_SOURCE} </Text>
                      <Text>Destination : {item.EMPL_NAME} </Text>
                      <Text>Time : {item.ROUT_START_TIME} </Text>
                      <Text>Status : {item.BKDT_STATUS_FLAG} </Text>
                    </View>
                  )
                })}
                <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false)
                    }}>
                    {loader == true ? (
                      <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                      />
                    ) : null}
                    <LinearGradient
                      style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                      colors={['#4174D0', '#6ef7ff']}>

                      <Text style={{ color: '#fff', fontSize: 16 }}>OK</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}
                    onPress={() => {
                      ShuttleEligibilityApi()
                    }}>
                    {loader == true ? (
                      <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                      />
                    ) : null}
                    <LinearGradient
                      style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                      colors={['#4174D0', '#6ef7ff']}>

                      <Text style={{ color: '#fff', fontSize: 16 }}>FEEDBACK</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          {loader == true ? <Text>We are Loading your data</Text> : <Text>not found</Text>}
        </View>
      )}

    </View>
  );
};
// Third Route
const FutureBooking = () => {
  return (
    <View
      style={{ flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5 }}>
      <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: 'bold' }}>
        No dataFOund
      </Text>
    </View>
  );
};

const ShuttleBooking = ({ navigation }) => {


  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [horizental, setHorizental] = useState(false);
  const [routes] = React.useState([
    { key: 'first', title: 'book' },
    { key: 'second', title: 'pastBooking' },
    { key: 'third', title: 'futureBooking' },
  ]);

  const renderScene = SceneMap({
    first: Book,
    second: PastBooking,
    third: FutureBooking,
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4174D0', '#6ef7ff']}
        style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row' }}>
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
            Shuttle Booking
          </Text>
          <TouchableOpacity
            style={{ marginLeft: '30%' }}
            onPress={() => {
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              style={{ marginLeft: '35%' }}
              name="ellipsis-vertical"
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
          {horizental == true ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Guidelines')}
              style={{
                padding: 10,
                backgroundColor: '#fff',
                position: 'absolute',
                top: 20,
                right: 30,
                zIndex: 1000,
                borderRadius: 8
              }}>
              <Text>Guidelines</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>
      <TabView
        style={{ fontSize: 10 }}
        renderTabBar={props => {
          return (
            <LinearGradient
              colors={['#6ef7fa', '#5dc0e8']}
              style={{ marginTop: -1, zIndex: -1 }}>
              <TabBar
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ fontSize: 13, color: '#fff' }}>
                    {route.title}
                  </Text>
                )}
                {...props}
                style={{ backgroundColor: 'transparent', elevation: 0 }}
              />
            </LinearGradient>
          );
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
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
});

//make this component available to the app
export default ShuttleBooking;
