
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Auth/SignIn';
import OnboardingScreen from '../Auth/Onboarding';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='OnboardingScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='SignIn' component={SignIn}/>
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
      </Stack.Navigator>
  );
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