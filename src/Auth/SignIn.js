//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkPostAction} from '../ThunkAction/ThunkAction';
import Snackbar from 'react-native-snackbar';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const handleLogin = data => {
    dispatch(ThunkPostAction('API/Login', data));
    console.log('Error for unauthorize', AppData.apiError);
     if(AppData.loader==false){
      Snackbar.show({
        text:AppData.apiError,
        duration: Snackbar.LENGTH_LONG,
      });
     }
     else{
       return
     }
    // dispatch(ThunkPostAction('192.168.0.163:5000/api/users/login', data));
  };

  useEffect(() => {
    console.log(AppData);
  }, []);

  const AppData = useSelector(state => {
    console.log('state of Current Redux', state.LoginThunkReducers);

    return {
      // userData: state.LoginThunkReducers.loginUserDetail,
      loader: state.LoginThunkReducers.isLoading,
      apiError: state.LoginThunkReducers.error,
    };
  });
  const [showPass, setShowPass] = useState(true);
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

  return AppData.loader == true ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={30} color="red" />
      <Text>Loading ...</Text>
    </View>
  ) 
   : (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
        style={styles.gradient}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/Images/logoo.png')}
            style={{width: '20%', height: 75, resizeMode: 'cover'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            paddingVertical: 8,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Welcome !
          </Text>
        </View>
        <Text
          style={{
            fontSize: 30,
            color: '#fff',
            alignSelf: 'center',
            letterSpacing: 1,
            fontFamily: 'Montserrat-Bold',
          }}>
          In <Text style={{fontSize: 40, color: '#f7ebea'}}>M</Text>aruti
          <Text style={{fontSize: 40, color: '#f7ebea'}}> S</Text>uzuki
        </Text>
      </LinearGradient>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{UserName: '', Password: ''}}
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
                width: '60%',
                height: '50%',
                alignSelf: 'center',
                top: 25,
                resizeMode: 'contain',
              }}
            />
            <View style={{paddingTop: 20}}>
              <View style={{paddingVertical: 10}}>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    padding: 5,
                    borderWidth: 1,
                    borderTopColor: '#80406A',
                    borderStartColor: '#ad3231',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#ad3231',
                    alignItems: 'center',
                    alignSelf: 'center',
                    margin: 8,
                    borderRadius: 8,
                  }}>
                  <Ionicons name="person-circle" size={25} color={'#ad3231'} />
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
                    <Text style={{fontSize: 12, color: 'red'}}>
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
                    borderStartColor: '#ad3231',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#ad3231',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 8,
                    margin: 8,
                  }}>
                  <Ionicons name="lock-closed" size={25} color={'#ad3231'} />
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
                    <Text style={{fontSize: 12, color: 'red'}}>
                      {errors.Password}
                    </Text>
                  </View>
                )}
                <View style={{paddingVertical: 10}}>
                  <LinearGradient
                    style={{
                      margin: 5,
                      borderRadius: 8,
                      width: '90%',
                      alignSelf: 'center',
                    }}
                    colors={['#2757C3', '#80406A', '#ad3231']}>
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
                        Submit
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
  );

  // </ScrollView>
  // </SafeAreaView>
  // </KeyboardAvoidingView>
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    flex: 0.45,
    width: '100%',
    paddingVertical: 10,
  },
  login: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '67%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignSelf: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 1.29,
    // shadowRadius: 10.65,

    // elevation: 7,
  },
});

//make this component available to the app
export default SignIn;
