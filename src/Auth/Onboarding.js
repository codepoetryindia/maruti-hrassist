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
  SafeAreaView,
  Button
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
import Onboarding from 'react-native-onboarding-swiper'; // 1.1.4
import AsyncStorage from '@react-native-async-storage/async-storage';


const OnboardingScreen = ({ navigation }) => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(true);
  const [Loader, setLoader] = useState(false);


  const storeData = async () => {
    try {
      await AsyncStorage.setItem('isnotfirstTime', "abcd").then(()=>{
        navigation.navigate("SignIn");
      })
    } catch (e) {
      // saving error
    }
  }


  const Done = ({ isLight, ...props }) => (
    <TouchableOpacity
      title={'Done'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      style={{
        marginVertical: 10,    
        marginRight:10,
        borderColor:"#000",
        paddingHorizontal:30,
        paddingVertical:8,
        borderRadius:5,
        backgroundColor:backgroundColor(isLight),
      }}
      {...props}
        >
        <Text style={{ color: "#222", fontWeight:'700', fontSize:14, textTransform:'uppercase' }}>Done</Text>
    </TouchableOpacity>
  );

  const Next = ({ isLight, ...props }) => (
    <TouchableOpacity
      title={'Done'}
      buttonStyle={{
        backgroundColor: backgroundColor(isLight),
      }}
      style={{
        marginVertical: 10,    
        marginRight:10,
        borderColor:"#000",
        paddingHorizontal:30,
        paddingVertical:8,
        borderRadius:5,
        backgroundColor:backgroundColor(isLight),
      }}
      {...props}
        >
        <Text style={{ color: "#222", fontWeight:'700', fontSize:14, textTransform:'uppercase' }}>Next</Text>
    </TouchableOpacity>
  );

  const backgroundColor = isLight => (isLight ? '#6ef7ff' : 'lightblue');
  const color = isLight => backgroundColor(!isLight);


  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
        <View style={styles.container}>
        <Onboarding
            pages={[
            {
                backgroundColor: '#fff',
                image: <Image source={require("../assets/Images/onboarding/attandance.png")} style={{width:150, height:150}} resizeMode="cover"/>,
                title: 'Attandance & Leave',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require("../assets/Images/onboarding/compbenifit.png")} style={{width:150, height:150}} resizeMode="cover"/>,
                title: 'Comp. & Benifits',
                subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require("../assets/Images/onboarding/emergency.png")} style={{width:150, height:150}} resizeMode="cover"/>,
                title: 'Emergency Help',
                subtitle: "Beautiful, isn't it?",
            },
            ]}
            showSkip={false}
            onDone={()=>{
              storeData();              
            }}
            bottomBarHighlight={false}
            DoneButtonComponent={Done}
            NextButtonComponent={Next}

        />
        </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

//make this component available to the app
export default OnboardingScreen;
