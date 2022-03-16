import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from './TabNavigation';
import CustomDrawer from '../components/CustomDrawer';
// import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';
import CompensationBenifits from '../screenss/CompensationAndBenifits/CompensationBenifits';
import HospitalNavs from './HospitalNavigator';
import Canteen from '../screenss/Canteen/Canteen';
import CanteenMenu from '../screenss/Canteen/CanteenMenu';
import FoodCount from '../screenss/Canteen/FoodCount';
import VisitorDetails from '../screenss/Gatspass/VisitoDetails';
import BuisnessTravel from '../screenss/Buisness/BuisnessTravel';
import Gst from '../screenss/Buisness/GST';
import ShuttleBooking from '../screenss/Buisness/ShuttleBooking';
import EmergencyContacts from '../screenss/EmergencyAndHospital/EmergencyContact';
import Notification from '../screenss/Notification';
import EmployProfile from '../screenss/employeLookUp/EmployeProfile';
import EmployeeNavs from './EmployeeNavs';
import AttendanceAdminNav from './AttendanceAdminNav';
import DoctorsContacts from '../components/DoctorsContacts';
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
      <Drawer.Screen name="CompensationBenifits" component={CompensationBenifits}/>
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
