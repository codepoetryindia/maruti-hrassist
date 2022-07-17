//import liraries
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert
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
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import TextInput2 from '../../components/reusable/TextInput';
import Button from './../../components/reusable/Button';




// create a component
const Shift = ({navigation}) => {
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
  const [shiftName, setShiftName] = useState('');
  const [currentShift, setCurrentShift] = useState('');
  const [shiftStatus, setShiftStatus] = useState([]);
  const [flexiShiftElig, setFlexiShiftElig] = useState('');
  const [flexidate, setFlexiDate] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [choseDate, setChoseDate] = useState('');
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader,setLoader] = useState(false)
  const [horizental, setHorizental] = useState(false);






    const LoadInitial= ()=>{
      FlexiShiftElig()
      GetEmplShift()
      flexiShiftPlanLov()
      CurrentShift()
      FlexiShiftStartDateLOV()
      RptShiftStatus()
    }

    // ENd
  // useEffect(() => {
  //   FlexiShiftElig()
  //   GetEmplShift()
  //   flexiShiftPlanLov()
  //   CurrentShift()
  //   FlexiShiftStartDateLOV()
  //   RptShiftStatus()
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = LoadInitial();
      return () => unsubscribe;
    }, [])
  )

  
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
    "Staffid": userId,
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
    "StaffNo": "222852",
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

