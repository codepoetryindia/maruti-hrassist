//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCard from '../components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import {SliderBox} from 'react-native-image-slider-box';
// create a component
const Home = () => {
  const image = [
    'https://1qkeyv41u1op36vgbm47q0i6-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/Mobile-App-Design-Cost-1024x512.png',
    'https://static.wingify.com/gcp/uploads/sites/3/2015/10/OG-image_App-or-Website-10-Reasons-Why-Apps-are-Better.png',
    'https://www.cubix.co/themes/responsiv-clean/assets/images/blog-images/app-designing-process-b.jpg',
  ];
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#AD3231']}
        style={styles.gradient}>
        <View>
          <View style={styles.headerText1}>
            <Text style={styles.brand}>SUZUKI</Text>
            <Text style={styles.brand}>HR Assist</Text>
            <Text style={{color: 'white', margin: 10}}>
              <Feather name="bell" size={30} />
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 20}}>
            <Image
              source={require('../assets/Images/smile.jpg')}
              style={{width: 60, height: 60, borderRadius: 50}}
            />
            <View style={{marginHorizontal: 20}}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold',letterSpacing: 1,}}>
                Hello, Manisha Verma!
              </Text>
              <Text style={{fontSize: 16, color: '#fff',letterSpacing: 1,}}>
                Monday, 24 jan 2022
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.carousel}>
        <SliderBox images={image}  style={styles.carouselimg}/>
      </View>

      <TouchableCard />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily:'PTSerif-Bold',
  },
  gradient: {
    width: '100%',
    height: '25%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex:0,
  },
  headerText1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
   justifyContent:'center',
   alignItems:'center',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:1,
    overflow:'hidden'
  },
  carouselimg:{
    position:'relative',
    minHeight:'100%',
    width:"100%",
  }
});

//make this component available to the app
export default Home;
