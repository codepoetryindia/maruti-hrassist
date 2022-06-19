//import liraries
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking ,SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay/lib';

// create a component
const Notification = ({ navigation }) => {
  const [loader, setLoader] = useState(false)
  const [notifi, setNotifi] = useState([])
  const NotifiApi = () => {
    setLoader(true);
    let token = 'Basic ZDU5NjEyY2ItYTI3NS00ZTYzLTkyMGItNGE4ODJmYjFiOTVm'
    axios.get('https://onesignal.com/api/v1/notifications?app_id=42fcb50a-922f-4b0e-9ba3-701d663beede',
      {
        headers: {
          'authorization': token
        }
      })
      .then(resp => {
        console.log(resp);
        setLoader(false);
        let result = resp.data.notifications
        let mapData = []
        result.map((item) => {
          return mapData.push(item)
        })
        setNotifi(mapData)
      })
      .catch(error => {
        setLoader(false);
        // console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          Toast.show(error.response.data.title);
        } else if (error) {
          Toast.show('Network Error');
        } else {
          Toast.show('Something Went Wrong');
        }
      });
  }
  useEffect(() => {
    NotifiApi()
  }, [])


  // console.log("notifi", notifi);
  return (
      <SafeAreaView style={styles.container}>
        {loader==true ? (
           <Spinner
           visible={loader}
           textContent={'Loading...'}
           textStyle={styles.spinnerTextStyle}
         />
        ):null}
        <LinearGradient
          style={{ flex: 1 }}
          colors={['#4174D0', '#6ef7ff']}>
          <View style={{ flexDirection: 'row', paddingVertical: 15, padding: 10, backgroundColor:'#4174D0' }}>
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
            </View>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                // letterSpacing: 1,
                marginLeft: 25,
              }}>
              Notifications
            </Text>
          </View>

          {/* BODY */}
          <View
            style={{
              marginHorizontal:10,
              marginBottom:50,
              padding: 10,
            }}>
            <FlatList
              data={notifi}
              ListEmptyComponent={() => {
                return (
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff' }}>
                    <Image source={require('../assets/Images/dataNotFound.png')}
                      style={{ width: 300, height: 300, resizeMode: 'contain', }} />
                    <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    marginBottom: 14,
                    padding: 15,
                    paddingVertical: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // paddingVertical: 10,
                    }}>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: 16 }}>{item.contents.en}</Text>
                    </View>
                    <TouchableOpacity style={{ width: '20%',alignItems:'flex-end' }}>
                      <Ionicons
                        name="notifications-circle-outline"
                        size={30}
                        color={'#4174D0'}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image source={item.big_picture ? { uri: item.big_picture} : require('./../assets/Images/notification.png')}
                    style={{ width: '100%', height: 180, resizeMode: 'cover', borderRadius: 0, marginVertical: 10 }} />
                    
                    {item.url ? (
                    <TouchableOpacity onPress={()=>  Linking.openURL(item.url)}>
                      <Text style={styles.Link}>
                        {item.url ? item.url : ''}
                      </Text>
                    </TouchableOpacity>
                    ): null }
                </View>
              )}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>)
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Link:{
    color:'blue',
    fontWeight:'700',
    fontSize:16,
  },
  spinnerTextStyle:{
    color:'#fff'
  }
});

//make this component available to the app
export default Notification;
