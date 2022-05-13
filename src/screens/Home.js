//import liraries
import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableCard from '../components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import {SliderBox} from 'react-native-image-slider-box';
import Notification from './Notification';
import IconBadge from 'react-native-icon-badge';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AuthContext from './../context/AuthContext';



// create a component
const Home = ({navigation}) => {
  const { authContext, AppUserData } = useContext(AuthContext);
  // images for carousel
  const image = [
    'https://1qkeyv41u1op36vgbm47q0i6-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/Mobile-App-Design-Cost-1024x512.png',
    'https://static.wingify.com/gcp/uploads/sites/3/2015/10/OG-image_App-or-Website-10-Reasons-Why-Apps-are-Better.png',
    'https://www.cubix.co/themes/responsiv-clean/assets/images/blog-images/app-designing-process-b.jpg',
  ];

  // end array
  return (
    <SafeAreaView style={{flexGrow: 1}}>
    <View style={styles.container}>
      <LinearGradient
         colors={['#4174D0','#6ef7ff']}
        style={styles.gradient}>
        <View>
          <View style={styles.headerText1}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="menu-outline"
                size={30}
                color={'white'}
                onPress={() => navigation.openDrawer()}
              />
              <Text style={[styles.brand, {marginLeft: 15}]}>SUZUKI</Text>
            </View>
            <Text style={styles.brand}>HR Assist</Text>
            <Text style={{color: 'white', margin: 10}}></Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Notification");
                }}>
                <IconBadge
                  MainElement={<Feather name="bell" color={'#fff'} size={35} />}
                  BadgeElement={<Text style={{color: '#fff'}}>5</Text>}
                  IconBadgeStyle={{
                    paddingVerticle: 5,
                    backgroundColor: '#6ef7ff',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 20, top: '3%'}}>
            {AppUserData.data.profile_photo ? (
              <Image
                source={{uri:'data:image/png;base64, '+AppUserData.data.profile_photo}}
                style={{width: 60, height: 60, borderRadius: 50}}
              />
            ):(
              <Image
                source={require('../assets/Images/smile.jpg')}
                style={{width: 60, height: 60, borderRadius: 50}}
              />
            )}
            <View style={{marginHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {AppUserData.data.EMPL_NAME ? AppUserData.data.EMPL_NAME : "User"}
              </Text>
              <Text style={{fontSize: 16, color: '#fff', letterSpacing: 1}}>
                Monday, 24 jan 2022
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.carousel}>
        <SliderBox
          images={image}
          autoplay={true}
          circleLoop={true}
          style={styles.carouselimg}
        />
      </View>

      <TouchableCard navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  gradient: {
    width: '100%',
    height: '25%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 0,
  },
  headerText1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    fontFamily: 'Montserrat-Regular',
    top: '1%',
  },
  brand: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  carousel: {
    marginTop: '-11%',
    height: 180,
    width: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    overflow: 'hidden',
  },
  carouselimg: {
    minHeight: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

//make this component available to the app
export default Home;
