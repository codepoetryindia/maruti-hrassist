//import liraries
import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Image, SafeAreaView, Pressable } from 'react-native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
// create a component
const Hospital = ({ locationName = '' }) => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [hospitalList, setHospitallList] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState('')
  // Hospital list 
  const GetHospListApi = (apidata = {}) => {
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/GetHospList', apidata, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("setHospitallList", ApiValue);
        setHospitallList(ApiValue)
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
    GetHospListApi();
  }, []);
  return (

    <SafeAreaView style={styles.container}>
      {loader == true ? (
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}
      {loader == true ? (<View style={{ flex: 1, justifyContent: 'center', marginTop: '40%', marginLeft: '20%' }}>
        <Text>We are fetching your data Please wait</Text>
      </View>) :(

      <View style={styles.itemBox}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/Images/dataNotFound.png')}
                  style={{ width: 300, height: 300, resizeMode: 'contain', marginLeft: -50 }} />
                <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
              </View>
            )
          }}
          data={hospitalList}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => (
            <View style={styles.box}>
              <TouchableOpacity
                onPress={(item) => {
                  setModalItem(item)
                  setModalVisible(true);
                }}
                style={{ width: '90%' }}>

                {/* Modal */}
                <Modal
                  backdropOpacity={0.1}
                  coverScreen={true}
                  isVisible={modalVisible}>
                  <LinearGradient
                    colors={['#4174D0', '#6ef7ff']}
                    style={{ flex: 0.53, borderRadius: 15 }}>
                    <View style={styles.modal}>
                      {/* <Text>{JSON.stringify(modalItem)}</Text> */}
                      <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Feather
                          name="x-circle"
                          color={'#000'}
                          size={20}
                          onPress={setModalVisible(false)}
                          style={{ margin: 10 }}
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
                          borderColor: '#6ef7ff',
                          borderRadius: 60,
                          marginTop: 30,
                        }}>

                        <Image
                          source={require('../../assets/Images/Avtar.png')}
                          style={[styles.profileImg, { marginRight: 5 }]}
                        />

                      </View>
                      {/* <View
                        style={{
                          paddingVertical: 15,
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{ color: '#fff', lineHeight: 20 }}>
                          {modalItem && modalItem.HOSP_NAME && modalItem.HOSP_NAME}
                        </Text>
                        <Text style={{ color: '#fff', lineHeight: 20 }}>
                          {modalItem && modalItem.ADDR && modalItem.ADDR}
                        </Text>
                      </View> */}
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
                          onPress={() => {
                            Linking.openURL(`mailto:${modalItem.Email}`)
                          }}
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

                <Text style={{ fontSize: 16, fontWeight: 'bold',color:'#000' }}>
                  {item.HOSP_NAME}
                </Text>
                <Text style={{color:'#000' }}>{item.ADDR}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '10%' }}
                onPress={() => {
                  Linking.openURL(`tel:${item.HOSP_PHONE_NO}`)
                }}>
                <Feather name="phone-call" size={20} color={'#4174D0'} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      )}
    </SafeAreaView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemBox: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  box: {
    width: '90%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
//make this component available to the app
export default Hospital;
