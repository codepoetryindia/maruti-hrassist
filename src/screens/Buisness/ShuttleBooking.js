//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,

  TouchableOpacity,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FutureBook from './FutureBook';
import PastBook from './PastBook';
import Book from './Book';

const ShuttleBooking = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const [horizental, setHorizental] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00B4DB', '#0083B0']}
        style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row' }}>
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
              onPress={() => navigation.navigate("BuisnessTravel")}
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
            Shuttle Booking
          </Text>
          <TouchableOpacity
            style={{ marginLeft: '30%' }}
            onPress={() => {
              horizental == true ? setHorizental(false) : setHorizental(true);
            }}>
            <Ionicons
              style={{ marginLeft: '35%' }}
              name="ellipsis-vertical"
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
          {horizental == true ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Guidelines')}
              style={{
                padding: 10,
                backgroundColor: '#fff',
                position: 'absolute',
                top: 20,
                right: 30,
                zIndex: 1000,
                borderRadius: 8
              }}>
              <Text>Guidelines</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </LinearGradient>
      {/* <TabView
        style={{ fontSize: 10 }}
        renderTabBar={props => {
          return (
            <View 
              style={{ marginTop: -1, zIndex: -1 ,backgroundColor:'#0083B0'}}>
              <TabBar
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ fontSize: 13, color: '#fff' }}>
                    {route.title}
                  </Text>
                )}
                {...props}
                style={{ backgroundColor: 'transparent', elevation: 0 }}
              />
            </View>
          );
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      /> */}
      <Tab.Navigator 
       screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: '#fff',
        tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff' },
        tabBarStyle: { backgroundColor: '#0083B0', elevation: 0 },
      }}>
        <Tab.Screen name="Book" component={Book} />
        <Tab.Screen name="PastBook" component={PastBook} />
        <Tab.Screen name="FutureBook" component={FutureBook} />
      </Tab.Navigator>
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
export default ShuttleBooking;
