import React, { useState,useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function FutureBook() {

    const [data,setData] = useState('')
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')
    const GetShutlPastFutrReportApi = (data) => {
        let token = AppUserData.token
        let userId = AppUserData.data.userId
        // let payloadDate = moment(firstDate).format("DD-MMMM-YYYY").toUpperCase()
        // let payloadDateSecond = moment(secondDate).format("DD-MMMM-YYYY").toUpperCase()
         let apiData = {
          BKDTEmplID: userId,
          BKDTFlag: "F",
          FromDate: '',
          ToDate:  '',
        }
        console.log("payload", apiData);

        setLoader(true);
        ApiService.PostMethode('/GetShuttlePastFutureReport', data, token)
            .then(result => {
                console.log("GetShutlPastFutrReportApi", result);
                setLoader(false);
                let ApiValue = result.Value
                setData(ApiValue)
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
  return (

    
 
          <SafeAreaView>
               {loader == true ? (
                    <Spinner
                        visible={loader}
                        textContent={'Loading...'}
                        textStyle={{ color: '#fff' }}
                    />
                ) : null}
            {data && data.length > 0 ? (
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
                            data && data.map((item) => {
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
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text>not found</Text>
                </View>
            )}
          </SafeAreaView>
        );
}

const styles = StyleSheet.create({})