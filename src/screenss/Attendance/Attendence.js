//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// create a component
const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(formatedDate);
    let formatedDate = moment(currentDate).subtract(10, 'days').calendar();
    console.log(formatedDate);
    setText(formatedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const [MarkAttandance, setMarkAttandance] = useState(0);
  const handleMarkAttandance = index => {
    setMarkAttandance(index);
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Mark Attendance', 'View Report']}
          selectedIndex={MarkAttandance}
          onTabPress={index => {
            handleMarkAttandance(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>

      <View>
        {MarkAttandance == 0 ? (
          <View>
            <View style={styles.content}>
              <Text>Live Location</Text>
              <Text>PF95+6MM,</Text>
              <Text>West Bengal , siliguri 734004</Text>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                borderWidth:1,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginVertical: 10,
              }}>
            <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{color: 'gray'}}>{text}</Text>
              <View>
                <View>
                  <Ionicons
                    name="calendar-outline"
                    onPress={showDatepicker}
                    size={30}
                    color={'#ad3231'}
                  />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              </View>
{/* 
              <View style={{width:'45%',backgroundColor:'green'}}>
            <Text style={{color: 'gray'}}>{text}</Text>
              <View>
                <View>
                  <Ionicons
                    name="calendar-outline"
                    onPress={showDatepicker}
                    size={30}
                    color={'#ad3231'}
                  />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              </View> */}

            </View>
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
    //custom styles
    paddingVertical: 10,
    borderColor: '#ad3231',
  },
  tabTextStyle: {
    //custom styles
    fontWeight: '700',
    color: 'grey',
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: '#2757C3',
    // borderColor:Colors.primaryColor
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
export default Attendance;
