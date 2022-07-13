//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import { GlobalColor } from '../../constants/Colors';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';


// create a component
const EmergencyContacts = ({ navigation }) => {
  const myNavigation = useNavigation();
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [emerList, setEmerList] = useState();

  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
    } catch(error){
        console.log(error)
    }
}


  const GetEmerMain = (pulldown = false) => {

    if(!pulldown){
      setLoader(true);
    }

    let apiData = {}
    let token = AppUserData.token
    // console.log(apiData)
    setLoader(true);
    ApiService.PostMethode('/GetEmerMain', apiData, token)
      .then(result => {
        stopLoader(false);
        let ApiValue = result.Value
        console.log("APi value", ApiValue);
        setEmerList(ApiValue)
      })
      .catch(error => {
        stopLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = GetEmerMain();
      return () => unsubscribe;
    }, [])
  )

  const iconBox = (type) => {
    switch (type) {
      case "Doctor":
        return require('../../assets/Images/hospital/doctor.png')
        break;
      case "Vigilance":
        return require('../../assets/Images/hospital/camera.png')
        break;
      case "Fire Control":
        return require('../../assets/Images/hospital/fire-extinguisher.png')
        break;
      case "Electricity":
        return require('../../assets/Images/hospital/home.png')
        break;
      case "POSH Cell":
        return require('../../assets/Images/hospital/smartphone.png')
        break;
      default:
        return require('../../assets/Images/user-interface.png')
        break;
    }
  }


  if(loader){
    return(
      <SafeAreaView style={styles.container}>
        <LoadingScreen/>
      </SafeAreaView>
    )
  }


  return (

    <SafeAreaView style={styles.container}>
          <FlatList
            contentContainerStyle={{ flex:1}}
            data={emerList}
            ListEmptyComponent={() => <ListEmptyComponent enableRefresh={true} onRefreshCallback={()=>GetEmerMain(true)} refreshing={refresh} />}
            renderItem={({ item }) => {
              let image = iconBox(item.EMER_DESC);
              return (
                <TouchableOpacity
                  key={item.CONTACT_NUMBER}
                  style={styles.box}
                  onPress={() => {
                    myNavigation.navigate("DoctorsContacts", {
                      data: item,
                      pageName: item.EMER_DESC == "Doctor" ? "Doctor" : (item.EMER_DESC == "Vigilance" ? "Vigilance" : (item.EMER_DESC == "Fire Control" ? "Fire Control" : (item.EMER_DESC == "Electricity" ? "Electricity" : "POSH Cell")))
                    })
                  }}>
                  <View style={styles.iconBox}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: GlobalColor.Secondary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}>
                      <Image
                        source={image}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </View>
                  <View style={styles.item}>
                    <Text>{item.EMER_DESC}</Text>
                    <Feather name="corner-up-right" size={20} color={GlobalColor.Secondary}/>
                  </View>
                </TouchableOpacity>
              )
            }}
          />    
    </SafeAreaView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,
    paddingHorizontal:10
  },
  spinnerTextStyle: {
    color: GlobalColor.White
  },
  box: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth:0.5,
    borderColor:GlobalColor.Secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconBox: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

//make this component available to the app
export default EmergencyContacts;
