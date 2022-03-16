import React, {useEffect, useState} from 'react';
import {
  Image,
  
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './Drawer';
import AuthNavigator from './AuthNavigator';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './../store/store';
const Routes = () => {
  const token = useSelector(
    state => state.LoginUserDetailReducer.loginUserDetail,
  );
  console.log('token data', token);

  useEffect(() => {
    console.log(store.getState());
    // Spinner();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {token === null ? <AuthNavigator /> : <MyDrawer />}
      </NavigationContainer>
    </Provider>
  );
};

export default Routes;
