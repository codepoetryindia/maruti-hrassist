//import liraries
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  // TextInput,
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

// Component Import
import Text from '../components/reusable/Text';
import { GlobalColor } from '../constants/Colors';
import { GlobalFontSize } from '../constants/FontSize';
import TextInput from '../components/reusable/TextInput';
import Button from '../components/reusable/Button';
import { LoadingScreen } from '../components/reusable/LoadingScreen';




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
    let data = { "UserName": user };
    // return;
    ApiService.PostMethode('/GetEmployeeProfile', data, token)
      .then(res => {
        let response = res.Value;
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
      .required('Username is required')
      .min(6, 'min 6 digit is require ')
      .max(6, 'max 6 digit allowed'),
    Password: yup
      .string()
      .min(8, 'Password must be atleast 8 character')
      .required('Password is required'),
  });


  if(Loader){
    return(
      <LoadingScreen/>
    )
  }


  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
            <View style={styles.container}>
              <View
                style={styles.gradient}>
                <View>
                  <View
                    style={{
                      // flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop:15
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
                        fontSize: GlobalFontSize.H1,
                        color: GlobalColor.Primary,
                      }}
                      Bold
                      >
                      Welcome
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: GlobalFontSize.H4,
                      color: GlobalColor.Primary,
                      alignSelf: 'center',
                      marginBottom: 40
                    }}>
                    to <Text style={{ fontSize: 35, color: GlobalColor.Primary }} Bold>HR Assist</Text>
                  </Text>
                </View>
              </View>

              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ UserName: '222852', Password: 'Maruti@131' }}
                // initialValues={{ UserName: '548596', Password: 'Maruti@04@22' }}
                onSubmit={values => {
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
                            borderColor:GlobalColor.Primary,
                            alignItems: 'center',
                            alignSelf: 'center',
                            margin: 8,
                            borderRadius: 8,
                          }}>
                          <Ionicons
                            name="person-circle"
                            size={25}
                            color={GlobalColor.Primary}
                          />
                          <TextInput
                            placeholder="Login Id"
                            secureTextEntry={false}
                            onChangeText={handleChange('UserName')}
                            onBlur={handleBlur('UserName')}
                            value={values.UserName}
                          />
                        </View>
                        {errors.UserName && touched.UserName && (
                          <View
                            style={{
                              width: '90%',
                              alignSelf: 'center',
                              paddingVertical: 2,
                            }}>
                            <Text style={styles.error}>
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
                            borderColor:GlobalColor.Primary,
                            alignItems: 'center',
                            alignSelf: 'center',
                            borderRadius: 8,
                            margin: 8,
                          }}>
                          <Ionicons
                            name="lock-closed"
                            size={25}
                            color={GlobalColor.Primary}
                          />

                          <TextInput
                            placeholder="Password"
                            secureTextEntry={showPass}
                            onChangeText={handleChange('Password')}
                            onBlur={handleBlur('Password')}
                            value={values.Password}
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
                              <Ionicons name="eye-off" size={25} color={GlobalColor.LightDark} />
                            ) : (
                              <Ionicons name="eye" size={25} color={GlobalColor.LightDark} />
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
                            <Text style={styles.error}>
                              {errors.Password}
                            </Text>
                          </View>
                        )}
                        <View style={{ paddingVertical: 10,width:"90%", alignSelf:'center'}}>
                          <Button onPress={()=>handleSubmit()} title="Sign In"></Button>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
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
    marginBottom: -50,
    backgroundColor:GlobalColor.PrimaryLight
  },
  spinnerTextStyle: {
    color: GlobalColor.White
  },
  login: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: GlobalColor.White,
    justifyContent:'center'
  },
  error:{
    color:GlobalColor.Danger,
    fontSize:GlobalFontSize.Error
  }
});

//make this component available to the app
export default SignIn;
