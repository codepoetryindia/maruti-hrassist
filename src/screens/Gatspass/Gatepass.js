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
  SafeAreaView,
  Pressable,
  Alert
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
  const options = [{
    label: "Yes",
    value: "Y"
  }, {
    label: "No",
    value: "N"
  }];
  const [selectBuilding, setSelectBuilding] = useState([]);
  const [BuildingData, setBuildingData] = useState([]);
  const [removeBuilding, setRemoveBuilding] = useState()
  const [selectTime, setselectTime] = useState();
  const [OpenDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [employ, setEmploy] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [searchedNameData, setSearchedNameData] = useState('');
  const [empmodalVisible, setEmpModalVisible] = useState(false);


  const [Locations, setLocations] = useState([]);


  const GetLocationListVGPSApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    console.log("UserName", userId);
    let apiData = { "UserName": userId }
    console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetLocationListVGPS', apiData, token)
      .then(result => {
        console.log("APiresult GetLocationListVGPS", result);
        setLoader(false);

        setLocations(result.Value);
        let Location = result.Value[0].LOCN
        let LocationCode = result.Value[0].CODE
        console.log("LocationCode", LocationCode)
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
        console.log(result);
        setLoader(false);
        let arrData = result.Value.map((item) => { return { 'label': item.MEANING, value: item.VAL } })
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
          setEmpModalVisible(true)

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
  const GetAccessListVGPSApi = (locationcode = '001') => {
    let userId = AppUserData.data.userId
    // let newLoc = empLocCode.split(",")[0]
    let apiData = {
      UserName: userId,
      LocationCode: locationcode,
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
        // console.log('building data', responseData)
        let responseDataNew = responseData.map(element => {
          return {
            ...element,
            isSelected: false
          }
        })
        // console.log("response data new", responseDataNew);
        setBuildingData(responseDataNew)
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
    GetAccessListVGPSApi()
  }, [])
  // useEffect(() => {
  //   console.log(selectBuilding);
  // }, [selectBuilding])

  const emptyList = () => {
    setSearch('')
  }


  const gatePassScheema = yup.object().shape({
    office: yup.string().required('Location is required'),
    // date: yup.string().required('select one is required'),
    duration: yup
      .string()
      .required('Duration  is required')
      .max(24, 'duration should be less then 24 hours'),
    searchLevel: yup.string().required('select one searchLevel please'),
    reason: yup.string().required('Reason is required'),
    persionalVehical: yup.string().required('Select an option'),
    internalVehical: yup.string().required('Select an option'),
    vehicleNumber: yup.string()
    .test('Vehicle Number is required', function () {
      if (this.parent.persionalVehical === 'N') {
        return true;
      } else {
        if (this.parent.vehicleNumber) {
          return true;
        } else {
          return false;
        }
      }
    }),
    building: yup.string().required('you must select any building it is required'),
    searchEmp: yup.string().required('Please select an employee'),
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
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
        visible={loader}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <LinearGradient
        colors={['#00B4DB', '#0083B0']}
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
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 30,
              fontWeight: "700"
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
          date: new Date(),
          duration: '',
          searchLevel: '',
          reason: '',
          persionalVehical: '',
          internalVehical: '',
          vehicleNumber: '',
          building: '',
          searchEmp: '',
          "perName": "",
          "Desig": "",
          "noOfPerson": "",
          "empId": "",
        }}
        onSubmit={values => {
          console.log("values", BuildingData);

          let buldings = BuildingData.filter(element => {
            if (element.isSelected) {
              return element.BID;
            }
          }).map(obj => obj.BID)

          if(buldings.length == 0){
            Alert.alert(
              "Error",
              "Building Not selected",
              [
                {
                  text: "okay",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },               
              ]
            );
            return;
          }

          // let payload = {
          //   office: values.office,
          //   date: values.date,
          //   time: values.time,
          //   duration: values.duration,
          //   searchLevel: values.searchLevel,
          //   reason: values.reason,
          //   persionalVehical: values.persionalVehical,
          //   internalVehical: values.internalVehical,
          // };
          let newdata = {
            "id": "1",
            "location": values.office.split(",")[0],
            "visitDate": moment(values.date).format('YY/MM/DD'),
            "authorizedPerson": AppUserData.data.userId,
            "Pvehicle": values.persionalVehical,
            "VisType": "O",
            "visLevel": "1",
            "buildings": buldings,
            "duration": values.duration,
            "exArrTime": moment(values.date).format('MM-DD-YY hh:mm'),
            "SearchLevel": values.searchLevel,
            "interVehicle": values.internalVehical,
            "ReasonToCome": values.reason,
            "perName": values.perName,
            "Desig": values.Desig,
            "noOfPerson": "5",
            "empId": values.empId,
            "vehicleNumber": values.vehicleNumber,
            "dateDummy": values.date
          }
          console.log("payload", newdata);
          navigation.navigate("VisitorDetails", {
            visitorpayload: newdata,
          })
        }}>


        {

          ({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <ScrollView nestedScrollEnabled={true} style={{ marginTop: 5, paddingHorizontal: 15 }}>
              <View style={{ paddingBottom: 5 }}>
                <Text
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Your Location
                </Text>
              </View>

              <SelectDropdown
                data={Locations}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  console.log(selectedItem);
                  setBuildingData([]);
                  setFieldValue('office', selectedItem.CODE);
                  GetAccessListVGPSApi(selectedItem.CODE.split(',')[0]);


                }}
                defaultButtonText={'Select Location'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.LOCN
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.LOCN
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              />
              {errors.office && touched.office && (
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    paddingVertical: 2,
                  }}>
                  <Text style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                    {errors.office}
                  </Text>
                </View>
              )}





              {/* Selct Date And Time */}

              <DatePicker
                modal
                mode="datetime"
                open={OpenDateTimePicker}
                date={values.date}
                onConfirm={date => {
                  console.log(date);
                  setFieldValue('date', date);
                  setOpenDateTimePicker(false);
                  // setDate(date);
                  // console.log(date);
                }}
                onCancel={() => {
                  setOpenDateTimePicker(false);
                }}
              />

              <View style={{ width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>

                  <View style={{ width: "70%", paddingRight: 10 }}>
                    <Text
                      style={{
                        paddingHorizontal: 0,
                        paddingTop: 10,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Select Date and Time
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 6,
                        alignSelf: 'center',
                        borderColor: '#444'
                      }}
                      onPress={() => setOpenDateTimePicker(true)}
                    >
                      <Text style={{ color: 'gray' }}>
                        {moment(values.date).format('YY/MM/DD hh:mm')}
                      </Text>
                      {/* <Text style={{ color: 'gray' }}>
                    {moment(selectTime).format('LT')}
                  </Text> */}
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            // width: 65,
                            justifyContent: 'space-around',
                          }}>
                          <Ionicons
                            name="calendar-outline"
                            size={25}
                            color={'#0083B0'}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>


                  <View style={{ width: "30%" }}>
                    <Text
                      style={{
                        paddingHorizontal: 0,
                        paddingTop: 10,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Duration
                    </Text>
                    <TextInput
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        padding: 6,
                        backgroundColor: '#fff',
                        borderColor: '#444'
                      }}
                      onChangeText={handleChange('duration')}
                      onBlur={handleBlur('duration')}
                      value={values.duration}
                      keyboardType={'number-pad'}
                    />
                  </View>
                </View>
                {errors.duration && touched.duration && (
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      paddingVertical: 2,
                    }}>
                    <Text style={{ fontSize: 14, color: 'red', textAlign: 'right' }}>
                      {errors.duration}
                    </Text>
                  </View>
                )}
              </View>

              {/* Search Level */}
              <View style={{ marginVertical: 5, }}>

                <View style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      paddingHorizontal: 0,
                      // paddingVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Search Level*
                  </Text>
                </View>

                <SelectDropdown
                  data={searchLevelData}
                  onSelect={(selectedItem, index) => {
                    // console.log(selectedItem, index);
                    console.log(selectedItem);
                    setFieldValue('searchLevel', selectedItem.value);

                  }}
                  defaultButtonText={'Select Search Level'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.label
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.label
                  }}
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown2DropdownStyle}
                  rowStyle={styles.dropdown2RowStyle}
                  rowTextStyle={styles.dropdown2RowTxtStyle}
                />
                {errors.searchLevel && touched.searchLevel && (
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      paddingVertical: 2,
                    }}>
                    <Text style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                      {errors.searchLevel}
                    </Text>
                  </View>
                )}
              </View>




              {/* Reason To come number */}
              <View style={{ marginVertical: 5 }}>
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingHorizontal: 0,
                      marginVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Reason To Come *
                  </Text>
                  <TextInput
                    placeholder="Reason"
                    onChangeText={handleChange('reason')}
                    onBlur={handleBlur('reason')}
                    value={values.reason}
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 6,
                      alignSelf: 'center',
                      borderColor: '#444',
                      fontSize: 16,
                    }}
                  />
                  {errors.reason && touched.reason && (
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'center',
                        paddingVertical: 2,
                      }}>
                      <Text
                        style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                        {errors.reason}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Personal Vehicle */}
              <View style={{ width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View style={{ width: "48%" }}>
                    <Text
                      style={{
                        paddingHorizontal: 0,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Personal Vehicle
                    </Text>
                    <SelectDropdown
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.label
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.label
                      }}
                      // defaultButtonText="Yes"
                      dropdownBackgroundColor={'transparent'}
                      data={options}
                      onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index);
                        setFieldValue("persionalVehical", selectedItem.value);

                      }}
                      buttonStyle={styles.dropdown2BtnStyle}
                      buttonTextStyle={styles.dropdown2BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown2DropdownStyle}
                      rowStyle={styles.dropdown2RowStyle}
                      rowTextStyle={styles.dropdown2RowTxtStyle}
                    />
                    {errors.persionalVehical && touched.persionalVehical && (
                      <View
                        style={{
                          width: '100%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text
                          style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                          {errors.persionalVehical}
                        </Text>
                      </View>
                    )}

                  </View>

                  <View style={{ width: "48%" }}>
                    <Text
                      style={{
                        paddingHorizontal: 0,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Internal Vehicle
                    </Text>
                    <SelectDropdown
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.label
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.label
                      }}
                      data={options}
                      onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index);                    
                        setFieldValue("internalVehical", selectedItem.value);
                      }}
                      buttonStyle={styles.dropdown2BtnStyle}
                      buttonTextStyle={styles.dropdown2BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown2DropdownStyle}
                      rowStyle={styles.dropdown2RowStyle}
                      rowTextStyle={styles.dropdown2RowTxtStyle}
                    />
                    {errors.internalVehical && touched.internalVehical && (
                      <View
                        style={{
                          width: '100%',
                          alignSelf: 'center',
                          paddingVertical: 2,
                        }}>
                        <Text
                          style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                          {errors.internalVehical}
                        </Text>
                      </View>
                    )}

                  </View>
                </View>
              </View>


              {/* Vehicle number */}

              {
                values.persionalVehical == 'Y' ? (
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ width: '100%' }}>
                      <Text
                        style={{
                          paddingHorizontal: 0,
                          marginVertical: 5,
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        Vehicle Number *
                      </Text>
                      <TextInput
                        placeholder="Vehicle Number"
                        onChangeText={handleChange('vehicleNumber')}
                        onBlur={handleBlur('vehicleNumber')}
                        value={values.vehicleNumber}
                        style={{
                          width: '100%',
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                          padding: 6,
                          alignSelf: 'center',
                          borderColor: '#444',
                          fontSize: 16,
                        }}
                      />
                      {errors.vehicleNumber && touched.vehicleNumber && (
                        <View
                          style={{
                            width: '100%',
                            alignSelf: 'center',
                            paddingVertical: 2,
                          }}>
                          <Text
                            style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                            {errors.vehicleNumber}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                   ) : null
                } 


              {/* Select Building / multiple selection*/}
              <View>
                <View
                  style={{ width: '100%', alignSelf: 'center', marginTop: 10 }}>
                  <Text
                    style={{
                      paddingHorizontal: 0,
                      marginVertical: 5,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >Select Building *</Text>
                  <View
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: '#fff'
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 40,
                      }}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {/* <Text>{JSON.stringify(BuildingData)}</Text> */}
                        {
                          BuildingData.length > 0 && BuildingData.map((element, index) =>
                         
                            element.isSelected ? (
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
                                <TextInput 
                                editable={false} style={{ color: '#fff', padding: 5 }}>
                                  {element.BNAME}
                                </TextInput>
                                <TouchableOpacity
                                  onPress={(item) => {
                                    let newState = [...BuildingData];
                                    newState[index].isSelected = false;
                                    setBuildingData(newState);
                                    setSelectBuilding(newState);
                                   
                                  }}>
                                  <Ionicons name="remove-circle" size={30} />
                                </TouchableOpacity>
                              </View>

                            ) : null

                          )}
                        {selectBuilding.length < 0 ? 'hi':null }
                        
                      </ScrollView>
                      <TouchableOpacity onPress={toggleBuilding}>
                        {show == true ? (
                          <Ionicons name="caret-up" size={30} />
                        ) : (
                          <Ionicons name="caret-down" size={30} />
                        )}
                      </TouchableOpacity>
                    </View>

                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={show}
                      onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        // setModalVisible(!modalVisible);
                        onPress = { toggleBuilding }
                      }}
                    >
                      <View style={styles.centeredView}>
                        <TouchableOpacity style={styles.Modalclose}
                          onPress={toggleBuilding}
                        >
                          <Text style={styles.Modalclosetxt}>Done</Text>
                          {/* <Ionicons name="close" size={25} /> */}
                        </TouchableOpacity>
                        <Text style={styles.ModalHeading}>
                          Select Buildings
                        </Text>


                        <FlatList
                          data={BuildingData}
                          numColumns={2}
                          keyExtractor={item => item.BID.toString()}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              style={{
                                width: '48%',
                                padding: 10,
                                // borderWidth: 1,
                                borderColor: '#6e6e6e',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 2,
                                backgroundColor: item.isSelected ? '#C9EFD9' : "#eee",
                              }}
                              onPress={() => {
                                let newState = [...BuildingData];

                                if (item.isSelected) {
                                  newState[index].isSelected = false;
                                  setBuildingData(newState);
                                  setSelectBuilding(newState)


                                } else {
                                  newState[index].isSelected = true;
                                  setBuildingData(newState);
                                }

                              if(newState.length == 0){
                                setFieldValue("building", "");
                              }else{
                                setFieldValue("building", "added");
                              }

                              }}>
                              <Text style={styles.checkboxLabel}>{item.BNAME}</Text>
                              <View>
                                {item.isSelected ? (
                                  <Ionicons
                                    name="remove-circle"
                                    size={25}
                                    color={'#27ae60'}
                                  />
                                ) : (
                                  <Ionicons
                                    name="add-circle"
                                    size={25}
                                    color={'#4e4e4e'}
                                  />
                                )}
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    </Modal>

                  </View>

                  {errors.building && touched.building && (
                        <View
                          style={{
                            width: '100%',
                            alignSelf: 'center',
                            paddingVertical: 2,
                          }}>
                          <Text
                            style={{ fontSize: 14, color: 'red', textAlign: 'left' }}>
                            {errors.building}
                          </Text>
                        </View>
                      )}

                </View>
                    {/* {BuildingData.length == 0 ? (
                          <View
                            style={{
                              width: '90%',
                              alignSelf: 'center',
                              paddingVertical: 2,
                            }}>
                            <Text style={{ fontSize: 12, color: 'red' }}>
                             {errors.building}
                            </Text>
                          </View>
                        ):null} */}
              </View>

              {/* SEARCH BOX */}

              <View>
                <View style={{ width: '100%', marginVertical: 10 }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
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
                      onBlur={handleBlur('searchEmp')}
                      onChangeText={(data) => {
                        setSearch(data)
                      }}
                      style={{
                        width: '70%',
                        paddingVertical: 5,
                        fontSize: 16
                      }}
                    />
                    
                    {search !== '' ? (
                      <TouchableOpacity
                        style={{ borderRadius: 8, marginLeft: -10, alignSelf: 'center' }} onPress={() => { emptyList() }}>
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
                  {search==''? (
                          <View>
                            <Text style={{ fontSize: 12, color: 'red',marginTop:10 }}>
                              {errors.searchEmp}
                            </Text>
                          </View>
                        ):null}
                  
                  {/* {searchAlert !== '' ? (<View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    paddingVertical: 2,
                  }}>
                  <Text
                    style={{ fontSize: 12, color: 'red', textAlign: 'left' }}>
                    {searchAlert}
                  </Text>
                </View>) : null} */}
                </View>

                {/* TExtInput */}

                {loader == true ? (
                  <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                  />
                ) : null}
                <View style={{ width: '100%', alignSelf: 'center', marginVertical: 10 }}>
                  <Text style={{
                    paddingHorizontal: 0,
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}>Name</Text>
                  <TextInput
                    value={values.perName}
                    editable={false}
                    style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} />

                  <Text
                    style={{
                      paddingHorizontal: 0,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >Designation</Text>
                  <TextInput
                    value={values.Desig}
                    editable={false}
                    style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} />
                </View>

                {/* Next Button */}

                <View style={{ paddingVertical: 10 }}>
                  <LinearGradient
                    colors={['#00B4DB', '#0083B0']}
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

              {/* MOdal for searchEMP List */}
              <Modal transparent={false} visible={empmodalVisible}>
                <Pressable
                  style={{
                    backgroundColor: '#000000aa',
                    minHeight: "60%",
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 20,
                      borderRadius: 15,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>

                    <TouchableOpacity style={{ marginLeft: '90%', marginBottom: 10 }}
                      onPress={() => {
                        setEmpModalVisible(false)
                      }}>
                      <Ionicons
                        style={styles.searchIcon}
                        name="close-circle-outline"
                        size={25}
                        color="#2757C3" />
                    </TouchableOpacity>

                    {employ.length > 0 ? (

                      <FlatList
                        style={{ width: "100%", marginHorizontal: 10 }}
                        data={employ}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity style={styles.FlatListData}
                            onPress={() => {

                              setFieldValue("searchEmp", item.Name);
                              setFieldValue("perName", item.Name);                            
                              setFieldValue("empId", item['Staff No']);
                              setFieldValue("Desig", item['Desg']);
                              // console.log(item);
                              // setSearchedNameData(item)
                              setEmpModalVisible(false)
                            }}>
                            <Ionicons
                              style={styles.searchIcon}
                              name="person-circle-outline"
                              size={25}
                              color="#2757C3"
                            />
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
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
                                color="#2757C3" />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        )}
                      />
                    ) : (
                      <Text>Searched Data not found</Text>
                    )}
                  </View>
                </Pressable>
              </Modal>

              {/* end modal */}
            </ScrollView>
          )}
      </Formik>
    </SafeAreaView>

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
  FlatListData: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },

  // Dropdown styles
  dropdown2BtnStyle: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FFF',
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 },
  dropdown2DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown2RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: 16 },
  centeredView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff'

  },
  Modalclose: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 55,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  Modalclosetxt: {
    fontWeight: '700',
    color: "#fff"
  },
  checkboxLabel: {
    fontWeight: "700",
    fontSize: 16
  },
  ModalHeading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15
  }
});

// //make this component available to the app
export default Gatepass;
