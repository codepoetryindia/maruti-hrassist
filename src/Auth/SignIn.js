//import liraries
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
import AuthService from '../Service/AuthService';
import * as ApiService from './../Utils/Utils';
import AuthContext from '../context/AuthContext';
import Toast from 'react-native-simple-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
const SignIn = ({ navigation }) => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const [Loader, setLoader] = useState(false);

  const handleLogin = values => {
    setLoader(true);
    let data = {
      UserName: values.UserName,
      Password: values.Password,
    };
    // console.log('api data', data);
    AuthService.Post('Login', data)
      .then(res => {
        console.log(res);
        let contextData = {
          token: res.token,
          user: values.UserName,
        };

        GetUserDetails(contextData);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
        // return;
        console.log('response data', JSON.stringify(error));
        Toast.show(JSON.stringify(error))
        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response.data.error.message);
          Toast.show(error.response.data.error.message)
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error')
          // console.log("error.request", error.request._response);
        } else {
          // anything else
         Toast.show('Something Went Wrong');
        }
      });
  };

  const GetUserDetails = ({ token, user }) => {
    console.log(token, user);
    let data = { "UserName": user };
    // return;
    ApiService.PostMethode('/GetEmployeeProfile', data, token)
      .then(res => {
        // console.log('user Response', res);
        let response = res.Value;

      console.log("response",response);

        if(response.Table){
          let userData = {
            EMPL_NAME: response.Table[0].EMPL_NAME,
            profile_photo:response.Table[0].profile_photo,
            userId:user,
            EMPL_DESG_CODE:response.Table[0].EMPL_DESG_CODE,
  
          };
          let contextData = {
            token: token,
            user: userData
          };
          authContext.signIn({
            payload: contextData,
          });
        } else {
          Toast.show('Please Retry');
        }
        setLoader(false);
      })
      .catch(error => {
        console.log("ufyguyg",error);
        setLoader(false);
        // return;
        console.log('response data', JSON.stringify(error));

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log(error.response.data.error.message);
          Toast.show(error.response.data.error.message);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  }




  const loginValidationSchema = yup.object().shape({
    UserName: yup
      .string()
      .required('UserName is Required')
      .min(6, 'min 6 digit is require ')
      .max(6, 'max 6 digit allowed'),
    Password: yup
      .string()
      .min(8, 'Password must be atleast 8 character')
      .required('Password is required'),
  });

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.container}>
          {Loader == true ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                visible={Loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            </View>
          ) : (
            <View style={styles.container}>
              <LinearGradient
                colors={['#4174D0', '#6ef7ff']}
                style={styles.gradient}>
                <View>
                  <View
                    style={{
                      // flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/Images/logoo.png')}
                      style={{ width: 80, height: 80, resizeMode: 'contain' }}
                    />
                  </View>

                  <View
                    style={{
                      // flexDirection: 'row',
                      alignSelf: 'center',
                      // paddingVertical: 8,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      Welcome!
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 28,
                      color: '#fff',
                      alignSelf: 'center',
                      fontFamily: 'Montserrat-Bold',
                      marginBottom: 50
                    }}>
                    In <Text style={{ fontSize: 40, color: '#f7ebea' }}>M</Text>aruti
                    <Text style={{ fontSize: 40, color: '#f7ebea' }}> S</Text>uzuki
                  </Text>
                </View>
              </LinearGradient>

              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ UserName: '222852', Password: 'Maruti@131' }}
                // initialValues={{ UserName: '548596', Password: 'Maruti@04@22' }}
                onSubmit={values => {
                  // console.log("values",values)
                  handleLogin(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                  <View style={styles.login}>
                    <Image
                      source={require('../assets/Images/login2.png')}
                      style={{
                        width: 200,
                        height: 200,
                        alignSelf: 'center',
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{ paddingTop: 0 }}>
                      <View style={{ paddingVertical: 10 }}>
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            padding: 5,
                            borderWidth: 1,
                            borderTopColor: '#80406A',
                            borderStartColor: '#6ef7ff',
                            borderBottomColor: '#2757C3',
                            borderEndColor: '#6ef7ff',
                            alignItems: 'center',
                            alignSelf: 'center',
                            margin: 8,
                            borderRadius: 8,
                          }}>
                          <Ionicons
                            name="person-circle"
                            size={25}
                            color={'#4174D0'}
                          />
                          <TextInput
                            placeholder="Login Id"
                            secureTextEntry={false}
                            onChangeText={handleChange('UserName')}
                            onBlur={handleBlur('UserName')}
                            value={values.UserName}
                            style={{
                              width: '90%',
                              alignSelf: 'center',
                              marginVertical: -2,
                              paddingVertical: 10,
                              color:'#000'
                            }}
                          />
                        </View>
                        {errors.UserName && touched.UserName && (
                          <View
                            style={{
                              width: '90%',
                              alignSelf: 'center',
                              paddingVertical: 2,
                            }}>
                            <Text style={{ fontSize: 12, color: 'red' }}>
                              {errors.UserName}
                            </Text>
                          </View>
                        )}
                        <View
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 5,
                            borderWidth: 1,
                            borderTopColor: '#80406A',
                            borderStartColor: '#6ef7ff',
                            borderBottomColor: '#2757C3',
                            borderEndColor: '#6ef7ff',
                            alignItems: 'center',
                            alignSelf: 'center',
                            borderRadius: 8,
                            margin: 8,
                          }}>
                          <Ionicons
                            name="lock-closed"
                            size={25}
                            color={'#4174D0'}
                          />
                          <TextInput
                            placeholder="Password"
                            secureTextEntry={showPass}
                            onChangeText={handleChange('Password')}
                            onBlur={handleBlur('Password')}
                            value={values.Password}
                            style={{
                              width: '80%',
                              alignSelf: 'center',
                              marginVertical: -2,
                              paddingVertical: 10,
                              color:'#000'
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              if (showPass == false) {
                                setShowPass(true);
                              } else {
                                setShowPass(false);
                              }
                            }}>
                            {showPass == true ? (
                              <Ionicons name="eye-off" size={25} color={'#000'} />
                            ) : (
                              <Ionicons name="eye" size={25} color={'#000'} />
                            )}
                          </TouchableOpacity>
                        </View>
                        {errors.Password && touched.Password && (
                          <View
                            style={{
                              width: '90%',
                              alignSelf: 'center',
                              paddingVertical: 2,
                            }}>
                            <Text style={{ fontSize: 12, color: 'red' }}>
                              {errors.Password}
                            </Text>
                          </View>
                        )}
                        <View style={{ paddingVertical: 10 }}>
                          <LinearGradient
                            style={{
                              margin: 5,
                              borderRadius: 8,
                              width: '90%',
                              alignSelf: 'center',
                            }}
                            colors={['#4174D0', '#6ef7ff']}>
                            <TouchableOpacity
                              onPress={() => {
                                handleSubmit();
                              }}
                              style={{
                                width: '100%',
                                paddingVertical: 10,
                                alignItems: 'center',
                                marginTop: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  letterSpacing: 2,
                                }}>
                                  SignIn
                              </Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 0.5,
    width: '100%',
    paddingVertical: 10,
    marginBottom: -50
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  login: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
});

//make this component available to the app
export default SignIn;
