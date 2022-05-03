import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './Drawer';
import AuthNavigator from './AuthNavigator';
import {useSelector} from 'react-redux';
const Routes = () => {

  const token = useSelector(state => {
    console.log(' loginToken', state.LoginThunkReducers.token);
    return state.LoginThunkReducers.token;
  });
  // console.log('token data', token);

  // useEffect(() => {
  //   console.log('token', token);
  // }, []);
  return (
    <NavigationContainer>
      {token == null ? <AuthNavigator /> : <MyDrawer />}
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
};

export default Routes;
