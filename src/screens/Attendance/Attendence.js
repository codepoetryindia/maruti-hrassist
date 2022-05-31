//import liraries
import React, {useEffect, useState,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
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
      });
    }

    const GetRawPunch = () =>{
      let apiData = { 
        "FromDate" : "24-MAR-2017",
        "ToDate" : "24-MAY-2021",
          "StaffNo" : 548596
      };
      console.log(apiData);
      // AppUserData.data.userId
      let token = AppUserData.token;
      setLoader(true);
      ApiService.PostMethode('/GetRawPunch', apiData, token)
        .then(result => {
          console.log("APiresult GetRawPunch", result);
          setLoader(false);

          // Dummy Data to continue work
          let datadummy = {
            "d": [
                {
                    "__type": "ADauthentication+RawpunchDetails",
                    "Date": "09-MAY-2022 12:52",
                    "source": "Mobile"
                }
            ]
        };
          setRawPunches(datadummy.d);
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
            <Text>{item.Date}</Text>
            <Text>{item.Date}</Text>
            <Text>{item.source}</Text>
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

  const SubmitPunchRO = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data
    let apiData = {
        EmplID: EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/SubmitPunchRO', apiData, token)
        .then(result => {
            setLoader(false);
            // console.log('ApiResult', result);
            let responseData = result.Value[0].SHIS_YYMM_CODE
            console.log('GetMonth', responseData)
            setMonth(responseData)
           
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


  const FinancialYear = ['2021', '2022', '1999'];
  const [location, setLocation] = useState('');

  const punch = () => {
    setLocation([]);
  };








  return (
    <View style={styles.container}>
          {
            loader ? (
              <Text>Loading</Text>
            ): null
          }
          <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={{color:'#fff'}}
            overlayColor={'rgba(0, 0, 0, 0.50)'}
          />
        
      <View style={{width: '100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

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
                  punch();
                }}>
                <Text>Punch</Text>
              </TouchableOpacity>
              <Text>{location.latitude}</Text>
              <Text>{location.longitude}</Text>
              <Ionicons name='ios-locate-outline'size={25} color={'green'}/>
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
  }
});

//make this component available to the app
export default Attendance;
