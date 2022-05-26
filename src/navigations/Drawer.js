import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from './TabNavigation';
import CustomDrawer from '../components/CustomDrawer';
// import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';
import CompensationBenifitsNav from '../../src/navigations/CompensationBenifitsNav';
import HospitalNavs from './HospitalNavigator';
import Canteen from '../screens/Canteen/Canteen';
import CanteenMenu from '../screens/Canteen/CanteenMenu';
import FoodCount from '../screens/Canteen/FoodCount';
import VisitorDetails from '../screens/Gatspass/VisitoDetails';
import BuisnessTravel from '../screens/Buisness/BuisnessTravel';
import Gst from '../screens/Buisness/GST';
import ShuttleBooking from '../screens/Buisness/ShuttleBooking';
import EmergencyContacts from '../screens/EmergencyAndHospital/EmergencyContact';
import Notification from '../screens/Notification';
import EmployProfile from '../screens/employeLookUp/EmployeProfile';
import EditProfile from '../components/EditProfile'
import EmployeeNavs from './EmployeeNavs';
import AttendanceAdminNav from './AttendanceAdminNav';
import Nomination from '../components/Nomination';
const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="EmployeeNavs" component={EmployeeNavs} />
      <Drawer.Screen name='EmployProfile' component={EmployProfile}/>
      <Drawer.Screen name='EditProfile' component={EditProfile}/>
      <Drawer.Screen name='Nomination' component={Nomination}/>
      <Drawer.Screen name="CompensationBenifitsNav" component={CompensationBenifitsNav}/>
      <Drawer.Screen name="HospitalNavs" component={HospitalNavs} />
      <Drawer.Screen name="Canteen" component={Canteen} />
      <Drawer.Screen name="CanteenMenu" component={CanteenMenu} />
      <Drawer.Screen name="FoodCount" component={FoodCount} />
      <Drawer.Screen name="VisitorDetails" component={VisitorDetails} />
      <Drawer.Screen name="BuisnessTravel" component={BuisnessTravel} />
      <Drawer.Screen name="Gst" component={Gst} />
      <Drawer.Screen name="ShuttleBooking" component={ShuttleBooking} />
      <Drawer.Screen name='EmergencyContacts' component={EmergencyContacts}/>
      <Drawer.Screen name='Notification' component={Notification}/>
      <Drawer.Screen name='AttendanceAdminNav' component={AttendanceAdminNav}/>

      
    </Drawer.Navigator>
  );
}
export default MyDrawer;
