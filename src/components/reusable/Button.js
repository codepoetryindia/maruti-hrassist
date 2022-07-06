import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { GlobalFontSize } from '../../constants/FontSize';
import { GlobalColor } from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';


export default (props) =>{
    const {title ='Save', btnStyle, textStyle, onPress}= props;
    return(
    <LinearGradient
        style={[{
          margin: 5,
          borderRadius: 8,
          width: '100%',
          alignSelf: 'center',
          backgroundColor:GlobalColor.Primary
        }, {...btnStyle}]}
        colors={[GlobalColor.PrimaryGradient, GlobalColor.SecondryGradient]}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            width: '100%',
            paddingVertical: 10,
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text
            style={[{fontSize: GlobalFontSize.P,color: GlobalColor.White}, {...textStyle}]}
            Bold={true}>
            {title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    )
}