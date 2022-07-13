//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, Linking, SafeAreaView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../Utils/Utils';
import AuthContext from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Text from './reusable/Text';
import { Header } from './reusable/Header'; 
import { GlobalColor } from '../constants/Colors';
import { LoadingScreen } from './reusable/LoadingScreen';

// create a component
const DoctorsContacts = ({ navigation, route }) => {
  const EmergencyContact = route.params.data.EMER_CODE;
  const PageName = route.params.pageName;
  console.log("EmergencyContact", EmergencyContact);

  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
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
        console.log(ApiValue);
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
            console.log("Mpt", Mpt)
          }
          else if (item.LOCN_DESC === "GURGAON FACTORY") {
            Gurgaon.push(item)
            setGurgaon(Gurgaon)
            console.log("Gurgaon", Gurgaon)
          }
          else if (item.LOCN_DESC === "MANESAR") {
            Manesar.push(item)
            setManesar(Manesar)
            console.log("Manesar", Manesar)
          }
          else if (item.LOCN_DESC === "MPT CASTING PLANT") {
            Casting.push(item)
            setCasting(Casting)
            console.log("Casting", Casting)

          }
          else if (item.LOCN_DESC === "ROHTAK") {
            Rothak.push(item)
            setRothak(Rothak)
            console.log("Rothak", Rothak)
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

  return (
    <SafeAreaView style={styles.container}>
      <Header title={PageName}/>

      {loader == true ? (
        <LoadingScreen/>
      ) : (
        <ScrollView
          style={{
            width: '95%',
            // maxHeight: PageName === 'POSH Cell' ? '90%' : '70%',
            marginTop: 10,
            paddingVertical: 10,
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
            borderRadius: 5,
          }}>
          {PageName === 'POSH Cell' ? (
            <View>
              <View style={styles.boxsingle}>
                <Text Bold style={styles.headerText}>CHAIRPERSON </Text>
                <View>
                  {chairperson == null ? <Text>Not Found</Text>
                    : <View style={styles.responseBox}>
                      <Text>{chairperson && chairperson.NAME}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(`tel:${chairperson && chairperson.CONTACT_NUMBER}`)
                        }}
                      >
                        <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                      </TouchableOpacity>
                    </View>
                  }

                  <View style={styles.responseBox}>
                    <Text style={styles.linkcolor}>{chairperson && chairperson.EMAIL_ID}</Text>
                    <TouchableOpacity onPress={() => {
                      Linking.openURL(`mailto:${chairperson && chairperson.EMAIL_ID}`)
                    }}>
                      <Feather name="mail" size={20} color={GlobalColor.Secondary} />
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
              <View style={styles.boxsingle}>
                <Text
                  Bold
                  style={styles.headerText}>
                  CO-CHAIRPERSON
                </Text>
                <View>
                  {CoChairperson == null ? <Text>Not Found</Text>
                    : <View style={styles.responseBox}>
                      <Text>{CoChairperson && CoChairperson.NAME}</Text>
                      <TouchableOpacity onPress={() => {
                        Linking.openURL(`tel:${CoChairperson && CoChairperson.CONTACT_NUMBER}`)
                      }}  >
                        <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                      </TouchableOpacity>

                    </View>}
                  <View style={styles.responseBox}>
                    <Text style={styles.linkcolor}>{CoChairperson && CoChairperson.EMAIL_ID}</Text>
                    <TouchableOpacity onPress={() => {
                      Linking.openURL(`mailto:${CoChairperson && CoChairperson.EMAIL_ID}`)
                    }}
                    >
                      <Feather name="mail" size={20} color={GlobalColor.Secondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.boxsingle}>
              <Text 
                Bold               
                style={styles.headerText}>
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
                      borderStartColor: GlobalColor.Secondary,
                      borderBottomColor: '#2757C3',
                      borderEndColor: GlobalColor.Secondary,
                      flexDirection: 'row',
                    }}>
                    <View style={{ width: '100%' }}>
                      <View style={styles.responseBox}>
                        <Text>{item && item.NAME}</Text>
                        <TouchableOpacity onPress={() => {
                          if(item.CONTACT_NUMBER){
                            Linking.openURL(`tel:${item.CONTACT_NUMBER}`)
                          }
                        }}>
                          <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.responseBox}>
                        <Text style={styles.linkcolor}>{item && item.EMAIL_ID}</Text>
                        <TouchableOpacity onPress={() => {
                          if(item.CONTACT_NUMBER){
                            Linking.openURL(`tel:${item.CONTACT_NUMBER}`)
                          }
                        }}>
                          <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>)}
              />
              </View>

              <View style={styles.boxsingle}>
              <Text style={styles.headerText} Bold>
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
                      borderStartColor: GlobalColor.Secondary,
                      borderBottomColor: '#2757C3',
                      borderEndColor: GlobalColor.Secondary,
                      flexDirection: 'row',
                    }}>
                    <View style={{ width: '100%' }}>
                      <View style={styles.responseBox}>
                        <Text>{item.NAME}</Text>
                        <TouchableOpacity onPress={() => {
                          if(item.CONTACT_NUMBER){
                            Linking.openURL(`tel:${item.CONTACT_NUMBER}`)
                          }
                        }}>
                          <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.responseBox}>
                        <Text style={styles.linkcolor}>{item.EMAIL_ID}</Text>
                        <TouchableOpacity onPress={() => {
                          if(item.CONTACT_NUMBER){
                            Linking.openURL(`tel:${item.CONTACT_NUMBER}`)
                          }
                        }}>
                          <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
              </View>
            </View>
          ) :
            <View>
              {
                PageName === "Doctor" ? (
                  <View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MPT ENGINE PLANT
                      </Text>
                      {mpt.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={mpt}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_XNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_XNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        GURGAON FACTORY
                      </Text>
                      {gurgaon.length == 0 ? <Text>Not Found</Text> :

                        <FlatList
                          data={gurgaon}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_XNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_XNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />

                      }
                    </View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MANESAR
                      </Text>
                      {manesar.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={manesar}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_PNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_PNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>
                    
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MPT CASTING PLANT
                      </Text>
                      {casting.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={casting}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_PNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_PNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>

                    <View style={styles.boxsingle}>
                      <Text
                      Bold
                        style={styles.headerText}>
                        ROHTAK
                      </Text>
                      {rothak.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={rothak}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_PNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_PNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>     
                  </View>
                ) : (PageName === "Vigilance") ? (
                  <View>
                    <View style={styles.boxsingle}>
                    <Text
                      Bold
                      style={styles.headerText}>
                      MPT ENGINE PLANT
                    </Text>
                    {mpt.length == 0 ? <Text>Not Found</Text> :
                      <FlatList
                        data={mpt}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.responseBox}>
                              <Text>{item.EMER_XNUM}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`tel:${item.EMER_XNUM}`)
                                }}
                              >
                                <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                              </TouchableOpacity>
                            </View>
                          )
                        }} />}
                    </View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        GURGAON FACTORY
                      </Text>
                      {gurgaon.length == 0 ? <Text>Not Found</Text> :

                        <FlatList
                          data={gurgaon}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_XNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_XNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>
                    
                    <View style={styles.boxsingle}>                      
                    <Text
                      Bold
                      style={styles.headerText}>
                      MANESAR
                    </Text>
                    {manesar.length == 0 ? <Text>Not Found</Text> :
                      <FlatList
                        data={manesar}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.responseBox}>
                              <Text>{item.EMER_XNUM}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`tel:${item.EMER_XNUM}`)
                                }}
                              >
                                <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                              </TouchableOpacity>
                            </View>
                          )
                        }} />}
                    </View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MPT CASTING PLANT
                      </Text>
                      {casting.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={casting}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_XNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_XNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>

                    <View style={styles.boxsingle}>
                    <Text
                      Bold
                      style={styles.headerText}>
                      ROHTAK
                    </Text>
                    {rothak.length == 0 ? <Text>Not Found</Text> :
                      <FlatList
                        data={rothak}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.responseBox}>
                              <Text>{item.EMER_XNUM}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`tel:${item.EMER_XNUM}`)
                                }}
                              >
                                <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                              </TouchableOpacity>
                            </View>
                          )
                        }} />}
                    </View>
                  </View>
                ) : (PageName === "Fire Control") ? (
                  <View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MPT ENGINE PLANT
                      </Text>
                      {mpt.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={mpt}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_PNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_PNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>
                    
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        GURGAON FACTORY
                      </Text>
                      {gurgaon.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={gurgaon}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_XNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_XNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>

                    <View style={styles.boxsingle}>
                    <Text
                      Bold
                      style={styles.headerText}>
                      MANESAR
                    </Text>
                    {manesar.length == 0 ? <Text>Not Found</Text> :
                      <FlatList
                        data={manesar}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.responseBox}>
                              <Text>{item.EMER_XNUM}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`tel:${item.EMER_XNUM}`)
                                }}
                              >
                                <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                              </TouchableOpacity>
                            </View>
                          )
                        }} />}
                    </View>
                    <View style={styles.boxsingle}>
                    <Text
                      Bold
                      style={styles.headerText}>
                      MPT CASTING PLANT
                    </Text>
                    {casting.length == 0 ? <Text>Not Found</Text> :
                      <FlatList
                        data={casting}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={styles.responseBox}>
                              <Text>{item.EMER_PNUM}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(`tel:${item.EMER_PNUM}`)
                                }}
                              >
                                <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                              </TouchableOpacity>
                            </View>
                          )
                        }} />}
                    </View>

                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        ROHTAK
                      </Text>
                      {rothak.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={rothak}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_PNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_PNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>
                  </View>
                ) : (PageName === "Electricity") ? (
                  <View>
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MPT ENGINE PLANT
                      </Text>
                      {mpt.length == 0 ? <Text>Not Found</Text> :
                        <FlatList
                          data={mpt}
                          keyExtractor={({ item, index }) => index}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.responseBox}>
                                <Text>{item.EMER_XNUM}</Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(`tel:${item.EMER_XNUM}`)
                                  }}
                                >
                                  <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                </TouchableOpacity>
                              </View>
                            )
                          }} />}
                    </View>

                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        GURGAON FACTORY
                      </Text>
                        {gurgaon.length == 0 ? <Text>Not Found</Text> :
                          <FlatList
                            data={gurgaon}
                            keyExtractor={({ item, index }) => index}
                            renderItem={({ item, index }) => {
                              return (
                                <View style={styles.responseBox}>
                                  <Text>{item.EMER_XNUM}</Text>
                                  <TouchableOpacity
                                    onPress={() => {
                                      Linking.openURL(`tel:${item.EMER_XNUM}`)
                                    }}
                                  >
                                    <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                                  </TouchableOpacity>
                                </View>
                              )
                            }} />
                        }
                    </View>

                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MANESAR
                      </Text>
                      {manesar.length == 0 ? <Text>Not Found</Text> :
                        <View style={styles.responseBox}>
                          <Text>{manesar[0].EMER_XNUM}</Text>
                          <TouchableOpacity onPress={() => {
                            Linking.openURL(`tel:${phoneNumber}`)
                          }}>
                            <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                          </TouchableOpacity>
                        </View>}
                    </View>
                    
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        MPT CASTING PLANT
                      </Text>
                      {casting.length == 0 ? <Text>Not Found</Text> :
                        <View style={styles.responseBox}>
                          <Text>{casting[0].EMER_XNUM}</Text>
                          <TouchableOpacity onPress={() => {
                            Linking.openURL(`tel:${phoneNumber}`)
                          }}>
                            <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                          </TouchableOpacity>
                        </View>}
                    </View>
                    
                    <View style={styles.boxsingle}>
                      <Text
                        Bold
                        style={styles.headerText}>
                        ROHTAK
                      </Text>
                      {rothak.length == 0 ? <Text>Not Found</Text> :
                        <View style={styles.responseBox}>
                          <Text>{rothak[0].EMER_XNUM}</Text>
                          <TouchableOpacity onPress={() => {
                            Linking.openURL(`tel:${phoneNumber}`)
                          }}>
                            <Feather name="phone-call" size={20} color={GlobalColor.Secondary} />
                          </TouchableOpacity>
                        </View>}
                    </View>

                  </View>
                ) : null
              }
            </View>
          }

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,
  },
  responseBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10
  },
  headerText: {
    padding: 5,
    paddingHorizontal:10
  },
  boxsingle:{
    marginBottom:10,
    borderBottomWidth: 0.5,
    borderBottomColor:GlobalColor.LightDark,
    paddingHorizontal:5, 
    borderBottomWidth:0.5, 
    paddingBottom:10
  },
  linkcolor:{
    color:GlobalColor.Secondary
  }
});

//make this component available to the app
export default DoctorsContacts;
