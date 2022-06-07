import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';



// create a component
const HolidayCalendar = () => {
  const [HolidayCalendar, setHolidayCalendar] = useState([0]);
  const [loader, setLoader] = useState(false);
  const [holidaycalendar249, setholidaycalendar249] = useState([]);
  const [holidaydesc249, setholidaydesc249] = useState([]);
  const [MonthlyHolidays, setMonthlyHolidays] = useState([]);
  const [MnthTitle, setMnthTitle] = useState("");

  const [holidaycalendar280, setholidaycalendar280] = useState([]);
  const [holidaydesc280, setholidaydesc280] = useState([]);
  const [holidaycalendarSMG, setholidaycalendarSMG] = useState([]);
  const [holidaydescsmg, setholidaydescsmg] = useState([]);
  const [holidaycalendarMNS, setholidaycalendarMNS] = useState([]);
  const [holidaydescmns, setholidaydescmns] = useState([]);

 


  const { authContext, AppUserData } = useContext(AuthContext);



  // var holidaycalendar249 = [];
  // var holidaydesc249 = [];
  // var holidaycalendar280 = [];
  // var holidaydescsmg = [];
  // var holidaycalendarSMG = [];
  // var holidaydescmns = [];
  // var holidaycalendarMNS = [];
  // var holidaydesc280 = [];


  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = LoadcalenderData();
      return () => unsubscribe;
    }, [])
  )
  const LoadcalenderData = () => {
    const m_names_month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    let apiData = { "UserName": AppUserData.data.userId };
    // AppUserData.data.userId 222852
    let token = AppUserData.token;
    setLoader(true);
    ApiService.PostMethode('/GetEmplCal  ', apiData, token)
      .then(result => {
        // console.log("APiresult GetEmplCal", result);
        setLoader(false);
        if (result.Value) {
            let holidaycalendar249data = [];
            let holidaydesc249data = [];
            let holidaycalendar280data = [];
            let holidaydesc280data = [];
            let holidaydescsmgdata = [];
            let holidaycalendarSMGdata = [];
            let holidaydescmnsdata = [];
            let holidaycalendarMNSdata = [];

          result.Value.forEach(element => {
            if(element.HOLI_OFF_DATE.includes("249")){
              let yyyy = element.HOLI_OFF_DATE.slice(0, 4);
              let month = element.HOLI_OFF_DATE.slice(4, 6);
              let day = element.HOLI_OFF_DATE.slice(6, 8);
              let desc = element.HOLI_OFF_DATE.slice(13, 100);
              let remarks = day + "-" + m_names_month[month - (1)] + "-" + yyyy + " ~ " + desc;
              holidaycalendar249data.push(new Date(yyyy, month - (1), day));
              holidaydesc249data.push(remarks);
            }
            else if(element.HOLI_OFF_DATE.includes("280"))
            {
              let yyyy = element.HOLI_OFF_DATE.slice(0, 4);
              let month = element.HOLI_OFF_DATE.slice(4, 6);
              let day = element.HOLI_OFF_DATE.slice(6, 8);
              let desc = element.HOLI_OFF_DATE.slice(13, 100);
              let remarks = day + "-" + m_names_month[month - (1)] + "-" + yyyy + " ~ " + desc;
              holidaycalendar280data.push(new Date(yyyy, month - (1), day));
              holidaydesc280data.push(remarks);
            }
            else if(element.HOLI_OFF_DATE.includes("smg"))
            {
              let yyyy = element.HOLI_OFF_DATE.slice(0, 4);
              let month = element.HOLI_OFF_DATE.slice(4, 6);
              let day = element.HOLI_OFF_DATE.slice(6, 8);
              let desc = element.HOLI_OFF_DATE.slice(13, 100);
              let remarks = day + "-" + m_names_month[month - (1)] + "-" + yyyy + " ~ " + desc;
              holidaycalendarSMGdata.push(new Date(yyyy, month - (1), day));
              holidaydescsmgdata.push(remarks);
            }
            else if(element.HOLI_OFF_DATE.includes("mns"))
            {
              let yyyy = element.HOLI_OFF_DATE.slice(0, 4);
              let month = element.HOLI_OFF_DATE.slice(4, 6);
              let day = element.HOLI_OFF_DATE.slice(6, 8);
              let desc = element.HOLI_OFF_DATE.slice(13, 100);
              let remarks = day + "-" + m_names_month[month - (1)] + "-" + yyyy + " ~ " + desc;              
              holidaycalendarMNSdata.push(new Date(yyyy, month - (1), day));
              holidaydescmnsdata.push(remarks);
            }
          }); 
              
              setholidaycalendar249(holidaycalendar249data);
              setholidaydesc249(holidaydesc249data);
              setholidaycalendar280(holidaycalendar280data);
              setholidaydesc280(holidaydesc280data);
              setholidaycalendarSMG(holidaycalendarSMGdata);
              setholidaydescsmg(holidaydescsmgdata);
              setholidaycalendarMNS(holidaycalendarMNSdata);
              setholidaydescmns(holidaydescmnsdata);
        } else {
          Toast.show('No Leave type found');
        }
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
  }



  const handleHolidayCalendar = index => {
    setHolidayCalendar(index);
  };



  const change249 = (viewdate)=> {

    console.log(HolidayCalendar);

    setMonthlyHolidays([]);

    let navigateview = new Date(viewdate);
    let trimmonthyear = (navigateview.toString().split(" ")[1] + "-" + navigateview.toString().split(" ")[3]);
    setMnthTitle(trimmonthyear);

    if(HolidayCalendar == 0){
        for (let i = 0; i < holidaydesc249.length; i++) {
          if (holidaydesc249[i].includes(trimmonthyear)) {

              if (holidaydesc249[i].length > 14) {
                  setMonthlyHolidays(oldArray => [...oldArray, {date:holidaydesc249[i].toString().split("~")[0], occation:holidaydesc249[i].toString().split("~")[1]}]);
              }
          }

      }
    }else if(HolidayCalendar == 1){
      for (let i = 0; i < holidaydesc280.length; i++) {
          if (holidaydesc280[i].includes(trimmonthyear)) {

              if (holidaydesc280[i].length > 14) {
                  setMonthlyHolidays(oldArray => [...oldArray, {date:holidaydesc280[i].toString().split("~")[0], occation:holidaydesc280[i].toString().split("~")[1]}]);
              }
          }

      }
    }else if(HolidayCalendar == 2){
      for (let i = 0; i < holidaydescsmg.length; i++) {
          if (holidaydescsmg[i].includes(trimmonthyear)) {

              if (holidaydescsmg[i].length > 14) {
                  setMonthlyHolidays(oldArray => [...oldArray, {date:holidaydescsmg[i].toString().split("~")[0], occation:holidaydescsmg[i].toString().split("~")[1]}]);
              }
          }

      }
    }else if(HolidayCalendar == 3){
      for (let i = 0; i < holidaydescmns.length; i++) {
          if (holidaydescmns[i].includes(trimmonthyear)) {

              if (holidaydescmns[i].length > 14) {
                  setMonthlyHolidays(oldArray => [...oldArray, {date:holidaydescmns[i].toString().split("~")[0], occation:holidaydescmns[i].toString().split("~")[1]}]);
              }
          }

      }
    }

    console.log(MonthlyHolidays);
}

useEffect(() => {
  const data = change249(new Date);

  return () => {
    data
  }
}, [holidaydesc249, HolidayCalendar])


// useEffect(() => {
//   const data = change249(new Date);

//   return () => {
//     data
//   }
// }, [])





const renderItemHolidaysingle=({item})=>{
  return(
    <View style={styles.itemcontainer}>
      <View style={styles.itemLeft}>
        <Text>
          {item.date}
        </Text>
      </View>
      <View style={styles.itemRight}>
        <Text>
          {item.occation}
        </Text>
      </View>
    </View>
    )
  }





  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >

      <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

      <View style={{width: '100%', paddingHorizontal:10}}>
        <SegmentedControlTab
          borderRadius={8}
          values={['MSIL 249', 'MSIL 280', 'SMG', 'MNS/HQ']}
          selectedIndex={HolidayCalendar}
          onTabPress={index => {
            handleHolidayCalendar(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>
      <View style={{paddingHorizontal:10,marginTop:10}}>
        {HolidayCalendar == 0 ? (
          <View style={{flex:1}}>
              <View style={styles.calenderContainer}>
                <CalendarPicker
                    onDateChange={(date)=> change249(date)}
                    onMonthChange={(month)=> change249(new Date(month))}
                    disabledDates={[
                      ...holidaycalendar249
                    ]}
                    disabledDatesTextStyle={{fontWeight:"700"}}
                    previousTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    nextTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    selectedDayColor={'#f00'}
                    selectedDayStyle={{backgroundColor:'#4174D0'}}
                    selectedDayTextColor="red"
                    selectedDayTextStyle={{color:"#fff", fontWeight:'700'}}
                  />
              </View>
                  
              <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor:'#fff',
                marginVertical: 5,
              }}>
                <Text style={{fontSize:18, fontWeight:'700'}}>{MnthTitle} Holidays</Text>
              </View>
              <View style={{flex:1}}>  
                <FlatList
                  data={MonthlyHolidays}
                  renderItem={renderItemHolidaysingle}
                  // keyExtractor={item => item.date}
                />
              </View>
          </View>
        ) : HolidayCalendar == 1 ? (
          <View style={{flex:1}}>
              <View style={styles.calenderContainer}>
                <CalendarPicker
                    onDateChange={(date)=> change249(date)}
                    onMonthChange={(month)=> change249(new Date(month))}
                    disabledDates={[
                      ...holidaycalendar280
                    ]}
                    disabledDatesTextStyle={{fontWeight:"700"}}
                    previousTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    nextTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    selectedDayColor={'#f00'}
                    selectedDayStyle={{backgroundColor:'#4174D0'}}
                    selectedDayTextColor="red"
                    selectedDayTextStyle={{color:"#fff", fontWeight:'700'}}
                  />
              </View>
                  
              <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor:'#fff',
                marginVertical: 5,
              }}>
                <Text style={{fontSize:18, fontWeight:'700'}}>{MnthTitle} Holidays</Text>
              </View>
              <View style={{flex:1}}>  
                <FlatList
                  data={MonthlyHolidays}
                  renderItem={renderItemHolidaysingle}
                  // keyExtractor={item => item.date}
                />
              </View>
          </View>
        ) : HolidayCalendar == 2 ? (
          <View style={{flex:1}}>
              <View style={styles.calenderContainer}>
                <CalendarPicker
                    onDateChange={(date)=> change249(date)}
                    onMonthChange={(month)=> change249(new Date(month))}
                    disabledDates={[
                      ...holidaycalendarSMG
                    ]}
                    disabledDatesTextStyle={{fontWeight:"700"}}
                    previousTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    nextTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    selectedDayColor={'#f00'}
                    selectedDayStyle={{backgroundColor:'#4174D0'}}
                    selectedDayTextColor="red"
                    selectedDayTextStyle={{color:"#fff", fontWeight:'700'}}
                  />
              </View>
                  
              <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor:'#fff',
                marginVertical: 5,
              }}>
                <Text style={{fontSize:18, fontWeight:'700'}}>{MnthTitle} Holidays</Text>
              </View>
              <View style={{flex:1}}>  
                <FlatList
                  data={MonthlyHolidays}
                  renderItem={renderItemHolidaysingle}
                  // keyExtractor={item => item.date}
                />
              </View>
          </View>
        ) : (
          <View style={{flex:1}}>
              <View style={styles.calenderContainer}>
                <CalendarPicker
                    onDateChange={(date)=> change249(date)}
                    onMonthChange={(month)=> change249(new Date(month))}
                    disabledDates={[
                      ...holidaycalendarMNS
                    ]}
                    disabledDatesTextStyle={{fontWeight:"700"}}
                    previousTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    nextTitleStyle={{color:'#4174D0', fontWeight:'700'}}
                    selectedDayColor={'#f00'}
                    selectedDayStyle={{backgroundColor:'#4174D0'}}
                    selectedDayTextColor="red"
                    selectedDayTextStyle={{color:"#fff", fontWeight:'700'}}
                  />
              </View>
                  
              <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor:'#fff',
                marginVertical: 5,
              }}>
                <Text style={{fontSize:18, fontWeight:'700'}}>{MnthTitle} Holidays</Text>
              </View>
              <View style={{flex:1}}>  
                <FlatList
                  data={MonthlyHolidays}
                  renderItem={renderItemHolidaysingle}
                  // keyExtractor={item => item.date}
                />
              </View>
          </View>
        )}
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  tabStyle: {
    paddingVertical: 10,
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#6ef7ff',
    borderBottomColor: '#2757C3',
    borderEndColor: '#6ef7ff',
  },
  tabTextStyle: {
    fontWeight: '700',
    color: 'grey',
  },
  activeTabStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: '#2757C3',
  },
  activeTabTextStyle: {
    color: '#2757C3',
  },
  content: {
    top: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,

    elevation: 5,
  },
  calenderContainer:{
    borderWidth:1,
    borderColor:"#efefef",
    backgroundColor:'#fff',
    padding:5,
    borderRadius:5
  },
  itemcontainer:{
    width:"100%",
    backgroundColor:'#fff',
    flexDirection:'row',
    borderWidth:1,
    borderColor:"#eee",
    marginBottom:2,
    padding:10,
    justifyContent:'space-between',
  }
});

//make this component available to the app
export default HolidayCalendar;
