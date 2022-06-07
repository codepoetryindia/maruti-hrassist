//import liraries
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  SafeAreaView
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {DataTable} from 'react-native-paper';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


// create a component
const Shift = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [second, setSecond] = useState(false);
  const [textinputDate, setTextinputDate] = useState('');
  const [textinputSecondDate, setTextinputSecondDate] = useState('');
  const [openThird, setOpenThird] = useState(false);
  const [Shift, setShift] = useState([]);
  const [shiftData, setShiftData] = useState([]);
  const [shiftType, setShiftType] = useState([]);
  const [shiftName, setShiftName] = useState('Select Shift');
  const [currentShift, setCurrentShift] = useState('');
  const [shiftStatus, setShiftStatus] = useState([]);
  const [submitShift, setSubmitShift] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [choseDate, setChoseDate] = useState('');
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader,setLoader] = useState(false)
  const handleShift = index => {
    setShift(index);
  };

// SHIFT DETAILS API
  const GetEmplShift = () => {
    let userId = AppUserData.data.userId;
    let token = AppUserData.token;
    let fromdate =moment(fromDate).format('DD-MMM-YYYY');
    let toDate =moment(toDate).format('DD-MMM-YYYY');
    let apiData = {
      "FromDate": fromdate,
      "ToDate":toDate,
      "EmplID":userId
      };
    setLoader(true);
    ApiService.PostMethode('/GetEmplShift  ', apiData, token)
      .then(result => {
        console.log("GetEmplShift", result);
        setLoader(false);
        let ApiResult = result.Value
        setShiftData(ApiResult)
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
// END 

// FLEXI SHIFT API

const flexiShiftPlanLov = () => {
  let userId = AppUserData.data.EMPL_NAME;
  let token = AppUserData.token;
  let apiData = {
    "UserName": userId,
    };
  setLoader(true);
  ApiService.PostMethode('/flexiShiftPlanLov  ', apiData, token)
    .then(result => {
      console.log("flexiShiftPlanLov", result);
      setLoader(false);
      let ApiResult = result.Value
      setShiftType(ApiResult)
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
const CurrentShift = () => {
  let userId = AppUserData.data.userId;
  let token = AppUserData.token;
  let apiData = {
    "StaffNo": userId,
    };
  setLoader(true);
  ApiService.PostMethode('/CurrentShift  ', apiData, token)
    .then(result => {
      console.log("CurrentShift", result);
      setLoader(false);
      let ApiResult = result.Result
      setCurrentShift(ApiResult)
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
const SubmitFlexiShiftPlan = () => {
  let userId = AppUserData.data.userId;
  let token = AppUserData.token;
  let apiData = {
    "StaffNo": userId,
    };
  setLoader(true);
  ApiService.PostMethode('/SubmitFlexiShiftPlan  ', apiData, token)
    .then(result => {
      console.log("SubmitFlexiShiftPlan", result);
      setLoader(false);
      let ApiResult = result.Result
      alert(ApiResult)
      // setSubmitShift(ApiResult)
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
const RptShiftStatus = () => {
  let userId = AppUserData.data.userId;
  let token = AppUserData.token;
  let apiData = {
    "StaffNo": userId,
    };
  setLoader(true);
  ApiService.PostMethode('/RptShiftStatus  ', apiData, token)
    .then(result => {
      console.log("RptShiftStatus", result);
      setLoader(false);
      let ApiResult = result.Value
      setShiftStatus(ApiResult)
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

const handleSubmit = () => {
  if(shiftName.length < 0){
    alert("Please select shift name")
  }
  else if(selectDate==''){
    alert("Please select Date")
  }
  else{
    SubmitFlexiShiftPlan()
  }
}
// ENd
  useEffect(() => {
    GetEmplShift()
    flexiShiftPlanLov()
    CurrentShift()
    RptShiftStatus()
  }, [])
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const rederReason = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          margin: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // console.log('selected reason', item);
            setShiftName(item.SHIFT_DESCRIPTION);
            setModalVisible(false);
            console.log('data', shiftName);
          }}>
          <Text style={{color: '#fff', fontSize: 15, paddingHorizontal: 10}}>
            {item.SHIFT_DESCRIPTION}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
   
    <SafeAreaView style={styles.container}>
       {loader == true ? (
      <Spinner
        visible={loader}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    ) : null}
      <View style={{width: '90%', alignSelf: 'center'}}>
        <SegmentedControlTab
          borderRadius={8}
          values={['Shift Details', 'Flexi Shift']}
          selectedIndex={Shift}
          onTabPress={index => {
            handleShift(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>

      {Shift == 0 ? (
        <ScrollView>
          <Text style={{paddingTop: 10, paddingHorizontal: 20}}>
            Select Date
          </Text>
          <View
            style={{
              width: '90%',
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
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
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

          {/* Button */}

          <TouchableOpacity
            onPress={() => {
              GetEmplShift()
            } }>
            <LinearGradient
              style={{
                padding: 20,
                borderRadius: 8,
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
              }}
           colors={['#4174D0','#6ef7ff']}>
              <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Show Data */}
          <DataTable
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginVertical: 10,
              marginBottom: '20%',
              
            }}>
            <DataTable.Header style={{backgroundColor: '#fff'}}>
              <DataTable.Title>
                <Text style={{color: 'gray', fontSize: 16}}>Date</Text>
              </DataTable.Title>
               <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>
                  Time
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>Shift</Text>
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={shiftData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.dataRow}>
                <View style={{flexDirection:'column'}}>
                <Text>{item.START_DATE}</Text>
                <Text>To</Text>
                  <Text>{item.END_DATE}</Text>
                </View>
                <View style={{flexDirection:'column'}}>

                  <Text>{item.STD_START}</Text>
                  <Text>To</Text>
                  <Text>{item.STD_STOP}</Text>
                </View>
                  <Text>{item.SHIFT}</Text>
                  {/* <DataTable.Row>
                    <DataTable.Cell numeric>{item.START_DATE}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.END_DATE}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.STD_START},{item.STD_STOP}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.SHIFT}</DataTable.Cell>
                  </DataTable.Row> */}
                </View>
              )}
            />
          </DataTable>
        </ScrollView>
      ) : (
        <ScrollView>
          <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
            Shift Name
          </Text>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
             {/* {shiftName==''} */}
             <Text>{shiftName}</Text>
              <Ionicons name="arrow-forward-outline" color={'#23d'} size={20} />
              <Modal isVisible={isModalVisible}>
                <View>
                  <LinearGradient
                 colors={['#4174D0','#6ef7ff']}
                    style={{
                      height: '100%',
                      backgroundColor: 'red',
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          letterSpacing: 1,
                        }}>
                        Select Shift
                      </Text>
                      <TouchableOpacity onPress={toggleModal}>
                        <Ionicons
                          name="close-circle-outline"
                          size={30}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={shiftType}
                      keyExtractor={item => item.id}
                      renderItem={rederReason}
                    />
                  </LinearGradient>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>

          <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
            Applicable Date
          </Text>
          <DatePicker
            modal
            open={openThird}
            date={selectDate}
            mode="date"
            onConfirm={selectDate => {
              setOpenThird(false);
              setSelectDate(selectDate);
              let formatDate = moment(selectDate).format('MMM Do YYYY');
              setChoseDate(formatDate);
              console.log(choseDate);
            }}
            onCancel={() => {
              setOpenThird(false);
            }}
          />
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Select Date"
              width={'90%'}
              editable={false}
              paddingHorizontal={14}
              value={choseDate}
            />
            <TouchableOpacity onPress={() => setOpenThird(true)}>
              <Ionicons name="calendar-outline" size={30} color={'#6ef7ff'} />
            </TouchableOpacity>
          </View>
          <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
            Current Shift
          </Text>

          <View style={styles.inputBox}>
            <TextInput
              value={currentShift}
              width={'80%'}
              editable={false}
              paddingHorizontal={14}
            />
          </View>
          {/* Button */}
          <TouchableOpacity onPress={() => {
            handleSubmit()
          }}>
            <LinearGradient
              style={{
                width: '90%',
                alignSelf: 'center',
                padding: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginVertical: '5%',
              }}
           colors={['#4174D0','#6ef7ff']}>
              <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Report */}
          <Text style={{textAlign: 'center'}}>Report</Text>
          {shiftStatus.length>0?(
          <DataTable
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginVertical: 10,
              marginBottom: '20%',
            }}>
            <DataTable.Header style={{backgroundColor: '#f8eded'}}>
              <DataTable.Title>
                <Text style={{color: 'gray', fontSize: 16}}>Shift</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>
                  Applicable Data
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>Status</Text>
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={shiftStatus}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View>
                  <DataTable.Row>
                    <DataTable.Cell numeric>{item.SHFT_START_SHIFT}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.SHFT_START_DATE}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.STATUS === 'Approved' ? (
                        <Text style={{color: 'green'}}>Approved</Text>
                      ) : (
                        <Text style={{color: 'red'}}>Pending</Text>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              )}
            />
          </DataTable>
          ):null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  box: {
    width: '90%',
    padding: 5,
    backgroundColor: '#FFF',
    alignSelf: 'center',
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
  inputBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
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
  },
  dataRow:{width:'100%',
  justifyContent:'space-between',
  flexDirection:'row',
  marginVertical:5,
  borderBottomWidth:0.5,
  padding:20}
});

//make this component available to the app
export default Shift;
