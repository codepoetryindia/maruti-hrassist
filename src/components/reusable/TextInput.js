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


export default (props) =>{
    const {placeholder=''}= props;

    return(
        <TextInput
        {...props}
        // placeholder={placeholder}
        // secureTextEntry={false}
        // onChangeText={handleChange('UserName')}
        // onBlur={handleBlur('UserName')}
        // value={values.UserName}
        style={[{
          flex:1,
          color:GlobalColor.Primary,
          fontSize:GlobalFontSize.Small,
          fontFamily:'Roboto-Regular',
          textAlign:'left',                           
        }, props.style]}
      />
    )
}