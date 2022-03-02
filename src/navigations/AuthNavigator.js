
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StatusBar,View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginAction} from './../actions/loginAction';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login}/>
      </Stack.Navigator>
  );
}

export default AuthNavigator;


const Login = () =>{
  const dispatch = useDispatch();
    return(
        <View>
          <TouchableOpacity onPress={()=>{
            dispatch(loginAction("lol"))
          }}>
            <Text>Login</Text>
          </TouchableOpacity>            
        </View>
    )
}