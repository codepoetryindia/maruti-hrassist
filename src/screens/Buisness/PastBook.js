import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions,
    Dimensions,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Modal,
    Pressable,
    Alert,
    ScrollView


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
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import Button from '../../components/reusable/Button';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import Text from '../../components/reusable/Text';



const PastBook = ({navigation, route}) => {
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
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [bookingDetails, setBookingDetails] = useState([])




    const GetShutlPastFutrReportApi = (data) => {
        let token = AppUserData.token
        setLoader(true);
        ApiService.PostMethode('/GetShuttlePastFutureReport', data, token)
            .then(result => {
                console.log("GetShutlPastFutrReportApi", result);
                setLoader(false);
                let ApiValue = result.Value
                // {
                //     ApiValue.map((item) => {
                //         return (setBktId(item.BKDT_ID))
                //     })
                // }
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
            BKDTID: data,
        }
        // setModalVisible(true);
        setLoader(true);
        ApiService.PostMethode('/BookingDetail', apiData, token)
            .then(result => {
                console.log("BookingDetail", result);

                setLoader(false);
                if(result.Value &&result.Value.length > 0){
                    let ApiValue = result.Value;
                    setBookingDetails(ApiValue[0]);
                    setModalVisible(true);
                }else{
                    Toast.show("Details not found")
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
    };




    const ShuttleEligibilityApi = (data) => {

        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        let apiData = {
            BKDTID: data,
        }        
        // console.log("apiPayload", apiData)
        setLoader(true);
        ApiService.PostMethode('/ShuttleEligibility', apiData, token)
            .then(result => {
                console.log("ShuttleEligibility", result);
                setLoader(false);
                let ApiResult = result.Result
                setModalVisible(false);
                if(ApiResult== "N"){
                    Alert.alert(
                        "Alert",
                        "Feedback cannot be submitted for PAST booking",
                        [
                            {
                                text: "Okay",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                        ]
                    );
                }else{
                    navigation.navigate("Feedback", {bookingid:data})
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
    };

    



    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = handleSubmit();
            return () => unsubscribe;
        }, [])
    )
    const handleSubmit = () => {
        let userId = AppUserData?.data?.userId
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





    if (loader) {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: GlobalColor.White,
            }}>
                <LoadingScreen />
            </SafeAreaView>
        )
    }


    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 10, width: "100%", alignSelf: 'center', paddingVertical: 5, backgroundColor: GlobalColor.PrimaryLight }}>
            <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: 'bold' }}>
                Select Date
            </Text>

            <View style={styles.SelectDateInput}>
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
                    style={styles.FromandToInput}>
                    <TextInput
                        placeholder="From"
                        style={{ color: '#000', flex: 1 }}
                        editable={false}
                        paddingHorizontal={14}
                        value={textinputDate}
                    />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Ionicons name="calendar-outline" size={30} color={GlobalColor.PrimaryGradient} />
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
                    style={styles.FromandToInput}>
                    <TextInput
                        style={{ color: '#000' }}
                        placeholder="To"
                        editable={false}
                        paddingHorizontal={14}
                        value={textinputSecondDate}
                    />
                    <TouchableOpacity onPress={() => setSecond(true)}>
                        <Ionicons name="calendar-outline" size={30} color={GlobalColor.PrimaryGradient} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{ marginVertical: 5 }} >
                {loader == true ? (
                    <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                    />
                ) : null}

                <Button title="UPDATE" onPress={() => { handleSubmit() }}></Button>
            </TouchableOpacity>
            {pastFudata.length > 0 ? (
                <View style={{ flex:1 }}>
                    {/* <View style={styles.ListContainerCardDesign}>
                        <Text Bold>Date</Text>
                        <Text Bold>Emp ID</Text>
                        <Text Bold>Booking ID</Text>
                        <Text Bold>Source</Text>
                        <Text Bold>Destination</Text>
                        <Text Bold>Status</Text>
                    </View> */}
                    <ScrollView >
                        {
                            pastFudata.map((item) => {
                                return (

                                    //  <TouchableOpacity
                                    //         onPress={() => {
                                    //             BookingDetailApi(item.BKDT_ID)
                                    //         }} style={styles.ListContainer}>

                                    //         <View style={{ flexDirection: "row", justifyContent: "space-between",marginBottom:7 }}>
                                    //             <Text Bold>Date :  <Text>{moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text></Text>
                                    //             {/* <Text style={{ fontSize: GlobalFontSize.Small - 2,marginLeft:44 }}>{moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text> */}

                                    //             <Text Bold>Emp ID : <Text>{item.BKDT_EMPL_ID}</Text></Text>
                                    //             {/* <Text style={{ fontSize: GlobalFontSize.Small - 2 }}>
                                    //                 {item.BKDT_EMPL_ID}
                                    //             </Text> */}
                                    //         </View>


                                    //         <View style={{ flexDirection: "row", justifyContent: "space-between",marginBottom:7 }}>
                                    //             <Text Bold>Booking ID : <Text>{item.BKDT_ID}</Text></Text>
                                    //             {/* <Text style={{ fontSize: GlobalFontSize.Small - 2 }}>{item.BKDT_ID}</Text> */}
                                    //             <Text Bold>Source : <Text>{item.ROUT_SOURCE} </Text></Text>
                                    //             {/* <Text style={{ fontSize: GlobalFontSize.Small - 2 }}>{item.ROUT_SOURCE}</Text> */}
                                    //         </View>


                                    //         <View style={{ flexDirection: "row", justifyContent: "space-between",marginBottom:7 }}>
                                    //             <Text Bold>Destination : <Text>{item.ROUT_DESTINATION}</Text></Text>
                                    //             {/* <Text style={{ fontSize: GlobalFontSize.Small - 2, marginLeft: -16 }}>{item.ROUT_DESTINATION}</Text> */}
                                    //             <Text Bold>Status : <Text>{item.BKDT_STATUS_FLAG}</Text></Text>
                                    //             {/* <Text style={{ fontSize: GlobalFontSize.Small - 2 }}>{item.BKDT_STATUS_FLAG}</Text> */}
                                    //         </View>
                                    //     </TouchableOpacity>  




                                    <TouchableOpacity style={styles.cardContainer}  
                                            onPress={() => {
                                                BookingDetailApi(item.BKDT_ID)
                                            }}>
                                        <View style={styles.cardRow}>
                                            <View style={styles.cardColumn}>
                                                <Text style={styles.cardLabel}>Date</Text>
                                                <Text Bold style={styles.cardValue}>{moment(item.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>
                                            </View>
                                            <View style={styles.cardColumn}>
                                                <Text style={styles.cardLabelRight}>Employee ID</Text>
                                                <Text Bold style={styles.cardValueRight}>{item.BKDT_EMPL_ID}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardRow}>
                                            <View style={styles.cardColumn}>
                                                <Text style={styles.cardLabel}>Booking ID</Text>
                                                <Text Bold style={styles.cardValue}>{item.BKDT_ID}</Text>
                                            </View>
                                            <View style={styles.cardColumn}>
                                                <Text style={styles.cardLabelRight}>Source</Text>
                                                <Text Bold style={styles.cardValueRight}>{item.ROUT_SOURCE}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardRow}>
                                            <View style={styles.cardColumn}>
                                                <Text style={styles.cardLabel}>Destination</Text>
                                                <Text Bold style={styles.cardValue}>{item.ROUT_DESTINATION}</Text>
                                            </View>
                                            <View style={styles.cardColumn}>
                                                <Text style={styles.cardLabelRight}>Status</Text>
                                                <Text Bold style={styles.cardValueRight}>{item.BKDT_STATUS_FLAG}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                )
                            })
                        }
                    </ScrollView>



                    {/* SeatAvility Modal */}
    <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text Bold style={styles.modalTextHeading}>Booking Detail</Text>
            <View style={styles.modalrow}>
                <Text Bold>Booking Id:</Text>
                <Text Bold>{bookingDetails.BKDT_ID}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Registration No.:</Text>
                <Text Bold>{bookingDetails.SHTL_REGISTRATION_NO}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Booking For:</Text>
                <Text Bold>{bookingDetails.BKDT_EMPL_ID}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Name:</Text>
                <Text Bold>{bookingDetails.EMPL_NAME}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Date:</Text>
                <Text Bold>{moment(bookingDetails.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Source:</Text>
                <Text Bold>{bookingDetails.ROUT_SOURCE}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Destination:</Text>
                <Text Bold>{bookingDetails.ROUT_DESTINATION}</Text>                
            </View>

            <View style={styles.modalrow}>
                <Text Bold>Time:</Text>
                <Text Bold>{bookingDetails.ROUT_START_TIME}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Status:</Text>
                <Text Bold>{bookingDetails.BKDT_STATUS_FLAG}</Text>                
            </View>        
                {
                    bookingDetails.BKDT_STATUS_FLAG == "Booked" ? (
                        <View style={styles.modalButtons}>
                            <Button title="OK" btnStyle={styles.ButtonWidth} textStyle={styles.ButtonWidthText} onPress={()=>setModalVisible(!modalVisible)}/>
                            <Button title="FEEDBACK" btnStyle={styles.ButtonWidth} textStyle={styles.ButtonWidthText} onPress={()=>ShuttleEligibilityApi(bookingDetails.BKDT_ID)}/>
                        </View>                        
                    ):(
                        <View style={styles.modalButtons}>
                            <Button title="OK" btnStyle={styles.ButtonWidth} textStyle={styles.ButtonWidthText} onPress={()=>setModalVisible(!modalVisible)}/>
                        </View>
                    )
                }                            
          </View>
        </View>
      </Modal>    
    </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    {loader == true ? <Text>We are Loading your data</Text> : <ListEmptyComponent title="No Data Found" subtitle="Please select dates and submit to continue" ></ListEmptyComponent>}
                </View>
            )}

        </SafeAreaView>
    );
};





