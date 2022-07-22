//import liraries
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
// import BillIcon from '../../assets/Images/compensation and benefits/bill.png'
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
import { showErrorMessage } from '../../Utils/Utils';

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
  const [refresh, setrefresh] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [taxModalVisible, setTaxModalVisible] = useState(false);
  const [pfModalVisible, setPfModalVisible] = useState(false);
  const [savingModalVisible, setSevingModalVisible] = useState(false);

  const stopLoader = () => {
      setLoader(false);
      setrefresh(false);
  }

  // // tax Saving Api
  // const GetTaxAppApi = async () => {
  //   setLoader(true);
  //   try {
  //     //Get Data
  //     let result = await ApiService.PostMethode('/GetTaxApp', {
  //       "UserName": AppUserData?.data?.userId
  //     }, AppUserData.token)

  //     // Stop Loader
  //     stopLoader()

  //     //Set Data
  //     setTaxData(result.Value)
  //   }
  //   catch (error) {
  //     //Stop Loader
  //     stopLoader()
  //     //Show Error Massage
  //     showErrorMessage(error)
  //   }
  // };


  //   // financial year Api
  const GetMonth = () => {
    let token = AppUserData.token
    let EmplID = AppUserData?.data?.userId
    let apiData = {
      "EmplID": EmplID
    }
    setLoader(true);
    ApiService.PostMethode('/GetSalaryMonth', apiData, token)
      .then(result => {
        stopLoader()
        console.log('GetSalaryMonth', result);
        let responseData = result.Value[0].SHIS_YYMM_CODE
        console.log('GetMonth', responseData)
        setMonth(responseData)

      })
      .catch(error => {
        stopLoader()
        //Show Error Massage
        showErrorMessage(error)
      });
  };

  // // // Pf Balance Api 
  // const PfBalance = async () => {
  //   //set Loader
  //   setLoader(true);

  //   try {

  //     //get Api Data
  //     let result = await ApiService.PostMethode('/GetPFStatement', {
  //       "EmplID": AppUserData?.data?.userId,
  //       "FNYR": month
  //     }, AppUserData.token)

  //     //stop Loader
  //     stopLoader()

  //     //Set Data
  //     let CB1_CB2 = result.Value.Table1[0].CB1_CB2
  //     let PFST_MUL_CB3 = result.Value.Table2[0].PFST_MUL_CB3
  //     let NetBalance = CB1_CB2 + PFST_MUL_CB3
  //     setEmployeePf(CB1_CB2)
  //     setEmployerPf(PFST_MUL_CB3)
  //     setNetBalance(NetBalance)

  //   } catch (error) {
  //     //stop Loader
  //     stopLoader()
  //     //Show Error Massage
  //     showErrorMessage(error)
  //   }
  // };

  // const GetTaxSavings = async () => {

  //   //Set Loader
  //   setLoader(true);

  //   try {
  //     //getting Data
  //     let result = await ApiService.PostMethode('/GetTaxSavings', {
  //       "EmplID": AppUserData?.data?.userId,
  //       "FNYR": month,
  //     }, AppUserData.token)

  //     //remove loader
  //     stopLoader()

  //     //set Data
  //     setTaxSaving(result?.Value?.Table2)
  //   } catch (error) {

  //     //remove loader
  //     stopLoader()

  //     //Show Error Massage
  //     showErrorMessage(error)
  //   }
  // };

  useEffect(() => {
    GetMonth()
  }, [])


  if (loader) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingScreen />
      </SafeAreaView>
    )
  }

  return (

    <SafeAreaView style={styles.container}>

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
              style={{ width: 30, height: 30 }} />
          </View>
        </View>
        <View style={styles.item}>
          <Text Bold>Salary Slip</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      {/* Tax  */}

      <TouchableOpacity onPress={() => {
        myNavigation.navigate('TaxComputationSlip')
        // setTaxModalVisible(true)
        // GetTaxAppApi();
      }}>
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
                style={{ width: 30, height: 30 }} />
            </View>
          </View>
          <View style={styles.item}>
            <Text Bold>Tax Computation Slip</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </View>


        {/* <Modal
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
                color={GlobalColor.Black}
                size={20}
                onPress={() =>
                  setTaxModalVisible(false)}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            
            {taxData.length > 0 ? (
              <>
              <View style={styles.textContainer}>
              <Text Bold>Component</Text>
              <Text Bold>Amount (Rs.)</Text>
            </View>

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
              />
              </>)

              : (<ListEmptyComponent title="No Data Found"  ></ListEmptyComponent>)}

          </View>
        </Modal> */}
      </TouchableOpacity>

      {/* PF */}

      <TouchableOpacity
        onPress={() => {
          myNavigation.navigate('PFBalance')
          // setPfModalVisible(true)
          // PfBalance();
        }}>
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
                style={{ width: 30, height: 30 }} />
            </View>
          </View>
          <View style={styles.item}>
            <Text Bold>PF Balance </Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </View>

        {/* Pf saving modal */}
{/* 
        <Modal
          backdropOpacity={0.5}
          animationInTiming={300}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationOutTiming={500}
          coverScreen={true}
          isVisible={pfModalVisible}>
          <View style={[styles.modal, { flex: 0.3 }]}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Feather
                name="x-circle"
                color={GlobalColor.Black}
                size={20}
                onPress={() => { setPfModalVisible(false) }}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
            <View>
              <View style={styles.textContainer}>
                <Text >Employee's</Text>
                <Text Bold>
                  Rs.{employeePf}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text >Employer's</Text>
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
            </View> */}


            {/* )}
          /> */}
          {/* </View>
        </Modal> */}

        {/* tax saving modal close */}

      </TouchableOpacity>

      {/* Tax Saving */}

      <TouchableOpacity
        onPress={() => {
          myNavigation.navigate('TaxSavings')
          // setSevingModalVisible(true)
          // GetTaxSavings();
        }
        } style={styles.box}>
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
              style={{ width: 30, height: 30 }} />
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
        <View style={[styles.modal, { flex: 0.5 }]}>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Feather
              name="x-circle"
              color={GlobalColor.Black}
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
    backgroundColor: GlobalColor.White,
    shadowColor: GlobalColor.Black,
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
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: GlobalColor.White,
    borderRadius: 3,
    shadowColor: GlobalColor.Black,
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
