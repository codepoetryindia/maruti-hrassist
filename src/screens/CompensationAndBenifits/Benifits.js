import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView,Alert} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Text from '../../components/reusable/Text';
import { GlobalColor } from '../../constants/Colors';
import { showErrorMessage } from '../../Utils/Utils';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';



// create a component
const Benifits = () => {
  const [loader, setLoader] = useState(false)
  const [refresh, setrefresh] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);

  const GetConvElig = () => {
    let token = AppUserData.token
    let EmplID =  AppUserData?.data?.userId 
    console.log("this empid",EmplID)
    let apiData = {
      "UserName": EmplID
    }

    //Set Loader
    setLoader(true);

    ApiService.PostMethode('/GetConvElig', apiData, token)
      .then(result => {
        console.log( 'This setTaxSaving', result);

        //stop Loader
        stopLoader();

        let responseData = result.Result
        console.log("This responseData",responseData)
        if (responseData == 0) {
          Alert.alert("Payroll", "You are not Authorized");
        }
        else {
          //  myNavigation.navigate("ConveyanceBillsSubmission")
           myNavigation.navigate("ConveyanceBillsSubmission", {
            Conveyancepayload: responseData,
          }) 
          // alert(responseData)
        }
      })
      .catch(error => {
        //stop Loader
        stopLoader();
        //Show Error Massage
        showErrorMessage(error)
      });
  };

  const myNavigation = useNavigation();
  const data = [
    { id: '1', text: 'PL Encashment' },
    { id: '2', text: 'LTA Encashment' },
    { id: '3', text: 'Conveyance Bills (SMGR & Above)' },
  ];

  //Stop Loader Function
  const stopLoader = () => {
    setLoader(false);
    setrefresh(false);
  }

  //Loader Component
  if (loader) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen />
      </SafeAreaView>
    )
  }


  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.box}
            onPress={() => {
              if (item.text === 'Conveyance Bills (SMGR & Above)') {
                
                GetConvElig()
              }
              else {
                myNavigation.navigate("Plencashment", {
                  pageName: item.text == "PL Encashment" ? "PL Encashment" : (item.text == 'LTA Encashment' ? "LTA Encashment" : null)
                })
              }
            }}>
            <View style={styles.iconBox}>
              <View
                style={styles.iconBoxContainer}>
                <Image
                  source={require('../../assets/Images/bill.png')}
                  style={{ width: 30, height: 30 }} />
              </View>
            </View>
            <View style={styles.item}>
              <Text Bold>{item.text}</Text>
              <Feather name="corner-up-right" size={20} color={GlobalColor.Secondary}/>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,
    paddingHorizontal: 10,
  },
  box: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderRadius: 5
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
  iconBoxContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GlobalColor.Secondary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

//make this component available to the app
export default Benifits;
