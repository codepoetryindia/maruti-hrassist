//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
// import GifImage from '@lowkey/react-native-gif';
import CanteenMenu from './CanteenMenu';
import FoodCount from './FoodCount';
const Canteen = ({navigation}) => {
  // ]);
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
            Canteen
          </Text>
        </View>
      </LinearGradient>

      <TouchableOpacity
        style={styles.canteen}
        onPress={() => navigation.navigate(CanteenMenu)}>
        <View style={{width: '20%'}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/Images/cutlery.gif')}
          />
          {/* <GifImage
            source={require('../../assets/Images/cutlery.gif')}
            style={{width: 50, height: 50}}
            resizeMode={'cover'}
          /> */}
        </View>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Canteen Menu</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.canteen}
        onPress={() => navigation.navigate(FoodCount)}>
        <View style={{width: '20%'}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/Images/chicken.gif')}
          />
            {/* <GifImage
           source={require('../../assets/Images/chicken.gif')}
            style={{width: 50, height: 50}}
            resizeMode={'cover'}
          /> */}
        </View>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Food Count</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>
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
  canteen: {
    marginVertical: 8,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

// //make this component available to the app
export default Canteen;
