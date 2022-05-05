//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform,} from 'react-native';
import Geolocation from '@react-native-community/geolocation';



// create a component
const NearByHospital = () => {
  // const [
  //   currentLongitude,
  //   setCurrentLongitude
  // ] = useState('...');
  // const [
  //   currentLatitude,
  //   setCurrentLatitude
  // ] = useState('...');
  // const [
  //   locationStatus,
  //   setLocationStatus
  // ] = useState('');

  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  // const getOneTimeLocation = () => {
  //   setLocationStatus('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     (position) => {
  //       setLocationStatus('You are Here');

  //       //getting the Longitude from the location json
  //       const currentLongitude = 
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = 
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);
        
  //       //Setting Longitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000
  //     },
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     (position) => {
  //       //Will give you the location on location change
        
  //       setLocationStatus('You are Here');
  //       console.log(position);

  //       //getting the Longitude from the location json        
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = 
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000
  //     },
  //   );
  // };
  const [location ,setLocation] = useState('')
  const GetHospital = () => {
    Geolocation.getCurrentPosition(position => {
      console.log('position',position)
      const {latitude, longitude} = position.coords;
      setLocation({
        latitude,
        longitude,
      });
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} 
       onPress={() => {GetHospital()}}>
        <Text style={{fontSize:16, fontWeight:'bold'}}></Text>
        <View style={styles.circle}>
          <Text>Click here to</Text>
          <Text>Search</Text>
        </View>
        <View>
          <Text style={{lineHeight: 30}}>
          Longitude: {location.longitude}
          </Text>
          <Text style={{lineHeight: 30}}>
          Latitude: {location.latitude}
          </Text>
          <Text style={{textAlign:'center'}}>Hospital</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  box: {
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#80406A',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 10,
  },
});

//make this component available to the app
export default NearByHospital;
