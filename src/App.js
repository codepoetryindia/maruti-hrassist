import React, {useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Linking,
  PermissionsAndroid,
  Alert,
  BackHandler,
  Platform
} from 'react-native';
import Routes from './navigations/Routes';
import RNPermissions, {
  NotificationsResponse,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  RESULTS
} from 'react-native-permissions';


export default function App() {
  const StatusBarHeight = StatusBar.currentHeight;

  const askAndroidPermissions= async()=> {
    // console.log(Platform)
    if (Platform.OS != 'android'){
      return;
    }

      let Permissins = [
        // PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        // PERMISSIONS.ANDROID.CAMERA,       
        // PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        // PERMISSIONS.ANDROID.READ_CONTACTS,
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      ];

                  RNPermissions.requestMultiple(Permissins).then((statuses) => {
                    for (var index in Permissins) {
                      if (statuses[Permissins[index]] === RESULTS.GRANTED) {
                      } else {
                        Alert.alert(
                          'Permission Request',
                          'Please allow all the permissions to get a better experience',
                          [
                            {
                              text: 'Okay',
                              onPress: () => {
                                // Linking.openSettings();
                                askAndroidPermissions();
                              },
                            },
                            {
                              text: 'Cancel',
                              style: 'cancel',
                              // onPress: () => {
                              //   // Linking.openSettings();
                              //   BackHandler.exitApp();                                
                              // },
                            },
                          ],
                          { cancelable: false },
                        );
                        break;
                      }
                    }                  
          })
            .then(() => RNPermissions.checkNotifications())
            .then((notifications) => console.log("notifications",notifications ))
            .catch((error) => console.warn(error));
    }

    // useEffect(() => {
    //   const permission = askAndroidPermissions();
    //   return () => {
    //   permission
    //   };
    // }, []);


  
  return (
    <>
        <SafeAreaView style={styles.container}>
        <StatusBar
          StatusBarStyle={'light-content'}
          animated={true}
          backgroundColor="#61dafb"/>
          <Routes />
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
