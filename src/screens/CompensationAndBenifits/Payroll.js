//import liraries
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList,SafeAreaView } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import BillIcon from '../../assets/Images/compensation and benefits/bill.png'
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Text from '../../components/reusable/Text';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import { GlobalColor } from '../../constants/Colors';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';

// create a component
const Payroll = () => {
  const myNavigation = useNavigation();

  const [loader, setLoader] = useState(false)
  const [taxData, setTaxData] = useState([]);
  const [taxSaving, setTaxSaving] = useState();
  const [month, setMonth] = useState();
  const [employeePf, setEmployeePf] = useState();
  const [employerPf, setEmployerPf] = useState();
  const [netBalance, setNetBalance] = useState();
  const { authContext, AppUserData } = useContext(AuthContext);

  // tax Saving Api
  const GetTaxAppApi = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data.userId
    let apiData = {
      "UserName": EmplID
    }
    // if (EmplID == null) {
    //   return alert("employee id not found")
    // }
    setLoader(true);
    ApiService.PostMethode('/GetTaxApp', apiData, token)
      .then(result => {
        setLoader(false);
        console.log('GetTaxAppApiResult', result);
        let responseData = result.Value
        setTaxData(responseData)
        console.log('GetTaxApp', responseData)
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


  //   // financial year Api
  const GetMonth = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data.userId
    let apiData = {
     "EmplID": EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/GetSalaryMonth', apiData, token)
      .then(result => {
        setLoader(false);
        console.log('GetSalaryMonth', result);
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

  // // Pf Balance Api 
  const PfBalance = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data.userId
    let apiData = {
      "EmplID": EmplID,
      "FNYR": month
    }
    setLoader(true);
    ApiService.PostMethode('/GetPFStatement', apiData, token)
      .then(result => {
        setLoader(false);
        let responseData = result.Value
        let CB1_CB2 = responseData.Table1[0].CB1_CB2
        let PFST_MUL_CB3 = responseData.Table2[0].PFST_MUL_CB3
        let NetBalance = CB1_CB2 + PFST_MUL_CB3
        console.log('CB1_CB2', CB1_CB2)
        console.log('PFST_MUL_CB3', PFST_MUL_CB3)
        console.log('NetBalance', NetBalance)
        setEmployeePf(CB1_CB2)
        setEmployerPf(PFST_MUL_CB3)
        setNetBalance(NetBalance)
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
  const GetTaxSavings = () => {
    let token = AppUserData.token
    let EmplID = AppUserData.data.userId
    let apiData = {
      "EmplID": EmplID,
      "FNYR": month,
      // SAVG_DESC
    }
    setLoader(true);
    ApiService.PostMethode('/GetTaxSavings', apiData, token)
      .then(result => {
        console.log('setTaxSaving', result);
        setLoader(false);
        let responseData = result.Value.Table2
        console.log('responseData', responseData)
        setTaxSaving(responseData)
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
    // GetTaxAppApi()
    GetMonth()
    // PfBalance()
    // GetSalaryType()
  }, [])


  //   end >Tax Computation Slip

  const [isModalVisible, setModalVisible] = useState(false);
  const [taxModalVisible, setTaxModalVisible] = useState(false);
  const [pfModalVisible, setPfModalVisible] = useState(false);
  const [savingModalVisible, setSevingModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  if(loader){
    return(
      <SafeAreaView style={styles.container}>     
        <LoadingScreen/>
      </SafeAreaView>
    )
  }

  return (
  
      <SafeAreaView style={styles.container}>



        {loader == true ? (
                <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
              ):null }


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
                borderColor: GlobalColor.Secondary,
                justifyContent: 'center',
                alignItems: 'center',
         
              }}>
              <Image 
              source={require('../../assets/Images/bill.png')}
              style={{width: 30, height: 30}} />
            </View>
          </View>
          <View style={styles.item}>
            <Text Bold>Salary Slip</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </TouchableOpacity>

        {/* Tax  */}

        <TouchableOpacity onPress={() => {
          setTaxModalVisible(true)
          GetTaxAppApi();
        }}>
           {loader == true ? (
                <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
              ):null }
          <View style={styles.box}>
            <View style={styles.iconBox}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: GlobalColor.Secondary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                 <Image 
              source={require('../../assets/Images/bill.png')}
              style={{width: 30, height: 30}} />
              </View>
            </View>
            <View style={styles.item}>
              <Text Bold>Tax Computation Slip</Text>
              <Feather name="corner-up-right" size={20} />
            </View>
          </View>


          <Modal
            backdropOpacity={0.5}
            animationInTiming={300}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationOutTiming={500}
            coverScreen={true}
            isVisible={taxModalVisible}>
            <View style={styles.modal}>
              <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                <Feather
                  name="x-circle"
                  color={'#000'}
                  size={20}
                  onPress={() =>
                    setTaxModalVisible(false)}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text Bold>Component</Text>
                <Text Bold>Amount (Rs.)</Text>
              </View>
              {taxData.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={taxData}
                  ListEmptyComponent={() => {
                    return (
                      <ListEmptyComponent title="No Data Found" 
                      // enableRefresh={true}
                      // onRefreshCallback={()=>GetShutlPastFutrReportApi(true)} refreshing={refresh}
                        ></ListEmptyComponent>
                    )
                  }}
                  keyExtractor={({ item, index }) => index}
                  renderItem={({ item, index }) => (
                    <View style={styles.textContainer}>
                      <Text>{item.SALARY_HEAD}</Text>
                      <Text>{item.AMOUNT}</Text>
                    </View>
                  )}
                />)

                : (<ListEmptyComponent title="No Data Found"  ></ListEmptyComponent>)}

            </View>
          </Modal>
        </TouchableOpacity>

        {/* PF */}

        <TouchableOpacity
          onPress={() => {
            setPfModalVisible(true)
            PfBalance();
          }}>
            {loader == true ? (
                <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
              ):null }
          <View style={styles.box}>
            <View style={styles.iconBox}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: GlobalColor.Secondary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                 <Image 
              source={require('../../assets/Images/bill.png')}
              style={{width: 30, height: 30}} />
              </View>
            </View>
            <View style={styles.item}>
              <Text Bold>PF Balance </Text>
              <Feather name="corner-up-right" size={20} />
            </View>
          </View>

          {/* Pf saving modal */}

          <Modal
            backdropOpacity={0.5}
            animationInTiming={300}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationOutTiming={500}
            coverScreen={true}
            isVisible={pfModalVisible}>
            <View style={[styles.modal,{flex:0.3}]}>
              <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                <Feather
                  name="x-circle"
                  color={'#000'}
                  size={20}
                  onPress={() => { setPfModalVisible(false) }}
                  style={{ margin: 10 }}
                />
              </TouchableOpacity>
              <View>
                <View style={styles.textContainer}>
                  <Text Bold>Employee's</Text>
                  <Text Bold>
                    Rs.{employeePf}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text Bold>Employer's</Text>
                  <Text Bold>
                    Rs.{employerPf}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text Bold>Net Balance</Text>
                  <Text Bold>
                    Rs.{netBalance}
                  </Text>
                </View>
              </View>
              {/* )}
          /> */}
            </View>
          </Modal>

          {/* tax saving modal close */}

        </TouchableOpacity>

        {/* Tax Saving */}

        <TouchableOpacity
          onPress={() => {
            setSevingModalVisible(true)
            GetTaxSavings();
          }
          } style={styles.box}>
            {loader == true ? (
                <Spinner
            visible={loader}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
              ):null }
          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: GlobalColor.Secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
               <Image 
              source={require('../../assets/Images/bill.png')}
              style={{width: 30, height: 30}} />
            </View>
          </View>
          <View style={styles.item}>
            <Text Bold>Tax Savings</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </TouchableOpacity>
        <Modal
          backdropOpacity={0.5}
          coverScreen={true}
          isVisible={savingModalVisible}>
          <View style={[styles.modal,{flex:0.5}]}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Feather
                name="x-circle"
                color={'#000'}
                size={20}
                onPress={() => { setSevingModalVisible(false) }}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text Bold>Description</Text>
              <Text Bold>
                Amount (Rs.)
              </Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={taxSaving}
              ListEmptyComponent={() => {
                return (
                  <ListEmptyComponent title="No Data Found"  
                   ></ListEmptyComponent>
                )
              }}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <View style={styles.textContainer}>
                  <View style={{ width: '50%' }}><Text>{item.SAVG_DESC}</Text></View>
                  <Text>{item.SVDT_AMT}</Text>
                  {/* <View style={{width:'50%',justifyContent:'flex-end'}}>></View> */}
                </View>
              )}
            />
          </View>
        </Modal>
      </SafeAreaView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,
    paddingHorizontal:10,
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
  modal: {
    flex: 0.9,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 3,
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
