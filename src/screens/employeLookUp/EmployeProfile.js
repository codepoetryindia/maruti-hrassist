//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';

// create a component
const EmployProfile = ({ navigation, route }) => {
  let userId = route.params.data

  useEffect(() => {
    employeProfile()
  }, [])


  const [loader, setLoader] = useState(false)
  const { authContext, AppUserData } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState();
  const [empphoto, setPhoto] = useState();


  const employeProfile = () => {
    let apiData = {
      UserName: userId
    }
    let token = AppUserData.token
    setLoader(true);
    ApiService.PostMethode('/GetEmployeeProfile', apiData, token)
      .then(result => {
        console.log(result);
        setLoader(false);
        let responseData = result.Value.Table
        let profileImage = result.Value.Table[0].profile_photo;
        setEmployeeData(responseData);
        setPhoto(profileImage);
        // console.log("image", responseData.profile_photo)
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

  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='red' size={30} />
        <Text>
          Loading...
        </Text>
      </View>
    ) : (
      <View style={styles.container}>
        <LinearGradient
          style={{ flex: 0.25 }}
       colors={['#4174D0','#6ef7ff']}>
          <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
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
            bottom: 5
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

            {
              empphoto ? (
                <Image
                source={{ uri:`data:image/png;base64, ${empphoto}`}}
                style={{
                  width: 100,
                  height: 100,
                  overflow: 'hidden',
                  borderRadius: 100,
                  alignSelf: 'center',
                }}
              />
              ):(<Image
                source={require('../../assets/Images/Avtar.png')}
                style={{
                  width: 100,
                  height: 100,
                  overflow: 'hidden',
                  borderRadius: 100,
                  alignSelf: 'center',
                }}
              />
              )}

          </View>
          <View style={{ height: '90%', }}>
            <FlatList
              data={employeeData}
              showsVerticalScrollIndicator={false}
              keyExtractor={({ item, index }) => item}
              renderItem={({ item, index }) => (
                <View>
                  <Text style={{ color: 'gray', fontSize: 20, textAlign: 'center', padding: 5, letterSpacing: 1 }}>{item.EMPL_NAME}</Text>
                  <View style={styles.box}>
                    <Text style={styles.header}>Vertical / Div ./Department</Text>
                    <Text>{item.DIVN_DIRC_CODE} / {item.EMPL_DIVN_CODE} / {item.EMPL_DEPT_CODE}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>Personal phone Number</Text>
                    <Text>{item.PRESENT_PHONE}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>Offical Phone Number</Text>
                    <Text> {item.Phone ? (item.Phone) : "N.A"}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>Email Id</Text>
                    <Text> {item.Email ? (item.Email) : "N.A"}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>HRBP</Text>
                    <Text>{item.HRBP}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>Permanent Address</Text>

                    <Text>{item.PERMANENT_ADDRESS}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>Present Address</Text>
                    <Text>{item.PRESENT_ADDRESS}</Text>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.header}>Location</Text>
                    <Text>{item.LOCN_DESC}</Text>
                  </View>
                  {/* <View style={styles.box}>
            <Text style={styles.header}>Nominies</Text>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text>Check in Details</Text>
           <Ionicons
            name="arrow-forward-outline"
            size={30}
            color={'red'}
            
          />
             </View>
          </View> */}
                </View>
              )} />
          </View>
          {/* <TouchableOpacity>
       <LinearGradient
        style={{padding:20,margin:5,borderRadius:8,alignItems:'center'}}
     colors={['#4174D0','#6ef7ff']}>
         
            <Text style={{color:'#fff',fontSize:16}}>UPDATE</Text>
          </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>
    )


  )
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
  header: {
    fontSize: 12,
    color: 'gray',
    paddingVertical: 5,
  }
});

//make this component available to the app
export default EmployProfile;
