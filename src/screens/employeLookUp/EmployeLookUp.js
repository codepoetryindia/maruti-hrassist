//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import EmployeeDirect from './EmployeeDirect';
import Birthdays from './Birthday/Birthdays';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header } from '../../components/reusable/Header';

const Tab = createMaterialTopTabNavigator();




const EmployeLookUp = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      alert('Default behavior prevented');
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  
  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title={"Employee Lookup"}/>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { textTransform:'uppercase' },
          tabBarActiveTintColor: '#fff',
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff' },
          tabBarStyle: { backgroundColor: GlobalColor.Secondary, elevation: 0 },
        }}>
        <Tab.Screen name="Employee Directory" component={EmployeeDirect} />
        <Tab.Screen name="Birthdays" component={Birthdays} />
      </Tab.Navigator>
      {/* <TabView
        renderTabBar={props => {
          return (
            <LinearGradient  colors={['#5dc0e9', '#5dc0e9']} style={{marginTop:-1,zIndex:-1}}>
              <TabBar
                {...props}
                style={{
                  backgroundColor: '#2980b9', elevation: 5
                }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ color, fontWeight:'700', textTransform:'uppercase'}}>
                    {route.title}
                  </Text>
                )}
                indicatorContainerStyle={{backgroundColor:'#2980b9'}}
                indicatorStyle={{color:"#f00", backgroundColor:'#fff',height:5}}
              />
            </LinearGradient>
          );
        }}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        sceneContainerStyle={{backgroundColor:"#dfe6e9", width:"100%"}}
        style={{backgroundColor:'#f00'}}
      /> */}
    </SafeAreaView>
  )
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
    elevation: 0,
    backgroundColor:GlobalColor.Secondary
  },
  container: {
    flexDirection: 'row',
    // flex:1
  },
  // searchSection: {
  //   top: 10,
  //   width: '90%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   borderWidth: 1,
  //   borderColor: '#d9d9d9',
  //   borderRadius: 7,
  // },
  // searchIcon: {
  //   padding: 10,
  // },
  // input: {
  //   width: '77%',
  //   paddingTop: 10,
  //   paddingRight: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 0,
  //   backgroundColor: '#fff',
  //   color: '#424242',
  // },
});

// //make this component available to the app
export default EmployeLookUp;
