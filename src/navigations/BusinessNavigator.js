// In App.js in a new project
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShuttleBooking from '../screens/Buisness/ShuttleBooking';
import BuisnessTravel from '../screens/Buisness/BuisnessTravel';
import Gst from '../screens/Buisness/GST';
import SeatBook from '../screens/Buisness/SeatBook';
import Guidelines from '../screens/Buisness/Guidelines';
import Feedback from '../screens/Buisness/Feedback';

const Stack = createNativeStackNavigator();

function BusinessNavigator() {
  return (
      <Stack.Navigator initialRouteName='BuisnessTravel' screenOptions={{headerShown:false}}>
        <Stack.Screen name="BuisnessTravel" component={BuisnessTravel} />
        <Stack.Screen name="Gst" component={Gst} />
        <Stack.Screen name="ShuttleBooking" component={ShuttleBooking} />
        <Stack.Screen name="SeatBook" component={SeatBook} />
        <Stack.Screen name="Guidelines" component={Guidelines} />
        <Stack.Screen name='Feedback' component={Feedback} options={{unmountOnBlur:true}}/> 
      </Stack.Navigator>
  );
}

export default BusinessNavigator;