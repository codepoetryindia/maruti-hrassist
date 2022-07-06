//import liraries
import React, { Component, useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { GlobalColor } from '../../constants/Colors';

const Tab = createMaterialTopTabNavigator();

const ManagerMode = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <LinearGradient
        colors={[GlobalColor.PrimaryGradient, GlobalColor.SecondryGradient]}
        style={styles.gradient}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              flex:1,
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
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                letterSpacing: 1,
                marginLeft: 10,
              }}>
              ManagerMode
            </Text>
          </View>


          <TouchableOpacity
            style={{ marginLeft: 100 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={require("../../assets/Images/Avtar.png")} style={{ width: 30, height: 30, }} />
          </TouchableOpacity>
        </View>
      </LinearGradient>


      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight:'700' },
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff' },
          tabBarStyle: { backgroundColor: '#0083B0', elevation: 0 },
          tabBarItemStyle: { paddingHorizontal:0 },
        }}>
        <Tab.Screen name="Leave" component={Leave} />
        <Tab.Screen name="FlexiShift" component={FlexiShift} />
        <Tab.Screen name="Taxi" component={Taxi} />
        <Tab.Screen name="Attendance" component={Attendance} />
      </Tab.Navigator>

    </SafeAreaView>
  );
};


// create a component
export const Leave = () => {
  const [approve, setApprove] = useState(0);
  const [getEmplLevDetail, setGetEmplLevDetail] = useState([]);
  const [getPendingLeaveReq, setGetPendingLeaveReq] = useState([]);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)



  let userId = AppUserData.data.userId;
  let UserName = AppUserData.data.EMPL_NAME
  let date = moment(new Date()).format("DD-MMMM-YYYY");



  const GetEmplLevDetail = () => {
    let userId = AppUserData.data.userId
    let token = AppUserData.token;
    let apiData = {
      "StaffNo": userId,
      "FromDate": "01-Feb-2020",
      "ToDate": date
    };
    setLoader(true);
    ApiService.PostMethode('/GetEmplLevDetail  ', apiData, token)
      .then(result => {
        console.log("APiresult GetEmplLevDetail", result);
        setLoader(false);
        ApiResult = result.Value
        setGetEmplLevDetail(ApiResult)
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


  const GetPendingLeaveReq = () => {
    let UserName = AppUserData.data.EMPL_NAME
    let token = AppUserData.token;
    let apiData = {
      "UserName": "spnayak",
      // "UserName": UserName,
    };
    setLoader(true);
    ApiService.PostMethode('/GetPendingLeaveReq  ', apiData, token)
      .then(result => {
        console.log("APiresult GetPendingLeaveReq", result);
        setLoader(false);
        ApiResult = result.Value
        setGetPendingLeaveReq(ApiResult)
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
    GetPendingLeaveReq();
    GetEmplLevDetail();
  }, [])
  const handleApprove = index => {
    setApprove(index);
  };
  return (
    <View style={{ flex: 1, paddingHorizontal:10 }}>
      <View style={{ width: '100%', alignSelf: 'center',marginVertical:10, paddingHorizontal:10 }}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Approve Leave', 'View Report']}
          selectedIndex={approve}
          onTabPress={index => {
            handleApprove(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>

      <View style={{ paddingHoriZontal:10 , flex:1}}>
        {approve == 0 ? (
          <View style={{ flex: 1}}>
          <TouchableOpacity style={{ padding: 10, backgroundColor: '#a9bce7' }}>
            <Text style={{ color: '#000', fontWeight: '600' }}>
              Tap On Leave To View Details
            </Text>
          </TouchableOpacity>

          {getPendingLeaveReq.length>0 ? (

           <View style={styles.header}>
           <Text>NAME</Text>
           <Text>FROM_DATE</Text>
           <Text>PERIOD</Text>
           <Text>DAYS</Text>
         </View>
          ):null}


         {loader == true ? (
           <Spinner
             visible={loader}
             textContent={'Loading...'}
             textStyle={styles.spinnerTextStyle}
           />
         ) : null}


         <FlatList
           data={getPendingLeaveReq}
           keyExtractor={({ item, index }) => index}
           renderItem={({ item, index }) => {
             let Name = item.EMPL_NAME
             let slice= Name.slice(0,10)
             return (
               <View
                 style={styles.reportStyle}>
                   <Text>{slice}</Text>
                   <Text>{item.FROM_DATE}</Text>
                 <Text>{item.PERIOD}</Text>
                 <Text>{item.DAYS}</Text>
                
               </View>
             )
           }}
         />
         </View>
        ) : (
          <View style={{ flex: 1}}>

            <Text style={{ color: '#000', fontWeight: '600', marginVertical: '5%', marginLeft: 15 }}>Employee</Text>

            <TouchableOpacity style={styles.reportHeader}>
              <Text style={{ color: '#000', fontWeight: '600', paddingHorizontal: '5%' }}>{userId}  {UserName}</Text>
              <Ionicons name="send" size={20} color={'#6ef7ff'} />
            </TouchableOpacity>


            <View style={styles.header}>
              <Text>Date</Text>
              <Text>type</Text>
              <Text>Period</Text>
              <Text>Status</Text>
            </View>
            {loader == true ? (
              <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            ) : null}
            <FlatList
              data={getEmplLevDetail}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={styles.reportStyle}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text>{item["From Date"]}</Text>
                      <Text>{item["To Date"]}</Text></View>
                    <Text>{item["Leave Type"]}</Text>
                    <Text>{item.Period}</Text>
                    <Text>{item.Status}</Text>
                  </View>
                )
              }}
            />
          </View>

        )}
      </View>
    </View>
  );
};


export const FlexiShift = () => {
  const [flexiShift, setFlexiShift] = useState('')
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const FlexiShiftPendAppLOV = () => {
    let userId = AppUserData.data.userId
    let token = AppUserData.token;
    let apiData = {
      // "UserName": "spnayak",
      "StaffNo": userId,
    };
    setLoader(true);
    ApiService.PostMethode('/FlexiShiftPendAppLOV  ', apiData, token)
      .then(result => {
        console.log("APiresult FlexiShiftPendAppLOV", result);
        setLoader(false);
        ApiResult = result.Value
        setFlexiShift(ApiResult)
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
    FlexiShiftPendAppLOV()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>FlexiShift</Text>
    </SafeAreaView>
  );
};



export const Taxi = () => {
  const [approve, setApprove] = useState(0);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [taxiPending, setTaxiPending] = useState([])
  const [approvedTaxiReport, setApprovedTaxiReport] = useState([])
  const [search, setSearch] = useState('')
  const [employ, setEmploy] = useState([])

  const GetTaxiPendingList = () => {
    let userId = AppUserData.data.userId
    let token = AppUserData.token;
    let apiData = {
      // "UserName": "spnayak",
      "StaffNo": "516260",

    };
    setLoader(true);
    ApiService.PostMethode('/GetTaxiPendingList  ', apiData, token)
      .then(result => {
        console.log("APiresult GetTaxiPendingList", result);
        setLoader(false);
        ApiResult = result.Value
        setTaxiPending(ApiResult)
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
  const ApprovedTaxiReport = () => {
    let userId = AppUserData.data.userId
    let token = AppUserData.token;
    let apiData = {
      "UserName": "NSTHAKUR"
    };
    setLoader(true);
    ApiService.PostMethode('/ApprovedTaxiReport  ', apiData, token)
      .then(result => {
        console.log("APiresult ApprovedTaxiReport", result);
        setLoader(false);
        ApiResult = result.Value
        setApprovedTaxiReport(ApiResult)
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


  const SearchEmployee = () => {
    console.log('post data', search);
    if (search === '') {
      alert("please enter a valid keyWord ")
      return
    } else {
      let apiData = {
        Search: search
      }
      let token = AppUserData.token
      setLoader(true);
      ApiService.PostMethode('/GetEmplLookup', apiData, token)
        .then(result => {
          setLoader(false);

          console.log('ApiResult', result);

          let responseData = result.Value;
          console.log('ApiResult', responseData);
          setEmploy(responseData)
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
  };

  useEffect(() => {
    GetTaxiPendingList()
    ApprovedTaxiReport()

  }, [])
  const handleApprove = index => {
    setApprove(index);
  };
  const emptyList = () => {
    setSearch('')
  }
  return (
    <View style={{ flex: 1, paddingHorizontal:10 }}>

      <View style={{ width: '100%', marginVertical: 15 }}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Approve Taxi', 'View Report']}
          selectedIndex={approve}
          onTabPress={index => {
            handleApprove(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>


      <View style={{ flex: 1}}>
        {approve == 0 ? (
          <View style={{ width: '100%', marginVertical: 10,flex: 1 }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderRadius: 5,
                alignSelf: 'center',
                backgroundColor: '#fff'
              }}>
              <View
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="search" size={20} color={'#4174D0'} />
              </View>
              <TextInput
                placeholder="Search By Name/Dept/Staff/ID"
                value={search}
                onChangeText={(data) => {
                  setSearch(data)
                }}
                style={{
                  width: '65%',
                  paddingVertical: 5,
                  fontSize: 16
                }}
              />
              {search !== '' ? (
                <TouchableOpacity
                  style={{ borderRadius: 8, marginLeft: -20, alignSelf: 'center' }} onPress={() => { emptyList() }}>
                  <Ionicons
                    style={styles.searchIcon}
                    name="close-circle-outline"
                    size={25}
                    color="#b2bec3"
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  SearchEmployee()
                }}
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="send" size={20} color={'#4174D0'} />
              </TouchableOpacity>
            </View>
            {loader == true ? (
              <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            ) : null}
            <FlatList
              data={employ}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.FlatListData}>
                    <Ionicons
                      style={styles.searchIcon}
                      name="person-circle-outline"
                      size={25}
                      color="#2757C3"
                    />
                    <View style={{ flexDirection: 'column', width: '70%' }}>
                      <Text style={{ fontSize: 16 }}>
                        {item.Name}
                      </Text>
                      <Text>
                        {item.Desg} , {item.Dept} ({item['Staff No']})
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Ionicons
                        style={styles.searchIcon}
                        name="chevron-forward-circle-outline"
                        size={25}
                        color="#2757C3"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }} />
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1}}>
            <View style={{ 
              width: '100%', flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              marginVertical: 10, padding: 10,
              backgroundColor:'#fff', 
              borderColor:'#ccc'
            }}>
              <Text>Dept-Code</Text>
              <Text>Name</Text>
              <Text>TCar Approval</Text>
              <Text>KM</Text>
            </View>
            {loader == true ? (
              <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            ) : null}
            <FlatList
              data={approvedTaxiReport}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={styles.reportStyle}>

                    <Text>{item.EMPL_DEPT_CODE}</Text>
                    <Text>{item.EMPL_NAME}</Text>
                    <Text>{item.TCAR_ADM_APPROVAL}</Text>
                    <Text>{item.TCAR_APPOX_KMS_USAGE}</Text>

                  </View>
                )
              }} />
          </SafeAreaView>
        )}
      </View>
    </View>
  );
};


export const Attendance = () => {
  const [search, setSearch] = useState('')
  const [employ, setEmploy] = useState([])
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)

  const SearchEmployee = () => {
    console.log('post data', search);
    if (search === '') {
      alert("please enter a valid keyWord ")
      return
    } else {
      let apiData = {
        Search: search
      }
      let token = AppUserData.token
      setLoader(true);
      ApiService.PostMethode('/GetEmplLookup', apiData, token)
        .then(result => {
          setLoader(false);

          console.log('ApiResult', result);

          let responseData = result.Value;
          console.log('ApiResult', responseData);
          setEmploy(responseData)
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
  };

  const emptyList = () => {
    setSearch('')
  }
  return (
      <View style={{ width: '100%', marginVertical: 10 }}>
        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 5,
            alignSelf: 'center',
            backgroundColor: '#fff'
          }}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather name="search" size={20} color={'#4174D0'} />
          </View>
          <TextInput
            placeholder="Search By Name/Dept/Staff/ID"
            value={search}
            onChangeText={(data) => {
              setSearch(data)
            }}
            style={{
              width: '65%',
              paddingVertical: 5,
              fontSize: 16
            }}
          />
          {search !== '' ? (
            <TouchableOpacity
              style={{ borderRadius: 8, marginLeft: -20, alignSelf: 'center' }} onPress={() => { emptyList() }}>
              <Ionicons
                style={styles.searchIcon}
                name="close-circle-outline"
                size={25}
                color="#b2bec3"
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              SearchEmployee()
            }}
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="send" size={20} color={'#4174D0'} />
          </TouchableOpacity>
        </View>
        {loader == true ? (
          <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : null}
        {employ.length > 0 ? (

          <FlatList
            data={employ}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={styles.FlatListData}>
                  <Ionicons
                    style={styles.searchIcon}
                    name="person-circle-outline"
                    size={25}
                    color="#2757C3"
                  />
                  <View style={{ flexDirection: 'column', width: '70%' }}>
                    <Text style={{ fontSize: 16 }}>
                      {item.Name}
                    </Text>
                    <Text>
                      {item.Desg} , {item.Dept} ({item['Staff No']})
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      style={styles.searchIcon}
                      name="chevron-forward-circle-outline"
                      size={25}
                      color="#2757C3"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )
            }} />
        ) : (

          <View style={{ margin: '5%', }}>
            <Text>Search Contacts</Text>
          </View>
        )}
      </View>
  );
};



// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
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
  reportHeader: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 5,
    borderRadius: 8,
  },
  reportStyle: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 12,
    // borderBottomWidth: 1,
    backgroundColor:'#fff'
  },

  activeTabTextStyle: {
    color: '#2757C3',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
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
  FlatListData: {
    width: "95%",
    borderWidth: 1,
    borderColor: '#2757C3',
    borderRadius: 7,
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor:'#ccc',
    marginVertical: 10,
    padding: 10,
    backgroundColor:'#fff'
  },
  spinnerTextStyle:{
    color:'#fff'
  }
});

export default ManagerMode;
