//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,FlatList} from 'react-native';
import { setDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';
import EmployeLookUp from '../screenss/employeLookUp/EmployeLookUp';

// create a component
const TouchableCard = ({navigation}) => {
  const Data = [
    {
      id: '1',
      name: 'Employee Lookup',
      images: require('../assets/Images/group.png'),
    },
    {
      id: '2',
      name: 'Attendance & Admin',
      images: require('../assets/Images/calendar.png'),
    },
    {
      id: '3',
      name: 'Compliances & Benifis',
      images: require('../assets/Images/statistics.png'),
    },
    {
      id: '4',
      name: 'Hospital & Emergency',
      images: require('../assets/Images/first-aid-kit.png'),
    },
    {
      id: '5',
      name: 'Canteen Menu',
      images: require('../assets/Images/canteen.png'),
    },
    {
      id: '6',
      name: 'Visitor Gatepass',
      images: require('../assets/Images/identity-card.png'),
    },
    {
      id: '7',
      name: 'Other Mobile Apps',
      images: require('../assets/Images/more.png'),
    },
    {
      id: '8',
      name: 'Buisness Travel',
      images: require('../assets/Images/passenger.png'),
    },
    {
      id: '9',
      name: 'Share App',
      images: require('../assets/Images/share.png'),
    },
    // {
    //   id: '10',
    //   name: 'Hospital & Emergency',
    //   images: require('../assets/Images/first-aid-kit.png'),
    // },
    // {
    //   id: '11',
    //   name: 'Canteen Menu',
    //   images: require('../assets/Images/canteen.png'),
    // },
    // {
    //   id: '12',
    //   name: 'Visitor Gatepass',
    //   images: require('../assets/Images/identity-card.png'),
    // },
    //  {
    //    id: '13',
    //    name: 'Employee Lookup',
    //    images: require('../assets/Images/group.png'),
    //  },
    //  {
    //    id: '14',
    //    name: 'Attendance & Admin',
    //    images: require('../assets/Images/calendar.png'),
    //  },
    //  {
    //    id: '15',
    //    name: 'Compliances & Benifis',
    //    images: require('../assets/Images/statistics.png'),
    //  },
    //  {
    //    id: '16',
    //    name: 'Hospital & Emergency',
    //    images: require('../assets/Images/first-aid-kit.png'),
    //  },
    //  {
    //    id: '17',
    //    name: 'Canteen Menu',
    //    images: require('../assets/Images/canteen.png'),
    //  },
    //  {
    //    id: '18',
    //    name: 'Visitor Gatepass',
    //    images: require('../assets/Images/identity-card.png'),
    //  },

  ];

    return (
      <View style={{height:'46%',marginBottom:"-5%",marginLeft:'1.5%',}}>
        <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
          numColumns={3}
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress = {() =>{
              if(item.name==='Employee Lookup') {
                navigation.navigate('EmployeLookUp');
              }
              else if(item.name==='Attendance & Admin') {
                navigation.navigate('AttendanceAdmin');
              }
             else if(item.name==='Compliances & Benifis') {
                navigation.navigate('CompensationBenifits');
              }
              else if(item.name==='Hospital & Emergency') {
                navigation.navigate('EmergencyHospital');
              }
              else if(item.name==='Canteen Menu') {
                navigation.navigate('Canteen');
              }
              else if(item.name==='Visitor Gatepass') {
                 navigation.navigate('Gatepass');
               }
             else if(item.name==='Other Mobile Apps') {
                navigation.navigate('More');
              }
              else if(item.name==='Buisness Travel') {
                navigation.navigate('BuisnessTravel');
              }
             else if(item.name==='Share App') {
                navigation.navigate('More');
              }
            }}>
            <Image source={item.images} style={styles.cardimg} />
            <Text style={{fontSize:10,color:'#000'}}>{item.name}</Text>
          </TouchableOpacity>
           
            )}/>
            </View>
    )
          }
// define your styles
const styles = StyleSheet.create({
  card: {
    width: "30%",
    paddingVertical:20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginTop: 5,
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 2,
    position: 'relative',
  },
  cardimg: {
    width: 30,
    height: 30,
    margin:10,
  },
});

//make this component available to the app
export default TouchableCard;
