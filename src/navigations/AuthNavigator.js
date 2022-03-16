
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Auth/SignIn';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}}>
        <Stack.Screen name='SignIn' component={SignIn}/>
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