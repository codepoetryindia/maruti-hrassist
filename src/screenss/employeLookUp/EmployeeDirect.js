//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const EmployeeDirect = () => {
    return (
        <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color="#2757C3"
        />
        <TextInput
          style={styles.input}
          placeholder="Search By Name/Dept/Staff ID"
        />
        <Ionicons
          style={styles.searchIcon}
          name="send"
          size={20}
          color="#2757C3"
        />
      </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
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

//make this component available to the app
export default EmployeeDirect;
