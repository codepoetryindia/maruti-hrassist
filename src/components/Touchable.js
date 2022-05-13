//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,FlatList} from 'react-native';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
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
                navigation.navigate('More');
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
         colors={['#53AFE2','#6ef7ff']}
        style={{padding:5,borderRadius:8}}>

            <Image source={item.images} style={styles.cardimg} />
        </LinearGradient>

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
