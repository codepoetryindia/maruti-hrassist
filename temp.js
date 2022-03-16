//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
// create a component
const Birthdays = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const BirthdayData = [
    {
      dept: 'EPP',
      name: 'MR. Dahal',
      email: 'mrdahal@.codepoetry.in',
      divison: 'MGR | GPA',
      images: require('../../../assets/Images/smile.jpg'),
    },
    {
      dept: 'ENGG',
      name: 'MR. Kunal',
      email: 'mrKunal@.codepoetry.in',
      divison: 'MGR | GPA',
      images: require('../../../assets/Images/avtar.webp'),
    },
    {
      dept: 'CPP',
      name: 'MR. Amit',
      email: 'amit@.codepoetry.in',
      divison: 'MGR | GPA',
      images: require('../../../assets/Images/smile.jpg'),
    },
    {
      dept: 'ENGG',
      name: 'MR. Diwas',
      email: 'diwas@.codepoetry.in',
      divison: 'MGR | GPA',
      images: require('../../../assets/Images/avtar.webp'),
    },
    {
      dept: 'cpp',
      name: 'MR. Brashant',
      email: 'Brashant@.codepoetry.in',
      divison: 'MGR | GPA',
      images: require('../../../assets/Images/avtar.webp'),
    },
    {
      dept: 'EPP',
      name: 'MR. Dahal',
      email: 'mrdahal@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'ENGG',
      name: 'MR. Kunal',
      email: 'mrKunal@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'CPP',
      name: 'MR. Amit',
      email: 'amit@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'ENGG',
      name: 'MR. Diwas',
      email: 'diwas@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'cpp',
      name: 'MR. Brashant',
      email: 'Brashant@.codepoetry.in',
      divison: 'MGR | GPA',
    },
  ];

  //   const {Birthdays, Tomorow} = route.params;
  const [CurrentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = index => {
    setCurrentPage(index);
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
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

      <View>
        {CurrentPage == 0 ? (
          <View>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Birthday_candles.jpg/1200px-Birthday_candles.jpg',
              }}
              style={styles.img}
            />

            <View style={{height: '65%', marginTop: 10, marginBottom: '30%'}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={BirthdayData}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <View style={{flex: 1}}>
                    <TouchableOpacity onPress={toggleModal}>
                      <View style={styles.itemView}>
                        <View
                          style={{
                            borderRightWidth: 2,
                            paddingVertical: 8,
                            width: '20%',
                          }}>
                          <Text style={{textAlign: 'center'}}>{item.dept}</Text>
                        </View>
                        <View
                          style={{
                            width: '80%',
                            paddingVertical: 5,
                            paddingLeft: 15,
                          }}>
                          <Text style>{item.name}</Text>
                          <Text>{item.email}</Text>
                          <Text>{item.divison}</Text>
                        </View>
                      </View>

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
                          style={{flex:0.53,borderRadius:15}}>
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
                                marginTop:30
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
                              <Text style={{color:'#fff',lineHeight:20}}>{item.name}</Text>
                              <Text  style={{color:'#fff',lineHeight:20}}>{item.email}</Text>
                              <Text  style={{color:'#fff',lineHeight:20}}>{item.divison}</Text>
                            </View>
                            <View
                              style={{
                                height:'23%',
                                marginTop:12,
                                // backgroundColor:'yellow',
                                flexDirection: 'row',
                                alignSelf:'center',
                                justifyContent: 'space-around',
                                width: '50%',
                                alignItems:'flex-end'
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
                                <Feather
                                  name="mail"
                                  size={20}
                                  color={'#fff'}
                                />
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
        ) : (
          <View>
            <View style={{height: '95%', paddingVertical: 10}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={BirthdayData}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <View style={{flex: 1}}>
                    <TouchableOpacity onPress={toggleModal}>
                      <View style={styles.itemView}>
                        <View
                          style={{
                            borderRightWidth: 2,
                            paddingVertical: 8,
                            width: '20%',
                          }}>
                          <Text style={{textAlign: 'center'}}>{item.dept}</Text>
                        </View>
                        <View
                          style={{
                            width: '80%',
                            paddingVertical: 5,
                            paddingLeft: 15,
                          }}>
                          <Text style>{item.name}</Text>
                          <Text>{item.email}</Text>
                          <Text>{item.divison}</Text>
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
                          style={{flex:0.53,borderRadius:15}}>
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
                              borderRadius: 50,
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
                            <Text style={{color:'#fff'}}>{item.name}</Text>
                            <Text  style={{color:'#fff'}}>{item.email}</Text>
                            <Text  style={{color:'#fff'}}>{item.divison}</Text>
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
                              <Feather
                                name="mail"
                                size={20}
                                color={'#fff'}
                              />
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
    borderWidth:1,
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
  },
  modal: {
    flex: 0.39,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#f8edec',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 40,
  },
});


//make this component available to the app
export default Birthdays;


// //import liraries
// import React, {Component} from 'react';
// import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // create a component
// const EmployProfile = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         style={{flex: 0.25}}
//         colors={['#2757C3', '#80406A', '#AD3231']}>
//         <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
//           <Ionicons
//             name="chevron-back-outline"
//             size={30}
//             color={'white'}
//             onPress={() => navigation.goBack()}
//           />
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 18,
//               letterSpacing: 1,
//               marginLeft: 25,
//             }}>
//             Profile
//           </Text>
//         </View>
//       </LinearGradient>
//       <View
//         style={{
//           // height: 200,
//           backgroundColor: '#fff',
//           width: '90%',
//           alignSelf: 'center',
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,
//           elevation: 5,
//           borderRadius: 8,
//           position: 'absolute',
//           top: '15%',
//         }}>
//         <View
//           style={{
//             borderWidth: 5,
//             borderColor: '#fff',
//             shadowColor: '#000',
//             shadowOffset: {
//               width: 5,
//               height: 5,
//             },
//             shadowOpacity: 0.5,
//             shadowRadius: 3.84,
//             elevation: 5,
//             justifyContent: 'center',
//             alignSelf: 'center',
//             borderRadius: 100,
//             marginTop: '-12%',
//           }}>
//           <Image
//             source={require('../../assets/Images/smile.jpg')}
//             style={{
//               width: 100,
//               height: 100,
//               overflow: 'hidden',
//               borderRadius: 100,
//               alignSelf: 'center',
//             }}
//           />
//         </View>
//      <View style={{height: '80%',}}>
//      <ScrollView>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//           <View style={styles.box}>
//             <Text>Vertical / Div ./Department</Text>
//             <Text>IT / ITA-1 / AG3</Text>
//           </View>
//         </ScrollView>
//        </View>
//       </View>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   box: {
//     width: '100%',
//     paddingVertical: 10,
//     padding: 10,
//     marginVertical: 5,
//     borderBotttomWidth: 1,
//     // borderTopColor: '#80406A',
//     // borderStartColor: '#ad3231',
//     // borderBottomColor: '#2757C3',
//     // borderEndColor: '#ad3231',
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     borderRadius: 5,
//   },
// });

// //make this component available to the app
// export default EmployProfile;
