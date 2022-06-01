import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Dimensions,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Modal,
    Pressable,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useFocusEffect } from '@react-navigation/native';

const  PastBook = () => {
    const [fromDate] = useState(new Date());
    const [toDate] = useState(new Date());
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')
    const [open, setOpen] = useState(false);
    const [second, setSecond] = useState(false);
    const [textinputDate, setTextinputDate] = useState('');
    const [textinputSecondDate, setTextinputSecondDate] = useState('');
    const [pastFudata, setPastFuData] = useState([])
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [bookingDetails, setBookingDetails] = useState([])

    const GetShutlPastFutrReportApi = (data) => {
        let token = AppUserData.token
        setLoader(true);
        ApiService.PostMethode('/GetShuttlePastFutureReport', data, token)
            .then(result => {
                console.log("GetShutlPastFutrReportApi", result);
                setLoader(false);
                let ApiValue = result.Value
                setPastFuData(ApiValue)
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
    const BookingDetailApi = (data) => {
        let token = AppUserData.token
        let apiData = {
            BKDTID: 'BKNG185',
        }
        console.log("apiPayload", apiData)
        setLoader(true);
        ApiService.PostMethode('/BookingDetail', apiData, token)
            .then(result => {
                console.log("BookingDetail", result);
                setLoader(false);
                let ApiValue = result.Value
                setBookingDetails(ApiValue)
                setModalVisible(true)
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
    const ShuttleEligibilityApi = (data) => {
        let token = AppUserData.token
        let userId = AppUserData.data.userId
        let apiData = {
            UserName: userId,
        }
        console.log("apiPayload", apiData)
        setLoader(true);
        ApiService.PostMethode('/ShuttleEligibility', apiData, token)
            .then(result => {
                console.log("ShuttleEligibility", result);
                setLoader(false);
                let ApiResult = result.Result
                alert(ApiResult);
                setModalVisible(false)

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



    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = handleSubmit();
          return () => unsubscribe;
        }, [])
      )
    const handleSubmit = () => {
        let userId = AppUserData.data.userId
        let payloadDate = moment(firstDate).format("DD-MMMM-YYYY").toUpperCase()
        let payloadDateSecond = moment(secondDate).format("DD-MMMM-YYYY").toUpperCase()
        let apiData = {
          BKDTEmplID: userId,
          BKDTFlag: "P",
          FromDate: firstDate !== '' ? payloadDate : '',
          ToDate: secondDate !== '' ? payloadDateSecond : '',
        }
        console.log("payload", apiData);

        if (firstDate && secondDate == null) {

            alert("please select date")
            return
        }
        else {
            GetShutlPastFutrReportApi(apiData);
        }
    }
    return (
        <View
            style={{ flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5 }}>
            <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: 'bold' }}>
                Select Date
            </Text>

            <View
                style={{
                    width: '100%',
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
                    borderRadius: 8
                }}>
                <DatePicker
                    modal
                    open={open}
                    date={fromDate}
                    mode="date"
                    onConfirm={fromDate => {
                        setOpen(false);
                        setFirstDate(fromDate);
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
                        style={{ color: '#000', letterSpacing: 1 }}
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
                        setSecondDate(toDate);
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
                        style={{ color: '#000', letterSpacing: 1 }}
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

            <TouchableOpacity onPress={() => {
                handleSubmit();
            }}>
                {loader == true ? (
                    <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                    />
                ) : null}
                <LinearGradient
                    style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                    colors={['#4174D0', '#6ef7ff']}>

                    <Text style={{ color: '#fff', fontSize: 16 }}>UPDATE</Text>
                </LinearGradient>
            </TouchableOpacity>

            {pastFudata.length > 0 ? (
                <View
                    style={{
                        width: '110%',
                        alignSelf: 'center',
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 1.84,
                        elevation: 5,
                        borderRadius: 8,
                        paddingBottom: 25
                    }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#2757C3'
                        }}>
                        <Text>Date</Text>
                        <Text>Emp ID</Text>
                        <Text>Booking ID</Text>
                        <Text>Source</Text>
                        <Text>Destination</Text>
                        <Text>Status</Text>
                    </View>
                    <View>
                        {
                            pastFudata.map((item) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            BookingDetailApi(item.BKDT_ID)
                                        }} style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingVertical: 10,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#2757C3'
                                        }}>
                                        <Text style={{ fontSize: 12 }}>{moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.BKDT_EMPL_ID}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.BKDT_ID}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.ROUT_SOURCE}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.ROUT_DESTINATION}</Text>
                                        <Text style={{ fontSize: 12 }}>{item.BKDT_STATUS_FLAG}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>

                    {/* SeatAvility Modal */}

                    <Modal transparent={true} visible={modalVisible}>
                        <Pressable
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{
                                backgroundColor: '#000000aa',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    padding: 20,
                                    borderRadius: 15,
                                    width: '70%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ fontSize: 20 }}>Booking Detail</Text>

                                {bookingDetails.map((item) => {
                                    return (
                                        <View style={{ width: '90%', marginVertical: 15 }}>
                                            <Text>Booking Id : {item.BKDT_ID} </Text>
                                            <Text>Registration No : {item.SHTL_REGISTRATION_NO} </Text>
                                            <Text>Booking For : {item.BKDT_EMPL_ID} </Text>
                                            <Text>Name : {item.EMPL_NAME} </Text>
                                            <Text>Date : {moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>
                                            <Text>Source : {item.ROUT_SOURCE} </Text>
                                            <Text>Destination : {item.EMPL_NAME} </Text>
                                            <Text>Time : {item.ROUT_START_TIME} </Text>
                                            <Text>Status : {item.BKDT_STATUS_FLAG} </Text>
                                        </View>
                                    )
                                })}
                                <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false)
                                        }}>
                                        {loader == true ? (
                                            <Spinner
                                                visible={loader}
                                                textContent={'Loading...'}
                                                textStyle={{ color: '#fff' }}
                                            />
                                        ) : null}
                                        <LinearGradient
                                            style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                            colors={['#4174D0', '#6ef7ff']}>

                                            <Text style={{ color: '#fff', fontSize: 16 }}>OK</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}
                                        onPress={() => {
                                            ShuttleEligibilityApi()
                                        }}>
                                        {loader == true ? (
                                            <Spinner
                                                visible={loader}
                                                textContent={'Loading...'}
                                                textStyle={{ color: '#fff' }}
                                            />
                                        ) : null}
                                        <LinearGradient
                                            style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                            colors={['#4174D0', '#6ef7ff']}>

                                            <Text style={{ color: '#fff', fontSize: 16 }}>FEEDBACK</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    {loader == true ? <Text>We are Loading your data</Text> : <Text>not found</Text>}
                </View>
            )}

        </View>
    );
};

export default PastBook;