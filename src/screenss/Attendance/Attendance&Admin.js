//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Attendance from './Attendence';
import Leave from './Leave';
import Shift from './Shift';
import HolidayCalendar from './HolidayCalendar';

const FirstRoute = () => <Attendance />;
const SecondRoute = () => <Leave />;
const ThirdRoute = () => <Shift />;
const FourthdRoute = () => <HolidayCalendar />;

const AttendanceAdmin = ({navigation}) => {
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthdRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Attendance'},
    {key: 'second', title: 'Leave'},
    {key: 'third', title: 'Shift'},
    {key: 'fourth', title: 'HolidayCalendar'},
  ]);
  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
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
              size={15}
              color={'white'}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="menu-outline"
              size={20}
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
           Attendance & Admin
          </Text>
        </View>
      </LinearGradient>
      <TabView
        renderTabBar={props => {
          return (
            <LinearGradient
              colors={['#ad3231', '#bd5b5a']}
              style={{marginTop: -1, zIndex: -1}}>
              <TabBar
                {...props}
                style={{backgroundColor: 'transparent', elevation: 0}}
              />
            </LinearGradient>
          );
        }}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
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
export default AttendanceAdmin;

// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const EmployeLookUp = () => {
//     return (
//         <View style={styles.container}>
//             <Text>EmployeLookUp</Text>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

// //make this component available to the app
// export default EmployeLookUp;