const styles = StyleSheet.create({

    SelectDateInput: {
        width: '100%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // padding: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        shadowColor: GlobalColor.ShadowColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 4,
    },
    FromandToInput: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ListContainer: {
        width: '100%',


        paddingHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: GlobalColor.Secondary,
        borderRadius: 3,
        padding: 20,
        marginBottom: 10
    },
    ListContainerCardDesign: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColor.Secondary
    },
    CardData: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        backgroundColor: GlobalColor.White,
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 2.0,
        elevation: 5,
    },
    cardContainer:{
        backgroundColor:GlobalColor.White,
        borderWidth:1,
        borderColor:GlobalColor.Secondary,
        borderRadius:5, 
        padding:10, 
        marginBottom:10
    },
    cardRow:{

        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:10,
    },
    cardValueRight:{

        textAlign:'right',
        color:GlobalColor.Primary
    },
    cardLabel:{

        color:GlobalColor.Primary,
        fontSize:GlobalFontSize.Error
    },
    cardLabelRight:{
        textAlign:'right',
        color:GlobalColor.Primary,
        fontSize:GlobalFontSize.Error
    },
    centeredView:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    modalView:{
        width:"80%",
        backgroundColor:GlobalColor.White,
        padding:10,
        paddingHorizontal:15
    },
    modalTextHeading:{
        fontSize:GlobalFontSize.H4,
        marginBottom:10
    },
    modalrow:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:10, 
    },
    modalButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
    },
    ButtonWidth:{
        // width:'45%',
        flex:0.5,
        borderRadius:0
    },
    ButtonWidthText:{
        fontSize:GlobalFontSize.Error
    }






});
export default PastBook;

