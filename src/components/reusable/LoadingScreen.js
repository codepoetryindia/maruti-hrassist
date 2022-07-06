import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { GlobalColor } from "../../constants/Colors";
import { GlobalFontSize } from "../../constants/FontSize";
import Text from './Text';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export const LoadingScreen = ({stylesheet, message="Loading Please Wait"}) =>  {    
    return (
        <View style={[{...styles.container}, styles]}>
            <ActivityIndicator 
                style={{
                    transform: [{ scale: 1.5 }]}} 
                    size="large" 
                    color= {GlobalColor.Secondary} 
                />
            <Text 
                Bold
                style={{
                    ...styles.text, 
                    color: stylesheet?.colors?.text
                }}>
                    {message}
            </Text>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 30,
        fontSize: GlobalFontSize.P,
    }
};

