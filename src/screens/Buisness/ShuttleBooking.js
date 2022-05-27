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
  Modal
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

// create a component
const Book = () => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [book, setbook] = useState([]);
  const [loader, setLoader] = useState(false)
  const[seatAvility,setSeatAvility] = useState('')
  const [modalVisible,setModalVisible] = useState(false)

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
        let ApiValue = result
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

      {loader == true ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                console.log("new", date);
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


          <Text style={{ paddingVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
            {book.length < 0 ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>No Available Shuttle Routes Sorry for intruption</Text>
            </View>) : " Available Shuttle Routes"}
          </Text>
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
                          if(seatAvility!==''){
                            alert("Available seat " ,seatAvility)
                          }
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


  const GetShutlPastFutrReportApi = (data) => {
    let token = AppUserData.token
    // let userId = AppUserData.data.userId
    // let apiData = {
    //   BKDTEmplID: userId,
    //   BKDTFlag: "P",
    //   FromDate: firstDate !== '' ? payloadDate : '',
    //   ToDate: secondDate !== '' ? payloadDateSecond : '',
    // }
    // console.log("apiPayload", apiData)
    setLoader(true);
    ApiService.PostMethode('/GetShutlPastFutrReport', data, token)
      .then(result => {
        console.log("GetShutlPastFutrReportApi", result);
        setLoader(false);
        let ApiValue = result.Value
        setData(ApiValue)
        console.log("apiResult", ApiValue);
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


  // useEffect(() => {
  //   handleSubmit()

  // }, [])

  const handleSubmit = () => {
    let userId = AppUserData.data.userId
    let payloadDate = moment(firstDate).format("DD-MMMM-YYYY").toUpperCase()
    let payloadDateSecond = moment(secondDate).format("DD-MMMM-YYYY").toUpperCase()
    let apiData = {
      BKDTEmplID: userId,
      BKDTFlag: "P",
      FromDate: firstDate !== '' ? payloadDate : '',
      ToDate: secondDate !== '' ? payloadDateSecond : '',
    }
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
        <LinearGradient
          style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
          colors={['#4174D0', '#6ef7ff']}>

          <Text style={{ color: '#fff', fontSize: 16 }}>UPDATE</Text>
        </LinearGradient>
      </TouchableOpacity>

      {
        data.length < 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
            <Text>not found</Text>
          </View>
        ) : null
      }

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
