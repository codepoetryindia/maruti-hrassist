//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, Linking, Switch,ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';
import * as ApiService from '../Utils/Utils';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { Header } from './reusable/Header';
import { LoadingScreen } from './reusable/LoadingScreen';
import ListEmptyComponent from './reusable/ListEmptyComponent';
import Button from './reusable/Button';
import Text from './reusable/Text';
import { GlobalColor } from '../constants/Colors';

// create a component
const EditProfile = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [empPhone, setEmpPhone] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [nominiData, setNominiData] = useState('');
  const [refresh, setrefresh] = useState(false);


  const employeProfile = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apiData = {
      UserName: userId
    }
    setLoader(true);
    ApiService.PostMethode('/GetEmployeeProfile', apiData, token)
      .then(result => {
        stopLoader(false);
        let responseData = result.Value.Table;
        console.log(responseData);
        let NominationData = result.Value.Table1
        let Phone =result.Value.Table[0].EXTN
        setEmpPhone(Phone)
        setNominiData(NominationData)
        setEmployeeData(responseData);
      })
      .catch(error => {
        stopLoader(false);
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






  const UpdateEmpProf = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apiData = {
        "StaffNo" : userId,
        "PresonalNo" : "",
        "ExtensionNo" : empPhone,
        "EmergencyNo" : ""
    }
    ApiService.PostMethode('/UpdateEmpProf', apiData, token)
      .then(result => {
        if(result.Result){
          stopLoader(false);
          Toast.show(result.Result);
        }else{
          Toast.show("Update Failed");
        }
      })
      .catch(error => {
        stopLoader(false);
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

  useEffect(() => {
    employeProfile()
  }, [])

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
    } catch(error){
        console.log(error)
    }
  }


  return (
    <SafeAreaView style={styles.container}>      
      <Header back title='Profile'/>
      <View
        style={{
          flex:1,
          marginTop:40,
          backgroundColor: '#fff',
          width:"95%",
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
            marginTop: -20,
          }}>

          {AppUserData.data && AppUserData.data.profile_photo ? (
            <Image
              source={{ uri: 'data:image/png;base64, ' + AppUserData.data.profile_photo }}
              style={{
                width: 100,
                height: 100,
                overflow: 'hidden',
                borderRadius: 100,
                alignSelf: 'center',
              }}
            />
          ) : (<Image
            source={require('../assets/Images/Avtar.png')}
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
        <View style={{ flex:1, marginTop:10 }}>
          <FlatList
            data={employeeData}
            contentContainerStyle={{ flexGrow:1 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex:1}}>
                {
                  !loader ? 
                  <ListEmptyComponent 
                    enableRefresh={true}
                    onRefreshCallback={()=>employeProfile(true)}
                    refreshing={refresh}
                  /> : <LoadingScreen></LoadingScreen>
                }
                </View>
              )
            }}
            keyExtractor={( item) => item.EMPL_ID.toString()}
            renderItem={({ item, index }) => (
              <View key={item.EMPL_ID}>
                <Text style={{ color: 'gray', fontSize: 20, textAlign: 'center', padding: 5, letterSpacing: 1 }}>{item.EMPL_NAME}</Text>
                <View style={styles.box}>
                  <Text style={styles.header} >Vertical / Div ./Department</Text>
                  <Text>{item.DIVN_DIRC_CODE} / {item.EMPL_DIVN_CODE} / {item.EMPL_DEPT_CODE}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>Personal Phone Number</Text>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={()=>Linking.openURL(`tel:${item.PRESENT_PHONE}`)}>
                      <Text style={{color:'#4174D0', fontWeight:'700'}}>{item.PRESENT_PHONE}</Text>
                    </TouchableOpacity>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {
                        toggleSwitch()
                        if (!isEnabled) {
                          alert("Your number is Public. Please press update to save")
                        }
                        else {
                          alert("Your number is Private. Please press update to save")
                        }
                      }}
                      value={isEnabled}
                    />
                  </View>

                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>Offical Phone Number</Text>
                  <Text> {item.Phone}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>Email Id</Text>
                  <Text> {item.EMPL_EMAIL_ID ? (item.EMPL_EMAIL_ID) +"@maruti.co.in": "N.A"}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>HRBP</Text>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.HRBP}</Text>
                    <Ionicons
                      name="md-call-sharp"
                      size={30}
                      color={'#4174D0'}
                      onPress={() => {
                        Linking.openURL(`tel:${item.HRBP_PHONE}`)
                      }}
                    />
                  </View>
                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>Permanent Address</Text>

                  <Text>{item.PERMANENT_ADDRESS_LINE1}, {item.PERMANENT_ADDRESS_LINE2}, {item.PERMANENT_ADDRESS_LINE3}, {item.PERMANENT_CITY}, {item.PERMANENT_ADDRESS}, {item.PERMANENT_PINCODE}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>Present Address</Text>
                  <Text>
                    {item.PRESENT_ADDRESS_LINE1}, {item.PRESENT_ADDRESS_LINE2}, {item.PRESENT_ADDRESS_LINE3}, {item.PRESENT_CITY}, {item.PRESENT_ADDRESS}, {item.PRESENT_PINCODE} 
                    </Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.header}>Nominations</Text>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                      onPress={() => {
                        navigation.navigate('Nomination', {
                          data: nominiData
                        })
                      }}>
                    <Text style={{ color:GlobalColor.Secondary }}>Check in Details</Text>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={30}
                      color={'red'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        </View>
      </View>
      {employeeData.length > 0 ? (
        <View style={{ backgroundColor:'#fff', paddingHorizontal:15,paddingVertical:10 }}>
          <Button title="UPDATE"  
                onPress={() => {
                  UpdateEmpProf()
                }}>
            </Button>
        </View>
      ): null}
    </SafeAreaView>
  )
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:GlobalColor.PrimaryLight
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
    fontSize: 14,
    color: GlobalColor.LightDark,
    paddingVertical: 5,
  }
});

//make this component available to the app
export default EditProfile;
