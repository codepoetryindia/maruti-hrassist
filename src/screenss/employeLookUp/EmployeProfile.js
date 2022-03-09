//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const EmployProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{flex: 0.25}}
        colors={['#2757C3', '#80406A', '#AD3231']}>
        <View style={{flexDirection: 'row', padding: 15, alignItems: 'center'}}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color={'white'}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 25,
            }}>
            Profile
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          backgroundColor: '#fff',
          width: '90%',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 8,
          position: 'absolute',
          top: '10%',
          bottom:5
        }}>
        <View
          style={{
            borderWidth: 5,
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 100,
            marginTop: '-12%',
          }}>
          <Image
            source={require('../../assets/Images/smile.jpg')}
            style={{
              width: 100,
              height: 100,
              overflow: 'hidden',
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />
        </View>
     <View style={{height: '79%',}}>
     <ScrollView>
       <Text  style={{color:'gray',fontSize:20,textAlign:'center',padding:5,letterSpacing:1}}>Ms. Mansi Varma</Text>
          <View style={styles.box}>
            <Text style={styles.header}>Vertical / Div ./Department</Text>
            <Text>IT / ITA-1 / AG3</Text>
          </View>
          <View style={styles.box}>
          <Text style={styles.header}>Personal phone Number</Text>
            <Text>9897643210</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.header}>Offical Phone Number</Text>
            <Text>N.A</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.header}>Email Id</Text>
            <Text>Mansivarma@123maruti.com</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.header}>HRBP</Text>
            <Text>5462586 - MS. SHREYA SINHA (AM)</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.header}>Permanent Address</Text>
            <Text>MK jain nagrakata , jalpaiguri , 735202</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.header}>Present Address</Text>
            <Text>Siliguri , dabgram Aashighar , west bengal , 734004</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.header}>Nominies</Text>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text>Check in Details</Text>
           <Ionicons
            name="chevron-next-outline"
            size={30}
            color={'red'}
            onPress={() => navigation.goBack()}
          />
             </View>
          </View>
        </ScrollView>
       </View>
       <TouchableOpacity>
       <LinearGradient
        style={{padding:20,margin:5,borderRadius:8,alignItems:'center'}}
        colors={['#2757C3', '#80406A', '#AD3231']}>
         
            <Text style={{color:'#fff',fontSize:16}}>SUBMIT</Text>
          </LinearGradient>
          </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderBotttomWidth: 1,
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
  },
  header:{
    fontSize:12,
    color:'gray',
    paddingVertical:5,
  }
});

//make this component available to the app
export default EmployProfile;
