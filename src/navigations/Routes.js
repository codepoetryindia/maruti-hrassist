import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, TouchableOpacity, View, Alert, SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from './Drawer';
import AuthNavigator from "./AuthNavigator";
import { Provider, useDispatch, useSelector } from 'react-redux'
import  store  from "./../store/store"


const MainNavigation = () =>{
    const token = useSelector(state => state.LoginUserDetailReducer.loginUserDetail);

    // const getDetail = async () => {
    //     const token = await getData(StorageKey.ACCESS_TOKEN);
    //     const userData = await getData("userData");
    //     dispatch(LoginUserAction(userData));
    //     const passingToken = token;
    //     setTokenData(passingToken);
    //     dispatch(LoginUserTokenAction(passingToken));
    // }

    // useEffect(() => {
    //     getDetail();
    // }, [tokenData])



    return(
        <View style={styles.container}>   
            {/* <Text>{store.getState().LoginUserDetailReducer.loginUserDetail}</Text> */}
            <NavigationContainer>
                {
                    store.getState().LoginUserDetailReducer.loginUserDetail
                    // token
                     ? (
                        <MyDrawer/> 
                    ): (
                        <AuthNavigator/>
                    )
                }                                            
            </NavigationContainer>
        </View>
    )
}


const Routes = () =>{


    useEffect(() => {
      console.log(store.getState())
    
      return () => {
        
      }
    }, [])
    

    return(
        <Provider store={store}>
            <MainNavigation/>
        </Provider>
    )
}

export default Routes;

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});