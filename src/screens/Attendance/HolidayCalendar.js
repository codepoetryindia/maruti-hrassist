//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

// create a component
const HolidayCalendar = () => {
  const [HolidayCalendar, setHolidayCalendar] = useState([0]);
  const handleHolidayCalendar = index => {
    setHolidayCalendar(index);
  };
  return (
    <View style={styles.container}>
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
      <View>
        {HolidayCalendar == 0 ? (
          <View>
            <LinearGradient
              colors={['#4174D0','#6ef7ff']}
              style={{borderRadius: 10, marginVertical: 15}}>
              <Calendar
                // Specify style for calendar container element. Default = {}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  paddingVertical: 10,
                  // marginVertical: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderRadius: 10,
                  elevation: 5,
                }}
                markingType={'period'}
                markedDates={{
                  '2022-03-17': {startingDay: true, color: '#6ef7ff'},
                  '2022-03-18': {
                    selected: true,
                    color: '#00adf5',
                  },
                  '2022-03-19': {
                    color: 'green',
                    endingDay: true,
                  },
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#fff',
                  calendarBackground: '#fff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#fff',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#fff',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            </LinearGradient>
            <View
              style={{
                width: '100%',
                padding: 10,
                backgroundColor:'#fff',
                marginVertical: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
               borderRadius:10,
                elevation: 5,
              }}>
                <Text>Holi</Text>
              </View>
          </View>
        ) : HolidayCalendar == 1 ? (
          <View>
            <LinearGradient
              colors={['#4174D0','#6ef7ff']}
              style={{borderRadius: 10, marginVertical: 15}}>
              <Calendar
                // Specify style for calendar container element. Default = {}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  paddingVertical: 10,
                  // marginVertical: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderRadius: 10,
                  elevation: 5,
                }}
                markingType={'period'}
                markedDates={{
                  '2022-03-17': {startingDay: true, color: '#6ef7ff'},
                  '2022-03-18': {
                    selected: true,
                    color: '#00adf5',
                  },
                  '2022-03-19': {
                    color: 'green',
                    endingDay: true,
                  },
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#fff',
                  calendarBackground: '#fff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#fff',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#fff',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            </LinearGradient>
          </View>
        ) : HolidayCalendar == 2 ? (
          <View>
            <LinearGradient
               colors={['#4174D0','#6ef7ff']}
              style={{borderRadius: 10, marginVertical: 15}}>
              <Calendar
                // Specify style for calendar container element. Default = {}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  paddingVertical: 10,
                  // marginVertical: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderRadius: 10,
                  elevation: 5,
                }}
                markingType={'period'}
                markedDates={{
                  '2022-03-17': {startingDay: true, color: '#6ef7ff'},
                  '2022-03-18': {
                    selected: true,
                    color: '#00adf5',
                  },
                  '2022-03-19': {
                    color: 'green',
                    endingDay: true,
                  },
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#fff',
                  calendarBackground: '#fff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#fff',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#fff',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            </LinearGradient>
          </View>
        ) : (
          <View>
            {/* <LinearGradient
              colors={['#fff', '#fff']}
              style={{borderRadius: 10, marginVertical: 15}}> */}
              <Calendar
                // Specify style for calendar container element. Default = {}
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  paddingVertical: 10,
                  marginVertical: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderRadius: 10,
                  elevation: 5,
                }}
                markingType={'period'}
                markedDates={{
                  '2022-03-17': {startingDay: true, color: '#6ef7ff'},
                  '2022-03-18': {
                    selected: true,
                    color: '#00adf5',
                  },
                  '2022-03-19': {
                    color: 'green',
                    endingDay: true,
                  },
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#fff',
                  calendarBackground: '#fff',
                  textSectionTitleColor: '#b6c1cd',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  selectedDayBackgroundColor: '#fff',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: 'gray',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            {/* </LinearGradient> */}
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
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
});

//make this component available to the app
export default HolidayCalendar;
