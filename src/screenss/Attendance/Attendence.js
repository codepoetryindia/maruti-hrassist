//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// create a component
const Attendance = () => {
  const [text, setText] = useState('');
  const [manager, setManager] = useState(false);
  const [MarkAttandance, setMarkAttandance] = useState(0);
  const handleMarkAttandance = index => {
    setMarkAttandance(index);
  };

  const [location, setLocation] = useState('');
  const punch = () => {
   setLocation([]);
  };
  useEffect (() => {
    Geolocation.getCurrentPosition(position => {
      console.log('position', position);
      const {latitude, longitude} = position.coords;
      setLocation({
        latitude,
        longitude,
      });
    });
  }, [])
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
            <TouchableOpacity
              style={styles.content}>
              <TouchableOpacity style={styles.circle} 
              onPress={() =>{ punch()}}>
                <Text>Punch</Text>
              </TouchableOpacity>
              <Text>Live Location</Text>
              <Text>{location.latitude}</Text>
              <Text>{location.longitude}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Date Picker */}
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginVertical: 20,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 5,
              }}>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'gray',
                }}>
                <Text>From</Text>
                <Text style={{color: 'gray'}}>{text}</Text>
                <View>
                  <View>
                    <TouchableOpacity>
                    <Ionicons
                      name="calendar-outline"
                      size={30}
                      color={'#ad3231'}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'gray',
                }}>
                <Text>To</Text>
                <Text style={{color: 'gray'}}>{text}</Text>
                <View>
                  <View>
                  <TouchableOpacity>
                    <Ionicons
                      name="calendar-outline"
                      size={30}
                      color={'#ad3231'}
                    />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Button */}

            <TouchableOpacity>
              <LinearGradient
                style={{
                  padding: 20,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
                colors={['#2757C3', '#80406A', '#AD3231']}>
                <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Manager Mode */}
      
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: manager == true ? '50%' : '10%',
                position: 'absolute',
                right: -20,
                bottom: '-50%',
                backgroundColor: '#23f',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                paddingVertical: 5,
              }}>
              <Ionicons
                style={{marginLeft: '8%'}}
                name="ios-person-circle-outline"
                size={25}
                color={'white'}
                onPress={() => {
                  manager == true ? setManager(false) : setManager(true);
                }}
              />
             <TouchableOpacity style={{alignSelf:'center'}}>
             {manager== true ? (<Text style={{color:'#fff',marginLeft:5,}}>Go-To Manager-Mode</Text>):null}
             </TouchableOpacity>
            </TouchableOpacity>
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
  circle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#80406A',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 10,
  },
});

//make this component available to the app
export default Attendance;

{
  /* <View style={{width:'45%',backgroundColor:'green'}}>
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
             </View> */
}
