//import liraries
import React, {useEffect, useState,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import { date } from 'yup';
// import * as Animatable from 'react-native-animatable';
// create a component
const Attendance = ({navigation}) => {
  const [fromDate, setFromDate] = useState(new Date());
  const[toDate,setToDate] = useState (new Date());
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [MarkAttandance, setMarkAttandance] = useState(0);
  const [loader, setLoader] = useState(false)
  const { authContext, AppUserData } = useContext(AuthContext);

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

  const SubmitPunchRO = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data
    let apiData = {
        EmplID: EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/SubmitPunchRO', apiData, token)
        .then(result => {
            setLoader(false);
            // console.log('ApiResult', result);
            let responseData = result.Value[0].SHIS_YYMM_CODE
            console.log('GetMonth', responseData)
            setMonth(responseData)
           
        })
        .catch(error => {
            setLoader(false);
            // console.log('Error occurred==>', error);
            if (error.response) {
                if (error.response.status == 401) {
                    console.log('error from api', error.response);
                }
                Toast.show(error.response.data.title);
            } else if (error) {
                Toast.show('Network Error');
            } else {
                Toast.show('Something Went Wrong');
            }
        });
};
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
          tabsContainerStyle={{ width:'100%',alignSelf:'center'}}
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
           {/* <SelectDropdown
                // defaultButtonText="Select Any Year"
                data={FinancialYear}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  width: '80%',
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
              /> */}
      </View>

      <View>
        {MarkAttandance == 0 ? (
          <View>
            <TouchableOpacity style={styles.content}>
            <Text>Live Location
                <Icon name='map-marker-radius'size={25} color={'green'}/>  
                </Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  punch();
                }}>
                <Text>Punch</Text>
              </TouchableOpacity>
              <Text>{location.latitude}</Text>
              <Text>{location.longitude}</Text>
              <Ionicons name='ios-locate-outline'size={25} color={'green'}/>
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
                          color={'#6ef7ff'}
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
                          color={'#6ef7ff'}
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
             colors={['#4174D0','#6ef7ff']}>
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
    borderColor: '#6ef7ff',
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
    marginVertical:10
  },
  circle: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderColor:'green',
    // borderTopColor: '#80406A',
    // borderStartColor: '#6ef7ff',
    // borderBottomColor: '#2757C3',
    // borderEndColor: '#80406A',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 30,
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
                   color={'#6ef7ff'}
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
