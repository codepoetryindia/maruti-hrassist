//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image,FlatList,SafeAreaView } from 'react-native';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';


import { GlobalColor } from '../constants/Colors';
import { GlobalFontSize } from '../constants/FontSize';
import Text from './reusable/Text';




const myCustomeSharing =async () =>{
  const shareOption = {
    message:"install this app https://play.google.com/store/apps/details?id=com.successfactors.successfactors",
  }
  try {const shareResponse = await Share.open(shareOption);}
    catch(error){
      console.log('error',error);
  }
}

// create a component
const TouchableCard = ({navigation}) => {
  const Data = [
    {
      id: '1',
      name: 'Employee Lookup',
      images: require('../assets/Images/home/icons8.png'),
    },
    {
      id: '2',
      name: 'Attendance & Admin',
      images: require('../assets/Images/home/calendar.png'),
    },
    {
      id: '3',
      name: 'Compliances & Benifis',
      images: require('../assets/Images/home/chart.png'),
    },
    {
      id: '4',
      name: 'Hospital & Emergency',
      images: require('../assets/Images/home/transplantation.png'),
    },
    {
      id: '5',
      name: 'Canteen Menu',
      images: require('../assets/Images/home/canteen.png'),
    },
    {
      id: '6',
      name: 'Visitor Gatepass',
      images: require('../assets/Images/home/visitor-gatepass.png'),
    },
    {
      id: '7',
      name: 'Other Mobile Apps',
      images: require('../assets/Images/home/otherapps.png'),
    },
    {
      id: '8',
      name: 'Buisness Travel',
      images: require('../assets/Images/home/btravel.png'),
    },
    {
      id: '9',
      name: 'Share App',
      images: require('../assets/Images/home/share.png'),
    },

  ];

    return (
      <View style={{flex:1, marginTop:10}}>
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress = {() =>{
              if(item.name==='Employee Lookup') {
                navigation.navigate('EmployeeNavs');
              }
              else if(item.name==='Attendance & Admin') {
                navigation.navigate('AttendanceAdmin');
              }
             else if(item.name==='Compliances & Benifis') {
                navigation.navigate('CompensationBenifitsNav');
              }
              else if(item.name==='Hospital & Emergency') {
                navigation.navigate('HospitalNavs');
              }
              else if(item.name==='Canteen Menu') {
                navigation.navigate('Canteen');
              }
              else if(item.name==='Visitor Gatepass') {
                 navigation.navigate('Gatepass');
               }
             else if(item.name==='Other Mobile Apps') {
                navigation.navigate('OtherApps');
              }
              else if(item.name==='Buisness Travel') {
                navigation.navigate('BuisnessTravel');
              }
             else if(item.name==='Share App') {
               console.log('hello')
               myCustomeSharing()
              }
            }}>
            <LinearGradient
              // colors={[GlobalColor.PrimaryGradient, GlobalColor.SecondryGradient]}
              colors={[GlobalColor.White, GlobalColor.White]}
              style={{padding:5,borderRadius:5}}>
              <Image source={item.images} style={styles.cardimg} />
            </LinearGradient>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
           
            )}/>
            </View>            
    )
          }
// define your styles
const styles = StyleSheet.create({
  card: {
    width: "28%",
    padding:5,
    paddingVertical:10,
    borderWidth:0.2,
    borderColor:GlobalColor.Secondary,
    backgroundColor: GlobalColor.White,
    // borderBottomLeftRadius: 7,
    // borderBottomRightRadius: 7,
    // marginTop: 5,
    marginBottom:10,
    marginLeft:"4%",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    position: 'relative',
  },
  cardimg: {
    width: 40,
    height: 40,
    margin:5,
    // tintColor:'#d4fdff'
  },
  cardText:{
    textAlign:'center',
    marginTop:5, 
    fontSize:GlobalFontSize.Error,
    color:GlobalColor.Primary,
  }
});

//make this component available to the app
export default TouchableCard;
