//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,

  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Accordion from './CanteenComponent/Accordion';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { GlobalFontSize } from '../../constants/FontSize';
import { GlobalColor } from '../../constants/Colors';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';

const Tab = createMaterialTopTabNavigator();
const CanteenMenu = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [lunch, setLunch] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [currentInd, setCurrentInd] = useState(0)
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);


  const GetMenuCanttApi = () => {
    let token = AppUserData.token
    let formatedDate = moment(date).format("DD-MMMM-YYYY").toUpperCase();
    console.log("currentdate", formatedDate);
    let apidata;
    if (currentInd == 0) {
      apidata = {
        MenuType: "Canteen",
        MenuDate: formatedDate,
        MenuLocation: "002"
      }
      console.log("index 0 ", apidata);
    }
    else if (currentInd == 1) {
      apidata = {
        MenuType: "Canteen",
        // MenuDate:"12-APR-2022",
        MenuDate: formatedDate,
        MenuLocation: "010"
      }
      console.log("index 0 ", apidata);
    }
    else if (currentInd == 2) {
      apidata = {
        MenuType: "Canteen",
        // MenuDate:"12-APR-2022",
        MenuDate: formatedDate,
        MenuLocation: "011"
      }
      console.log("index 0 ", apidata);
    }
    else if (currentInd == 3) {
      apidata = {
        MenuType: "Canteen",
        // MenuDate:"12-APR-2022",
        MenuDate: formatedDate,
        MenuLocation: "041"
      }
      console.log("index 0 ", apidata);
    }
    console.log("apidata", apidata);
    setLoader(true);
    ApiService.PostMethode('/GetMenuCant', apidata, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("setMenu", ApiValue);
        let lunch = result.Value.filter(item => {
          if (item.CANT_MEAL === "Lunch") {
            return item
          }
        })

        let snacks = result.Value.filter(item => {
          if (item.CANT_MEAL === "Snacks") {
            return item
          }
        })

        let dinner = result.Value.filter(item => {
          if (item.CANT_MEAL === "Dinner") {
            return item
          }
        })

        setLunch(lunch);
        setSnacks(snacks);
        setDinner(dinner);
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };

  useEffect(() => {
    GetMenuCanttApi()
    console.log('index', currentInd);
    console.log("GetMenuCanttApi", GetMenuCanttApi);
  }, [currentInd, date])

  // Gurgaon

  const Gurgaon = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight,width:"100%"}}>
        <View style={styles.AccordianContainer}>
          {loader == true ? (
            <Spinner
              visible={loader}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          ) : null}
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      </SafeAreaView>
    );
  };

  // GURGAON End

  // MANSEAR START
  const Manesar = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
        <View style={styles.AccordianContainer}>
          {loader == true ? (
            <Spinner
              visible={loader}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          ) : null}
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      </SafeAreaView>
    );
  };

  const Mpt = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
        <View style={styles.AccordianContainer}>
          {loader == true ? (
            <Spinner
              visible={loader}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          ) : null}
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      </SafeAreaView>
    );
  };

  const Rothak = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
        <View style={styles.AccordianContainer}>
          {loader == true ? (
            <Spinner
              visible={loader}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          ) : null}
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title="Canteen Menu" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: GlobalFontSize.P,
          tabBarActiveTintColor: GlobalColor.White,
          tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: GlobalColor.White },
          tabBarStyle: { backgroundColor: GlobalColor.PrimaryGradient, elevation: 0 },
        }}
      >
        <Tab.Screen name="Gurgaon" component={Gurgaon} />
        <Tab.Screen name="Manesar" component={Manesar} />
        <Tab.Screen name="MPT" component={Mpt} />
        <Tab.Screen name="Rothak" component={Rothak} />
      </Tab.Navigator>

      <View style={{ position: 'absolute', top: '16%', paddingHorizontal: 22, alignSelf: "center" }}>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date)
            console.log("new", date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={styles.calander}>
          <Text >(Todays Menu ) -- {moment(date).format('MMM Do YYYY')}</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={30} color={GlobalColor.PrimaryGradient} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },

  // Gurgaon Lunch section
  lunchBoxContainer: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: GlobalColor.White,
    borderRadius: 5,
    alignSelf: 'center',
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  spinnerTextStyle: {
    color: GlobalColor.White
  },
  lunchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor:'red'
  },
  spinnerTextStyle: {
    color: GlobalColor.White
  },
  calander: {
    width: '100%',
    backgroundColor: GlobalColor.White,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 2,
  },
  AccordianContainer: { marginTop: 70,width:"100%" }
});

// //make this component available to the app
export default CanteenMenu;
