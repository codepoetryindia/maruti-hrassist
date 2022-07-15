import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import { GlobalColor } from '../../constants/Colors';
import Button from '../../components/reusable/Button';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import { showErrorMessage } from '../../Utils/Utils';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';

const Plencashment = ({ navigation, route }) => {

  let pageName = route.params.pageName
  console.log("pagename", pageName);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const [encashment, setEncashment] = useState([]);
  const [lta, setLta] = useState([]);
  const [ltaReport, setLtaReport] = useState([]);
  const [encashDays, setEncashDays] = useState('');
  const [refresh, setrefresh] = useState(false);
  // const [refresh, setrefresh] = useState(false);

  const InitPLEncashmenApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apidata = {
      "UserName": userId
    }

    //set Loader
    setLoader(true);

    ApiService.PostMethode('/initPLEncashment', apidata, token)
      .then(result => {

        // Stop Loader
        stopLoader()

        let ApiValue = result.Value
        console.log("setEncashment", ApiValue);
        {
          ApiValue.map((item) => {
            return setEncashment(item)
          })
        }
        // setEncashment(ApiValue)
      })
      .catch(error => {

        // Stop Loader
        stopLoader()

        // console.log('Error occurred==>', error);

        //Show Error Massage
        showErrorMessage(error)
      });
  };


  const SubmitPLEncashmentApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apidata = {
      UserName: userId,
      Encashdays: encashDays
    }
    // console.log("SubmitPLEncashmentApiapidata", apidata);
    setLoader(true);
    ApiService.PostMethode('/SubmitPLEncashment', apidata, token)
      .then(result => {
        // console.log("SubmitPLEncashmentApi", result);

        // Stop Loader
        stopLoader()
        alert(result.Result)
        // createTwoButtonAlert(result.Result)

        // setResult(ApiValue)
      })
      .catch(error => {
        // Stop Loader
        stopLoader()

        // console.log('Error occurred==>', error);

        //Show Error Massage
        showErrorMessage(error)
      });
  };


  //   LTA ENCASHMENT API 

  const InitMEDEncashment = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apidata = {
      "UserName": userId
    }
    //Set Loader
    setLoader(true);
    ApiService.PostMethode('/InitMEDEncashment', apidata, token)
      .then(result => {

        // Stop Loader
        stopLoader()
        // console.log("InitMEDEncashment", ApiValue);
        let ApiValue = result.Value
        setLta(ApiValue)
      })
      .catch(error => {

        // Stop Loader
        stopLoader()

        // console.log('Error occurred==>', error);

        //Show Error Massage
        showErrorMessage(error)
      });
  };
  const ReportLTC = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apidata = {
      "StaffNo": userId
    }
    //set error
    setLoader(true);

    ApiService.PostMethode('/ReportLTC', apidata, token)
      .then(result => {
        // console.log("ReportLTC", result);

        // Stop Loader
        stopLoader()
        let ApiValue = result.Value
        setLtaReport(ApiValue)
      })
      .catch(error => {

        // Stop Loader
        stopLoader()

        // console.log('Error occurred==>', error);


        //Show Error Massage
        showErrorMessage(error)
      });
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Payroll",
      "Are You Sure want to",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {console.log("OK Pressed") }}
      ]
    );


  const AlertOccurred = (title, body, btnTxt) => {
    Alert.alert(title, body, [
      {
        text: btnTxt,
        onPress: () => {
          console.log(title);
        },
      },
    ]);
  };





  const SubmitMEDEncashmentApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apidata = {
      "UserName": userId
    }
    //set Loader

    // setLoader(false);

    // createTwoButtonAlert();

    ApiService.PostMethode('/SubmitMEDEncashment', apidata, token)
      .then(result => {
        // console.log("SubmitMEDEncashment", result);

        // Stop Loader
        stopLoader()


        let ApiValue = result.Result
        alert(ApiValue)
        createTwoButtonAlert(ApiValue)
      })
      .catch(error => {
        // Stop Loader
        stopLoader()
        console.log('Error occurred==>', error);

        //Show Error Massage
        showErrorMessage(error)
      });
  };

  const encashmentData = () => {
    console.log("kusckgvdskdfdykudf", encashDays)
    if (encashDays == '') {
      AlertOccurred('Payroll',"Please enter days",'ok')
      return
    }
    if (encashDays == 0) {
      AlertOccurred('Payroll', 'Please enter greater then zero', 'ok');
    }


    else {
      SubmitPLEncashmentApi()
      setEncashDays('')
    }
  }
  useEffect(() => {
    InitPLEncashmenApi()
    InitMEDEncashment()
    ReportLTC()
  }, [])

  if (loader) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={pageName} />
        <LoadingScreen />
      </SafeAreaView>
    )
  }

  const stopLoader = () => {
    setLoader(false);
    setrefresh(false);
  }


  return (

    <SafeAreaView >
      {loader == true ? (
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}

      <ScrollView style={styles.container}>

        <Header title={pageName} />

        {/* <LinearGradient
          style={{ padding: 20 }}
          colors={['#4174D0', '#6ef7ff']}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 40,
                alignItems: 'center',
              }}>
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={'white'}
                onPress={() => navigation.goBack()}
              />
              <Ionicons
                name="menu-outline"
                size={25}
                color={'white'}
                onPress={() => navigation.openDrawer()}
              />
            </View>

            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                letterSpacing: 1,
                marginLeft: 30,
              }}>
              {pageName}
            </Text>
          </View>
        </LinearGradient> */}

        <View style={{ paddingHorizontal: 10 }}>

          {pageName == 'PL Encashment' ? (
            <View >
              <View style={{
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 30,
                paddingVertical: 10,
                backgroundColor: GlobalColor.White,
                shadowColor: GlobalColor.Black,
                shadowOffset: {
                  width: -0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 5,
                borderRadius: 5,
                marginBottom: 10
              }}>
                <View style={styles.box}>
                  <Text>Current balance</Text>
                  <Text Bold>{encashment.PL_BAL && encashment.PL_BAL}</Text>
                </View>
                <View style={styles.box}>
                  <Text>Current year opening balance</Text>
                  <Text Bold>{encashment.PL_CR_FWD && encashment.PL_CR_FWD}</Text>
                </View>
                <View style={styles.box}>
                  <Text>PL encashable</Text>
                  <Text Bold>{encashment.PL_ENCASHABLE && encashment.PL_ENCASHABLE}</Text>
                </View>
                <View style={styles.box}>
                  <Text>Encash</Text>
                  <TextInput style={{ width: 50, borderBottomWidth: 1, fontWeight: 'bold',textAlign:"right" }}
                    keyboardType={'numeric'} onChangeText={(text) => { setEncashDays(text) }} value={encashDays} />
                </View>
              </View>
              <View style={{ height: 100, marginTop: 10 }}>

                <Button onPress={() => {
                  encashmentData()
                }} title="CLAIM"></Button>

                {/* <TouchableOpacity
               >
                <LinearGradient
                  style={{
                    padding: 20,
                    borderRadius: 8,
                    alignItems: 'center',
                    width: '100%',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}
                  colors={['#4174D0', '#6ef7ff']}>
                  <Text style={{ fontSize: 16, color: '#fff' }}>
                    CLAIM
                  </Text>
                </LinearGradient>
              </TouchableOpacity> */}


                <Text style={{ textAlign: 'center' }}>Report</Text>
              </View>
            </View>
          ) : <View>
            <View style={{
              // width: '100%',
              // alignSelf: 'center',
              // justifyContent: 'center',
              // marginTop: 30,
              // paddingVertical: 10,
              // borderRadius: 8,
              // backgroundColor: GlobalColor.White,
              // shadowColor:GlobalColor.Black,
              // shadowOffset: {
              //   width: -0,
              //   height: 1,
              // },
              // shadowOpacity: 0.22,
              // shadowRadius: 2.22,
              // elevation: 5,
              // borderRadius: 5,
              // marginBottom: 10
            }}>

              {lta.length > 0 ? (
                <View>
                  {lta && lta.map((item) => {
                    return (
                      <>

                        <View style={[styles.reportHeader, { marginTop: 15 }]}>
                          <Text>Financial Year</Text>
                          <Text Bold>{item.MENT_FNYR_YEAR}</Text>
                        </View>
                        <View style={[styles.reportHeader, { marginTop: 0 }]}>
                          <Text>Staff No</Text>
                          <Text Bold>{item.MENT_EMPL_ID}</Text>
                        </View>
                      </>

                    )
                  })}
                </View>
              ) : (
                <View>
                  <View style={styles.box}>
                    <Text>Financial Year</Text>
                    <Text>not Found</Text>
                  </View>
                  <View style={styles.box}>
                    <Text>Staff No</Text>
                    <Text>not Found</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={{ height: 100, marginTop: 10 }}>

              <Button onPress={() => {
                SubmitMEDEncashmentApi()
              }} title="ENCASH"></Button>


              {/* <TouchableOpacity onPress={() => {
              SubmitMEDEncashmentApi()
            }}>
              <LinearGradient
                style={{
                  padding: 20,
                  borderRadius: 8,
                  alignItems: 'center',
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
                colors={['#4174D0', '#6ef7ff']}>
                <Text style={{ fontSize: 16, color: '#fff' }}>
                  ENCASh
                </Text>
              </LinearGradient>
            </TouchableOpacity> */}


              <Text style={{ textAlign: 'center' }}>Report</Text>
            </View>
            <View
              style={styles.reportHeader}>
              <Text Bold>Name</Text>
              <Text Bold>Year</Text>
              <Text Bold>Desc</Text>
            </View>

            {
              ltaReport.length > 0 ? (
                <View>

                  {ltaReport && ltaReport.map((item) => {
                    return (
                      <TouchableOpacity style={[styles.reportHeader, {
                        borderWidth: 0, borderBottomWidth: 0, shadowColor: GlobalColor.Black,
                        shadowOffset: {
                          width: -0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 5,
                        borderRadius: 3
                      }]}>
                        <Text>{item.LTCF_FAML_NAME}</Text>
                        <Text>{item.LTCF_YEARS}</Text>
                        <Text>{item.RLTY_DESC}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              ) : (
                <ListEmptyComponent title="No Data Found"
                ></ListEmptyComponent>
                // <View style={{ width: '90%', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                //   <Text>Not Data Found</Text>
                // </View>
              )
            }


          </View>

          }
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: GlobalColor.PrimaryLight,
  },
  box: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

    borderWidth: 0,
    borderColor: GlobalColor.PrimaryGradient,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: GlobalColor.White,
    borderBottomWidth: 0,
    borderColor: GlobalColor.Secondary,
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderRadius: 3
  },
  reportData: {

  }

})
export default Plencashment