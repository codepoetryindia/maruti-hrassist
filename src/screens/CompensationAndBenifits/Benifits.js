import React, { useEffect, useState, useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';

// create a component
const Benifits = () => {
  const [loader, setLoader] = useState(false)
  const { authContext, AppUserData } = useContext(AuthContext);

  const GetConvElig = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data.EMPL_NAME
    console.log(EmplID)
    let apiData = {
      "UserName":EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/GetConvElig', apiData, token)
      .then(result => {
        console.log('setTaxSaving', result);
        setLoader(false);
        let responseData = result.Result
        if(responseData==0){
         alert("You are not Authorized");
        }
        else{
          alert(responseData)
        }
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

  const myNavigation = useNavigation();
  const data = [
    {id: '1', text: 'PL Encashment'},
    {id: '2', text: 'LTA Encashment'},
    {id: '3', text: 'Conveyance Bills (SMGR & Above)'},
  ];
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.box} 
          onPress={()=> {
            if(item.text==='Conveyance Bills (SMGR & Above)'){
              GetConvElig()
            }
            else{
              myNavigation.navigate("Plencashment" , {
                pageName: item.text == "PL Encashment" ? "PL Encashment" : (item.text == 'LTA Encashment' ? "LTA Encashment":null)
              })
            }
          }}>
            <View style={styles.iconBox}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#6ef7ff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Foundation
                  name="page-export-pdf"
                  size={20}
                  color={'#6ef7ff'}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text>{item.text}</Text>
              <Feather name="corner-up-right" size={20} />
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
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '90%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 15,
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
export default Benifits;
