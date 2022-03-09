import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screenss/Home';
import AttendanceAdmin from '../screenss/Attendance/Attendance&Admin';
import Gatepass from '../screenss/Gatspass/Gatepass';
import More from '../screenss/More';
import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';
import BuisnessTravel from '../screenss/Buisness/BuisnessTravel';
import CompensationBenifits from '../screenss/CompensationAndBenifits/CompensationBenifits'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import EmergencyHospital from '../screenss/EmergencyAndHospital/Emergency&Hospital';
import Canteen from '../screenss/Canteen/Canteen';
// import SignIn from '../Auth/SignIn';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../actions/loginAction';
import EmployProfile from '../screenss/employeLookUp/EmployeProfile';
function CustomDrawer(props) {
  const dispatch = useDispatch();
  const handleLogout = (data) =>{
   dispatch (logoutAction(data))
  
  }
  const {navigation} = props;
  return (
    <>
      <DrawerContentScrollView style={{backgroundColor: '#ffffff',}} {...props}>
        <LinearGradient
          colors={['#2757C3', '#80406A', '#AD3231']}
          style={styles.gradient}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              top: 30,
              padding: 10,
            }}>
            <Image
              style={[styles.avtar, {marginRight: 5}]}
              source={require('../assets/Images/avtar.webp')}
            />
            <View>
              <Text style={styles.text}>Mrs. Adams Parker</Text>
              <Text style={styles.text}>MIT</Text>
              <TouchableOpacity onPress={() => {navigation.navigate(EmployProfile)}}>
                <Text style={{color: 'skyblue', marginTop: 5}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
            <Text>
              <Icon
                name="x-circle"
                color={'white'}
                size={20}
                onPress={() => navigation.closeDrawer()}
              />
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.container}>
          <ScrollView style={{height:730}}>
            <DrawerItem
              label="Home"
              onPress={() => navigation.navigate(Home)}
              icon={({color, size}) => (
                // <Icon
                // name='home' color={'black'} size={20}/>
                <Image
                  source={require('../assets/Images/house.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="Employee Lookup"
              onPress={() => navigation.navigate(EmployeLookUp)}
              icon={({color, size}) => (
                // <Icon
                // name='home' color={'black'} size={20}/>
                <Image
                source={require('../assets/Images/group.png')}
                style={styles.icon}
              />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />

            <DrawerItem
              label="Attendance & Admin"
              onPress={() => navigation.navigate(AttendanceAdmin)}
              icon={({color, size}) => (
                //   <Foundation
                //   name='torsos-all' color={'black'} size={20}/>
                <Image
                  source={require('../assets/Images/calendar.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="Compensatino and Benifits"
              onPress={() => navigation.navigate(CompensationBenifits)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/rupee.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="Hospital & Emergency"
              onPress={() => navigation.navigate(EmergencyHospital)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/first-aid-kit.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 2, borderBottomColor: '#cccccc'}}
            />

            <DrawerItem
              label="Canteen Menu"
              onPress={() => navigation.navigate(Canteen)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/canteen.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />

            <DrawerItem
              label="Other Mobile Apps"
              onPress={() => navigation.navigate(More)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/more.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="Visitor Gatepass"
              onPress={() => navigation.navigate(Gatepass)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/identity-card.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="Buisness Travel"
              onPress={() => navigation.navigate(BuisnessTravel)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/passenger.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 1, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="Share App"
              onPress={() => navigation.navigate(More)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/share.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 2, borderBottomColor: '#cccccc'}}
            />

            <DrawerItem
              label="App Tutorial"
              onPress={() => navigation.navigate(More)}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/video-player.png')}
                  style={styles.icon}
                />
              )}
              style={{borderBottomWidth: 2, borderBottomColor: '#cccccc'}}
            />
            <DrawerItem
              label="LogOut"
              onPress={() =>{handleLogout()}}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/power.png')}
                  style={styles.icon}
                />
              )}
              // style={{borderBottomWidth: 2, borderBottomColor: '#cccccc'}}
            />
          </ScrollView>
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Text style={{color: '#000'}}>V2.2.2</Text>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{fontSize: 12, color: '#000', marginBottom: 15}}>
            Copyright 2022 Maruti Suzuki india Limited{' '}
          </Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '21%',
    marginTop: -18,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,

    zIndex: -1,
  },
  avtar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 1,
  },
  container: {
    backgroundColor: '#fff',
    maxWidth: '90%',
    height: '85%',
    marginTop: -30,
    borderRadius: 10,
    marginHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  footer: {justifyContent: 'center', alignItems: 'center'},
  icon: {
    width: 20,
    height: 20,
  },
});
export default CustomDrawer;
