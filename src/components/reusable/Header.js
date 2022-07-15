import React, { Component } from "react";
import { View, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { GlobalColor } from "../../constants/Colors";
import { GlobalFontSize } from "../../constants/FontSize";
import Text from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export const Header = ({back=false, title="", onPress }) =>  { 
    const navigation = useNavigation();
    
    
    return (
        <LinearGradient colors={[GlobalColor.PrimaryGradient, GlobalColor.SecondryGradient]} style={styles.container}>
            <View style={{ flex:1,flexDirection:'row' }}>            
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 40,
                        alignItems: 'center',
                    }}>
                    {back ? (
                        <Ionicons
                        name="chevron-back-outline"
                        size={25}
                        color={'white'}
                        onPress={() => navigation.goBack()}
                    />
                    ): (
                        <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 40,
                                alignItems: 'center',
                            }}>
                            <Ionicons
                                name="chevron-back-outline"
                                size={25}
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
                    )}
                </View>

                <Text
                Bold
                style={{
                    color: '#fff',
                    fontSize: GlobalFontSize.H4,
                    marginLeft: 15,
                }}>
                {title}
                </Text>
            </View>
            
            {onPress?(
            <TouchableOpacity 
                style={{alignSelf:'flex-end'}}>                
              <Image  source={require("../../assets/Images/setting.png")} style={{width:30,height:30,tintColor:'#fff'}}/>
            </TouchableOpacity>
            ): null}
        </LinearGradient>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
        padding: 10,
    }
};