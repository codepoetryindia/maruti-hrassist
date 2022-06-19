//import liraries
import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import { DataTable } from 'react-native-paper';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay/lib';








// create a component
const Leave = ({navigation}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [ResponseData, setResponseData] = useState([]);
  const [textinputSecondDate, setTextinputSecondDate] = useState('');
  const [open, setOpen] = useState(false);
  const [second, setSecond] = useState(false);
  const [applyLeave, setapplyLeave] = useState([0]);
  const [isSelected, setSelection] = useState('');
  const [period, setPeriod] = useState('');
  const [checked, setChecked] = useState('');
  const [validReason, setValidReason] = useState('Select Reason');
  const { authContext, AppUserData } = useContext(AuthContext);
  // const [comment, setComment] = useState('');

  // added for leave page 
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const [Leavereason, setLeavereason] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [LeaveDetailModal, setLeaveDetailModal] = useState(false);
  const [FinancialYear, setFinancialYear] = useState([]);
  const [EmpLeaveDetail, setEmpLeaveDetail] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [horizental, setHorizental] = useState(false);
  const [SelectedYear, setSelectedYear] = useState("");



  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getleavetypes();
      return () => unsubscribe;
    }, [])
  )

  var radio_props = [
    { label: 'Planned', value: "P" },
    { label: 'Unplanned', value: "U" },
  ];
  var radio_propsSecond = [
    { label: 'Full Day', value: 3 },
    { label: '1st Half', value: 1 },
    { label: '2nd Half', value: 2 },
  ];

  const leaveTypeScheema = yup.object().shape({
    leave: yup.string().required('leave type is required'),
    planned: yup.string().required('select one is required'),
    period: yup.string().required('select one period'),
    selectDate: yup.string().required('selectDate  is required'),
    reason: yup.string().required('select one reason please'),
    comment: yup.string().required('post one comment'),
  });
  const fromRef = useRef(null);

  const PostSubmitLeave = data => {
    console.log('post data', data);
    // let dummydata = 
    //   {
    //     "UserName" : "222852",
    //     "StaffNo" :  "222852",
    //     "PlannedUnplanned" : "Planned",
    //     "LeaveType" :"69#N#N",
    //     "Period" : "3",
    //     "FromDate" : "20-JUL-2022",
    //     "ToDate" : "21-JUL-2022",
    //     "Reason" : "skgn sk",
    //     "Comments" : ""
    // }

    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/SubmitLeave', data, token)
      .then(result => {
        setLoader(false);
        console.log('ApiResult', result);
        Toast.show(result.Result);
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
        } else if (error) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };

  const getleavetypes = () => {
    let apiData = { "UserName": AppUserData.data.userId };
    // AppUserData.data.userId 222852
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/GetInitialLeave  ', apiData, token)
      .then(result => {
        console.log("APiresult getleave types", result);
        setLoader(false);
        if (result.Value) {
          let updatedArray = [];
          result.Value.Table2.forEach((element, index) => {
            updatedArray.push({ ...element, id: index, Type: element.SHORT_NAME, value: element.ABSENCE_ID.replace(/\D/g, "") });
          });
          console.log(updatedArray);
          setLeaveTypes(updatedArray);
        } else {
          Toast.show('No Leave type found');
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

  const GetLeaveReason = (type) => {
    let apiData = { "LeaveType": type };
    // AppUserData.data.userId 222852
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/GetLeaveReason  ', apiData, token)
      .then(result => {
        console.log("APiresult GetLeaveReason", result);
        setLoader(false);
        if (result.Value) {
          let reasons = [];
          result.Value.forEach((element, index) => {
            reasons.push({ ...element, id: index });
          });
          setLeavereason(reasons);
        } else {
          Toast.show('No Leave type found');
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


  const getfinancialyear = () => {
    let apiData = {
      "UserName": AppUserData.data.userId
    };
    // AppUserData.data.userId 222852
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/LeaveStatus  ', apiData, token)
      .then(result => {
        console.log("APiresult getfinancialyear", result);
        setLoader(false);
        if (result.Value) {
          let reasons = [];
          setFinancialYear(result.Value.Table);
        } else {
          Toast.show('No Leave type found');
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

  const getEmpLeaveDetail = (fnyear) => {

    var curryear = ((new Date().getFullYear()).toString()).substring(0, 2);
    var from;
    if (parseInt(((fnyear.toString()).substring(0, 2))) == 99) {
      from = '01-apr-' + (parseInt(curryear) - 10) + ((fnyear.toString()).substring(0, 2));
    } else {
      from = '01-apr-' + curryear + ((fnyear.toString()).substring(0, 2));
    }
    var to = '31-mar-' + curryear + ((fnyear.toString()).substring(2, 4));
    let apiData = {
      "StaffNo": AppUserData.data.userId,
      "FromDate": from,
      "ToDate": to
    };

    // AppUserData.data.userId 222852
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/GetEmplLevDetail  ', apiData, token)
      .then(result => {
        console.log("APiresult GetEmplLevDetail", result);
        setLoader(false);
        let arr =[]
        if (result.Value) {
          arr.push(result.Value)
          console.log("arr",arr);
          setEmpLeaveDetail(...arr);
        } else {
          Toast.show('No Leave type found');
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


  const DeleteLeavePending = (data) => {
    
    let apiData = {
        "UserName" : AppUserData.data.userId,
        "ApplicationID" : data['Application ID']
    }
    // AppUserData.data.userId 222852
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/DeleteLeave  ', apiData, token)
      .then(result => {
        console.log("APiresult DeleteLeave", result);
        setLoader(false);
        if (result.Result) {
          getEmpLeaveDetail(SelectedYear);
          Toast.show(result.Result);
        } else {
          Toast.show('Unable To delete');
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


  


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLeave = index => {
    // console.log(index);
    if (index == 1) {
      getfinancialyear()
    }
    setapplyLeave(index);
  };



  const rederReason = ({ item }) => {
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
            setValidReason(item.REASON);
            fromRef.current.setFieldValue('reason', item.LOOKUP_CODE);
            setModalVisible(false);
          }}>
          <Text style={{ color: '#fff', fontSize: 15 }}>{item.REASON}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 ,marginBottom:50}}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >

            <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                  />
        <View showsVerticalScrollIndicator={false} style={styles.container}>
        <TouchableOpacity
            style={{alignSelf: 'flex-end',paddingHorizontal:20,marginBottom:10}}
            onPress={() => {
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              name="ellipsis-vertical-circle"
              size={25}
              color={'#00B4DB'}
            />
          </TouchableOpacity>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <SegmentedControlTab
              borderRadius={8}
              values={['Apply Leave', 'View Report']}
              selectedIndex={applyLeave}
              onTabPress={index => {
                handleLeave(index);
              }}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
            />
          </View>
          
          {horizental == true ? (
            <View
              style={{
                padding: 5,
                backgroundColor: '#00B4DB',
                position: 'absolute',
                top: 0,
                right: 50,
                zIndex:1000,
                borderRadius:8,
                
              }}>
                <TouchableOpacity
                style={{borderBottomWidth:1,paddingVertical:10}} onPress={() => {
                  navigation.navigate('LeaveBalance')
                }}>
                  
              <Text style={{color:'#fff',}}>Leave Balance</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingVertical:10}} onPress={() => {
                  navigation.navigate('SalaryDeduct')
                }}>
                  
              <Text style={{color:'#fff'}}>Salary Deduction</Text>
                </TouchableOpacity>
            </View>
          ) : null}

          <View>
            {applyLeave == 0 ? (
              <Formik
                innerRef={fromRef}
                // validationSchema={leaveTypeScheema}
                initialValues={{
                  leave: '',
                  planned: '',
                  period: '',
                  selectDate: '',
                  selectDateSecond: '',
                  reason: '',
                  comment: '',
                }}
                onSubmit={values => {
                  let data = {
                    UserName: AppUserData.data.userId,
                    StaffNo: AppUserData.data.userId,
                    PlannedUnplanned: values.planned,
                    LeaveType: values.leave,
                    Period: values.period,
                    FromDate: values.selectDate,
                    ToDate: values.selectDateSecond,
                    Reason: values.reason,
                    Comments: '',
                  };

                  let submitData =
                  {
                    "UserName": AppUserData.data.userId,
                    "StaffNo": AppUserData.data.userId,
                    "PlannedUnplanned": values.planned,
                    "LeaveType": values.leave,
                    "Period": values.period.toString(),
                    "FromDate": values.selectDate,
                    "ToDate": values.selectDateSecond,
                    "Reason": values.reason,
                    "Comments": values.comment
                  }
                  PostSubmitLeave(submitData);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                  <View
                    showsVerticalScrollIndicator={false}
                    style={{ height: '80%', paddingVertical: 1 }}>
                    <Text style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                      Leave Type
                    </Text>
                    <View style={styles.box}>
                      <FlatList
                        numColumns={4}
                        data={LeaveTypes}
                        keyExtractor={item => item.ABSENCE_ID.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              GetLeaveReason(item.value);
                              setChecked(item.id);
                              fromRef.current.setFieldValue('leave', item.ABSENCE_ID);
                              // setFieldValue(item.id);
                            }}
                            style={[
                              styles.circle,
                              {
                                backgroundColor:
                                  checked == item.id ? '#00B4DB' : null,
                              },
                            ]}>
                            <Text
                              style={{
                                color: checked == item.id ? '#fff' : '#000',
                              }}>
                              {item.Type}
                            </Text>
                          </TouchableOpacity>


                        )}
                      />
                    </View>
                    {errors.leave && touched.leave && (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {errors.leave}
                        </Text>
                      </View>
                    )}

                    <Text style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                      Planned/Unplanned
                    </Text>
                    <View style={styles.box}>
                      <View style={{ flexDirection: 'row', padding: 8 }}>
                        <RadioForm
                          borderRadius={0}
                          radio_props={radio_props}
                          initial={isSelected}
                          onPress={value => {
                            setSelection(isSelected);
                            fromRef.current.setFieldValue('planned', value);
                            // console.log('value', value);
                          }}
                          borderWidth={0.5}
                          buttonInnerColor={'#e74c3c'}
                          buttonOuterColor={'#23f'}
                          buttonSize={10}
                          buttonOuterSize={20}
                        />
                      </View>
                    </View>
                    {errors.planned && touched.planned && (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {errors.planned}
                        </Text>
                      </View>
                    )}

                    <Text style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                      Period
                    </Text>
                    <View style={styles.box}>
                      <View style={{ flexDirection: 'row', padding: 8 }}>
                        <RadioForm
                          borderRadius={0}
                          radio_props={radio_propsSecond}
                          initial={period}
                          onPress={value => {
                            setPeriod(period);
                            fromRef.current.setFieldValue(
                              'period',
                              value
                            );

                            console.log('second', value);
                          }}
                          borderWidth={0.5}
                          buttonInnerColor={'#e74c3c'}
                          buttonOuterColor={'#23f'}
                          buttonSize={10}
                          buttonOuterSize={20}
                        />
                      </View>
                    </View>
                    {errors.period && touched.period && (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {errors.period}
                        </Text>
                      </View>
                    )}
                    <Text style={{ paddingVertical: 10, width: "90%", alignSelf: 'center' }}>
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
                      }}>
                      <DatePicker
                        modal
                        open={open}
                        date={fromDate}
                        mode="date"
                        onConfirm={fromDate => {
                          setOpen(false);
                          setFromDate(fromDate);
                          let format = moment(fromDate).format('DD-MMM-YYYY');
                          // setTextinputDate(format);
                          // console.log(setTextinputDate);
                          fromRef.current.setFieldValue('selectDate', format);
                        }}
                        onCancel={() => {
                          setOpen(false);
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
                          placeholder="From"
                          style={{
                            color: '#000',
                            letterSpacing: 0,
                          }}
                          editable={false}
                          paddingHorizontal={14}
                          value={values.selectDate}
                        />
                        <TouchableOpacity onPress={() => setOpen(true)}>
                          <Ionicons
                            name="calendar-outline"
                            size={30}
                            color={'#0083B0'}
                          />
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
                          let formatSecond = moment(toDate).format('DD-MMM-YYYY');
                          setTextinputSecondDate(formatSecond);
                          console.log(setTextinputSecondDate);
                          fromRef.current.setFieldValue(
                            'selectDateSecond',
                            formatSecond,
                          );
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
                          value={values.selectDateSecond}
                        />
                        <TouchableOpacity onPress={() => setSecond(true)}>
                          <Ionicons
                            name="calendar-outline"
                            size={30}
                            color={'#0083B0'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {errors.selectDateSecond && touched.selectDateSecond && (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {errors.selectDateSecond}
                        </Text>
                      </View>
                    )}
                    <Text style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                      Choose Your Reason
                    </Text>

                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={toggleModal}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          padding: 10,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontWeight: '700' }}>{validReason}</Text>
                        <Ionicons
                          name="arrow-forward-outline"
                          color={'#23d'}
                          size={20}
                        />
                        <Modal isVisible={isModalVisible}>
                          <View>
                            <LinearGradient
                              colors={['#4174D0', '#6ef7ff']}
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
                                  paddingHorizontal: 30,
                                  paddingVertical: 5,
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    letterSpacing: 1,
                                  }}>
                                  Select Reason
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
                                data={Leavereason}
                                keyExtractor={item => item.id}
                                renderItem={rederReason}
                              />
                            </LinearGradient>
                          </View>
                        </Modal>
                      </TouchableOpacity>
                    </View>
                    {errors.reason && touched.reason && (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {errors.reason}
                        </Text>
                      </View>
                    )}
                    <View style={styles.comment}>
                      <TextInput
                        multiline={true}
                        numberOfLines={10}
                        placeholder={'Comment'}
                        onChangeText={handleChange('comment')}
                        onBlur={handleBlur('comment')}
                        value={values.comment}
                      />
                    </View>

                    {errors.comment && touched.comment && (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {errors.comment}
                        </Text>
                      </View>
                    )}
                    <View style={{ height: 100, marginTop: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          handleSubmit();
                        }}>
                        <LinearGradient
                          style={{
                            padding: 20,
                            borderRadius: 8,
                            alignItems: 'center',
                            width: '90%',
                            alignSelf: 'center',
                            marginVertical: 10,
                          }}
                          colors={['#4174D0', '#6ef7ff']}>
                          <Text style={{ fontSize: 16, color: '#fff' }}>
                            SUBMIT
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            ) : (
              <View style={{ paddingVertical: 10, height: '82%' }}>

                <Text style={{ paddingHorizontal: 20 }}>Select Financial Year</Text>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 2.0,
                    elevation: 2,
                    marginVertical: 15,
                  }}>
                  <SelectDropdown
                    defaultButtonText="Select Any Year"
                    data={FinancialYear}
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      width: '100%',
                      height: 40,
                      borderRadius: 5,
                    }}
                    dropdownStyle={{ borderRadius: 10 }}
                    rowTextStyle={{ textAlign: 'left', marginLeft: 5 }}
                    buttonTextStyle={{ textAlign: 'left', marginLeft: 1 }}
                    renderDropdownIcon={isOpened => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#444'}
                          size={18}
                        />
                      );
                    }}
                    onSelect={(selectedItem, index) => {
                      getEmpLeaveDetail(selectedItem.FNYR_YEAR);
                      setSelectedYear(selectedItem.FNYR_YEAR);
                      // console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.FNYR_YEAR;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.FNYR_YEAR;
                    }}
                  />
                </View>


                <Text style={{ textAlign: 'center' }}>
                  Tap on Leave To View Details
                </Text>

                {/* Headings */}

                <View style={{marginBottom:60}}>
                  <DataTable
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      marginVertical: '5%',
                    }}>
                    <DataTable.Header style={{ backgroundColor: '#f8eded' }}>
                      <DataTable.Title>
                        <Text style={{ color: 'gray', fontSize: 18 }}>Date</Text>
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Type</Text>
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Period</Text>
                      </DataTable.Title>
                      <DataTable.Title numeric>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Status</Text>
                      </DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                      data={EmpLeaveDetail}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => (
                        
                        <View style={{flex:1}}>
                          <TouchableOpacity 
                           style={{}} onPress={() => {
                            console.log(item)
                            setModalData(item)
                            setLeaveDetailModal(!LeaveDetailModal)
                            
                          }}>
                            <DataTable.Row
                              style={{borderBottomWidth: 1, paddingVertical: 5, }}>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  // marginTop: '2%',
                                }}>
                                <DataTable.Cell numeric>
                                  {item['From Date']}
                                </DataTable.Cell>
                              </View>

                              <DataTable.Cell numeric>{item['Leave Type']}</DataTable.Cell>
                              <DataTable.Cell numeric>
                                {item.Period}
                              </DataTable.Cell>
                              <DataTable.Cell numeric>
                                {item.Status === 'Approved' ? (
                                  <Text style={{ color: 'green' }}>{item.Status}</Text>
                                ) : (
                                  <Text style={{ color: 'red' }}>{item.Status}</Text>
                                )}
                              </DataTable.Cell>
                            </DataTable.Row>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </DataTable>
                  <Modal
                    isVisible={LeaveDetailModal}
                    // animationType="slide"
                    transparent={true}
                  >
                    <View style={{ backgroundColor: '#fff', padding: 10 ,borderRadius:8}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: 15,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: '#444',
                            fontSize: 18,
                            letterSpacing: 1,
                            fontWeight: '700'
                          }}>
                          Leave Details
                        </Text>
                        <TouchableOpacity onPress={() => setLeaveDetailModal(!LeaveDetailModal)}>
                          <Ionicons
                            name="close-circle-outline"
                            size={30}
                            color={'#444'}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '90%', }}>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Leave Type : {modalData["Leave Type"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Leave From : {modalData["From Date"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Leave To : {modalData["To Date"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            No of Days : {modalData.Days}
                          </Text>
                          <Text style={{fontWeight: "700", marginVertical: 8}}>
                              Planned/Unplanned : {modalData['Planned/Unplanned']}
                          </Text>                                      
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Period : {modalData.Period}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Reason : {modalData.Reason}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 12 }}>
                            Remark :
                          </Text>
                          <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end'}}>

                            {
                              modalData.Status && modalData.Status.toLowerCase() == 'pending' ? (
                                <TouchableOpacity
                                style={{ padding: 12, borderRadius: 5,backgroundColor: "#4174D0", minWidth:100, marginRight:25 }} 
                                onPress={() => {
                                  setLeaveDetailModal(!LeaveDetailModal);
                                  DeleteLeavePending(modalData);
                                }}>
                                <Text style={{color:'#fff', alignSelf:'center'}}>Delete</Text>
                              </TouchableOpacity>
                              ) : null
                            }
                              <TouchableOpacity
                                style={{ padding: 12, borderRadius: 5,backgroundColor: "#4174D0", minWidth:100 }} 
                                onPress={() => {
                                  setLeaveDetailModal(!LeaveDetailModal)
                                }}>
                                <Text style={{color:'#fff', alignSelf:'center'}}>Okay</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                    </View>
                  </Modal>

                </View>
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  tabStyle: {
    //custom styles
    paddingVertical: 10,
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#6ef7ff',
    borderBottomColor: '#2757C3',
    borderEndColor: '#6ef7ff',
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
    borderRadius: 10,
  },
  activeTabTextStyle: {
    color: '#2757C3',
  },
  circle: {
    borderWidth: 1,
    borderColor: '#00B4DB',
    // width: 30,
    // height: 30,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '2%',
    marginHorizontal: 28,
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
  },
  comment: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
    maxHeight: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10
  },
  spinnerTextStyle:{
    color:'#fff'
  }
});

//make this component available to the app
export default Leave;
