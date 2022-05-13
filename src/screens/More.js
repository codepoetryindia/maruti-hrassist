//import liraries
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';
// create a component
const More = ({navigation}) => {
  var SendIntentAndroid = require('react-native-send-intent');

  const SAPSF = () => {
    let url = 'skype://app';
    Linking.openURL(url).catch(err => {
      if (err.code === 'EUNSPECIFIED') {
        if (Platform.OS === 'android') {
          AppInstalledChecker.isAppInstalled(
            'skype',
          ).then(isInstalled => {
            if (isInstalled) {
              Linking.openURL('url');
            } else {
              console.log('is installed false');
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.skype.raider&hl=en_IN&gl=US',
              ).catch(err => {
                console.log(err);
              });
            }
          });
        }
      } else {
        console.log('Platform Is Ios');
      }
    });
  };


  // const SAPSF = () => {
  //   SendIntentAndroid.isAppInstalled('com.skype.raider').then(
  //     isInstalled => {
  //       if (isInstalled) {
  //         SendIntentAndroid.openApp('com.skype.raider')
  //         console.log('is installed true');
  //       } else {
  //         Linking.openURL(
  //           'https://play.google.com/store/apps/details?id=com.successfactors.successfactors',
  //         ).catch(err => {
  //           console.log(err);
  //         });
  //       }
  //     },
  //   );
  // };
  const AskHr = () => {
  
    SendIntentAndroid.isAppInstalled('symphonysummit://app').then(
      isInstalled => {
        console.log('check',isInstalled)
        if (isInstalled == false) {
          console.log('check',isInstalled)
          SendIntentAndroid.openApp('symphonysummit').then(
            wasOpened => {},
          );
          console.log('is installed true',wasOpened);
        } else {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=air.com.symphonysummit.marutisuzukihr',
          ).catch(err => {
            console.log(err);
          });
        }
      },
    );
  };
  const Wellness = () => {
    SendIntentAndroid.isAppInstalled('in/WellnessMitra/').then(isInstalled => { 
      
      if (isInstalled) {
        SendIntentAndroid.openApp('in/WellnessMitra/')
        console.log('is installed true');
      } else {
        Linking.openURL('https://msilappstore.in/WellnessMitra/').catch(err => {
          console.log(err);
        });
      }
    });
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{padding: 20}}
     colors={['#4174D0','#6ef7ff']}>
        <View style={{flexDirection: 'row'}}>
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
              onPress={() => navigation.navigate('Home')}
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
            Other Mobile Apps
          </Text>
        </View>
      </LinearGradient>

      {/* body */}
      <View style={{width: '100%', top: 50}}>
        <TouchableOpacity
          onPress={() => {
            SAPSF();
           
          }}
          style={{
            cursor: 'pointer',
            width: '50%',
            paddingHorizontal: 15,
            paddingVertical: 25,
            alignSelf: 'center',
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
            marginVertical: 15,
            borderRadius: 18,
          }}>
          <Image
            source={require('../assets/Images/man.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={{fontSize: 20, paddingVertical: 5, color: 'grey'}}>
            SAP SF (NEEV)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AskHr();
          }}
          style={{
            cursor: 'pointer',
            width: '50%',
            paddingHorizontal: 15,
            paddingVertical: 25,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1.29,
            shadowRadius: 10.65,

            elevation: 5,

            alignItems: 'center',
            marginVertical: 15,
            borderRadius: 18,
          }}>
          <Image
            source={require('../assets/Images/smile.jpg')}
            style={{width: 50, height: 50, borderRadius: 40}}
          />
          <Text style={{fontSize: 20, paddingVertical: 5}}>Ask HR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Wellness();
          }}
          style={{
            cursor: 'pointer',
            width: '50%',
            paddingHorizontal: 15,
            paddingVertical: 25,
            alignSelf: 'center',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1.29,
            shadowRadius: 10.65,

            elevation: 5,

            alignItems: 'center',
            marginVertical: 15,
            borderRadius: 18,
          }}>
          <Image
            source={require('../assets/Images/profile2.jpg')}
            style={{width: 50, height: 50, borderRadius: 40}}
          />
          <Text style={{fontSize: 20, paddingVertical: 5}}>Wellness Mitra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default More;
