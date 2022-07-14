//import liraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
  ActivityIndicator,
  Linking,
  SafeAreaView
} from 'react-native';
import Modal from 'react-native-modal';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalColor } from '../../../constants/Colors';
import { GlobalFontSize } from '../../../constants/FontSize';
import Text from '../../../components/reusable/Text';
import ListEmptyComponent from '../../../components/reusable/ListEmptyComponent';
import { LoadingScreen } from '../../../components/reusable/LoadingScreen';


// create a component
const Birthdays = () => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false)
  const [todayBirthday, setTodayBirthday] = useState([])
  const [tomorrowBirthday, SetTomorrowBirthday] = useState([])
  const [modalItem, setModalItem] = useState()
  const [staffNo, setStaffNo] = useState();
  const [empPhoto, setEmpPhoto] = useState()
  const [refresh, setrefresh] = useState(false);
  const [modalLoader, setmodalLoader] = useState(false);


  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
      setmodalLoader(false);
    } catch(error){
        console.log(error)
    }
  }

  const PostBirthdayData = () => {
    let apiData = { PFlag: '' }
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/GetEmplBirthday', apiData, token)
      .then(result => {
        // console.log("APiresult", result);
        stopLoader(false);
        let tommorowData = []
        let todayData = []
        let ApiValue = result.Value
        ApiValue.filter((Element) => {
          // console.log('Element', Element);
          let todayResult = Element.BIRTHDATE.includes("TODAY");
          // console.log("today",todayResult);
          let tommorowResult = Element.BIRTHDATE.includes("TOMORROW");
          if (todayResult) {
            todayData.push(Element)
            setTodayBirthday(todayData)
          }
          else if (tommorowResult) {
            tommorowData.push(Element)
            SetTomorrowBirthday(tommorowData)
          }
        })
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



  // emp Profile Data  
  const GetUserDetails = (item) => {
    let apiData = { "UserName": item['Staff No'] };
    let token = AppUserData.token
    setmodalLoader(true);
    setModalVisible(true);
    ApiService.PostMethode('/GetEmployeeProfile', apiData, token)
      .then(result => {
        let response = result.Value
        if (response.Table) {
          // console.log("employeeresult", response.Table[0].profile_photo,);
          let profile = response.Table[0] && response.Table ? response.Table[0].profile_photo: '';
          setModalItem(item);
          setEmpPhoto(profile);
          stopLoader(false);
          setModalVisible(true);
        } else {
          stopLoader(false);
          setModalVisible(false);
          Toast.show("User not found");
        }
      })
      .catch(error => {
        stopLoader(false);
        setModalVisible(false);
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
      const unsubscribe = PostBirthdayData();
      return () => unsubscribe;
    }, [])
  )



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  const [CurrentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = index => {
    setCurrentPage(index);
  };

  if(loader){
    return(
        <LoadingScreen/>
    )
  }

  return (
          <SafeAreaView style={styles.container}>
            <View style={{ flex:1 }}>
              <View style={{ width: '100%' }}>
                <SegmentedControlTab
                  borderRadius={0}
                  values={['Today', 'Tomorrow']}                  
                  selectedIndex={CurrentPage}
                  onTabPress={index => {
                    handleCurrentPage(index);
                  }}
                  tabsContainerStyle={styles.tabsContainerStyle}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                />
              </View>

              <View style={{ flex:1}}>
                {CurrentPage == 0 ? (
                  <View style={{ flexGrow:1 }}>
                      <FlatList
                        contentContainerStyle={{ flexGrow:1 }}
                        ListEmptyComponent={() => <ListEmptyComponent title="No Data Found" enableRefresh={true} onRefreshCallback={()=>PostBirthdayData()} refreshing={refresh}></ListEmptyComponent>}
                        data={todayBirthday}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{ flex: 1 }}>
                              <TouchableOpacity
                                onPress={() => {
                                  GetUserDetails(item);
                                }}>
                                <View
                                  style={[
                                    styles.itemView,
                                    // {transform: [{scale}], opacity},
                                  ]}>
                                  <View
                                    style={{
                                      borderRightWidth: 2,
                                      paddingVertical: 8,
                                      width: '20%',
                                    }}>
                                    <Text style={{ textAlign: 'center' , }}>
                                      {item.BIRTHDATE.includes("TODAY") ? item.DIRC_CODE : null}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      width: '80%',
                                      paddingVertical: 5,
                                      paddingLeft: 15,
                                    }}>
                                    <Text>
                                      {item.BIRTHDATE.includes("TODAY") ? item.Name : null}</Text>
                                    <Text>
                                      {item.BIRTHDATE.includes("TODAY") ? item.Email : null}</Text>
                                    <Text>
                                      {item.BIRTHDATE.includes("TODAY") ? item.Dept : null}</Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                  </View>
                ) : (
                  <View style={{ flexGrow:1}}>
                    <FlatList
                      contentContainerStyle={{ flexGrow:1 }}
                      ListEmptyComponent={() => <ListEmptyComponent title="No Data Found" enableRefresh={true} onRefreshCallback={()=>PostBirthdayData()} refreshing={refresh}></ListEmptyComponent>}
                      data={tomorrowBirthday}
                      keyExtractor={({ item, index }) => index}
                      renderItem={({ item, index }) => (
                        <View style={{ flex: 1 }}>
                          <TouchableOpacity onPress={() => {
                            GetUserDetails(item);
                          }}>
                            <View style={styles.itemView}>
                              <View
                                style={{
                                  borderRightWidth: 2,
                                  paddingVertical: 8,
                                  width: '20%',
                                }}>
                                <Text style={{ textAlign: 'center' }}>
                                  {item.DIRC_CODE}

                                </Text>
                              </View>
                              <View
                                style={{
                                  width: '80%',
                                  paddingVertical: 5,
                                  paddingLeft: 15,
                                }}>
                                <Text style>{item.Name}</Text>
                                <Text>{item.Email}</Text>
                                <Text>{item.Dept}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                )}
              </View>

              {/* Modal Code Goes here */}            
                <Modal
                  backdropOpacity={0.7}
                  coverScreen={true}
                  isVisible={isModalVisible}>
                  <View
                    style={{ minHeight: 400, borderRadius: 15, backgroundColor:GlobalColor.White }}>
                      {
                        modalLoader ? (
                          <LoadingScreen/>
                        ):(
                        <View style={styles.modal}>
                          <TouchableOpacity style={styles.ModalCloseIcon}>
                            <Feather
                              name="x-circle"
                              color={'#000'}
                              size={30}
                              onPress={toggleModal}
                            />
                          </TouchableOpacity>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              width: 150,
                              height: 150,
                              borderWidth: 5,
                              borderColor: GlobalColor.Secondary,
                              borderRadius: 75,
                              marginTop: 80,
                            }}>
                            {empPhoto ? (
                              <Image
                                source={{ uri: 'data:image/png;base64, ' + empPhoto }}
                                style={[styles.profileImg, { marginRight: 5 }]}
                              />
                            ) : (
                              <Image
                                source={require('../../../assets/Images/Avtar.png')}
                                style={[styles.profileImg, { marginRight: 5 }]}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              paddingVertical: 15,
                              alignSelf: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{ color: GlobalColor.Primary, lineHeight: 20 }}>
                              {modalItem && modalItem.Name && modalItem.Name}
                            </Text>
                            <Text style={{ color: GlobalColor.Primary, lineHeight: 20 }}>
                              {modalItem && modalItem.Email && modalItem.Email}
                            </Text>
                            <Text style={{ color: GlobalColor.Primary, lineHeight: 20 }}>
                              {modalItem && modalItem.Dept && modalItem.Dept}
                            </Text>
                          </View>
                          <View
                            style={{
                              // height: '23%',
                              marginTop: 5,
                              // backgroundColor:'yellow',
                              flexDirection: 'row',
                              alignSelf: 'center',
                              justifyContent: 'space-around',
                              width: '50%',
                              alignItems: 'flex-end',
                            }}>


                            <TouchableOpacity
                              onPress={() => {
                                Linking.openURL(`mailto:${modalItem.Email}`)
                              }}
                              style={{
                                borderWidth: 1,
                                width: 40,
                                height: 40,
                                borderColor: GlobalColor.Primary,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Feather name="mail" size={20} color={GlobalColor.Primary} />
                            </TouchableOpacity>


                            <TouchableOpacity
                              style={{
                                borderWidth: 1,
                                width: 40,
                                height: 40,
                                borderColor: GlobalColor.Primary,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() => {
                                Linking.openURL(`tel:${modalItem.MOB_NO}`)
                              }}
                            >
                              <Feather name="phone-call" size={20} color={GlobalColor.Primary} />
                            </TouchableOpacity>
                          </View>
                        </View>
                  )}
                  </View>
                </Modal>
            </View>
    </SafeAreaView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal:10
  },
  tabsContainerStyle: {
    marginTop: 10,
    borderRadius:0,
    width:'100%'
  },
  tabStyle: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius:0,
    borderColor:GlobalColor.Secondary
  },
  tabTextStyle: {
    fontSize:GlobalFontSize.P,
    color: 'grey',
    fontFamily:'Roboto-Bold',
  },
  activeTabStyle: {
    backgroundColor: GlobalColor.PrimaryLight,
    borderBottomWidth: 4,
    borderBottomColor: GlobalColor.Secondary,
  },
  activeTabTextStyle: {
    color: GlobalColor.Secondary,
  },

  img: {
    width: '100%',
    height: '15%',
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemView: {
    backgroundColor: '#fff',
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: '#4174D0',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 2,
    // borderTopLeftRadius: 15,
    // borderBottomLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  modal: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: GlobalColor.PrimaryLight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative'
  },
  profileImg: {
    height: 110,
    width: 110,
    borderRadius: 60,
    marginLeft: 5,
  },
  ModalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 55
  }
});

//make this component available to the app
export default Birthdays;