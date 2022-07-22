import React, { useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    SafeAreaView,
    Alert,
    Modal,
    Pressable
  } from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../../constants/Colors';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import Text from '../../components/reusable/Text';
import { GlobalFontSize } from '../../constants/FontSize';
import Button from '../../components/reusable/Button';


export default function FutureBook() {

    const [futureData, setFutureData] = useState([])
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [firstDate, setFirstDate] = useState('');
    const [secondDate, setSecondDate] = useState('');
    const [modalVisible, setmodalVisible] = useState(true);
    const [BookingDetail, setBookingDetail] = useState({});


    
    const stopLoader = () => {
            try {
            setLoader(false);
            setrefresh(false);
            } catch(error){
                console.log(error)
            }
        }


    const GetShutlPastFutrReportApi = () => {
        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        let apiData = {
            BKDTEmplID: userId,
            BKDTFlag: "F",
            FromDate: '',
            ToDate: '',
        }
        setLoader(true);
        ApiService.PostMethode('/GetShuttlePastFutureReport', apiData, token)
            .then(result => {
                console.log("GetShutlPastFutrReportApi", result);
                stopLoader(false);
                let ApiValue = result.Value
                setFutureData(ApiValue)
                // let array = [];
                // for (let index = 0; index < 10; index++) {
                //     array.push(ApiValue[0])                    
                // }
                // setFutureData(array)
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
    const BookingDetailApi = (data) => {
        let token = AppUserData.token
        let apiData = {
            BKDTID: data.BKDT_ID,
        }
        // console.log("apiPayload", data);
        // return;
        // setLoader(true);
        setmodalVisible(true);
        ApiService.PostMethode('/BookingDetail', apiData, token)
            .then(result => {
                console.log("BookingDetail", result);
                setLoader(false);
                if(result.Value &&result.Value.length > 0){
                    let ApiValue = result.Value;
                    setBookingDetail(ApiValue[0]);
                    setmodalVisible(true);
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



    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = GetShutlPastFutrReportApi();
            return () => unsubscribe;
        }, [])
    )


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


    const confirmCancel= (userId)=>{
        setmodalVisible(!modalVisible);
        Alert.alert(
            "Confirm?",
            "Please confirm you want to cancel this booking",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => BookShuttleSeatApi(userId)}
            ]
          );
    }



    const BookShuttleSeatApi = (userIDNum) => {
        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        let apiData = {
            UserName: userIDNum
        }
        // console.log("apiData", apiData)
        setLoader(true);
        ApiService.PostMethode('/BookShuttleSeat', apiData, token)
            .then(result => {
                setLoader(false);
                console.log('ApiResult', responseData);
                let responseData = result;
                Toast.show(result.Result);
                GetShutlPastFutrReportApi();
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



    const ItemRender = ({item})=>{
        return(
            <TouchableOpacity style={styles.cardContainer} onPress={()=>{
                BookingDetailApi(item);
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
    }


    return (
        <SafeAreaView
            style={styles.container}>
            {loader == true ? (
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />
            ) : null}

            <FlatList
                contentContainerStyle={{ flexGrow:1, marginTop:10, paddingBottom:10 }}
                data={futureData}
                renderItem={ItemRender}
                keyExtractor={item => item.id}                
                ListEmptyComponent={<ListEmptyComponent 
                    title="No Data Found"
                    enableRefresh={true} onRefreshCallback={()=>GetShutlPastFutrReportApi(true)} refreshing={refresh}
                    ></ListEmptyComponent>
                }
            />

    <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setmodalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text Bold style={styles.modalTextHeading}>Booking Detail</Text>
            <View style={styles.modalrow}>
                <Text Bold>Booking Id:</Text>
                <Text Bold>{BookingDetail.BKDT_ID}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Registration No.:</Text>
                <Text Bold>{BookingDetail.SHTL_REGISTRATION_NO}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Booking For:</Text>
                <Text Bold>{BookingDetail.BKDT_EMPL_ID}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Name:</Text>
                <Text Bold>{BookingDetail.EMPL_NAME}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Date:</Text>
                <Text Bold>{moment(BookingDetail.BKDT_START_DATE).format("MM-DD-YY").toUpperCase()}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Source:</Text>
                <Text Bold>{BookingDetail.ROUT_SOURCE}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Destination:</Text>
                <Text Bold>{BookingDetail.ROUT_DESTINATION}</Text>                
            </View>

            <View style={styles.modalrow}>
                <Text Bold>Time:</Text>
                <Text Bold>{BookingDetail.ROUT_START_TIME}</Text>                
            </View>
            <View style={styles.modalrow}>
                <Text Bold>Status:</Text>
                <Text Bold>{BookingDetail.BKDT_STATUS_FLAG}</Text>                
            </View>
            <View style={styles.modalButtons}>
                <Button title="OK" btnStyle={styles.ButtonWidth} textStyle={styles.ButtonWidthText} onPress={()=>setmodalVisible(!modalVisible)}/>
                <Button title="CANCEL BOOKING" btnStyle={styles.ButtonWidth} textStyle={styles.ButtonWidthText} onPress={()=>confirmCancel(BookingDetail.BKDT_EMPL_ID)}/>
            </View>
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: GlobalColor.PrimaryLight, 
        paddingHorizontal:10,
    },

    ListContainer: {
        width: '100%',
        paddingVertical: 10,
    },
    ListContent:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColor.PrimaryGradient,
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

