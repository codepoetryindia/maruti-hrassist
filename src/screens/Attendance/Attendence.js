//import liraries
import React, {useEffect, useState,useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Platform} from 'react-native';
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
import Button from './../../components/reusable/Button'
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import {LoadingScreen} from './../../components/reusable/LoadingScreen';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';



const Attendance = ({navigation}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState (new Date());
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
      // console.log(apiData);
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
    let EmplID = AppUserData.data.userId
    let apiData = {
        // EmplID: EmplID
        StaffNo: EmplID
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

if(loader){
  return(
    <LoadingScreen/>
  )
}


  return (
        <View style={styles.container}>
          {/* <TouchableOpacity
            style={styles.addtnlBtn}
            onPress={() => {
             
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              name="ellipsis-vertical-circle"
              size={30}
              color={'#0083B0'}
            />
          </TouchableOpacity>
          
                   {horizental == true ? (
            <View
              style={{
                padding: 5,
                paddingVertical:8,
                backgroundColor: '#0083B0',
                position: 'absolute',
                // bottom:30,
                right: 30,
                top:5,
                zIndex:1000,
                borderRadius:2
              }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('AttendancePer')
                }}>                  
                  <Text style={{ color:"#fff"}}>Attendance Percentage</Text>
                </TouchableOpacity>
            </View>
          ) : null}*/}


        <View style={{width: '100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>      
          {
            ShowAttandanceTabs ? (
            <SegmentedControlTab
              borderRadius={2}
              values={['Mark Attendance', 'View Report']}
              selectedIndex={MarkAttandance}
              onTabPress={index => {
                handleMarkAttandance(index);
              }}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
            />
              ):(
                <Text style={[styles.titleLabel, {marginTop:10}]} bold>View Report</Text>
              )
            }
        </View>

      <View style={{ flex:1 }}>
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
          <View style={{ flex:1 }}>
            <View
              style={styles.reportView}>
              <View
                style={{
                  width: '48%',
                }}>
                <Text style={styles.titleLabel}>From</Text>
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
                    {moment(fromDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity onPress={() => setOpen(true)}>
                        <Ionicons
                          name="calendar-outline"
                          size={25}
                          color={GlobalColor.Secondary}
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
                <Text style={styles.titleLabel}>To</Text>
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
                    {moment(toDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>  (setOpenSecond(true))}>
                        <Ionicons
                          name="calendar-outline"
                          size={25}
                          color={GlobalColor.Secondary}
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
            <Button onPress={() => {handelDate()}} title={"Submit"}></Button>

            <FlatList
              contentContainerStyle={{ flexGrow:1 }}
              data={RawPunches}
              renderItem={renderItem}
              ListEmptyComponent={()=><ListEmptyComponent title="No Data Found" subtitle="Please select dates and submit to view data"></ListEmptyComponent>}
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
    paddingHorizontal:10,
    position:'relative',
    backgroundColor:GlobalColor.PrimaryLight
  },
  tabsContainerStyle: {
    marginTop: 10,
    borderRadius:0,
    width:'100%'
  },
  reportView:{
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 0,
  },
  tabStyle: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius:0,
    borderColor:GlobalColor.Secondary
  },
  tabTextStyle: {
    fontSize:GlobalFontSize.P,
    color: 'grey',
    fontFamily:'Roboto-Bold',
  },
  activeTabStyle: {
    backgroundColor: GlobalColor.PrimaryLight,
    borderBottomWidth: 4,
    borderBottomColor: GlobalColor.Secondary,
  },
  activeTabTextStyle: {
    color: GlobalColor.Secondary,
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
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 30,
  },
  renderitem:{
    paddingVertical:15,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginTop:10,
    borderWidth:0.5, 
    borderColor:GlobalColor.LightDark
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
  },
  spinnerTextStyle:{
    color:'#fff'
  },
  titleLabel:{
    color: GlobalColor.Primary,
    fontWeight:'700',
    fontSize:16
  },
  addtnlBtn:{
    position:'absolute',
    right:10,
    top:5,
    zIndex:55555
  }

});

//make this component available to the app
export default Attendance;
