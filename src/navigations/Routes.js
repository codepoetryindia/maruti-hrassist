import React, {useEffect, useReducer, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './Drawer';
import AuthNavigator from './AuthNavigator';
import {useSelector} from 'react-redux';
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from '../Auth/SignIn';

const Routes = () => {
  const [AppUserData, setAppUserData] = React.useState({});
  const initialLoginState = {
    isLoading: true,
    isSignOut: false,
    userToken: null,
  };
  let options = {AppUserData, setAppUserData};

  const LoginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isSignOut: false,
          userToken: action.payload.token,
          isLoading: false,
        };
        break;

      case 'LOGIN':
        console.log('user Action', action);
        return {
          ...prevState,
          isSignOut: false,
          userToken: action.payload.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isSignOut: true,
          userToken: null,
          isLoading: false,
    
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(LoginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        console.log('User Token', data.payload);
        // return;
        let userToken = data.payload;
        let contextData;
        console.log('User Token', userToken);

        if (userToken !== null) {
          try {
            await AsyncStorage.setItem('userToken', userToken);
            contextData = {token: userToken};
            console.log('contextData', contextData);
            setAppUserData({
              token: userToken,
            });
            if (userToken) {
              dispatch({type: 'LOGIN', payload: contextData});
            } else {
              dispatch({type: 'LOGIN', payload: contextData});
            }
          } catch (error) {
            console.log('Error Occurred while login', error);
          }
        } else {
          contextData = {token: userToken};
          dispatch({type: 'LOGIN', payload: contextData}),
            setAppUserData({
              token: userToken,
            });
        }
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken').then(
            setAppUserData({}),
            dispatch({type: 'LOGOUT'}),
            console.log('Login state', loginState),
          );
        } catch (error) {
          console.log('Error Occurred while logout', error);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    let userToken = null;
    let dataFound;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      // console.log('User Token found ==>', userToken);
    } catch (error) {
      console.log('Error Occurred while fetching user Data', error);
    }
    if (userToken !== null) {
      setAppUserData({
        token: userToken,
        signUpFlow: false,
      });
      dataFound = {
        token: userToken,
      };
      dispatch({type: 'RETRIEVE_TOKEN', payload: dataFound});
      console.log('fetchUserData called');
    } else {
      dataFound = {
        token: userToken,
      };
      // console.log('dataFound', dataFound);
      dispatch({type: 'RETRIEVE_TOKEN', payload: dataFound});
    }
  };
  if (loginState.isLoading == true) {
    console.log('Login State loading', loginState.isLoading);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'#80406A'} />
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            marginVertical: 10,
          }}>
          Loading...
        </Text>
      </View>
    );
  } else {
    return (
      <AuthContext.Provider value={{...options, authContext}}>
        <NavigationContainer>
          {loginState.userToken == null ? <AuthNavigator /> : <MyDrawer />}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

export default Routes;
