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
    const {title='No Data Found', subtitle="No data found please Pull down to refresh", enableRefresh=false,onRefreshCallback, refreshing=false}= props;
    return(
        <View style={styles.container}>
            <ScrollView
                scrollEnabled={enableRefresh}
                contentContainerStyle={{flexGrow:1, justifyContent:'center', alignItems:'center'}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            if(onRefreshCallback)
                                onRefreshCallback()
                        }}
                    />
                }>
                    <View style={styles.innerContainer}>
                        <Image
                        style={styles.tinyLogo}
                        source={require('./../../assets/Images/emptyList.png')}
                        />
                        <Text style={styles.title} Bold>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
            </ScrollView>
        </View>
    )
}


// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height:"100%",      
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


