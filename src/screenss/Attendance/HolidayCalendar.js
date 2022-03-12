//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

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
        {
          HolidayCalendar == 0 ? (
            <View>
              <Text>apply Leave</Text>
            </View>
          ) : HolidayCalendar == 1 ? (
            <View>
              <Text> Leave</Text>
            </View>
          ) : HolidayCalendar == 2 ? (
            <View>
              <Text>View report</Text>
            </View>
          ) : (
            <View>
              <Text>lasrt</Text>
            </View>
          )
        }
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
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#ad3231',
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
