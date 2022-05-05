//import liraries
import React, {useState, useEffect, useRef,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
  ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../context/AuthContext'
// create a component
const Birthdays = () => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [birthdayDetails, setBirthdayDetails] = useState({});
  const [loader, setLoader] = useState(false)
  const [todayBirthday,setTodayBirthday]= useState ([])
  const [tomorrowBirthday,SetTomorrowBirthday]= useState ([])
  
  const PostBirthdayData = data => {
    let apiData= {PFlag:''}
    let token = AppUserData.token
    console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetEmplBirthday', apiData, token)
      .then(result => {
        setLoader(false);
        console.log('ApiResult', result);
        let ApiValue = result.Value
        console.log('Todays', ApiValue)
        setBirthdayDetails(ApiValue)
        // let splitedValue = ApiValue[0].BIRTHDATE
        // let getValue = splitedValue(2)
        // console.log("getValue",splitedValue)
        ApiValue.filter((Element) => {
          let todayResult = Element.BIRTHDATE.includes("TODAY");
          let tommorowResult = Element.BIRTHDATE.includes("TOMORROW");
          if (todayResult) {
            setTodayBirthday(Element)
          }
          else if (tommorowResult){
            SetTomorrowBirthday(Element)
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
  console.log("tod",todayBirthday)
  console.log("tom",tomorrowBirthday)
  useEffect(() => {
    PostBirthdayData()
   
  }, [])
  
  const scrollY = useRef(new Animated.Value(0)).current;

  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const BirthdayData = [
  //   {
  //     dept: 'EPP',
  //     name: 'MR. Dahal',
  //     email: 'mrdahal@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //     images: require('../../../assets/Images/smile.jpg'),
  //   },
  //   {
  //     dept: 'ENGG',
  //     name: 'MR. Kunal',
  //     email: 'mrKunal@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //     images: require('../../../assets/Images/avtar.webp'),
  //   },
  //   {
  //     dept: 'CPP',
  //     name: 'MR. Amit',
  //     email: 'amit@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //     images: require('../../../assets/Images/smile.jpg'),
  //   },
  //   {
  //     dept: 'ENGG',
  //     name: 'MR. Diwas',
  //     email: 'diwas@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //     images: require('../../../assets/Images/avtar.webp'),
  //   },
  //   {
  //     dept: 'cpp',
  //     name: 'MR. Brashant',
  //     email: 'Brashant@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //     images: require('../../../assets/Images/avtar.webp'),
  //   },
  //   {
  //     dept: 'EPP',
  //     name: 'MR. Dahal',
  //     email: 'mrdahal@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //   },
  //   {
  //     dept: 'ENGG',
  //     name: 'MR. Kunal',
  //     email: 'mrKunal@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //   },
  //   {
  //     dept: 'CPP',
  //     name: 'MR. Amit',
  //     email: 'amit@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //   },
  //   {
  //     dept: 'ENGG',
  //     name: 'MR. Diwas',
  //     email: 'diwas@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //   },
  //   {
  //     dept: 'cpp',
  //     name: 'MR. Brashant',
  //     email: 'Brashant@.codepoetry.in',
  //     divison: 'MGR | GPA',
  //   },
  // ];

  //   const {Birthdays, Tomorow} = route.params;
  const [CurrentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = index => {
    setCurrentPage(index);
  };
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
      <StatusBar hidden />
      <View style={{width: '100%'}}>
        <SegmentedControlTab
          borderRadius={8}
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

      <View>
        {CurrentPage == 0 ? (
          <View>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Birthday_candles.jpg/1200px-Birthday_candles.jpg',
              }}
              style={styles.img}
            />

            <View style={{height: '67%', marginTop: 10, marginBottom: '30%'}}>
              <Animated.FlatList
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollY}}}],
                  {useNativeDriver: true},
                )}
                showsVerticalScrollIndicator={false}
                data={birthdayDetails}
                keyExtractor={({ item, index }) => index}
                renderItem={({item, index}) => {
                  // const inputRange = [
                  //   -1,
                  //   0,
                  //   ITEM_SIZE * index,
                  //   ITEM_SIZE * (index + 2),
                  // ];
                  // const opacityInputRange = [
                  //   -1,
                  //   0,
                  //   ITEM_SIZE * index,
                  //   ITEM_SIZE * (index + 0.7),
                  // ];
                  // const scale = scrollY.interpolate({
                  //   inputRange,
                  //   outputRange: [1, 1, 1, 0],
                  // });
                  // const opacity = scrollY.interpolate({
                  //   inputRange: opacityInputRange,
                  //   outputRange: [1, 1, 1, 0],
                  // });
                  return (
                    <Animated.View style={{flex: 1}}>
                      <TouchableOpacity
                        onPress={() => {
                          toggleModal();
                          console.log(item);
                          setBirthdayDetails(item);
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
                            <Text style={{textAlign: 'center'}}>
                              {item.DIRC_CODE}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '80%',
                              paddingVertical: 5,
                              paddingLeft: 15,
                            }}>
                            <Text>{item.Name}</Text>
                            <Text>{item.Email}</Text>
                            <Text>{item.Dept}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                }}
              />
              <Modal
                backdropOpacity={0.1}
                animationInTiming={300}
                animationIn="zoomInUp"
                animationOut="fadeOut"
                animationOutTiming={500}
                coverScreen={true}
                isVisible={isModalVisible}>
                <LinearGradient
                  colors={['#2757C3', '#80406A', '#ad3231']}
                  style={{flex: 0.53, borderRadius: 15}}>
                  <View style={styles.modal}>
                    <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                      <Feather
                        name="x-circle"
                        color={'#000'}
                        size={20}
                        onPress={toggleModal}
                        style={{margin: 10}}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        width: 150,
                        height: 150,
                        borderWidth: 20,
                        borderColor: '#bd5b5a',
                        borderRadius: 60,
                        marginTop: 30,
                      }}>
                      <Image
                        source={require('../../../assets/Images/smile.jpg')}
                        style={styles.profileImg}
                      />
                    </View>
                    <View
                      style={{
                        paddingVertical: 15,
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#fff', lineHeight: 20}}>
                        {birthdayDetails.name}
                      </Text>
                      <Text style={{color: '#fff', lineHeight: 20}}>
                        {birthdayDetails.email}
                      </Text>
                      <Text style={{color: '#fff', lineHeight: 20}}>
                        {birthdayDetails.dept}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '23%',
                        marginTop: 5,
                        // backgroundColor:'yellow',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-around',
                        width: '50%',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          width: 40,
                          height: 40,
                          borderColor: '#fff',
                          borderRadius: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Feather name="mail" size={20} color={'#fff'} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          width: 40,
                          height: 40,
                          borderColor: '#fff',
                          borderRadius: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Feather name="phone-call" size={20} color={'#fff'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </Modal>
            </View>
          </View>
        ) : (
          <View>
            <View style={{height: '96%', paddingVertical: 10}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={birthdayDetails}
                keyExtractor={({ item, index }) => index}
                renderItem={({item,index}) => (
                  <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => {
                      toggleModal()
                      console.log(item)

                    }}>
                      <View style={styles.itemView}>
                        <View
                          style={{
                            borderRightWidth: 2,
                            paddingVertical: 8,
                            width: '20%',
                          }}>
                          <Text style={{textAlign: 'center'}}>{item.DIRC_CODE}</Text>
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

                      <Modal
                        backdropOpacity={0.1}
                        animationInTiming={300}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        animationOutTiming={500}
                        coverScreen={true}
                        isVisible={isModalVisible}>
                        <LinearGradient
                          colors={['#2757C3', '#80406A', '#ad3231']}
                          style={{flex: 0.53, borderRadius: 15}}>
                          <View style={styles.modal}>
                            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                              <Feather
                                name="x-circle"
                                color={'#000'}
                                size={20}
                                onPress={toggleModal}
                                style={{margin: 10}}
                              />
                            </TouchableOpacity>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                width: 150,
                                height: 150,
                                borderWidth: 20,
                                borderColor: '#bd5b5a',
                                borderRadius: 60,
                                marginTop: 30,
                              }}>
                              <Image
                                source={require('../../../assets/Images/smile.jpg')}
                                style={styles.profileImg}
                              />
                            </View>
                            <View
                              style={{
                                paddingVertical: 15,
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}>
                              <Text style={{color: '#fff'}}>{birthdayDetails.name}</Text>
                              <Text style={{color: '#fff'}}>{birthdayDetails.email}</Text>
                              <Text style={{color: '#fff'}}>{birthdayDetails.dept}</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                                width: '50%',
                              }}>
                              <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  width: 40,
                                  height: 40,
                                  borderColor: '#fff',
                                  borderRadius: 100,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Feather name="mail" size={20} color={'#fff'} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  width: 40,
                                  height: 40,
                                  borderColor: '#fff',
                                  borderRadius: 100,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Feather
                                  name="phone-call"
                                  size={20}
                                  color={'#fff'}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </LinearGradient>
                      </Modal>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      </View>
    </View>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '90%',
  },
  tabsContainerStyle: {
    marginTop: 20,
  },
  tabStyle: {
    //custom styles
    paddingVertical: 10,
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#ad3231',
  },
  tabTextStyle: {
    //custom styles
    fontWeight: '700',
    color: 'grey',
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: '#2757C3',
    // borderColor:Colors.primaryColor
  },
  activeTabTextStyle: {
    color: '#2757C3',
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
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: 'gray',
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
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modal: {
    flex: 0.39,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#f8edec',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 40,
  },
});

//make this component available to the app
export default Birthdays;
