//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, FlatList,SafeAreaView, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';




// create a component
const EmployProfile = ({ navigation, route }) => {
  let userId = route.params.data

  const [loader, setLoader] = useState(false)
  const { authContext, AppUserData } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState([]);
  const [empphoto, setPhoto] = useState('');
  const [refresh, setrefresh] = useState(false);


  const employeProfile = () => {
    let token = AppUserData.token
    let apiData = {
      UserName: userId
    }
    setLoader(true);
    ApiService.PostMethode('/GetEmployeeProfile', apiData, token)
      .then(result => {
        stopLoader();
        if(result.Value?.Table.length > 0){
          let responseData = result.Value.Table;
          let Profile = responseData?.[0].profile_photo
          setEmployeeData(responseData)
          setPhoto(Profile);
        }else{
          Toast.show('No Data Found');
        }
      })
      .catch(error => {
        stopLoader();
        console.log('Error occurred==>', error);
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

  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
    } catch(error){
        console.log(error)
    }
  }


  useEffect(() => {
    employeProfile()
  }, [])


  if(loader){
    return(
      <SafeAreaView style={styles.container}>
        <Header title={"Employee Profile"} back/>
        <LoadingScreen/>
      </SafeAreaView>
    )
  }


  if(loader || employeeData.length == 0){
    return(
      <SafeAreaView style={styles.container}>
        <Header title={"Employee Profile"} back/>
        <ListEmptyComponent enableRefresh={true} onRefreshCallback={()=>employeProfile(true)} refreshing={refresh}/>
      </SafeAreaView>
    )
  }

  


  return (    
      <SafeAreaView style={styles.container}>
        <Header title={"Employee Profile"} back/>
        {loader==true? (
           <Spinner
           visible={loader}
           textContent={'Loading...'}
           textStyle={{color:'#fff'}}
         />
        ):null}




        <View
          style={{
            flex:1,
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
            marginTop:60
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


          <View style={{ flex:1 }}>
            <FlatList
              data={employeeData}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/Images/dataNotFound.png')}
                      style={{ width: 300, height: 300, resizeMode: 'contain', }} />
                    <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                  </View>
                )
              }}
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
                    <TouchableOpacity onPress={()=>Linking.openURL(`tel:${item.PRESENT_PHONE}`)}>
                      <Text style={{ color:GlobalColor.Secondary }} Bold>{item.PRESENT_PHONE}</Text>
                    </TouchableOpacity>
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
                </View>
              )} />
  
          </View>
        </View>
      </SafeAreaView>
    


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
    fontSize: GlobalFontSize.P,
    color: 'gray',
    paddingVertical: 5,
  }
});

//make this component available to the app
export default EmployProfile;
