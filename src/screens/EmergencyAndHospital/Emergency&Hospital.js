//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Hospital from './Hospital';
import NearByHospital from './NearByHospital';
import EmergencyContacts from './EmergencyContact';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const EmergencyHospital = ({ navigation, route }) => {
  // let data = route.params
  // console.log(data)
  // const [locationName,setLocationName] = useState('')

  // useEffect(() => {
  //   setLocationName(route.params.selectedLoc)
  //   console.log(route.params.selectedLoc)
  // }, [route.params])

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <LinearGradient
        // colors={['#4174D0', '#74f5fa']}
        colors={['#00B4DB', '#0083B0']}
        style={styles.gradient}>
        <View style={styles.container}>
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
            Emergency & Hospital
          </Text>
          {/* {index == 1 ? (
            <Ionicons
              style={{ marginLeft: 80 }}
              name="ios-filter"
              size={25}
              color={'white'}
              onPress={() => navigation.navigate("HosLocation")}
            />
          ) : null} */}
        </View>
      </LinearGradient>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff' },
          tabBarStyle: { backgroundColor: '#0083B0', elevation: 0 },
          
        }}
      >
        <Tab.Screen name="Emergency Contacts" component={EmergencyContacts} />
        <Tab.Screen name="Hospital" component={Hospital} onPress={() => console.log("pressed")} />
        <Tab.Screen name="NearBy Hospital" component={NearByHospital} />
      </Tab.Navigator>

      {/* <TabView
        renderTabBar={props => {
          return (
            <LinearGradient colors={['#74f5fa', '#62cfec']} style={{ marginTop: -1, zIndex: -1, elevation: -1 }}>
              <TabBar
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ fontSize: 13, color: '#fff' }}>
                    {route.title}
                  </Text>
                )}
                {...props}
                style={{ backgroundColor: 'transparent', elevation: 0 }}
              />
            </LinearGradient>
          );
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      /> */}
    </SafeAreaView>



  );
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
    elevation: 0
  },
  container: {
    flexDirection: 'row',
  },
  searchSection: {
    top: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '77%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

// //make this component available to the app
export default EmergencyHospital;