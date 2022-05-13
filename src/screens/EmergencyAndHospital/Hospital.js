//import liraries
import React, {Component, useEffect, useState,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList,Linking, ScrollView,ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
// create a component
const Hospital = ({navigation,route}) => {
  let ApiFilterData = "ABOHAR";
//   let data = route.params.selectedLoc;
// {data!=='' ? ( console.log("data",data)):null}
const  Mynavigation = useNavigation({route})
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  // const[hospitalLoc,setHospitalLoc] = useState(null);
  const[hospitalList,setHospitallList] = useState(null);

  // const GetHospLocnApi = () => {
  //   let token = AppUserData.token
  //   let apidata = {}
  //   setLoader(true);
  //   ApiService.PostMethode('/GetHospLocn', apidata, token)
  //     .then(result => {
  //       setLoader(false);
  //       console.log("Apiresult",result);
  //       let ApiValue = result.Value.LOCN_DESC
  //       console.log("setHospitalLoc", ApiValue);
  //       setHospitalLoc(ApiValue)
  //     })
  //     .catch(error => {
  //       setLoader(false);
  //       console.log('Error occurred==>', error);
  //       if (error.response) {
  //         if (error.response.status == 401) {
  //           console.log('error from api', error.response);
  //         }
  //         // client received an error response (5xx, 4xx)
  //         Toast.show(error.response.data.title);
  //       } else if (error.request) {
  //         // client never received a response, or request never left
  //         Toast.show('Network Error');
  //         // console.log("error.request", error.request._response);
  //       } else {
  //         // anything else
  //         Toast.show('Something Went Wrong');
  //       }
  //     });
  // };

  // Hospital list 
  const GetHospListApi = () => {
    let token = AppUserData.token
    // let FilterData =  {LOCN_DESC:ABOHAR}
    let apidata;
    if(ApiFilterData==null){
      apidata = {}
    }else{
      apidata ={LOCN_DESC:ApiFilterData} 
    }
    setLoader(true);
    ApiService.PostMethode('/GetHospList', apidata, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("setHospitallList", ApiValue);
        setHospitallList(ApiValue)
      })
      .catch(error => {
        setLoader(false);
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

  // const {hospitalDetails} = useSelector (state => state.apiHospitalDetails);
  // const dispatch = useDispatch();

  useEffect(() =>{
    GetHospListApi();
  },[]);
 
  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='red' size={30} />
        <Text>
          Loading...
        </Text>
      </View>
    ) :(
      
    <View style={styles.container}>
      <View style={styles.itemBox}>
        
    <FlatList
          showsVerticalScrollIndicator={false}
          data={hospitalList}
          keyExtractor={({item,index})=>index}
          renderItem={({item,index}) => (
            <View style={styles.box}>
              <View style={{width: '90%'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {item.HOSP_NAME}
                </Text>
                <Text>{item.ADDR}</Text>
              </View>
              <TouchableOpacity style={{width: '10%'}} 
              onPress={() => {
                  Linking.openURL(`tel:${item.HOSP_PHONE_NO}`)
              }}>
                <Feather name="phone-call" size={20} color={'#4174D0'} />
              </TouchableOpacity> 
            </View>
          )}
        /> 
        
      </View>
    </View>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemBox: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  box: {
    width: '90%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Hospital;