const FlexiShiftElig = () => {
  let userId = AppUserData.data.userId;
  let token = AppUserData.token;
  let apiData = {
    "UserName": userId,
    };
  setLoader(true);
  ApiService.PostMethode('/FlexiShiftElig  ', apiData, token)
    .then(result => {
      console.log("FlexiShiftElig", result.Result);
      setLoader(false);
      let ApiResult = result.Result
      setFlexiShiftElig(ApiResult)
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


const FlexiShiftStartDateLOV = () => {
  let userId = AppUserData.data.userId;
  let token = AppUserData.token;
  let apiData = {
    "StaffNo": userId,
    };
  setLoader(true);
  ApiService.PostMethode('/FlexiShiftStartDateLOV  ', apiData, token)
    .then(result => {
      console.log("FlexiShiftStartDateLOV", result.Result);
      setLoader(false);
      let ApiResult = result.Result
      setFlexiDate(ApiResult)
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
  if(shiftName==''){
    alert("Please select shift name")
  }
  else if(choseDate==''){
    alert("Please select Date")
  }
  else{
    
    submitAlert('Warning', 'Are You Sure?', 'yes', 'No');
  }
}

  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitAlert = (title, body, btnTxt, btnTxt2) => {
    Alert.alert(title, body, [
      {
        text: btnTxt,
        onPress: () => {
          SubmitFlexiShiftPlan();
          RptShiftStatus();
        },
      },
      {
        text: btnTxt2,
        onPress: () => {
          console.log('No Pressed');
        },
      },
    ]);
  };


  const rederReason = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          margin: 2,
          borderBottomWidth: 1,
          borderBottomColor: GlobalColor.Secondary,
          paddingVertical:15
        }}>
        <TouchableOpacity
          onPress={() => {
            // console.log('selected reason', item);
            setShiftName(item.SHIFT_DESCRIPTION);
            setModalVisible(false);
            console.log('data', shiftName);
          }}>
          <Text style={{ paddingHorizontal: 10}}>
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

        <View style={{paddingHorizontal:10}}>
          <TouchableOpacity
            style={styles.addtnlBtn}
            onPress={() => {
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              name="ellipsis-vertical-circle"
              size={25}
              color={'#00B4DB'}
            />
          </TouchableOpacity>        
          {horizental == true ? (
            <View
              style={{
                padding: 5,
                backgroundColor: '#00B4DB',
                position: 'absolute',
                top: 0,
                right: 50,
                zIndex:1000,
                borderRadius:0,
                
              }}>
                <TouchableOpacity
                style={{paddingVertical:10}} onPress={() => {
                  setHorizental(false)
                  navigation.navigate("CompayShiftDe")
                }}>                      
                  <Text style={{color:'#fff',}}>Company Shift Details</Text>
                </TouchableOpacity>
               
            </View>
          ) : null}

        <View style={{ width: '100%', alignSelf: 'center', marginTop:20,paddingHorizontal:0 }}>
          <SegmentedControlTab
              borderRadius={0}
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
      </View>
      {Shift == 0 ? (
        <ScrollView 
          style={{ paddingHorizontal:10 }} 
          contentContainerStyle={{ flex:1 }}> 
          <Text style={{paddingVertical: 10, paddingHorizontal: 0, fontSize:16, fontWeight:'700'}}>
            Select Date
          </Text>
          <View
            style={styles.inlineDatepicker}>
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
              <TextInput2
                placeholder="From"
                style={{color: '#000'}}
                editable={false}
                value={textinputDate}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Ionicons name="calendar-outline" size={30} color={GlobalColor.Secondary} />
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
              <TextInput2
                style={{color: '#000'}}
                placeholder="To"
                editable={false}
                value={textinputSecondDate}
              />
    

              <TouchableOpacity onPress={() => setSecond(true)}>
                <Ionicons name="calendar-outline" size={30} color={GlobalColor.Secondary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{  marginTop:10, width:"100%",alignSelf:'center' }}>
            <Button
              onPress={() => {
                GetEmplShift()
                }}
                title={"Submit"}
              ></Button>
          </View>





          {/* Show Data */}
          <DataTable
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginVertical: 10,              
            }}>
            <DataTable.Header style={{backgroundColor: '#fff'}}>
              <DataTable.Title>
                <Text Bold style={{color: GlobalColor.Primary, fontSize: GlobalFontSize.Small}}>Date</Text>
              </DataTable.Title>
               <DataTable.Title numeric>
                <Text Bold  style={{color: GlobalColor.Primary, fontSize: GlobalFontSize.Small}}>
                  Time
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text Bold  style={{color: GlobalColor.Primary, fontSize: GlobalFontSize.Small}}>Shift</Text>
              </DataTable.Title>
            </DataTable.Header>
            
            <FlatList
              data={shiftData}
              keyExtractor={item => Math.floor((Math.random() * 1000) + 1)}
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
                    <Text style={{ marginRight:10 }}>{item.SHIFT}</Text>
                </View>
              )}
            />
          </DataTable>
        </ScrollView>
      ) : (
        <ScrollView style={{ flex:1, paddingHorizontal:10 }}>
          <Text style={{paddingVertical: 15, paddingHorizontal: 0,}} Bold>
            Shift Name
          </Text>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical:5,
                justifyContent: 'space-between',
              }}>
             {/* {shiftName==''} */}
             <Text Bold>{shiftName !==''? shiftName :(<Text Bold> Select Shift</Text>)}</Text>
              <Ionicons name="arrow-forward-outline" color={'#23d'} size={25} />
              <Modal isVisible={isModalVisible}>
                <View
                    style={{
                      height: '100%',
                      backgroundColor: GlobalColor.White,
                      borderRadius: 0,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}>
                      <Text
                        Bold
                        style={{
                          color: GlobalColor.Primary,
                          fontSize: GlobalFontSize.H4,
                        }}>
                        Select Shift
                      </Text>

                      <TouchableOpacity onPress={toggleModal}>
                        <Ionicons
                          name="close-circle-outline"
                          size={30}
                          color={GlobalColor.Danger}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={shiftType}
                      keyExtractor={item => item.id}
                      renderItem={rederReason}
                    />
                </View>
              </Modal>
            </TouchableOpacity>
          </View>


          <Text Bold style={{paddingVertical: 15, paddingHorizontal: 0}}>
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
            <TextInput2
              placeholder="Select Date"
              width={'90%'}
              editable={false}
              paddingHorizontal={10}
              value={choseDate}
            />
            <TouchableOpacity onPress={() => setOpenThird(true)}>
              <Ionicons name="calendar-outline" size={30} color={GlobalColor.Secondary} />
            </TouchableOpacity>
          </View>



          <Text Bold style={{paddingVertical: 15, paddingHorizontal: 0}}>
            Current Shift
          </Text>
          <View style={styles.inputBox}>
            <TextInput2
              value={currentShift}
              width={'80%'}
              editable={false}
              paddingHorizontal={10}
            />
          </View>
          {/* Button */}
          
          {
            flexiShiftElig==='N' ? (
              <View style={{  marginTop:10, width:"100%",alignSelf:'center' }}>
                <Button
                  onPress={() => {
                    handleSubmit()
                  }}
                  title={"Submit"}
                ></Button>
            </View>
            ):null
          }


          {/* Report */}
          <Text style={{textAlign: 'center',marginTop:10}}>Report</Text>
          {shiftStatus.length>0?(
          <DataTable
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginVertical: 10,
            }}>
            <DataTable.Header style={{backgroundColor: GlobalColor.White}}>
              <DataTable.Title>
                <Text Bold style={{color: GlobalColor.Primary, fontSize: GlobalFontSize.Small}}>Shift</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text Bold style={{color: GlobalColor.Primary, fontSize: GlobalFontSize.Small}}>
                  Applicable Date
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text Bold style={{color: GlobalColor.Primary, fontSize: GlobalFontSize.Small}}>Status</Text>
              </DataTable.Title>
            </DataTable.Header>


            <FlatList
              data={shiftStatus}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View  style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  marginVertical: 10,
                  flexDirection:'row',
                  justifyContent:'space-between',
                  padding:10
                }}>
                  <Text>{item.SHFT_START_SHIFT}</Text>
                  <Text>{moment(item.SHFT_START_DATE).format('DD-MMM-YYYY')}</Text>
                  <Text>{item.STATUS === 'Approved' ? (
                        <Text style={{color: 'green'}}>Approved</Text>
                      ) : (
                        <Text style={{color: 'red'}}>Pending</Text>
                      )}</Text>
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
    backgroundColor:GlobalColor.PrimaryLight
  },
  box: {
    width: '100%',
    padding: 5,
    paddingVertical:10,
    backgroundColor: '#FFF',
    // alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 5,
    borderRadius: 0,
  },
    inlineDatepicker:{
      width: '100%',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
      marginVertical: 0,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  inputBox: {
    width: '100%',
    // alignSelf: 'center',
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
    borderRadius: 0,
  },
  tabsContainerStyle: {
    marginTop: 10,
    borderRadius:0,
    width:'100%',
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
  // content: {
  //   top: 10,
  //   alignItems: 'center',
  //   padding: 10,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.18,
  //   shadowRadius: 2.0,

  //   elevation: 5,
  // },
  dataRow:{
    width:'100%',
    justifyContent:'space-between',
    flexDirection:'row',
    borderBottomWidth:0.5,
    paddingHorizontal:10, 
    paddingVertical:5
  },
  // addtnlBtn:{
  //   position:'absolute',
  //   right:10,
  //   top:0,
  //   zIndex:55555
  // }
  addtnlBtn:{
    position:'absolute',
    right:10,
    top:0,
    zIndex:55555
  },
});

//make this component available to the app
export default Shift;
