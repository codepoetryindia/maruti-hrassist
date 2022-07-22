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
import SeatBook from '../screens/Buisness/SeatBook';
import Guidelines from '../screens/Buisness/Guidelines';
import AttendancePer from '../screens/Attendance/AttendancePer';
import LeaveBalance from'../screens/Attendance/LeaveBalance';
import CompayShiftDe from '../screens/Attendance/CompayShiftDe';
import SalaryDeduct from '../screens/Attendance/SalaryDeduct';
import ManagerMode from '../screens/Attendance/ManagerMode';
import ManagerTaxiApproval from '../screens/Attendance/managermode/ManagerTaxiApproval';
import ManagerAttandancePercentage from '../screens/Attendance/managermode/ManagerAttandancePercentage';
import TaxComputationSlip from '../screens/CompensationAndBenifits/TaxComputationSlip';
import PFBalance from '../screens/CompensationAndBenifits/PFBalance';
import TaxSavings from '../screens/CompensationAndBenifits/TaxSavings';
import Feedback from '../screens/Buisness/Feedback';

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
      <Drawer.Screen name="CompensationBenifitsNav" component={CompensationBenifitsNav} options={{unmountOnBlur:true}}/>
      <Drawer.Screen name="HospitalNavs" component={HospitalNavs} />
      <Drawer.Screen name="Canteen" component={Canteen} />
      <Drawer.Screen name="CanteenMenu" component={CanteenMenu} />
      <Drawer.Screen name="FoodCount" component={FoodCount} />
      <Drawer.Screen name="VisitorDetails" component={VisitorDetails} />
      <Drawer.Screen name="BuisnessTravel" component={BuisnessTravel} />
      <Drawer.Screen name="Gst" component={Gst} />
      <Drawer.Screen name="ShuttleBooking" component={ShuttleBooking} />
      <Drawer.Screen name="SeatBook" component={SeatBook} />
      <Drawer.Screen name="Guidelines" component={Guidelines} />
      <Drawer.Screen name='EmergencyContacts' component={EmergencyContacts}/>
      <Drawer.Screen name='Notification' component={Notification}/>
      <Drawer.Screen name='AttendanceAdminNav' component={AttendanceAdminNav}/>
      <Drawer.Screen name='ManagerMode' component={ManagerMode}/>
      <Drawer.Screen name='AttendancePer' component={AttendancePer}/>
      <Drawer.Screen name='LeaveBalance' component={LeaveBalance}/>
      <Drawer.Screen name='CompayShiftDe' component={CompayShiftDe}/>
      <Drawer.Screen name='SalaryDeduct' component={SalaryDeduct}/>
      <Drawer.Screen name='ManagerTaxiApproval' component={ManagerTaxiApproval} options={{unmountOnBlur:true}}/>
      <Drawer.Screen name='ManagerAttandancePercentage' component={ManagerAttandancePercentage} options={{unmountOnBlur:true}}/>  
      <Drawer.Screen name='TaxComputationSlip' component={TaxComputationSlip} options={{unmountOnBlur:true}}/>  
      <Drawer.Screen name='PFBalance' component={PFBalance} options={{unmountOnBlur:true}}/>  
      <Drawer.Screen name='TaxSavings' component={TaxSavings} options={{unmountOnBlur:true}}/>   
      <Drawer.Screen name='Feedback' component={Feedback} options={{unmountOnBlur:true}}/>   
    </Drawer.Navigator>
  );
}
export default MyDrawer;
