import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './Drawer';
import AuthNavigator from './AuthNavigator';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './../store/store';
import spinner from '../actions/loginAction';
const Routes = () => {
  const token = useSelector(
    state => state.LoginUserDetailReducer.loginUserDetail,
  );
  console.log('token data', token);
//   const [loading, setLoading] = useState;

//   const dispatch = useDispatch();
//   const Spinner = async () => {
//     await dispatch(spinner());
//     setLoading(false);
//   };
  useEffect(() => {
    console.log(store.getState());
    // Spinner();
  }, []);
//   if (loading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center'}}>
//         <ActivityIndicator size={30} color={'blue'} />
//       </View>
//     );

  return (
    <Provider store={store}>
      <NavigationContainer>
        {token === null ? <AuthNavigator /> : <MyDrawer />}
      </NavigationContainer>
    </Provider>
  );
};

export default Routes;
