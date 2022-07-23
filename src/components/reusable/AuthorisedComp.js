import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  ScrollView
} from 'react-native';
import Text from './Text';
import { GlobalFontSize } from '../../constants/FontSize';
import { GlobalColor } from '../../constants/Colors';


export default (props) =>{
    const {title='No Data Found', subtitle="No data found please pull down to refresh"}= props;
    return(
        <View style={styles.container}>
            <View
                style={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={styles.innerContainer}>
                        <Image
                        style={styles.tinyLogo}
                        source={require('./../../assets/Images/devicelock.png')}
                        />
                        <Text style={styles.title} Bold>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
            </View>
        </View>
    )
}


// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height:"100%",   
      width:"100%",    
    },
    tinyLogo:{
        width:150,
        height:150,
        alignSelf:'center'
    },
    title:{
        fontSize:GlobalFontSize.H4,
        textAlign:'center',
        marginBottom:15        
    },
    subtitle:{
        textAlign:'center',
    },
    innerContainer:{
        maxWidth:250
    }
  });


