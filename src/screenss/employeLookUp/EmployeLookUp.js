//import liraries
import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';


// create a component
const EmployeLookUp = ({navigation}) => {
    return (
        <LinearGradient   colors={['#2757C3', '#80406A', '#AD3231']}
        style={styles.gradient}>
        <View style={styles.container}>
            <Ionicons
            name='arrow-undo-outline'
            size={15}
            color={'white'}
            onPress = {()=>navigation.goBack()}/>
        <Ionicons
                name="menu-outline"
                size={20}
                color={'white'}
                onPress={() => navigation.openDrawer()}
              />
            <Text style={{color:'#fff',fontSize:10,letterSpacing:1}}>Employee Lookup</Text>
        </View>
        </LinearGradient>
    );
};

// define your styles
const styles = StyleSheet.create({
    gradient: {
        padding:20 
    },
    container: {
        flexDirection:'row'
           
    }
});

// //make this component available to the app
export default EmployeLookUp;


// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const EmployeLookUp = () => {
//     return (
//         <View style={styles.container}>
//             <Text>EmployeLookUp</Text>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

// //make this component available to the app
// export default EmployeLookUp;
