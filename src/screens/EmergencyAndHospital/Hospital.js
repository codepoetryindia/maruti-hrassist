//import liraries
import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Image, SafeAreaView, Pressable } from 'react-native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
// create a component
const Hospital = ({ locationName }) => {
  const myNavigation = useNavigation();
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [hospitalList, setHospitallList] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState('')

  // useEffect(() => {
  //   if (locationName) {
  //     console.log('call api');
  //   }
  // }, [locationName])

  // Hospital list 
  const GetHospListApi = (apidata = {}) => {
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/GetHospList', apidata, token)
      .then(result => {
        console.log("setHospitallList", result);
        setLoader(false);
        let ApiValue = result.Value
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
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = GetHospListApi();
      return () => unsubscribe;
    }, [])
  )
  return (

    <SafeAreaView style={styles.container}>
      {/* Modal */}
      {loader == true ? (
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}


      {loader == true ? (<View style={{ flex: 1, justifyContent: 'center', marginTop: '40%', marginLeft: '20%' }}>
        <Text>We are fetching your data Please wait</Text>
      </View>) : (
        <View style={styles.itemBox}>
          <Modal
            backdropOpacity={0.5}
            animationIn="fadeIn"
            animationOut="fadeOut"
            coverScreen={true}
            isVisible={modalVisible}>
            <View style={styles.modalBox}>
              <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                <Feather
                  name="x-circle"
                  color={'#000'}
                  size={20}
                  onPress={() =>
                    setModalVisible(false)}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>

              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../assets/Images/hospital.png')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>
                  {modalItem.HOSP_NAME}
                </Text>
                <Text style={[styles.modalText, { fontSize: 14, fontWeight: '500' }]}>{modalItem.ADDR}</Text>

                <View style={styles.modalIcon}>
                  <Feather name="phone-call" size={30} color={'#4174D0'}
                    onPress={() => {
                      Linking.openURL(`tel:${modalItem.HOSP_PHONE_NO}`)
                    }} />
                  <FontAwesome5 name='map-marked-alt' size={30} color={'#4174D0'}
                    onPress={() => {
                      Linking.openURL(`http://maps.google.com/maps?saddr=&daddr=${modalItem.ADDR}`)
                    }} />
                </View>

              </View>

            </View>
          </Modal>


          <View style={{ width: '90%', alignItems: 'flex-end', alignSelf: 'center' }}>
            <Ionicons

              name="ios-filter"
              size={35}
              color={'#4174D0'}
              onPress={() => myNavigation.navigate("HosLocation")}
            />
          </View>
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
                  onPress={() => {
                    setModalItem(item)
                    setModalVisible(true);
                  }}
                  style={{ width: '90%' }}>


                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
                    {item.HOSP_NAME}
                  </Text>
                  <Text style={{ color: '#000' }}>{item.ADDR}</Text>
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
  modalBox: {
    width: '90%',
    padding: 10,
    // justifyContent: "center",
    textAlign: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 8
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  modalImage: {
    width: 100, height: 100,
    marginVertical: 10
  },
  modalIcon: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});
//make this component available to the app
export default Hospital;
