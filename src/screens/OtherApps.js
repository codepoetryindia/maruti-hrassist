//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
  SafeAreaView,
  ScrollView,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';
import * as ApiService from '../Utils/Utils';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../constants/Colors';
import { GlobalFontSize } from '../constants/FontSize';
import Text from '../components/reusable/Text';
import { Header } from '../components/reusable/Header';
import { LoadingScreen } from '../components/reusable/LoadingScreen';
import ListEmptyComponent from '../components/reusable/ListEmptyComponent';

var SendIntentAndroid = require('react-native-send-intent');


// create a component
const OtherApps = ({ navigation }) => {
  const [loader, setLoader] = useState(false)
  const { authContext, AppUserData } = useContext(AuthContext);
  const [appLink, setAppLink] = useState('');
  const [refresh, setrefresh] = useState(false);


  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
    } catch(error){
        console.log(error)
    }
  }


  const GetAPPLinkApi = (pulldown=false) => {
    if(!pulldown){
      setLoader(true);
    }

    let token = AppUserData.token;
    let userId = AppUserData.data.userId
    let apiData = {
      UserName: userId,
      LinkName: "HR_ASSIST"
    }


    ApiService.PostMethode('/GetAPPLink', apiData, token)
      .then(result => {
        let responseData = result.Value
        stopLoader(false);
        setAppLink(responseData);
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

  // const SAPSF = () => {
  //   SendIntentAndroid.isAppInstalled('com.successfactors.successfactors').then(isInstalled => {
  //     if (isInstalled) {
  //       SendIntentAndroid.openApp('com.successfactors.successfactors')
  //       console.log('is installed true');
  //     } else {
  //       Linking.openURL('https://play.google.com/store/apps/details?id=com.successfactors.successfactors').catch(err => {
  //         console.log(err);
  //       });
  //     }
  //   });
  // };

  const linkOpen = (link) => {

    if(
      link.LINK_APP_CATG == 'HRASSIST_OTH_APP' && link.LINK_TYPE != 'In-House_App' && link.LINK_LINK5 == 'ANDROID'
    ){
      downloadApp(link.LINK_LINK1)
    }

    return; 







    if(Platform.OS === 'ios'){
      if(link.LINK_LINK3){
        Linking.openURL(link.LINK_LINK3)
      }else{
        Linking.openURL(link.LINK_LINK2)
      }
    }else{
      Linking.openURL(link.LINK_LINK1)
    }    
  }

  useEffect(() => {
    GetAPPLinkApi()
  }, [])


  const downloadApp = (link)=>{
    let pack_name= link.split("=");

    console.log(SendIntentAndroid);  
    SendIntentAndroid.isAppInstalled("com.google.android.gm").then(isInstalled => {
      console.log(isInstalled);
    });

    // check if app is installed by package name
    // IntentLauncher.isAppInstalled("com.android.chrome")
    // .then((result) => {
    //   console.log('isAppInstalled yes');
    // })
    // .catch((error) => console.warn('isAppInstalled: no', error));
  }



  if(loader){
    return(
    <SafeAreaView style={styles.container}>
      <Header title ="Other Mobile Apps"/>
      <LoadingScreen/>
    </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Header title ="Other Mobile Apps"/>
          <View style={{ flex: 1, paddingHorizontal:10 }}>
            <FlatList
              contentContainerStyle={{ flex:1 }}
              data={appLink}
              numColumns={2}
              ListEmptyComponent={<ListEmptyComponent title="No Data Found" enableRefresh={true} onRefreshCallback={()=>GetAPPLinkApi(true)} refreshing={refresh} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={( item ) => item.LINK_ID.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    linkOpen(item);
                    // console.log(item);
                  }}
                  style={styles.button}>
                  <Image
                    source={{ uri: item.LINK_LINK3 }}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={{ fontSize: 18, paddingVertical: 5, color: '#4a4a4a' }}>
                    {item.LINK_DESC}
                  </Text>
                </TouchableOpacity>
              )} />
          </View>
      </View>
    </SafeAreaView>)
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: '#fff',    
  },
  button:{
    width: '48%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    margin: 5,
    borderColor:GlobalColor.Secondary,
    borderWidth:0.5,
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: GlobalColor.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.29,
    shadowRadius: 10.65,
    elevation: 5,
    alignItems: 'center',
    borderRadius: 0,
  }
});

//make this component available to the app
export default OtherApps;
