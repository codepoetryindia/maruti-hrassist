//import liraries
import React, {useState,useEffect,useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const HolidayCalendar = () => {

  const handleHolidayCalendar = index => {
    setHolidayCalendar(index);
  };
  return ( 
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%'}}>
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
