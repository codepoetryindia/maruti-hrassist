//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// create a component
const NearByHospital = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <Text style={{fontSize:16, fontWeight:'bold'}}>Near By Panel hospital</Text>
        <View style={styles.circle}>
          <Text>Click here to</Text>
          <Text>Search</Text>
        </View>
        <View>
          <Text style={{lineHeight: 30}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Text>
          <Text style={{textAlign:'center'}}>Hospital</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  box: {
    padding: 10,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 10,
  },
});

//make this component available to the app
export default NearByHospital;
