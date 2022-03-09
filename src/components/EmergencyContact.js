//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {EmergencyContactData} from '../actions/hospitalData';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EmergencyContacts from '../screenss/EmergencyAndHospital/EmergencyContact';
import Hospital from '../screenss/EmergencyAndHospital/Hospital';

// create a component
const DoctorsContacts = ({navigation}) => {
  const {emergencyContacts} = useSelector(state => state.apiHospitalDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EmergencyContactData());
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
        style={{padding: 15}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 40,
              alignItems: 'center',
            }}>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="menu-outline"
              size={25}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            Doctor
          </Text>
        </View>
      </LinearGradient>

      <View
        style={{
          width: '90%',
          height:'90%',
          marginVertical: 10,
          alignSelf: 'center',
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
          borderRadius: 8,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={emergencyContacts}
          keyExtractor={item => item.contact}
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                flexDirection: 'row',
              }}>
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    borderBottomWidth: 1,
                    padding: 5,
                  }}>
                  {item.department}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Text>{item.contact}</Text>
                  <TouchableOpacity style={{width: '10%'}}>
                    <Feather name="phone-call" size={20} color={'#ad3231'} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Text>{item.contact}</Text>
                  <TouchableOpacity style={{width: '10%'}}>
                    <Feather name="phone-call" size={20} color={'#ad3231'} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Text>{item.contact}</Text>
                  <TouchableOpacity style={{width: '10%'}}>
                    <Feather name="phone-call" size={20} color={'#ad3231'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        {/* <Text style={{fontSize:18,fontWeight:'bold',letterSpacing:2,borderBottomWidth:0.5,}}>{}</Text> 
            <Text>{}</Text>
            <Text>{}</Text> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default DoctorsContacts;
