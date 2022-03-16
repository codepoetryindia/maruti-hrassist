//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import { date } from 'yup';
// import * as Animatable from 'react-native-animatable';
// create a component
const Attendance = ({navigation}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const[toDate,setToDate] = useState (new Date());
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [MarkAttandance, setMarkAttandance] = useState(0);
  const [horizental, setHorizental] = useState(false);

  const handleMarkAttandance = index => {
    setMarkAttandance(index);
  };
  const handelDate = () => {
   if(fromDate >toDate)
   {
     alert('from date should be less then to date');
   }
   else {
     alert('sucessfull');
   }
  }
  const FinancialYear = ['2021', '2022', '1999'];
  const [location, setLocation] = useState('');
  const punch = () => {
    setLocation([]);
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      console.log('position', position);
      const {latitude, longitude} = position.coords;
      setLocation({
        latitude,
        longitude,
      });
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{width: '100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <SegmentedControlTab
           borderRadius={8}
          values={['Mark Attendance', 'View Report']}
          selectedIndex={MarkAttandance}
          onTabPress={index => {
            handleMarkAttandance(index);
          }}
          tabsContainerStyle={{ width:'97%',alignSelf:'center'}}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
         {/* <TouchableOpacity
            style={{left:5}}
            onPress={() => 
           {horizental == true?  setHorizental(false) : setHorizental(true)}
            }>
            <Ionicons
              name="ellipsis-vertical-circle"
              size={25}
              color={'red'}
            />
             
             {horizental==true ? (<View style={{padding:5, backgroundColor: '#000',marginRight:10}}><Text>hello</Text></View>):null} 
           
          </TouchableOpacity> */}
           <SelectDropdown
                // defaultButtonText="Select Any Year"
                data={FinancialYear}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  width: '10%',
                  height: 40,
                  borderRadius: 5,
                }}
                dropdownStyle={{borderRadius: 10}}
                rowTextStyle={{textAlign: 'left', marginLeft: 5}}
                buttonTextStyle={{textAlign: 'left', marginLeft: 1}}
                renderDropdownIcon={isOpened => {
                  return (
                    // <FontAwesome
                    //   name={isOpened ? 'chevron-up' : 'chevron-down'}
                    //   color={'#444'}
                    //   size={18}
                    // />
                    <Ionicons
                    name="ellipsis-vertical-circle"
                    size={25}
                    color={'red'}
                  />
                  );
                }}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                
                  return item;
                }}
              />
      </View>

      <View>
        {MarkAttandance == 0 ? (
          <View>
            <TouchableOpacity style={styles.content}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  punch();
                }}>
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
                }}>
                <Text>From</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    ...{moment(fromDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity onPress={() => setOpen(true)}>
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
              <View
                style={{
                  width: '48%',
                }}>
                <Text>To</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    ...{moment(toDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>  (setOpenSecond(true))}>
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

              {/* DatePicker */}

              <DatePicker
                modal
                open={open}
                date={fromDate}
                mode='date'
                onConfirm={fromDate => {
                  setOpen(false);
                  setFromDate(fromDate);
                  console.log(fromDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <DatePicker
                modal
                mode='date'
                open={openSecond}
                date={toDate}
                onConfirm={toDate => {
                  setOpenSecond(false);
                  setToDate(toDate);
                  console.log(toDate);
                }}
                onCancel={() => {
                  setOpenSecond(false);
                }}
              />
            </View>

            {/* Button */}

            <TouchableOpacity onPress={() => {handelDate()}}>
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
