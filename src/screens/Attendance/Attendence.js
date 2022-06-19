//import liraries
import React, {useEffect, useState,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import { date } from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';

// import * as Animatable from 'react-native-animatable';
// create a component
const Attendance = ({navigation}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const[toDate,setToDate] = useState (new Date());
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [MarkAttandance, setMarkAttandance] = useState(0);
  const [loader, setLoader] = useState(false)
  const [MapLisenceKey, setMapLisenceKey] = useState("");
  const [horizental, setHorizental] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  const { authContext, AppUserData } = useContext(AuthContext);

  // To Hide or show based on getGpsAvailable
  const [ShowAttandanceTabs, setShowAttandanceTabs] = useState(false);
  const [RawPunches, setRawPunches] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = checkGpsAvailable();
      return () => unsubscribe;
    }, [])
  );

    const checkGpsAvailable = () =>{
      let apiData = { "UserName":AppUserData.data.userId };
      // AppUserData.data.userId 222852
      let token = AppUserData.token;
      setLoader(true);
      ApiService.PostMethode('/GetValidGPSUser', apiData, token)
        .then(result => {
          console.log("APiresult GetValidGPSUser", result);
          setLoader(false);
          if(result.Result == "Y"){
            setShowAttandanceTabs(true);
            setMarkAttandance(0);
            getUserCurrentLocation();
            getLocationLisenceKey();
          }else{
            setShowAttandanceTabs(false);
            setMarkAttandance(1);
            GetRawPunch();
          }
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


    const getUserCurrentLocation = () =>{
      Geolocation.getCurrentPosition(position => {
        console.log('position', position);
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }




    const GetRawPunch = () =>{
      let apiData = { 
        "FromDate" : moment(fromDate).format('DD-MMM-YYYY'),
        "ToDate" :  moment(toDate).format('DD-MMM-YYYY'),
          "StaffNo" : AppUserData.data.userId 
      };

      

      // AppUserData.data.userId 


      console.log(apiData);
      // AppUserData.data.userId
      let token = AppUserData.token;
      setLoader(true);
      ApiService.PostMethode('/GetRawPunch', apiData, token)
        .then(result => {
          console.log("APiresult GetRawPunch", result);
          setLoader(false);
          if(result.Value){
            setRawPunches(result.Value);
          }
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


    const renderItem =({item})=>{
      return(
        <View style={styles.renderitem}>
            <Text>{item['Staff No']}</Text>
            <Text>{item.Date}</Text>
            <Text>{item['Moble/Machine']}</Text>
        </View>
      )
    }



  const handleMarkAttandance = index => {
    setMarkAttandance(index);
  };


  const handelDate = () => {
   if(fromDate >toDate)
   {
    alert('from date should be less then to date');
   }else {
    GetRawPunch();
   }
  }



  const FinancialYear = ['2021', '2022', '1999'];
  const [location, setLocation] = useState('');

  const getMobDevice = () => {
    let apiData = { "UserName":AppUserData.data.userId };
        setLoader(true);

      if(Platform.OS == 'android'){
          // AppUserData.data.userId 222852
        let token = AppUserData.token;
        ApiService.PostMethode('/GetMobDevice', apiData, token)
          .then(result => {
            console.log("APiresult GetMobDevice", result);
            setLoader(false);
            if(result.Value.length > 0){
              // DEVC_ID: "1"
              // DEVC_NAME: "ONEPLUS A3003, Redmi Note 4"
              let model = result.Value[0].DEVC_NAME;
              let modelfrmplug = Platform.Model;

              if (model.includes(modelfrmplug)) {
                console.log("inside");
                let notSupported = true;
                Toast.show('Something Went Wrong');
              }else{
                Toast.show('Worked');
              }
            }
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

        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(location.latitude) + ',' + parseFloat(location.longitude) + '&key=' + MapLisenceKey

        ApiService.getRawurl(url)
          .then(result => {
            console.log("APiresult getRawurl", result);
            setLoader(false);
            let location = result.results[0].formatted_address;
            setUserLocation(location)
            let date = "13-11-1993";
            CallAPIToStoreAddress(location, date, location.latitude, location.longitude);

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


  const CallAPIToStoreAddress= (location, dati, lat, lon)=> {
    let token = AppUserData.token
    let EmplID = AppUserData.data
    let apiData = {
        EmplID: EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/SubmitPunchRO', apiData, token)
        .then(result => {
            setLoader(false);
            console.log('ApiResult SubmitPunchRO', result);
            alert(result.Result)
            // let responseData = result.Value[0].SHIS_YYMM_CODE
            // console.log('GetMonth', responseData)
            // setMonth(responseData)
           
        })
        .catch(error => {
            setLoader(false);
            // console.log('Error occurred==>', error);
            if (error.response) {
                if (error.response.status == 401) {
                    console.log('error from api', error.response);
                }
                Toast.show(error.response.data.title);
            } else if (error) {
                Toast.show('Network Error');
            } else {
                Toast.show('Something Went Wrong');
            }
        });
  }

  const getLocationLisenceKey = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data
    let apiData = {
        EmplID: EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/GetMapsLicenseKey', {}, token)
        .then(result => {
            setLoader(false);
            console.log('ApiResult GetMapsLicenseKey', result);
            if(result.Result){
              setMapLisenceKey(result.Result);
            }           
        })
        .catch(error => {
            setLoader(false);
            // console.log('Error occurred==>', error);
            if (error.response) {
                if (error.response.status == 401) {
                    console.log('error from api', error.response);
                }
                Toast.show(error.response.data.title);
            } else if (error) {
                Toast.show('Network Error');
            } else {
                Toast.show('Something Went Wrong');
            }
        });
};











  return (
    <View style={styles.container}>
          {
            loader ? (
              <Spinner
              visible={loader}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            ): null
          }
          {/* <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={{color:'#fff'}}
            overlayColor={'rgba(0, 0, 0, 0.50)'}
          /> */}
        <TouchableOpacity
            style={{alignSelf:'flex-end'}}
            onPress={() => {
             
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              name="ellipsis-vertical-circle"
              size={25}
              color={'#6ef7ff'}
            />
          </TouchableOpacity>
      <View style={{width: '100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      
      {horizental == true ? (
            <View
              style={{
                padding: 5,
                backgroundColor: '#6ef7ff',
                position: 'absolute',
               bottom:30,
                right: 50,
                zIndex:1000,
                borderRadius:8
              }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('AttendancePer')
                }}>
                  
              <Text>Attendance Percentage</Text>
                </TouchableOpacity>
            </View>
          ) : null}

          {
            ShowAttandanceTabs ? (
              <SegmentedControlTab
              borderRadius={8}
             values={['Mark Attendance', 'View Report']}
             selectedIndex={MarkAttandance}
             onTabPress={index => {
               handleMarkAttandance(index);
             }}
             tabsContainerStyle={{ width:'100%',alignSelf:'center'}}
             tabStyle={styles.tabStyle}
             tabTextStyle={styles.tabTextStyle}
             activeTabStyle={styles.activeTabStyle}
             activeTabTextStyle={styles.activeTabTextStyle}
           />
            ):(
              <Text>View Report</Text>
            )
          }
      </View>

      <View>
        {MarkAttandance == 0 ? (
          <View>
            <TouchableOpacity style={styles.content}>
            <Text>Live Location
                <Icon name='map-marker-radius'size={25} color={'green'}/>  
                </Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  getMobDevice();
                }}>
                <Text>Punch</Text>
              </TouchableOpacity>
              <Text style={{textAlign:'center'}}>{userLocation}</Text>
                          
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>getUserCurrentLocation()} style={styles.resetLocation}>
              <Text style={styles.resetLocationTxt}>Reset Location</Text>
              <Ionicons name='ios-locate-outline'size={30} color={'green'}/>
            </TouchableOpacity>

          </View>
        ) : (
          <View>
            {/* Date Picker */}
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginVertical: 20,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 5,
              }}>
              <View
                style={{
                  width: '48%',
                }}>
                <Text>From</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    ...{moment(fromDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity onPress={() => setOpen(true)}>
                        <Ionicons
                          name="calendar-outline"
                          size={30}
                          color={'#6ef7ff'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '48%',
                }}>
                <Text>To</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    ...{moment(toDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>  (setOpenSecond(true))}>
                        <Ionicons
                          name="calendar-outline"
                          size={30}
                          color={'#6ef7ff'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* DatePicker */}

              <DatePicker
                modal
                open={open}
                date={fromDate}
                mode='date'
                onConfirm={fromDate => {
                  setOpen(false);
                  setFromDate(fromDate);
                  console.log(fromDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <DatePicker
                modal
                mode='date'
                open={openSecond}
                date={toDate}
                onConfirm={toDate => {
                  setOpenSecond(false);
                  setToDate(toDate);
                  console.log(toDate);
                }}
                onCancel={() => {
                  setOpenSecond(false);
                }}
              />
            </View>

            {/* Button */}

            <TouchableOpacity onPress={() => {handelDate()}}>
              <LinearGradient
                style={{
                  padding: 20,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
             colors={['#4174D0','#6ef7ff']}>
                <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Manager Mode */}

            <FlatList
              data={RawPunches}
              renderItem={renderItem}
              keyExtractor={item => item.Date.toString()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  tabStyle: {
    //custom styles
   
    paddingVertical: 10,
    borderColor: '#6ef7ff',
  },
  tabTextStyle: {
    //custom styles
    fontWeight: '700',
    color: 'grey',
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: '#2757C3',
    // borderColor:Colors.primaryColor
  },
  activeTabTextStyle: {
    color: '#2757C3',
  },
  content: {
    top: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 5,
    marginVertical:10
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderColor:'green',
    // borderTopColor: '#80406A',
    // borderStartColor: '#6ef7ff',
    // borderBottomColor: '#2757C3',
    // borderEndColor: '#80406A',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 30,
  },
  renderitem:{
    paddingVertical:10,
    paddingHorizontal:5,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginTop:10
  },
  resetLocation:{
    marginTop:20,
    flexDirection:'row', 
    alignSelf:'center',
    backgroundColor:'#4a4a4a',
    alignItems:'center',
    padding:10
  },
  resetLocationTxt:{
    color:"#fff",
    marginRight:5,
    fontWeight:"700"
  }
});

//make this component available to the app
export default Attendance;
