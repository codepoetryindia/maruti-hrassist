//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView,Linking } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../Utils/Utils';
import AuthContext from '../context/AuthContext';

// create a component
const DoctorsContacts = ({ navigation, route }) => {
  const EmergencyContact = route.params.data.EMER_CODE;
  const PageName = route.params.pageName;
  console.log("EmergencyContact", EmergencyContact);

  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [emergency, setEmergency] = useState();
  const [chairperson, setChairperson] = useState(null);
  const [CoChairperson, setCoChairperson] = useState(null)
  const [ExternalMem, setExternalMem] = useState([])
  const [Members, setMembers] = useState([])
  const [mpt, setMpt] = useState([])
  const [gurgaon, setGurgaon] = useState([])
  const [manesar, setManesar] = useState([])
  const [casting, setCasting] = useState([])
  const [rothak, setRothak] = useState([])

  const EmergencyPoshCellApi = () => {
    let apiData = {}
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/EmergencyPoshCell', apiData, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        let CHAIRPERSON;
        let CoChairperson;
        let ExternalMem = [];
        let Members = [];
        console.log("APi value", ApiValue);
        ApiValue.map((item) => {
          if (item.DESIGNATION === "Chairperson") {
            CHAIRPERSON = item
            setChairperson(CHAIRPERSON)
          }
          else if (item.DESIGNATION === "Co-chairperson") {
            CoChairperson = item
            setCoChairperson(CoChairperson)
          }
          else if (item.DESIGNATION === "External member") {
            ExternalMem.push(item)
            setExternalMem(ExternalMem)
          }
          else {
            Members.push(item)
            setMembers(Members)
          }
        })
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

  // GetEmerContactApi
  const GetEmerContactApi = () => {
    let apiData = {
      TypeCode: EmergencyContact
    }
    let token = AppUserData.token
    console.log("apiData", apiData);
    setLoader(true);
    ApiService.PostMethode('/GetEmerContact', apiData, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        let Gurgaon = [];
        let Mpt = [];
        let Manesar = [];
        let Casting = [];
        let Rothak = [];
        console.log("GetEmerContactApi", ApiValue);
        ApiValue.map((item) => {
          if (item.LOCN_DESC === "MPT ENGINE PLANT") {
            Mpt.push(item)
            setMpt(Mpt)
          }
          else if (item.LOCN_DESC === "GURGAON FACTORY") {
            Gurgaon.push(item)
            setGurgaon(item)
          }
          else if (item.LOCN_DESC === "MANESAR") {
            Manesar.push(item)
            setManesar(Manesar)
          }
          else if (item.LOCN_DESC === "MPT CASTING PLANT") {
            Casting.push(item)
            setCasting(Casting)

          }
          else if (item.LOCN_DESC === "ROHTAK") {
            Rothak.push(item)
            setRothak(Rothak)
          }
        })
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
    EmergencyPoshCellApi();
    GetEmerContactApi();
    console.log("PAheNam", PageName);
    console.log("EmergencyContact", EmergencyContact);
  }, [])

  console.log("mpt", mpt);
  console.log("gurga", gurgaon);
  console.log("mansear", manesar);
  console.log("Casting", casting);
  console.log("Rothak", rothak);

  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='red' size={30} />
        <Text>
          Loading...
        </Text>
      </View>
    ) : (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2757C3', '#80406A', '#ad3231']}
          style={{ padding: 15 }}>
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
              {PageName}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={{
            width: '90%',
            height: '90%',
            marginVertical: 10,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
            borderRadius: 8,
          }}>
          {PageName === 'POSH Cell' ? (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  padding: 5,
                }}>
                CHAIRPERSON
              </Text>
              <View>
                {chairperson == null ? <Text>Not Found</Text>
                  : <View style={styles.responseBox}>
                    <Text>{chairperson.NAME}</Text>
                    <TouchableOpacity 
                    // onPress={() => {
                    //   Linking.openURL(`tel:${phoneNumber}`)
                    // }}
                    >
                      <Feather name="phone-call" size={20} color={'#ad3231'} />
                    </TouchableOpacity>

                  </View>}
                <View style={styles.responseBox}>
                  <Text>{chairperson.EMAIL_ID}</Text>
                  <TouchableOpacity>
                    <Feather name="phone-call" size={20} color={'#ad3231'} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  padding: 5,
                }}>
                CO-CHAIRPERSON
              </Text>
              <View>
                {CoChairperson == null ? <Text>Not Found</Text>
                  : <View style={styles.responseBox}>
                    <Text>{CoChairperson.NAME}</Text>
                    <TouchableOpacity>
                      <Feather name="phone-call" size={20} color={'#ad3231'} />
                    </TouchableOpacity>

                  </View>}
                <View style={styles.responseBox}>
                  <Text>{CoChairperson.EMAIL_ID}</Text>
                  <TouchableOpacity>
                    <Feather name="phone-call" size={20} color={'#ad3231'} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  padding: 5,
                }}>
                EXECUTIVE MEMBERS
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={Members}
                keyExtractor={item => item.CONTACT_NUMBER}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopColor: '#80406A',
                      borderStartColor: '#ad3231',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#ad3231',
                      flexDirection: 'row',
                    }}>
                    <View style={{ width: '100%' }}>

                      <View style={styles.responseBox}>
                        <Text>{item.NAME}</Text>
                        <TouchableOpacity>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.responseBox}>
                        <Text>{item.EMAIL_ID}</Text>
                        <TouchableOpacity>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>)}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  padding: 5,
                }}>
                EXTERNAL MEMBERS
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ExternalMem}
                keyExtractor={item => item.CONTACT_NUMBER}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopColor: '#80406A',
                      borderStartColor: '#ad3231',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#ad3231',
                      flexDirection: 'row',
                    }}>
                    <View style={{ width: '100%' }}>
                      <View style={styles.responseBox}>
                        <Text>{item.NAME}</Text>
                        <TouchableOpacity>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.responseBox}>
                        <Text>{item.EMAIL_ID}</Text>
                        <TouchableOpacity>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          ) :
            <View>
              {
                PageName === "Doctor" ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT ENGINE PLANT
                    </Text>
                    {mpt.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{mpt[0].EMER_XNUM}</Text>
                        <TouchableOpacity 
                         onPress={() => {
                          Linking.openURL(`tel:${mpt[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      GURGAON FACTORY
                    </Text>
                    {gurgaon.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{gurgaon.EMER_XNUM}</Text>
                        <TouchableOpacity 
                          onPress={() => {
                            Linking.openURL(`tel:${gurgaon.EMER_XNUM}`)
                          }}
                        >
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                    }
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MANESAR
                    </Text>
                    {manesar.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>

                        <Text>{manesar[0].EMER_PNUM}</Text>
                        <TouchableOpacity 
                         onPress={() => {
                          Linking.openURL(`tel:${manesar[0].EMER_PNUM}`)
                        }}
                        >
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT CASTING PLANT
                    </Text>
                    {casting.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{casting[0].EMER_PNUM}</Text>
                        <TouchableOpacity 
                         onPress={() => {
                          Linking.openURL(`tel:${casting[0].EMER_PNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      ROHTAK
                    </Text>
                    {rothak.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{rothak[0].EMER_PNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${rothak[0].EMER_PNUM}`)
                        }}
                        >
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                  </View>
                ) : (PageName === "Vigilance") ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT ENGINE PLANT
                    </Text>
                    {mpt.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{mpt[0].EMER_XNUM}</Text>
                        <TouchableOpacity 
                         onPress={() => {
                          Linking.openURL(`tel:${mpt[0].EMER_XNUM}`)
                        }}
                        >
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}


                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      GURGAON FACTORY
                    </Text>
                    {gurgaon.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{gurgaon.EMER_XNUM}</Text>
                        <TouchableOpacity 
                         onPress={() => {
                          Linking.openURL(`tel:${gurgaon.EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                    }
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MANESAR
                    </Text>
                    {manesar.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{manesar[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${manesar[0].EMER_XNUM}`)
                        }}
                        >
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT CASTING PLANT
                    </Text>
                    {casting.length == 0 ? <Text>Not Found</Text> :
                      <View>
                        <View style={styles.responseBox}>
                          <Text>{casting[0].EMER_XNUM}</Text>
                          <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${casting[0].EMER_XNUM}`)
                        }}>
                            <Feather name="phone-call" size={20} color={'#ad3231'} />
                          </TouchableOpacity>
                        </View> 
                        {casting.length>1 ? <View style={styles.responseBox}>
                          <Text>{casting[1].EMER_XNUM}</Text>
                          <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${casting[1].EMER_XNUM}`)
                        }}>
                            <Feather name="phone-call" size={20} color={'#ad3231'} />
                          </TouchableOpacity>
                        </View>:null}
                      </View>
                    }

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      ROHTAK
                    </Text>
                    {rothak.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{rothak[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${rothak[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                  </View>
                ) : (PageName === "Fire Control") ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT ENGINE PLANT
                    </Text>
                    {mpt.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{mpt[0].EMER_PNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${mpt[0].EMER_PNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}


                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      GURGAON FACTORY
                    </Text>
                    {gurgaon.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{gurgaon.EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${gurgaon.EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                    }
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MANESAR
                    </Text>
                    {manesar.length == 0 ? <Text>Not Found</Text> :
                      <View>
                        <View style={styles.responseBox}>
                        <Text>{manesar[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${manesar[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                      {manesar.length>1 ? (
                        <View style={styles.responseBox}>
                        <Text>{manesar[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${manesar[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                      ):null}
                      </View>
                      }

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT CASTING PLANT
                    </Text>
                    {casting.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{casting[0].EMER_PNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${casting[0].EMER_PNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      ROHTAK
                    </Text>
                    {rothak.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{rothak[0].EMER_PNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${rothak[0].EMER_PNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                  </View>
                ) : (PageName === "Electricity") ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT ENGINE PLANT
                    </Text>
                    {mpt.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{mpt[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${mpt[0].EMER_XNUM}`)
                        }}> 
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      GURGAON FACTORY
                    </Text>
                    {gurgaon.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{gurgaon.EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${gurgaon.EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>
                    }
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MANESAR
                    </Text>
                    {manesar.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{manesar[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${manesar[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      MPT CASTING PLANT
                    </Text>
                    {casting.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{casting[0].EMER_XNUM}</Text>
                        <TouchableOpacity  onPress={() => {
                          Linking.openURL(`tel:${casting[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        padding: 5,
                      }}>
                      ROHTAK
                    </Text>
                    {rothak.length == 0 ? <Text>Not Found</Text> :
                      <View style={styles.responseBox}>
                        <Text>{rothak[0].EMER_XNUM}</Text>
                        <TouchableOpacity onPress={() => {
                          Linking.openURL(`tel:${rothak[0].EMER_XNUM}`)
                        }}>
                          <Feather name="phone-call" size={20} color={'#ad3231'} />
                        </TouchableOpacity>
                      </View>}

                  </View>
                ) : null
              }
            </View>
          }

        </ScrollView>
      </View>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  responseBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20
  },
});

//make this component available to the app
export default DoctorsContacts;
