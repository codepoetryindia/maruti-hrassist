//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
  SafeAreaView,
  ScrollView,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';
import AuthContext from '../context/AuthContext';
import * as ApiService from '../Utils/Utils';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay/lib';
// create a component
const OtherApps = ({ navigation }) => {

  const [loader, setLoader] = useState(false)
  const { authContext, AppUserData } = useContext(AuthContext);
  const [appLink, setAppLink] = useState('');

  const GetAPPLinkApi = () => {
    let userId = AppUserData.data.userId
    console.log("userDetails", userId);
    let apiData = {
      UserName: userId,
      LinkName: "HR_ASSIST"
    }
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/GetAPPLink', apiData, token)
      .then(result => {
        let responseData = result.Value
        console.log("responseData", responseData);
        setLoader(false);
        setAppLink(responseData);
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
  };

  var SendIntentAndroid = require('react-native-send-intent');
  // const SAPSF = () => {
  //   SendIntentAndroid.isAppInstalled('com.successfactors.successfactors').then(isInstalled => {
  //     if (isInstalled) {
  //       SendIntentAndroid.openApp('com.successfactors.successfactors')
  //       console.log('is installed true');
  //     } else {
  //       Linking.openURL('https://play.google.com/store/apps/details?id=com.successfactors.successfactors').catch(err => {
  //         console.log(err);
  //       });
  //     }
  //   });
  // };

  const linkOpen = (link) => {

    if(Platform.OS === 'ios'){
      if(link.LINK_LINK3){
        Linking.openURL(link.LINK_LINK3)
      }else{
        Linking.openURL(link.LINK_LINK2)
      }
    }else{
      Linking.openURL(link.LINK_LINK1)
    }    
  }

  useEffect(() => {
    GetAPPLinkApi()
  }, [])


  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

      <LinearGradient
        style={{ padding: 20 }}
        colors={['#00B4DB', '#0083B0']}
        >
        <View style={{ width:"100%"}}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // width: 40,
              alignItems: 'center',
            }}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.navigate('Home')}
            />
            <Ionicons
              name="menu-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                letterSpacing: 1,
                marginLeft: 10,
              }}>
              Other Mobile Apps
          </Text>

          </View>
        </View>
      </LinearGradient>

      {/* body */}

      {
        appLink !== '' ? (

          <View style={{ flex: 1, paddingHorizontal:10 }}>
            <FlatList
              data={appLink}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={( item ) => item.LINK_ID.toString()}
              renderItem={({ item, index }) => (

                <TouchableOpacity
                  onPress={() => {
                    linkOpen(item);
                  }}
                  style={{
                    width: '48%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    margin: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 25,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 1.29,
                    shadowRadius: 10.65,
                    elevation: 5,
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{ uri: item.LINK_LINK3 }}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={{ fontSize: 18, paddingVertical: 5, color: '#4a4a4a' }}>
                    {item.LINK_DESC}
                  </Text>
                </TouchableOpacity>

              )} />
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            {loader == true ? <Text>We are Loading your data</Text> : <Text>not found</Text>}
          </View>
        )}
      </View>
    </SafeAreaView>)
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: '#fff',    
  },
});

//make this component available to the app
export default OtherApps;
