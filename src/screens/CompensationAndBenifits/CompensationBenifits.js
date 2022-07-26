//import liraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, SafeAreaView, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Payroll from './Payroll';
import Benifits from './Benifits';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from '../../components/reusable/Header';
import { GlobalColor } from '../../constants/Colors';
import EmergencyContacts from '../EmergencyAndHospital/EmergencyContact';
import Hospital from '../EmergencyAndHospital/Hospital';
import NearByHospital from '../EmergencyAndHospital/NearByHospital';
import Text from '../../components/reusable/Text';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LocalAuthentication from 'rn-local-authentication';
import AuthorisedComp from '../../components/reusable/AuthorisedComp';
import Button from "../../components/reusable/Button";
import { GlobalFontSize } from '../../constants/FontSize';



const Tab = createMaterialTopTabNavigator();

const CompensationBenifits = ({ navigation }) => {
  const [isAuth, setIsAuth] = useState('');
  const [Loading, setLoading] = useState(true);


  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  useEffect(() => {
    handelBiometric();
  }, []);



  const handelBiometric = () => {
    LocalAuthentication.authenticateAsync({
      reason: "Please, authenticate!",
      fallbackEnabled: true,
      fallbackTitle: "Unlock using passcode",
      fallbackToPinCodeAction: true
  }).then(response => {
    console.log(response);
      if (response.success) {
          // Alert.alert("Authenticated successfully!");
          setIsAuth(true);
          setLoading(false);
      } else {
          setIsAuth(false);
          setLoading(false);
          // Alert.alert("Something went wrong");
      }
  })




    return; 
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              console.log('Authenticated Successfully', success);
              setIsAuth(true);
              console.log('state data', isAuth)
            })
            .catch(error => {
              // navigation.goBack();
              console.log('Authentication Failed', error);
            });
        }
      })
      .catch(error => {
        // navigation.goBack();
        // Failure code
        console.log('not supported', error);
      });
  };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });
  // const layout = useWindowDimensions();
  // const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   {key: 'first', title: 'Payroll'},
  //   {key: 'second', title: 'Benifits'},
  // ]);

  if(Loading){
    return(
      <SafeAreaView style={{flexGrow:1}}>
        <Header title="Compensation and Benefits" />
          <AuthorisedComp title="Authorise" subtitle="Please authorise yur device to access comp. & benefits"/>     
      </SafeAreaView>
    )
  }



  return (
         <SafeAreaView style={{flexGrow:1}}>
         <View style={{flex:1}}>
           {isAuth == true ? ( 
            <View style={{flex:1}}>
                <Header title="Compensation and Benefits" />
                    <Tab.Navigator
                      screenOptions={{
                        tabBarLabelStyle: {},
                        tabBarActiveTintColor: GlobalColor.White,
                        tabBarIndicatorStyle: { borderBottomWidth: 5, borderBottomColor: GlobalColor.White },
                        tabBarStyle: { backgroundColor: GlobalColor.Secondary, elevation: 0 },
                        tabBarItemStyle: { paddingHorizontal: 0 }
                      }}>
                      <Tab.Screen name="Payroll" component={Payroll} />
                      <Tab.Screen name="Benifits" component={Benifits} />
                    </Tab.Navigator>
            </View>
             ) : ( 
             <View style={{backgroundColor:'#fff', flex:1}}>
              <Header title="Compensation and Benefits" />
                <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>

                    <View style={styles.innerContainer}>
                        <Image
                        style={styles.tinyLogo}
                        source={require('./../../assets/Images/accessfailed.png')}
                        />
                        <Text style={styles.title} Bold>Unauthorised</Text>                      
                    </View>              


                    <Button 
                      onPress={()=>{
                        navigation.goBack()
                      }}
                    title="GO BACK" btnStyle={{ width:"50%", alignSelf:'center', marginTop:20, borderRadius:0 }}/>
                </View>
             </View> 
            )      
           }
          </View>
         </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },
  searchSection: {
    top: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '77%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: GlobalColor.White,
    color: '#424242',
  },
  title:{
    fontSize:GlobalFontSize.H4,
    textAlign:'center',
    marginBottom:15, marginTop:10        
  },
  subtitle:{
      textAlign:'center',
  },
  innerContainer:{
      maxWidth:250
  },
  tinyLogo:{
    width:100,
    height:100,
    alignSelf:'center'
},
});
export default CompensationBenifits;

