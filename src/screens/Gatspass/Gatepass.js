// /import liraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Gatepass = ({ navigation }) => {
  const { authContext, AppUserData } = useContext(AuthContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalVisibleSecond, setmodalVisibleSecond] = useState(false);
  const [empLoc, setEmpLoc] = useState([]);
  const [empLocCode, setEmpLocCode] = useState([]);
  const [searchLevel] = useState();
  const [searchLevelData, setSearchLevelData] = useState([])
  const [loader, setLoader] = useState(false)
  const options = ['Yes', 'No'];
  const [selectBuilding, setSelectBuilding] = useState([]);
  const [BuildingData, setBuildingData] = useState([]);
  const [removeBuilding, setRemoveBuilding] = useState()
  // const[BuildingData,setBuildingData] =useState([]);
  // const [BuildingData, setBuildingData] = useState([
  //   {
  //     data: 'Juventus',
  //     id: 'JUVE',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Real Madrid',
  //     id: 'RM',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Barcelona',
  //     id: 'BR',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'PSG',
  //     id: 'PSG',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'FC Bayern Munich',
  //     id: 'FBM',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Manchester United FC',
  //     id: 'MUN',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Manchester City FC',
  //     id: 'MCI',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Everton FC',
  //     id: 'EVE',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Tottenham Hotspur FC',
  //     id: 'TOT',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Chelsea FC',
  //     id: 'CHE',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Liverpool FC',
  //     id: 'LIV',
  //     checked: 'false',
  //   },
  //   {
  //     data: 'Arsenal FC',
  //     id: 'ARS',
  //     checked: 'false',
  //   },

  //   {
  //     data: 'Leicester City FC',
  //     id: 'LEI',
  //     checked: 'false',
  //   },
  // ]);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectTime, setselectTime] = useState();
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [employ, setEmploy] = useState('');
  const [show, setShow] = useState(false);
  const [searchEmp, setSearchEmp] = useState();

  const GetLocationListVGPSApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    console.log("UserName", userId);
    let apiData = { "UserName": userId }
    console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetLocationListVGPS', apiData, token)
      .then(result => {
        // console.log("APiresult", result);
        setLoader(false);
        let Location = result.Value[0].LOCN
        let LocationCode = result.Value[0].CODE
        console.log("Apivaue", Location, LocationCode)
        setEmpLoc(Location)
        setEmpLocCode(LocationCode)
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
  const GetSearchLevelsListVGPSApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    console.log("UserName", userId);
    let apiData = { "UserName": userId }
    console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetSearchLevelsListVGPS', apiData, token)
      .then(result => {
        setLoader(false);
        let arrData = result.Value.map((item) => { return { 'label': item.MEANING } })
        setSearchLevelData(arrData)
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

  // saerch by name 

  const getEmpllookupVGPSApi = (values) => {
    let token = AppUserData.token
    let userData = AppUserData.data.userId
    if (searchEmp === '') {
      <Text style={{ color: 'red' }}>please enter a valid keyWord</Text>
      return
    } else {
      let apiData = {
        Search: userData
        // values.searchEmp
      }
      console.log('post data', apiData);
      setLoader(true);
      ApiService.PostMethode('/getEmpllookupVGPS', apiData, token)
        .then(result => {
          setLoader(false);
          // console.log('ApiResult', result);
          let responseData = result.Value
          // setSearchedData(responseData)
          console.log('responseData', responseData)
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
  const GetAccessListVGPSApi = () => {
    let userId = AppUserData.data.EMPL_NAME
    let apiData = {
      UserName: "MCHAK",
      LocationCode: '002',
      LevelID: "1"
    }
    console.log('post data', apiData);
    console.log('post userId', userId);
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/GetAccessListVGPS', apiData, token)
      .then(result => {
        setLoader(false);
        let responseData = result.Value
        console.log('building data', responseData)
        setBuildingData(responseData)
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


  useEffect(() => {
    GetLocationListVGPSApi()
    GetSearchLevelsListVGPSApi()
    getEmpllookupVGPSApi()
    GetAccessListVGPSApi()
  }, [])
  useEffect(() => {
    console.log(selectBuilding);
  }, [selectBuilding])




  const gatePassScheema = yup.object().shape({
    office: yup.string().required('leave type is required'),
    date: yup.string().required('select one is required'),
    time: yup.string().required('select one period'),
    duration: yup
      .string()
      .required('duration  is required')
      .max(24, 'duration should be less then 24 hours'),
    searchLevel: yup.string().required('select one searchLevel please'),
    reason: yup.string().required('select one reason please'),
    persionalVehical: yup.string().required('post one comment'),
    internalVehical: yup.string().required('select one period'),
    BuildingData: yup.string().required('you must select any building it is required'),
    searchEmp: yup.string().required('Provide Your reason please'),
  });
  const fromRef = useRef(null);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleBuilding = () => {
    setShow(!show);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setselectTime(date);
    hideDatePicker();
  };

  return (

    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    ) : (
      <SafeAreaView style={{ flex: 1, }}>
        <LinearGradient
          colors={['#4174D0', '#6ef7ff']}
          style={styles.gradient}>
          <View style={styles.container}>
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
                onPress={() => navigation.navigate('Home')}
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
              Visitor Gatepass
            </Text>
          </View>
        </LinearGradient>
        {/* BODY */}
        <Formik
          innerRef={fromRef}
          validationSchema={gatePassScheema}
          initialValues={{
            office: '',
            date: '',
            time: '',
            duration: '',
            searchLevel: '',
            reason: '',
            persionalVehical: '',
            internalVehical: '',
            building: [],
            searchEmp: '',
          }}
          onSubmit={values => {
            let payload = {
              office: values.office,
              date: values.date,
              time: values.time,
              duration: values.duration,
              searchLevel: values.searchLevel,
              reason: values.reason,
              persionalVehical: values.persionalVehical,
              internalVehical: values.internalVehical,
              building: values.building,
              searchEmp: values.searchEmp,
            };
            console.log("payload", payload);
            navigation.navigate("VisitorDetails", {
              visitorpayload: payload,
            })
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
            <ScrollView nestedScrollEnabled={true} style={{ marginBottom: '18%', marginTop: 5 }}>
              <View style={{ paddingBottom: 20 }}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Your Location
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    borderWidth: 1,
                    borderTopColor: '#80406A',
                    borderStartColor: '#4174D0',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#4174D0',
                    alignSelf: 'center',
                    padding: 10,
                    justifyContent: 'space-between',
                  }}
                  onPress={toggleModal}>
                  <Text>
                    {empLoc}
                  </Text>
                  <Feather name="chevron-down" size={20} />

                  <Modal isVisible={isModalVisible} SLI>
                    <View
                      style={{
                        flex: 0.2,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                      }}>
                      <View
                        style={{ width: '90%', justifyContent: 'space-evenly' }}>
                        <LinearGradient
                          style={{ margin: 5, borderRadius: 8 }}
                          colors={['#4174D0', '#6ef7ff']}>
                          <TouchableOpacity
                            style={{
                              width: '90%',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              padding: 10,
                            }}
                            onPress={() => {
                              // handleRadioStatus('A');
                              setModalVisible(false);
                            }}>
                            {empLoc != '' ? (
                              <Text style={{ color: 'white' }}>{empLoc}</Text>
                            ) : (
                              <Text style={{ color: 'white' }}>Data Not Found</Text>
                            )}
                            {empLoc == true ? (
                              <Ionicons
                                name="checkbox"
                                size={20}
                                color={'#fff'}
                              />
                            ) : (
                              <Ionicons
                                name="square-outline"
                                size={20}
                                color={'#fff'}
                              />
                            )}
                          </TouchableOpacity>
                        </LinearGradient>

                        {/* <LinearGradient
                        style={{ margin: 5, borderRadius: 8 }}
                        colors={['#4174D0', '#6ef7ff']}>
                        <TouchableOpacity
                          onPress={() => {
                            handleRadioStatus('B');
                            setModalVisible(false);
                          }}
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            padding: 10,
                          }}>
                          <Text style={{ color: 'white' }}>
                            HEAD OFFICE - DELHI
                          </Text>
                          {state == true ? (
                            <Ionicons
                              name="checkbox"
                              size={20}
                              color={'#fff'}
                            />
                          ) : (
                            <Ionicons
                              name="square-outline"
                              size={20}
                              color={'#fff'}
                            />
                          )}
                        </TouchableOpacity>
                      </LinearGradient> */}
                      </View>
                    </View>
                  </Modal>
                </TouchableOpacity>

                {/* Selct Date And Time */}

                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    console.log(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  locale="en_GB"
                  date={new Date()}
                  isDarkModeEnabled={true}
                  is24Hour={true}
                />

                <View style={{ width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '99%',
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Select Date and Time
                    </Text>
                    <Text
                      style={{
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Duration
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '69%',
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderTopColor: '#2757C3',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 6,
                        alignSelf: 'center',
                      }}>
                      <Text style={{ color: 'gray' }}>
                        {moment(date).subtract(10, 'days').calendar()}
                      </Text>
                      <Text style={{ color: 'gray' }}>
                        {moment(selectTime).format('LT')}
                      </Text>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: 65,
                            justifyContent: 'space-around',
                          }}>
                          <TouchableOpacity onPress={() => setOpen(true)}>
                            <Ionicons
                              name="calendar-outline"
                              size={25}
                              color={'#4174D0'}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              showDatePicker();
                            }}>
                            <Ionicons
                              name="time-outline"
                              size={25}
                              color={'#4174D0'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        width: '30%', borderWidth: 1,
                        padding: 6,
                        borderTopColor: '#2757C3',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                      }}
                      onChangeText={handleChange('duration')}
                      onBlur={handleBlur('duration')}
                      value={values.duration}
                      keyboardType={'number-pad'} />
                  </View>
                  {errors.duration && touched.duration && (
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingVertical: 2,
                      }}>
                      <Text style={{ fontSize: 12, color: 'red', textAlign: 'right' }}>
                        {errors.duration}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Search Level */}
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Search Level *
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setmodalVisibleSecond(true);
                    }}
                    style={{
                      width: '90%',
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderTopColor: '#80406A',
                      borderStartColor: '#ad3231',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#ad3231',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 6,
                      alignSelf: 'center',
                    }}>
                    <Text style={{ color: 'gray' }}>{values.searchLevel}</Text>
                    <View>
                      <Feather name="chevron-down" size={20} color={'#ad3231'} />
                    </View>
                  </TouchableOpacity>

                  <Modal isVisible={modalVisibleSecond}>
                    <View style={{ flex: 0.5, paddingVertical: 10 }}>
                      <LinearGradient
                        style={{
                          borderRadius: 8,
                          paddingBottom: 10,
                          paddingHorizontal: 10,
                        }}
                        colors={['#4174D0', '#6ef7ff']}>
                        {searchLevelData != '' ? (
                          <RadioButtonRN
                            boxStyle={{ backgroundColor: 'transparent' }}
                            textStyle={{ color: '#fff' }}
                            duration={100}
                            data={searchLevelData}
                            selectedBtn={e => {
                              console.log(e);
                              let data = e.label;
                              setFieldValue('searchLevel', data);
                              setmodalVisibleSecond(false);
                            }}
                            icon={
                              searchLevel == true ? (
                                <Feather
                                  name="check-circle"
                                  size={25}
                                  color="#2c9dd1"
                                />
                              ) : null
                            }
                          />
                        ) : (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>data not found</Text>
                          <Ionicons name='close' size={30} onPress={() => {
                            setmodalVisibleSecond(false);
                          }} />
                        </View>)}
                      </LinearGradient>
                    </View>
                  </Modal>
                </View>
                {errors.searchLevel && touched.searchLevel && (
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      paddingVertical: 2,
                    }}>
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.searchLevel}
                    </Text>
                  </View>
                )}

                {/* Vehicle number */}
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Reason To Come *
                  </Text>
                  <TextInput
                    placeholder="reason"
                    onChangeText={handleChange('reason')}
                    onBlur={handleBlur('reason')}
                    value={values.reason}
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderTopColor: '#80406A',
                      borderStartColor: '#4174D0',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#4174D0',
                      borderRadius: 5,
                      paddingVertical: 5,
                    }}
                  />
                  {errors.reason && touched.reason && (
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingVertical: 2,
                      }}>
                      <Text
                        style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>
                        {errors.reason}
                      </Text>
                    </View>
                  )}
                </View>

                {/* personal vehical */}

                <View style={{ width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '99%',
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      personal vehical
                    </Text>

                    <Text
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Internal vehical
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}>
                    <SelectDropdown
                      defaultButtonText="Yes"
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderTopColor: '#80406A',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                        width: '50%',
                        height: 40,
                        borderRadius: 5,
                      }}
                      buttonTextStyle={{ fontSize: 16 }}
                      dropdownStyle={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderTopColor: '#80406A',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                        borderRadius: 5,
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownBackgroundColor={'transparent'}
                      data={options}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      icon={
                        <Feather
                          name="chevron-down"
                          size={20}
                          color={'#4174D0'}
                        />
                      }
                    />

                    <SelectDropdown
                      defaultButtonText="Yes"
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderTopColor: '#80406A',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                        width: '50%',
                        height: 40,
                        borderRadius: 5,
                      }}
                      dropdownStyle={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderTopColor: '#80406A',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                        borderRadius: 5,
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonTextStyle={{
                        fontSize: 16,
                        justifyContent: 'flex-start',
                      }}
                      dropdownBackgroundColor={
                        <LinearGradient
                          style={{ margin: 5, borderRadius: 8 }}
                          colors={['#4174D0', '#6ef7ff']}
                        />
                      }
                      data={options}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      icon={<Feather name="chevron-down" size={30} />}
                    />
                  </View>
                </View>

                {/* Select Building / multiple selection*/}

                <View>
                  <View
                    style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, top: 1 }}>Select Building *</Text>
                    <View
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        borderTopColor: '#80406A',
                        borderStartColor: '#6ef7ff',
                        borderBottomColor: '#2757C3',
                        borderEndColor: '#6ef7ff',
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          {
                           selectBuilding.map((element) => {
                            console.log("element", element)
                            return (
                              <View
                                style={{
                                  padding: 5,
                                  backgroundColor: '#ad3213',
                                  margin: 5,
                                  borderRadius: 20,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text style={{ color: '#fff', padding: 5 }}>
                                  {element}
                                </Text>
                                <TouchableOpacity onPress={(element) => {
                                  let arr = selectBuilding.filter(item => {
                                    if (item !== element) {
                                      return item
                                    }
                                  })
                                  setSelectBuilding(arr)
                                }}>
                                  <Ionicons name="remove-circle" size={30} />
                                </TouchableOpacity>
                              </View>
                            )
                          })}
                        </ScrollView>
                        <TouchableOpacity onPress={toggleBuilding}>
                          {show == true ? (
                            <Ionicons name="caret-up" size={30} />
                          ) : (
                            <Ionicons name="caret-down" size={30} />
                          )}
                        </TouchableOpacity>
                      </View>
                      {show == true ? (
                        <View
                          style={{
                            width: '100%',
                            padding: 10,
                            borderWidth: 0.5,
                            // borderTopColor: '#80406A',
                            borderStartColor: '#6ef7ff',
                            borderBottomColor: '#2757C3',
                            borderEndColor: '#6ef7ff',
                            borderRadius: 5,
                          }}>
                          <FlatList
                            data={BuildingData}
                            keyExtractor={item => item.BID.toString()}
                            renderItem={({ item, index }) => (
                              <View
                                style={{
                                  width: '100%',
                                  padding: 10,
                                  borderWidth: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  margin: 2,
                                  alignSelf: 'center',
                                  borderTopColor: '#80406A',
                                  borderStartColor: '#6ef7ff',
                                  borderBottomColor: '#2757C3',
                                  borderEndColor: '#6ef7ff',
                                  borderRadius: 5,
                                }}>
                                <Text>{item.BNAME}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    setSelectBuilding('BuildingData', [...selectBuilding, item.BNAME]);
                                    // fromRef.current.setSelectBuilding('BuildingData', [...selectBuilding, item.BNAME]);
                                  }}>
                                  {selectBuilding == true ? (
                                    <Ionicons
                                      name="remove-circle"
                                      size={25}
                                      color={'#4174D0'}
                                    />
                                  ) : (
                                    <Ionicons
                                      name="add-circle"
                                      size={25}
                                      color={'#4174D0'}
                                    />
                                  )}
                                </TouchableOpacity>
                              </View>
                            )}
                          />
                      {errors.BuildingData && touched.BuildingData && (
                        <View
                          style={{
                            width: '90%',
                            alignSelf: 'center',
                            paddingVertical: 2,
                          }}>
                          <Text style={{ fontSize: 12, color: 'red' }}>
                            {errors.BuildingData}
                          </Text>
                        </View>
                      )}
                        </View>
                      ) : null}



                    </View>
                  </View>
                </View>

                {/* SEARCH BOX */}
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Vehicle Number *
                  </Text>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderTopColor: '#80406A',
                      borderStartColor: '#6ef7ff',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#6ef7ff',
                      borderRadius: 5,
                      alignSelf: 'center',
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
                      onChangeText={handleChange('searchEmp')}
                      onBlur={handleBlur('searchEmp')}
                      value={values.searchEmp}
                      placeholder="Search By Name/Dept/Staff/ID"
                      style={{
                        width: '70%',
                        paddingVertical: 5,
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => { GetSearchLevelsListVGPSApi() }}
                      style={{
                        width: '15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons name="send" size={20} color={'#4174D0'} />
                    </TouchableOpacity>
                  </View>
                  {errors.searchEmp && touched.searchEmp && (
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        paddingVertical: 2,
                      }}>
                      <Text
                        style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>
                        {errors.searchEmp}
                      </Text>
                    </View>
                  )}
                </View>

                {/* TExtInput */}
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Name
                  </Text>
                  <TextInput
                    editable={false}
                    style={{
                      width: '90%',
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderTopColor: '#80406A',
                      borderStartColor: '#6ef7ff',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#6ef7ff',
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                  />
                </View>

                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Name
                  </Text>
                  <TextInput
                    editable={false}
                    style={{
                      width: '90%',
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderTopColor: '#80406A',
                      borderStartColor: '#6ef7ff',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#6ef7ff',
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                  />
                </View>

                {/* Next Button */}

                <View style={{ paddingVertical: 10 }}>
                  <LinearGradient
                    colors={['#4174D0', '#6ef7ff']}
                    style={{
                      margin: 5,
                      borderRadius: 8,
                      width: '90%',
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        paddingVertical: 10,
                        alignItems: 'center',
                        marginTop: 5,
                      }}
                      onPress={() => {
                        handleSubmit();
                        console.log("done")
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#fff',
                          letterSpacing: 2,
                        }}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      </SafeAreaView>
    )
  );

}
// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },
});

// //make this component available to the app
export default Gatepass;
