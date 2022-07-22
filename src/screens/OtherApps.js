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
    let userId = AppUserData?.data?.userId
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


  const linkOpen = (link) => {

    console.log(link);


    if(
      link.LINK_APP_CATG == 'HRASSIST_OTH_APP' && link.LINK_TYPE != 'In-House_App' && link.LINK_LINK5 == 'ANDROID'
    ){
      downloadApp(link.LINK_LINK1)
    }else if(
      link.LINK_APP_CATG == 'HRASSIST_OTH_APP' && link.LINK_TYPE == 'In-House_App' && link.LINK_LINK5 == 'ANDROID'
    ){
      downloadInhouseApp(link.LINK_LINK1, link.LINK_LINK4);
    }
  }

  useEffect(() => {
    GetAPPLinkApi()
  }, [])


  const downloadApp = (link)=>{
    let pack_name= link.split("=");
    if(Platform.OS === 'android'){
      console.log(pack_name[1]);
      var SendIntentAndroid = require('react-native-send-intent');
      SendIntentAndroid.isAppInstalled(pack_name[1]).then(isInstalled => {
        if(isInstalled){
          SendIntentAndroid.openApp(pack_name[1]).then(wasOpened => {
            if(!wasOpened){
              Linking.openURL(link);    
            }
          });
        }else{
          Linking.openURL(link);    
        }
      });
    }else{
      Linking.openURL(link);
    }
  }

  const downloadInhouseApp = (link, link4)=>{
    let pack_name= link.split("=");
    if(Platform.OS === 'android'){
      var SendIntentAndroid = require('react-native-send-intent');
      SendIntentAndroid.isAppInstalled(link4).then(isInstalled => {
        if(isInstalled){
          SendIntentAndroid.openApp(link4).then(wasOpened => {
            if(!wasOpened){
              Linking.openURL(link);    
            }
          });
        }else{
          Linking.openURL(link);    
        }
      });
    }else{
      Linking.openURL(link);
    }
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
          <View style={{ flex: 1, paddingHorizontal:10, }}>
            <FlatList
              contentContainerStyle={{ flex:1, alignItems:'center' }}
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
    backgroundColor: '#fff',    
  },
  button:{
    minWidth:150,
    maxWidth:200,
    justifyContent: 'center',
    marginTop: 10,
    margin: 5,
    alignSelf:'center',
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
