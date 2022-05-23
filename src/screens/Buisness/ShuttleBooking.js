//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';

// create a component
const Book = () => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [book,setbook] = useState();
  const [loader, setLoader] = useState(false)

  const GetShuttleRoutesApi = () => {
    let payloadDate = moment(date).format("DD-MMMM-YYYY").toUpperCase()
    let apiData = {  TravelDate:payloadDate  }
    let token = AppUserData.token
    console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetShuttleRoutes', apiData, token)
      .then(result => {
        console.log("book", result);
        setLoader(false);
        let ApiValue = result.Value
        setbook(ApiValue)
        console.log("book",book);
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
    let payloadDate = moment(fromDate).format("DD-MMMM-YYYY").toUpperCase()
    let payloadDateSecond = moment(toDate).format("DD-MMMM-YYYY").toUpperCase()
    let token = AppUserData.token
    let userId = AppUserData.data
    let apiData = {
      BKAVID :userId,
      BKAVStartDate  : "P",
      FromDate : payloadDate,
      ToDate : payloadDateSecond,
      }
    console.log("apiPayload",apiData)
    setLoader(true);
    ApiService.PostMethode('/GetSeatsAvailability', apiData, token)
      .then(result => {
        console.log("APiresult", result);
        setLoader(false);
        let ApiValue = result.Value
        setApiResult(ApiValue)
        console.log("apiResult",apiResult);
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
}, [])

  return (
    <View
      style={{ flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5 }}>
      <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: 'bold' }}>
        Select Date
      </Text>
      <TouchableOpacity
        style={{
          width: '100%',
          borderRadius:8,
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
        Available Shuttle Routes
      </Text>
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
          borderRadius:8,
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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text>HR63552</Text>
          <Text>RHTK</Text>
          <Text>GGN</Text>
          <Text>04:55</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderTopWidth: 0.2,
            borderTopColor: '#80406A',
          }}>
          <Text>HR6354452</Text>
          <Text>RHTK</Text>
          <Text>GGN</Text>
          <Text>05:55</Text>
        </View>
      </View>
    </View>
  );
};

// second Route

export const PastBooking = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [second, setSecond] = useState(false);
  const [textinputDate, setTextinputDate] = useState('');
  const [textinputSecondDate, setTextinputSecondDate] = useState('');
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)


  const GetShutlPastFutrReportApi = () => {
    let payloadDate = moment(fromDate).format("DD-MMMM-YYYY").toUpperCase()
    let payloadDateSecond = moment(toDate).format("DD-MMMM-YYYY").toUpperCase()
    let token = AppUserData.token
    let userId = AppUserData.data
    let apiData = {
      BKDTEmplID :userId,
      BKDTFlag  : "P",
      FromDate : payloadDate,
      ToDate : payloadDateSecond,
      }
    console.log("apiPayload",apiData)
    setLoader(true);
    ApiService.PostMethode('/GetShutlPastFutrReport', apiData, token)
      .then(result => {
        console.log("APiresult", result);
        setLoader(false);
        let ApiValue = result.Value
        setApiResult(ApiValue)
        console.log("apiResult",apiResult);
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
  GetShutlPastFutrReportApi();
}, [])
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
              borderRadius:8
            }}>
            <DatePicker
              modal
              open={open}
              date={fromDate}
              mode="date"
              onConfirm={fromDate => {
                setOpen(false);
                setFromDate(fromDate);
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
                style={{color: '#000', letterSpacing: 1}}
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
                setToDate(toDate);
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
                style={{color: '#000', letterSpacing: 1}}
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
            colors={[ '#6ef7fa','#5dc0e8']}
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
