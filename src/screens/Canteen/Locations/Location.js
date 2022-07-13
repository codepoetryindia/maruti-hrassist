import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../context/AuthContext';
import Accordion from './../CanteenComponent/Accordion';


import { GlobalColor } from '../../../constants/Colors'; 
import { GlobalFontSize } from '../../../constants/FontSize';
import Text from '../../../components/reusable/Text';
import { LoadingScreen } from '../../../components/reusable/LoadingScreen';



  // Gurgaon Tab Component
  export const Location = ({ navigation, route }) => {
    const [isOpen, setIsOpen] = useState('');
    const [loader, setLoader] = useState(false);
    const { authContext, AppUserData } = useContext(AuthContext);
    const [lunch, setLunch] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);




    useEffect(() => {
        GetMenuCanttApi()
    }, [date]);


      const GetMenuCanttApi = () => {
        let token = AppUserData.token
        let userId = AppUserData.data
        let formatedDate = moment(date).format("DD-MMMM-YYYY").toUpperCase();
        let apidata = {
            MenuType: route.params.MenuType,
            MenuDate: formatedDate,
            MenuLocation: route.params.MenuLocation,
            staffid: userId,            
        }
        setLoader(true);
        ApiService.PostMethode('/GetMenuCant', apidata, token)
          .then(result => {
            setLoader(false);
            let ApiValue = result.Value
            console.log("setMenu location", ApiValue);
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



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          // Prevent default behavior
          // e.preventDefault();          
          console.log('Default behavior prevented');
          GetMenuCanttApi();
          // Do something manually
          // ...
        });
        return unsubscribe;
      }, [navigation]);


    return (
      <SafeAreaView style={styles.screenContainer}>
          <View style={styles.calander}>
            <Text>{moment(date).format('MMM Do YYYY')}</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Ionicons name="calendar-outline" size={30} color={GlobalColor.PrimaryGradient} />
            </TouchableOpacity>
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
                mode="date"
            />
          </View>

            { loader ? (
                <LoadingScreen/>
            ):(
             <ScrollView style={styles.AccordianContainer}>
                <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
                <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
                <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
              </ScrollView>
            )
        }
      </SafeAreaView>
    );
  };


  const styles = StyleSheet.create({      
    screenContainer:{
      flex: 1, 
      backgroundColor: GlobalColor.PrimaryLight,
      paddingHorizontal:10
    },
    spinnerTextStyle: {
      color: GlobalColor.White
    },
    calander: {
      width: '100%',
      paddingHorizontal:20,
      backgroundColor: GlobalColor.White,
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      paddingVertical: 8,
      marginVertical: 10,
      borderRadius: 0,
      shadowColor: GlobalColor.Black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 2,
    },
    AccordianContainer:{
        flex:1, 
    }
  });