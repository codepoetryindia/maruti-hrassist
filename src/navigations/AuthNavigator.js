
import React, {useState, useEffect} from 'react';
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Auth/SignIn';
import OnboardingScreen from '../Auth/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    getStorageData()
    return () => {      
    }
  }, [])


  const getStorageData = async()=>{
    await AsyncStorage.getItem('isnotfirstTime').then((data)=>{
      if(data != null){
        console.log(data);
        setIsFirstLaunch(data);
      }      
    })
  }
  
const FirstRun = ()=>{
    return (
      <Stack.Navigator initialRouteName='OnboardingScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
      </Stack.Navigator>
    );
  }

  const SecondRun =()=>{
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
      </Stack.Navigator>
    );
  }

  return(
    <View style={{ flex:1 }}>
       {!isFirstLaunch ? <FirstRun/> :<SecondRun/> }
    </View>   
  )



}

export default AuthNavigator;


// const Login = () =>{
//   const dispatch = useDispatch();
//     return(
//         <View>
//           <TouchableOpacity onPress={()=>{
//             dispatch(loginAction("lol"))
//           }}>
//             <Text>Login</Text>
//           </TouchableOpacity>            
//         </View>
//     )
// }