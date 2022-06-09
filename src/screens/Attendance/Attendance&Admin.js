//import liraries
import React, {useState, useEffect,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Attendance from './Attendence';
import Leave from './Leave';
import Shift from './Shift';
import HolidayCalendar from './HolidayCalendar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// const AttendanceAdmin = ({}) =>{
//   return(
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Attendance} />
//       <Tab.Screen name="Settings" component={Leave} />
//     </Tab.Navigator>
//   )
// }





// const FirstRoute = () => <Attendance />;
// const SecondRoute = () => <Leave />;
// const ThirdRoute = () => <Shift />;
// const FourthdRoute = () => <HolidayCalendar />;

const AttendanceAdmin = ({navigation}) => {
  const [manager, setManager] = useState(false);
  useEffect(() => {
    setManager(false);
  }, []);

  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <LinearGradient
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
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            Attendance & Admin
          </Text>
          <TouchableOpacity 
          style={{marginLeft:65}}
               onPress={() => {
                navigation.navigate('ManagerMode');
              }}>
              <Image  source={require("../../assets/Images/setting.png")} style={{width:30,height:30,tintColor:'#fff'}}/>
            </TouchableOpacity>
          </View>
         
      </LinearGradient>        
      <Tab.Navigator 
       screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: '#fff',
        tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: '#fff' },
        tabBarStyle: { backgroundColor: '#0083B0', elevation: 0 },
      }}>
        <Tab.Screen name="Attendance" component={Attendance} />
        <Tab.Screen name="Leave" component={Leave} />
        <Tab.Screen name="Shift" component={Shift} />
        <Tab.Screen name="Holiday" component={HolidayCalendar} />
      </Tab.Navigator>
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
    alignItems:'center'
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
