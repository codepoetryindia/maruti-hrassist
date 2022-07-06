import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Share from 'react-native-share';
import AuthContext from '../context/AuthContext';


import { GlobalColor } from '../constants/Colors';
import { GlobalFontSize } from '../constants/FontSize';
import Text from './reusable/Text';

// import SignIn from '../Auth/SignIn';

const myCustomeSharing = async () => {
  const shareOption = {
    message:
      'install this app https://play.google.com/store/apps/details?id=com.successfactors.successfactors',
  };
  try {
    const shareResponse = await Share.open(shareOption);
  } catch (error) {
    console.log('error', error);
  }
};

function CustomDrawer(props) {
  const {authContext, AppUserData} = useContext(AuthContext);
  const LogOutAlertOccurred = (title, body, btnTxt, btnTxt2) => {
    Alert.alert(title, body, [
      {
        text: btnTxt,
        onPress: () => {
          authContext.signOut();
        },
      },
      {
        text: btnTxt2,
        onPress: () => {
          console.log('No Pressed');
        },
      },
    ]);
  };
  const {navigation} = props;
  return (
      <DrawerContentScrollView style={{backgroundColor: '#ffffff'}} {...props}>
        <LinearGradient
          colors={[GlobalColor.PrimaryGradient, GlobalColor.SecondryGradient]}
          style={styles.gradient}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              top: 30,
              padding: 10,
            }}>
            {AppUserData.data && AppUserData.data.profile_photo ? (
              <Image
                source={{uri:'data:image/png;base64, '+AppUserData.data.profile_photo}}
                style={[styles.avtar, {marginRight: 5}]}
              />
            ):(
              <Image
                source={require('../assets/Images/Avtar.png')}
                style={[styles.avtar, {marginRight: 5}]}
              />
            )}
            <View style={{ flex:1}}>
              <Text style={styles.textTitle} Bold>{AppUserData.data && AppUserData.data.EMPL_NAME ? AppUserData.data.EMPL_NAME : "User"}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={{color: '#fff', marginTop: 5, textDecorationLine: 'underline', fontSize:GlobalFontSize.Small}}>
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
          <View style={{ flex:1 }}>
            <DrawerItem
              label="Home"
              onPress={() => navigation.navigate('Home')}
              icon={({color, size}) => (
                // <Icon
                // name='home' color={'black'} size={20}/>
                <Image
                  source={require('../assets/Images/home-icon.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />

            <DrawerItem
              label="Employee Lookup"
              onPress={() => navigation.navigate('EmployeeNavs')}
              icon={({color, size}) => (
                // <Icon
                // name='home' color={'black'} size={20}/>
                <Image
                  source={require('../assets/Images/home/icons8.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />

            <DrawerItem
              label="Attendance & Admin"
              onPress={() => navigation.navigate('AttendanceAdmin')}
              icon={({color, size}) => (
                //   <Foundation
                //   name='torsos-all' color={'black'} size={20}/>
                <Image
                  source={require('../assets/Images/home/calendar.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />
            <DrawerItem
              label="Compensatino and Benifits"
              onPress={() => navigation.navigate('CompensationBenifitsNav')}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/chart.png')}
                  style={styles.icon}
                />
              )}
                            labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />
            <DrawerItem
              label="Hospital & Emergency"
              onPress={() => navigation.navigate('HospitalNavs')}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/transplantation.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />

            <DrawerItem
              label="Canteen Menu"
              onPress={() => navigation.navigate('Canteen')}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/canteen.png')}
                  style={styles.icon}
                />
              )}
                            labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />

            <DrawerItem
              label="Other Mobile Apps"
              onPress={() => navigation.navigate('OtherApps')}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/otherapps.png')}
                  style={styles.icon}
                />
              )}
                            labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />
            <DrawerItem
              label="Visitor Gatepass"
              onPress={() => navigation.navigate('Gatepass')}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/visitor-gatepass.png')}
                  style={styles.icon}
                />
              )}
                            labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />
            <DrawerItem
              label="Buisness Travel"
              onPress={() => navigation.navigate('BuisnessTravel')}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/btravel.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />
            <DrawerItem
              label="Share App"
              onPress={() => myCustomeSharing()}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/share.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 0.5, borderBottomColor: GlobalColor.PrimaryLight}}
            />

            <DrawerItem
              label="App Tutorial"
              onPress={() => {                
                Linking.openURL(
                  'https://marutistoragenew.blob.core.windows.net/ag3mobileapp/HrAssist%20Tutorial.mp4',
                ).catch(err => {
                  console.log(err);
                });
                // navigation.navigate('More')
              }}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/webinar.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 1, borderBottomColor: GlobalColor.PrimaryLight}}
            />
            <DrawerItem
              label="LogOut"
              onPress={() => {
                LogOutAlertOccurred('Warning', 'Are You Sure?', 'yes', 'No');
              }}
              icon={({color, size}) => (
                // <Icon name="calendar" color={'black'} size={size} />
                <Image
                  source={require('../assets/Images/home/power-off.png')}
                  style={styles.icon}
                />
              )}
              labelStyle={{ fontSize:GlobalFontSize.Small, color:GlobalColor.Primary, fontFamily:'Roboto'}}
              style={{borderBottomWidth: 1, borderBottomColor: GlobalColor.PrimaryLight}}
            />

          </View>
        </View>
      <View style={styles.footer}>
        <Text style={{color: GlobalColor.Text}}>V2.2.2</Text>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{fontSize: 12, color: GlobalColor.Text, marginBottom: 15}}>
            Copyright 2022 HR Assist
          </Text>
        </View>
      </View>
      </DrawerContentScrollView>

  );
}
const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height:150,
    // height: '21%',
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
  textTitle: {
    fontSize: GlobalFontSize.P,
    color: GlobalColor.White,
    letterSpacing: 1,
    flexShrink: 1
  },
  container: {
    flexGrow:1,
    backgroundColor: '#fff',
    maxWidth: '90%',
    // height: '85%',
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
    marginBottom:10
  },
  footer: {justifyContent: 'center', alignItems: 'center'},
  icon: {
    width: 25,
    height: 25,
  },
});
export default CustomDrawer;
