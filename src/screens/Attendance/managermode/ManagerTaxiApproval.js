// /import liraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert,
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../../../constants/Colors';
import Text from '../../../components/reusable/Text';
// import TextInput from '../../../components/reusable/TextInput';
import { Header } from '../../../components/reusable/Header';
import Button from '../../../components/reusable/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const ManagerTaxiApproval = ({ navigation, route }) => {
    const { authContext, AppUserData } = useContext(AuthContext)
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchLevelData, setSearchLevelData] = useState([])
    const [loader, setLoader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [BuildingData, setBuildingData] = useState([]);
    const [OpenDateTimePicker, setOpenDateTimePicker] = useState(false);
    const [OpenDateTimePicker2, setOpenDateTimePicker2] = useState(false);
    const [show, setShow] = useState(false);
    const [TaxiApiData, setTaxiApiData] = useState({});
    const [Alldata, setAlldata] = useState({})
    const [taxitypeList, settaxitypeList] = useState([]);
    const [TimeoutMax, setTimeoutMax] = useState(new Date());
    // const [TimeoutMin, setTimeoutMin] = useState(new Date());
    // const [TimeoutVal, setTimeoutVal] = useState(new Date());

    const [TimeinMax, setTimeinMax] = useState(new Date());
    // const [TimeinMin, setTimeinMin] = useState(new Date());
    




    const fromRef = useRef(null);
    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);
    }  


    const getTaxiDetails = () => {
        let token = AppUserData.token;
        let userId = AppUserData?.data?.userId;
        let apiData = { "SlipNO": route?.params?.data};
        setLoader(true);
        ApiService.PostMethode('/GetRequestDetail', apiData, token)
            .then(result => {
                console.log("APiresult GetRequest_Detail", result);
                stopLoader(false);
                if(result.Value &&result.Value){
                    setTaxiApiData({
                        empid:result.Value[0].TCAR_EMPL_ID.toString(),
                        Name:result.Value[0].EMPL_NAME,
                        slipno:result.Value[0].TCAR_SLIP_NO.toString(),
                        Dept:result.Value[0].DEPT_CODE,
                        Time_OUTSHOW: new Date(result.Value[0].DATE_OUT +" "+result.Value[0].TIME_OUT),
                        Time_INSHOW : new Date(result.Value[0].DATE_IN +" "+result.Value[0].TIME_IN),
                        // Time_OUTSHOW = data.d[0].DATE_OUT + " " +data.d[0].TIME_OUT;
                        // Time_INSHOW = data.d[0].DATE_IN + " " +data.d[0].TIME_IN;+
                        purpose:result.Value[0].TCAR_PURPOSE_VISIT,
                        StartPoint:result.Value[0].TCAR_START_PLACE,
                        desig:result.Value[0].TCAR_DESTINATION,
                        kms:result.Value[0].TCAR_APPOX_KMS_USAGE.toString(),
                        Partycode:result.Value[0].CODE_DESCRIPTION,
                        Addperson:result.Value[0].TCAR_NO_PERSONS.toString(),
                        perempid:result.Value[0]?.TCAR_STAFF_NO_PERSONS.split('@')[0],
                        Dpm_Taxi_Type:''
                    });
                    setAlldata(result.Value[0]);
                    getTaxiType(result.Value[0]?.TCAR_PARTY_CODE);
                    getcalender(result.Value[0]?.TCAR_LOCATION)
                }else{
                    Toast.show("No data found");

                }
            })
            .catch(error => {
                stopLoader(false);
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

    const getTaxiType = (party_Code) =>{
        let token = AppUserData.token;
        let userId = AppUserData?.data?.userId;
        let apiData = { "PartyCode": party_Code};
        setLoader(true);
        ApiService.PostMethode('/GetTaxiType', apiData, token)
            .then(result => {
                // console.log("APiresult GetTaxiType", result);
                stopLoader(false);
                if(result.Value &&result.Value.length > 0){
                    settaxitypeList(result.Value);
                }else{
                    Toast.show("No data found");
                }
            })
            .catch(error => {
                stopLoader(false);
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

    const getcalender = (locncode)=>{
        let token = AppUserData.token;
        let userId = AppUserData?.data?.userId;
        let apiData = { "Location": locncode};
        setLoader(true);
        ApiService.PostMethode('/GetCalender', apiData, token)
            .then(result => {
                console.log("APiresult GetCalender", result);
                stopLoader(false);
                if(result.Value &&result.Value.length > 0){
                    // settaxitypeList(result.Value);
                    let calender = result.Value.length-1;
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];
                    let date = new Date() ;
                    date.setMinutes(date.getMinutes());
                    let datetoshow = date.getDate();
                    let monthtoshow = monthNames[date.getMonth()];
                    let enddate = date.setDate(date.getDate() + calender);                                    
                    setTimeoutMax(new Date(enddate));
                    setTimeinMax(new Date(enddate));
                }else{
                    Toast.show("No data found");
                }
            })
            .catch(error => {
                stopLoader(false);
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


    const SubmitData = (values)=>{
        let token = AppUserData.token;
        let userId = AppUserData?.data?.userId;

        // {
        //     "TimeOut" : "04-APR-2022 10:30" ,
        //     "TimeIn" : "04-APR-2022 15:30",
        //     "Origin" : "Delhi",
        //     "Dest" : "Gurgaon",
        //     "Km" : "70",
        //     "PassCount" : "0",
        //     "AddPerson" : "0",
        //     "Purpose" : "ffgx",
        //     "VisitType" : "GENERAL",
        //     "ReqTaxiType" : "Dzire",
        //     "DPMTaxiType" : "Dzire",
        //     "SupTaxiType" : "Dzire",
        //     "PartyCode" : "TA056",
        //     "ExtnNo" : "",
        //     "SlipNo" : "11100",
        //     "UserName" : "174475",
        //     "Source" : ""
        //     }


        let apiData = {
                "TimeOut" : moment(values.Time_OUTSHOW).format("DD-MMMM-YYYY hh:mm"),
                "TimeIn" : moment(values.Time_INSHOW).format("DD-MMMM-YYYY hh:mm"),
                "Origin" : values.StartPoint,
                "Dest" : values.desig,
                "Km" : values.kms,
                "PassCount" : values.Addperson,
                "AddPerson" : values.Addperson,
                "Purpose" : values.purpose,
                "VisitType" : values.TCAR_VISIT_TYPE,
                "ReqTaxiType" : Alldata.TCAR_TYPE,
                "DPMTaxiType" : values.Dpm_Taxi_Type,
                "SupTaxiType" : values.Dpm_Taxi_Type,
                "PartyCode" : Alldata.TCAR_PARTY_CODE,
                "ExtnNo" : Alldata.TCAR_EXT_NO,
                "SlipNo" : route?.params?.data,
                "UserName" : userId,
                "Source" : ""
                };
        setLoader(true);
        ApiService.PostMethode('/ApproveTaxiRequest', apiData, token)
            .then(result => {
                console.log("APiresult ApproveTaxiRequest", result);
                stopLoader(false);
                if(result.Value && result.Value.length > 0){
                    if(result.Value[0].P_OUT_ERROR == "SUCCESS"){
                        Toast.show(result.Value[0].P_OUT_ERROR);
                        navigation.goBack();
                    }else{
                        Toast.show(result.Value[0].P_OUT_ERROR);
                    }
                }else{
                    Toast.show("No data found");
                }
            })
            .catch(error => {
                stopLoader(false);
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



    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = getTaxiDetails();
          return () => unsubscribe;
        }, [])
    );
    



    const gatePassScheema = yup.object().shape({
        Dpm_Taxi_Type: yup.string().required('Please select an taxi type'),
    });


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
        <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight, }}>
            <KeyboardAwareScrollView style={ {flexGrow:1} }>
                {
                    loader ?
                    <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    /> : null
                }
            <Header title="Taxi Approval" back />
                <View style={{ flexGrow:1, paddingHorizontal:10 }}>
                <Formik                
                    enableReinitialize
                    innerRef={fromRef}
                    validationSchema={gatePassScheema}
                    initialValues={TaxiApiData}
                    onSubmit={values => {                    
                        SubmitData(values);
                    }}
                    >
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
                        }) =>  (
                            <View style={{flex:1}}>
                                {/* Employee ID and Slip No */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>

                                        <View style={{ width: "30%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Employee ID
                                            </Text>
                                            <TextInput
                                                onChangeText={handleChange('empid')}
                                                onBlur={handleBlur('empid')}
                                                value={values.empid}
                                                style={styles.TextInputStyle}
                                                editable={false}
                                            />
                                        </View>

                                        <View style={{ width: "67%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Slip No.
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('slipno')}
                                                onBlur={handleBlur('slipno')}
                                                value={values.slipno}
                                                editable={false}
                                                />
                                        </View>
                                    </View>
                                {/* DepartMent and Name  */}
                                <View style={{ width: '100%' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                        <View style={{ width: "30%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Department
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('duration')}
                                                onBlur={handleBlur('duration')}
                                                value={values.Dept}
                                                editable={false}
                                            />
                                        </View>
                                        <View style={{ width: "67%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,
                                                }} Bold>
                                                Name
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('duration')}
                                                onBlur={handleBlur('duration')}
                                                value={values.Name}
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                </View>


                                <DatePicker
                                    modal
                                    mode="datetime"
                                    open={OpenDateTimePicker}
                                    date={new Date()}
                                    minimumDate={new Date()}
                                    maximumDate={TimeoutMax}
                                    onConfirm={date => {
                                        console.log(date);
                                        setFieldValue('Time_OUTSHOW', date);
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
                                        <View style={{ width: "50%", paddingRight: 5 }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,
                                                }} Bold>
                                                Appx. Time Out
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.DateInOut}
                                                onPress={() => setOpenDateTimePicker(true)}
                                            >
                                                <Text style={{ color: 'gray' }}>
                                                    {moment(values.Time_OUTSHOW).format('DD-MM-YY hh:mm')}
                                                </Text>

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
                                                            color={GlobalColor.PrimaryGradient}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <DatePicker
                                            modal
                                            mode="datetime"
                                            minimumDate={new Date()}
                                            maximumDate={TimeinMax}
                                            open={OpenDateTimePicker2}
                                            date={new Date()}
                                            onConfirm={date => {
                                                setFieldValue('Time_INSHOW', date);
                                                setOpenDateTimePicker2(false);
                                                // setDate(date);
                                                // console.log(date);
                                            }}
                                            onCancel={() => {
                                                setOpenDateTimePicker2(false);
                                            }}
                                        />
                                        <View style={{ width: "50%", paddingLeft: 5 }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Appx. Time In
                                            </Text>
                                            <TouchableOpacity
                                                style={styles.DateInOut}
                                                onPress={() => setOpenDateTimePicker2(true)}
                                            >
                                                <Text style={{ color: 'gray' }}>
                                                    {moment(values.Time_INSHOW).format('DD-MM-YY hh:mm')}
                                                </Text>

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
                                                            color={GlobalColor.PrimaryGradient}
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {errors.duration && touched.duration && (
                                        <View
                                            style={{
                                                width: '100%',
                                                alignSelf: 'center',
                                                paddingVertical: 2,
                                            }}>
                                            <Text style={{ color: 'red', textAlign: 'right' }}>
                                                {errors.duration}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Purpose of Visit */}

                                <View style={{ marginVertical: 5 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                marginVertical: 5,

                                            }} Bold>
                                            Purpose of Visit
                                        </Text>
                                        <TextInput

                                            onChangeText={handleChange('reason')}
                                            onBlur={handleBlur('reason')}
                                            value={values.purpose}
                                            style={styles.TextInputStyle}
                                            editable={false}
                                        />
                                        {errors.reason && touched.reason && (
                                            <View
                                                style={{
                                                    width: '100%',
                                                    alignSelf: 'center',
                                                    paddingVertical: 2,
                                                }}>
                                                <Text
                                                    style={{ color: 'red', textAlign: 'left' }}>
                                                    {errors.reason}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>


                                {/* Source And Destination */}

                                <View style={{ width: '100%' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                        <View style={{ width: "50%", paddingRight: 5 }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Source
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputDesign}
                                                onChangeText={handleChange('StartPoint')}
                                                onBlur={handleBlur('StartPoint')}
                                                value={values.StartPoint}
                                                editable={false}

                                            />
                                        </View>
                                        <View style={{ width: "50%", paddingLeft: 5 }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,


                                                }} Bold>
                                                Destination
                                            </Text>
                                            <TextInput
                                            style={styles.TextInputDesign}
                                                onChangeText={handleChange('desig')}
                                                onBlur={handleBlur('desig')}
                                                value={values.desig}
                                                editable={false}

                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Kms.  And Party Code */}
                                <View style={{ width: '100%' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>

                                        <View style={{ width: "30%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Kms (Appx.)
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('kms')}
                                                onBlur={handleBlur('kms')}
                                                value={values.kms}
                                                editable={false}
                                                />
                                        </View>
                                        <View style={{ width: "67%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Party Code
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('Partycode')}
                                                onBlur={handleBlur('Partycode')}
                                                value={values.Partycode}
                                                editable={false}
                                                />
                                        </View>
                                    </View>
                                </View>

                                {/* Addl. Persons and Persons Staff Id */}
                                <View style={{ width: '100%' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                        <View style={{ width: "30%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,
                                                }} Bold>
                                                Addl. Persons
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('Addperson')}
                                                onBlur={handleBlur('Addperson')}
                                                value={values.Addperson}
                                                editable={false}
                                                />
                                        </View>
                                        <View style={{ width: "67%" }}>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 0,
                                                    paddingTop: 10,
                                                    paddingVertical: 5,

                                                }} Bold>
                                                Persons Staff Id
                                            </Text>
                                            <TextInput
                                                style={styles.TextInputStyle}
                                                onChangeText={handleChange('perempid')}
                                                onBlur={handleBlur('perempid')}
                                                value={values.perempid}
                                                editable={false}
                                                />
                                        </View>
                                    </View>
                                </View>

                                {/* Taxi */}

                                <View style={{ marginVertical: 5, }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                // paddingVertical: 5,

                                            }} Bold>
                                            Taxi
                                        </Text>
                                    </View>
                                    <SelectDropdown
                                        data={taxitypeList}
                                        onSelect={(selectedItem, index) => {
                                            setFieldValue('Dpm_Taxi_Type', selectedItem.TCRT_TAXI_TYPE);
                                        }}
                                        defaultButtonText={'Select Taxi'}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem.TCRT_TAXI_TYPE
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item.TCRT_TAXI_TYPE
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
                                    {errors.Dpm_Taxi_Type && touched.Dpm_Taxi_Type && (
                                        <View
                                            style={{
                                                width: '100%',
                                                alignSelf: 'center',
                                                paddingVertical: 2,
                                            }}>
                                            <Text style={{ color: 'red', textAlign: 'left' }}>
                                                {errors.Dpm_Taxi_Type}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Approve Request Button */}
                                <View style={{ paddingVertical: 10, flexDirection: "row" }}>
                                    <View style={{ width: "50%", padding: 5 }}>
                                        <Button title="Approve Request"
                                        onPress={() => {handleSubmit();}}
                                        />
                                    </View>

                                    <View style={{ width: "50%", padding: 5 }}>
                                        <Button title="Cancel"
                                        onPress={() => {
                                            navigation.goBack()
                                        }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}                    
                </Formik>
                </View>
            </KeyboardAwareScrollView>        
        </SafeAreaView>

    );

}
// define your styles
const styles = StyleSheet.create({
    gradient: {
        padding: 20,
    },


    // Dropdown styles
    dropdown2BtnStyle: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        borderColor: GlobalColor.Secondary,
    },
    dropdown2BtnTxtStyle: { textAlign: 'left', fontSize: 16 },
    dropdown2DropdownStyle: { backgroundColor: GlobalColor.White },
    dropdown2RowStyle: { backgroundColor: GlobalColor.White, borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: { textAlign: 'left', fontSize: 16 },
    centeredView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff'

    },
    Modalclose: {
        position: 'absolute',
        right: 0,
        backgroundColor: GlobalColor.Primary,
        justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 55,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    TextInputStyle: {
        height:40,
        // width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        color:GlobalColor.Text,
        // padding: 6,
        borderColor: GlobalColor.Secondary,
        // fontSize: 16,
    },
    TextInputDesign: {
        width: '100%',
        borderWidth: 1,
        padding: 6,
        backgroundColor: '#fff',
        borderColor: GlobalColor.Secondary
    },
    DateInOut:{
        width: '100%',
        backgroundColor: GlobalColor.White,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 6,
        alignSelf: 'center',
        borderColor: GlobalColor.Secondary
    },
    spinnerTextStyle: {
        color: GlobalColor.White
    },

});

// //make this component available to the app
export default ManagerTaxiApproval;
