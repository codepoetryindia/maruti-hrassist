//import liraries
import React, { Component, useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  Alert
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
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import { GlobalFontSize } from '../../constants/FontSize';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import TextInput from '../../components/reusable/TextInput';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import ManagerFlexiShift from './managermode/ManagerFlexiShift';
import ManagerLeave from './managermode/ManagerLeave';
import ManagerTaxi from './managermode/ManagerTaxi';


const Tab = createMaterialTopTabNavigator();


const ManagerMode = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: GlobalColor.PrimaryLight }}>
      <Header title="Manager Mode" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
          tabBarActiveTintColor: GlobalColor.White,
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: GlobalColor.White },
          tabBarStyle: { backgroundColor: GlobalColor.Secondary, elevation: 0 },
          tabBarItemStyle: { paddingHorizontal: 0 },
        }}>
        <Tab.Screen name="Leave" component={ManagerLeave} />
        <Tab.Screen name="FlexiShift" component={ManagerFlexiShift} />
        <Tab.Screen name="Taxi" component={ManagerTaxi} />
        <Tab.Screen name="Attendance" component={Attendance} />
        
      </Tab.Navigator>

      <TouchableOpacity style={styles.fullWidthButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require("./../../assets/Images/group.png")} style={{ width: 30, height: 30, tintColor: GlobalColor.White }} />
        <Text style={styles.fullWidthButtonText} Bold>
          Back to Employee Mode
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export const Taxi = () => {
  const [approve, setApprove] = useState(0);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [taxiPending, setTaxiPending] = useState([]);
  const [approvedTaxiReport, setApprovedTaxiReport] = useState([]);
  const [search, setSearch] = useState('');
  const [employ, setEmploy] = useState([]);


  const GetTaxiPendingList = () => {
    const stopLoader = () => {
      setLoader(false);
      // setrefresh(false);
    }

    let userId = AppUserData?.data?.userId
    let token = AppUserData.token;
    let apiData = {
      // "UserName": "spnayak",
      "StaffNo": "516260",

    };
    setLoader(true);
    ApiService.PostMethode('/GetTaxiPendingList  ', apiData, token)
      .then(result => {
        console.log("APiresult GetTaxiPendingList", result);
        stopLoader();
        ApiResult = result.Value
        setTaxiPending(ApiResult)
      })
      .catch(error => {
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
  }

  const ApprovedTaxiReport = () => {
    const stopLoader = () => {
      setLoader(false);
      // setrefresh(false);
    }
    let userId = AppUserData?.data?.userId
    let token = AppUserData.token;
    let apiData = {
      "UserName": userId//"NSTHAKUR"
    };
    setLoader(true);
    ApiService.PostMethode('/ApprovedTaxiReport  ', apiData, token)
      .then(result => {
        console.log("APiresult ApprovedTaxiReport", result);
        stopLoader();
        ApiResult = result.Value
        setApprovedTaxiReport(ApiResult)
      })
      .catch(error => {
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
  }


  const SearchEmployee = () => {
    const stopLoader = () => {
      setLoader(false);
      // setrefresh(false);
    }

    console.log('post data', search);
    if (search === '') {
      Alert.alert("please enter a valid keyWord ")
      return
    } else {
      let apiData = {
        Search: search
      }
      let token = AppUserData.token
      setLoader(true);
      ApiService.PostMethode('/GetEmplLookup', apiData, token)
        .then(result => {
          stopLoader();

          console.log('ApiResult', result);

          let responseData = result.Value;
          console.log('ApiResult', responseData);
          setEmploy(responseData)
        })
        .catch(error => {
          stopLoader();
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
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: GlobalColor.PrimaryLight }}>

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


      <View style={{ flex: 1 }}>
        {approve == 0 ? (
          <View style={{flex: 1, width: '100%', marginVertical: 10,  }}>
            <View
              style={styles.SearchInput}>
              <View
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="search" size={20} color={GlobalColor.Secondary} />
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
                  style={{}} onPress={() => { emptyList() }}>
                  <Ionicons
                    style={styles.searchIcon}
                    name="close-circle-outline"
                    size={25}
                    color={GlobalColor.Secondary}
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
                <Ionicons name="send" size={20} color={GlobalColor.Secondary} />
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
              ListEmptyComponent={() => {
                return (

                 <ListEmptyComponent title="No Data Found"
                  ></ListEmptyComponent>
                
                )
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.FlatListData}>
                    <Ionicons
                      style={styles.searchIcon}
                      name="person-circle-outline"
                      size={25}
                      color={GlobalColor.Secondary}
                    />
                    <View style={{ flexDirection: 'column', width: '70%' }}>
                      <Text >
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
                        color={GlobalColor.Secondary}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }} />
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{              
              width: '100%', flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 6,
              padding: 10,
              backgroundColor: GlobalColor.White,
              borderColor: '#ccc'
            }}>
              <Text Bold>Dept-Code</Text>
              <Text Bold>Name</Text>
              <Text Bold>TCar Approval</Text>
              <Text Bold>KM</Text>
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
              ListEmptyComponent={() => {
                return (
                  <ListEmptyComponent title="No Data Found"
                  ></ListEmptyComponent>
                )
              }}
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
  const [loader, setLoader] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const stopLoader = () => {
    setLoader(false);
    // setrefresh(false);
  }

  const SearchEmployee = () => {
    console.log('post data', search);
    if (search === '') {
      Alert.alert("please enter a valid keyWord ")
      return
    } else {
      let apiData = {
        Search: search
      }
      let token = AppUserData.token
      setLoader(true);
      ApiService.PostMethode('/GetEmplLookup', apiData, token)
        .then(result => {
          stopLoader();

          console.log('ApiResult', result);

          let responseData = result.Value;
          console.log('ApiResult', responseData);
          setEmploy(responseData)
        })
        .catch(error => {
          stopLoader();
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
    <View style={{ flex:1, width: '100%', paddingHorizontal: 10, backgroundColor: GlobalColor.PrimaryLight }}>
      <View
        style={{
          marginVertical: 10,
          width: '100%',          
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: GlobalColor.Secondary,
          borderRadius: 5,
          alignSelf: 'center',
          backgroundColor: GlobalColor.White,
        }}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Feather name="search" size={20} color={GlobalColor.Secondary} />
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
              color={GlobalColor.Secondary}
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
          <Ionicons name="send" size={20} color={GlobalColor.Secondary} />
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
          ListEmptyComponent={() => {
            return (
              <ListEmptyComponent title="No Data Found"
              ></ListEmptyComponent>
            )
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={[styles.FlatListData,]}>
                <Ionicons
                  style={styles.searchIcon}
                  name="person-circle-outline"
                  size={25}
                  color={GlobalColor.Secondary}
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
                    color={GlobalColor.Secondary}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }} />
      ) : (

        
          <ListEmptyComponent title="No Data Found"
              ></ListEmptyComponent>
       
      )}
    </View>
  );
};



// define your styles
const styles = StyleSheet.create({

  Loadercontainer: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,
    paddingHorizontal: 10,
  },

  gradient: {
    padding: 20,
  },
  tabsContainerStyle: {
    marginTop: 10,
    borderRadius: 0,
    width: '100%',
  },
  tabStyle: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: GlobalColor.Secondary
  },
  tabTextStyle: {
    fontSize: GlobalFontSize.P,
    color: 'grey',
    fontFamily: 'Roboto-Bold',
  },
  activeTabStyle: {
    backgroundColor: GlobalColor.PrimaryLight,
    borderBottomWidth: 4,
    borderBottomColor: GlobalColor.Secondary,
  },
  activeTabTextStyle: {
    color: GlobalColor.Secondary,
  },
  reportHeader: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingVertical: 15,
    backgroundColor: GlobalColor.White,
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 5,
    borderRadius: 5,
  },
  reportStyle: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    padding: 12,
    backgroundColor: GlobalColor.White,
    borderBottomWidth: 0.5,
    borderBottomColor: GlobalColor.Secondary,
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

  },

  activeTabTextStyle: {
    color: GlobalColor.Secondary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
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
    backgroundColor: GlobalColor.White,
    color: '#424242',
  },
  FlatListData: {
    width: "100%",    
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: GlobalColor.White,
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderRadius: 3,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: GlobalColor.White
  },
  spinnerTextStyle: {
    color: GlobalColor.White
  },
  fullWidthButton: {
    backgroundColor: GlobalColor.Primary,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullWidthButtonText: {
    color: GlobalColor.White,
    marginLeft: 8
  },
  SearchInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: GlobalColor.Secondary,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 7,
    backgroundColor: GlobalColor.White
  }

});

export default ManagerMode;
