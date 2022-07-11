import React, { useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, SafeAreaView } from 'react-native'
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../../constants/Colors';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import Text from '../../components/reusable/Text';


export default function FutureBook() {

    const [futureData, setFutureData] = useState([])
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')

    // const GetShutlPastFutrReportApi = () => {
    //     let token = AppUserData.token
    //     let userId = AppUserData.data.userId
    //      let apiData = {
    //       BKDTEmplID: userId,
    //       BKDTFlag: "F",
    //       FromDate: '',
    //       ToDate: '',
    //     }
    //     console.log("payload", apiData);
    //     setLoader(true);
    //     ApiService.PostMethode('/GetShuttlePastFutureReport', data, token)
    //         .then(result => {
    //             console.log("GetShutlPastFutrReportApi", result);
    //             setLoader(false);
    //             // let ApiValue = result.Value
    //             // setData(ApiValue)
    //         })

    //         .catch(error => {
    //             setLoader(false);
    //             console.log('Error occurred==>', error);
    //             if (error.response) {
    //                 if (error.response.status == 401) {
    //                     console.log('error from api', error.response);
    //                 }
    //                 // client received an error response (5xx, 4xx)
    //                 Toast.show(error.response.data.title);
    //             } else if (error.request) {
    //                 // client never received a response, or request never left
    //                 Toast.show('Network Error');
    //                 // console.log("error.request", error.request._response);
    //             } else {
    //                 // anything else
    //                 Toast.show('Something Went Wrong');
    //             }
    //         });
    // };
    const GetShutlPastFutrReportApi = () => {
        let token = AppUserData.token
        let userId = AppUserData.data.userId
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
                setLoader(false);
                let ApiValue = result.Value
                setFutureData(ApiValue)
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
            {futureData.length > 0 ? (
                <View
                    style={styles.ListContainer}>
                    <View
                        style={styles.ListContent}>
                        <Text Bold>Date</Text>
                        <Text Bold>Emp ID</Text>
                        <Text Bold>Booking ID</Text>
                        <Text Bold>Source</Text>
                        <Text Bold>Destination</Text>
                        <Text Bold>Status</Text>
                    </View>
                    <View>
                        {
                            futureData.map((item) => {
                                return (
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingVertical: 10,
                                            borderBottomWidth: 1,
                                            borderBottomColor:GlobalColor.Secondary
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
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    {loader == true ? <Text>We are Loading your data</Text> : <ListEmptyComponent title="No Data Found" ></ListEmptyComponent>}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 5,
        backgroundColor: GlobalColor.PrimaryLight
    },

    ListContainer: {
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
    },
    ListContant:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColor.PrimaryGradient,
    }

});

