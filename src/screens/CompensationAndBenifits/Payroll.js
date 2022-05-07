//import liraries
import React, {useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

// create a component
const Payroll = () => {
  const myNavigation = useNavigation();

  const [loader, setLoader] = useState(false)
  const [taxData, setTaxData] = useState();
   const [month, setMonth] = useState();
   const[pfBal,setPfBal] = useState();
  const { authContext, AppUserData } = useContext(AuthContext);

// tax Saving Api
  const GetTaxSavings = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data
    let apiData = {
      EmplID: EmplID,
      FNYR: 2122
    }
    setLoader(true);
    ApiService.PostMethode('/GetTaxSavings', apiData, token)
      .then(result => {
        setLoader(false);
        // console.log('ApiResult', result);
        let responseData = result.Value
        setTaxData(responseData)
        console.log('GetTaxSavings', responseData)
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


  // financial year Api
  const GetMonth = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data
    let apiData = {
        EmplID: EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/GetSalaryMonth', apiData, token)
        .then(result => {
            setLoader(false);
            // console.log('ApiResult', result);
            let responseData = result.Value[0].SHIS_YYMM_CODE
            console.log('GetMonth', responseData)
            setMonth(responseData)
           
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

// Pf Balance Api 
const PfBalance = () => {
  let token = AppUserData.token
  let EmplID = AppUserData.data
  let apiData = {
      EmplID: EmplID,
      FNYR:month
  }
  setLoader(true);
  ApiService.PostMethode('/GetPFStatement', apiData, token)
      .then(result => {
          setLoader(false);
          // console.log('ApiResult', result);
          let responseData = result.Value.Table1
          console.log('PfBalance', responseData)
          setPfBal(responseData)
         
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

useEffect(() => {
  GetMonth()
  PfBalance()
  GetTaxSavings()
}, [])

  //   end >Tax Computation Slip

  const [isModalVisible, setModalVisible] = useState(false);
  const [taxModalVisible, setTaxModalVisible] = useState(false);
  const [pfModalVisible, setPfModalVisible] = useState(false);
  const [savingModalVisible, setSevingModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      <TouchableOpacity
        onPress={() => {
          myNavigation.navigate('SalarySlip')
        }}
        style={styles.box}>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Salary Slip</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      {/* Tax  */}

      <TouchableOpacity onPress={() => {
      }}>
        <View style={styles.box}>
          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#ad3231',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
            </View>
          </View>
          <View style={styles.item}>
            <Text>Tax Computation Slip</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </View>

        <Modal
          backdropOpacity={0.1}
          animationInTiming={300}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationOutTiming={500}
          coverScreen={true}
          isVisible={isModalVisible}>
          <View style={styles.modal}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Feather
                name="x-circle"
                color={'#000'}
                size={20}
                onPress={toggleModal}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Component</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Amount(Rs.)
              </Text>
            </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={taxData}
                keyExtractor={({item,index})=>index}
                renderItem={({ item,index }) => (
                  <View style={styles.textContainer}>
                    <Text>{item.SALARY_HEAD}</Text>
                    <Text>{item.AMOUNT}</Text>
                  </View>
                )}
              />
          </View>
        </Modal>
      </TouchableOpacity>

      {/* PF */}

      <TouchableOpacity 
      onPress={()=>{
       setPfModalVisible(true)}}>
        <View style={styles.box}>
          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#ad3231',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
            </View>
          </View>
          <View style={styles.item}>
            <Text>Pf Balance </Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </View>

           {/* tax saving modal */}

           <Modal
        backdropOpacity={0.1}
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={500}
        coverScreen={true}
        isVisible={pfModalVisible}>
        <View style={styles.modal}>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Feather
              name="x-circle"
              color={'#000'}
              size={20}
              onPress={() =>{setPfModalVisible(false)}}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pfBal}
            keyExtractor={({item,index})=>index}
            renderItem={({ item,index }) => (
             <View>
                 <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Employee's</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Rs.{item.CB1_CB2}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Employer's</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Rs.{item.PFST_MUL_CB3}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>NetBalance</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Rs.
            </Text>
          </View>
              </View>
            )}
          />
        </View>
      </Modal>

      {/* tax saving modal close */}

      </TouchableOpacity>

      {/* Tax Saving */}

      <TouchableOpacity
        onPress={() => {
        setSevingModalVisible(true)
        }
        } style={styles.box}>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Tax Saving</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>
      <Modal
        backdropOpacity={0.1}
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={500}
        coverScreen={true}
        isVisible={savingModalVisible}>
        <View style={styles.modal}>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Feather
              name="x-circle"
              color={'#000'}
              size={20}
              onPress={() =>{setSevingModalVisible(false)}}
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Component</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Amount(Rs.)
            </Text>
          </View>
      
              <FlatList
                showsVerticalScrollIndicator={false}
                data={taxData}
                keyExtractor={({item,index})=>index}
                renderItem={({ item,index }) => (
                  <View style={styles.textContainer}>
                    <Text>{item.SALARY_HEAD}</Text>
                    <Text>{item.AMOUNT}</Text>
                  </View>
                )}
              />
        </View>
      </Modal>
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

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
  modal: {
    flex: 0.9,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.0,

    elevation: 5,
  },
  textContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 8.5,
  },
});

//make this component available to the app
export default Payroll;
