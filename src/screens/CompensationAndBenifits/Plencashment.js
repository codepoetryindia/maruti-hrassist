import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';


const Plencashment = ({ navigation, route }) => {

let pageName = route.params.pageName
    console.log("pagename", pageName);
    const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const[encashment,setEncashment] = useState();
  const[lta,setLta] = useState();

  const InitPLEncashmenApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data
    let apidata = {
        UserName:userId
    }
    setLoader(true);
    ApiService.PostMethode('/InitPLEncashmen', apidata, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("APi value", ApiValue);
        setEncashment(ApiValue)
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

//   LTA ENCASHMENT API 

const InitMEDEncashment = () => {
    let token = AppUserData.token
    let userId = AppUserData.data
    let apidata = {
        UserName:userId
    }
    setLoader(true);
    ApiService.PostMethode('/InitMEDEncashment', apidata, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("APi value", ApiValue);
        setLta(ApiValue)
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
  useEffect(() => {
    InitPLEncashmenApi()
    InitMEDEncashment()
  }, [])
  
    return (
        loader == true ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color='red' size={30} />
              <Text>
                Loading...
              </Text>
            </View>
          ) :(
            <ScrollView style={styles.container}>
            <LinearGradient
                style={{ padding: 20 }}
             colors={['#4174D0','#6ef7ff']}>
                <View style={{ flexDirection: 'row' }}>
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
                            onPress={() => navigation.goBack()}
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
                        {pageName}
                    </Text>
                </View>
            </LinearGradient>

            {pageName == 'PL Encashment' ? (
                <View>
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        paddingVertical: 10,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        marginBottom: 10
                    }}>
                        <View style={styles.box}>
                            <Text>Current Balance</Text>
                            <Text>207</Text>
                        </View>
                        <View style={styles.box}>
                            <Text>Encash</Text>
                            <TextInput style={{ width: 50, borderBottomWidth: 1 }} />
                        </View>
                    </View>
                    <View style={{ height: 100, marginTop: 10 }}>
                        <TouchableOpacity>
                            <LinearGradient
                                style={{
                                    padding: 20,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    width: '90%',
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                }}
                             colors={['#4174D0','#6ef7ff']}>
                                <Text style={{ fontSize: 16, color: '#fff' }}>
                                    CLAIM
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center' }}>Report</Text>
                    </View>
                </View>
            ) : <View>
                <View style={{
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginBottom: 10
                }}>
                    <View style={styles.box}>
                        <Text>Financial Year</Text>
                        <Text>207</Text>
                    </View>
                    <View style={styles.box}>
                        <Text>StaffNo</Text>
                        <Text>222852</Text>
                    </View>
                </View>
                <View style={{ height: 100, marginTop: 10 }}>
                    <TouchableOpacity>
                        <LinearGradient
                            style={{
                                padding: 20,
                                borderRadius: 8,
                                alignItems: 'center',
                                width: '90%',
                                alignSelf: 'center',
                                marginVertical: 10,
                            }}
                         colors={['#4174D0','#6ef7ff']}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>
                                ENCASh
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center' }}>Report</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                         width: '90%', 
                         alignSelf: 'center',
                          borderWidth: 1, 
                          marginVertical: 10,
                          backgroundColor:'red'
                    }}>
                    <Text>Name</Text>
                    <Text>Year</Text>
                    <Text>Desc</Text>
                </View>
            </View>}
        </ScrollView>
          ) 
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.5
    }

})
export default Plencashment