//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet , TouchableOpacity,} from 'react-native';

// create a component
const Birthdays = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonBack}>
            <TouchableOpacity style={styles.today}>
            <Text style={{textAlign:'center',top:3}}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.today}>
            <Text style={{  textAlign:'center',top:3}}>Tommorow</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonBack:{
        flexDirection:'row',
        alignSelf:'center',
        top:10,
    },
    today:{
        width:'45%',
        borderWidth:1,
        borderColor: '#d9d9d9',
        height:30,
    }
});

//make this component available to the app
export default Birthdays;
