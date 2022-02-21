//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// create a component
const CanteenMenu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.canteen}>
        <View style={{width: '20%'}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/Images/canteen.png')}
          />
        </View>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>Canteen Menu</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  canteen: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
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

//make this component available to the app
export default CanteenMenu;
