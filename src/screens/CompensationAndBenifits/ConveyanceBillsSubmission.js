import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import { GlobalColor } from '../../constants/Colors';
import Button from '../../components/reusable/Button';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import { showErrorMessage } from '../../Utils/Utils';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-simple-toast';



import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { GlobalFontSize } from '../../constants/FontSize';

const ConveyanceBillsSubmission = ({ navigation, route }) => {
    const fromRef = useRef(null);

    // let pageName = route.params.pageName
    // console.log("pagename", pageName);

    const [loader, setLoader] = useState(false)
    const [date, setDate] = useState(new Date());
    const [FuelType, setFuelType] = useState('');
    const [refresh, setrefresh] = useState(false);
    const [open, setOpen] = useState(false);
    // const [refresh, setrefresh] = useState(false);
    const { authContext, AppUserData } = useContext(AuthContext);
    const [Bill, setBill] = useState('')
    const [FuelValue, setFuelValue] = useState([]);



    const loginValidationSchema = yup.object().shape({
          BillNo: yup
          .string()
          .required('Bill No. is required'),
          BillDate: yup
          .string()
          .required('Bill Date is required'),
          BillAmount: yup
          .string()
          .required('Amount is required'),
          BillKMR: yup
          .string()
          .required('Mileage is required'),
          BillType: yup
          .string()
          .required('Fuel Type is required')
      });


    const GetConvElig = () => {
        let token = AppUserData.token
        let EmplID = AppUserData?.data?.userId
        console.log("this empid", EmplID)
        let apiData = {
            "UserName": EmplID
        }


        //Set Loader
        setLoader(true);
        ApiService.PostMethode('/reportCONV', apiData, token)
            .then(result => {
                console.log('reportCONV', result);
                setBill(result.Value)
                //stop Loader
                stopLoader();

            })
            .catch(error => {

                //stop Loader
                stopLoader();

                //Show Error Massage
                showErrorMessage(error)
            });
    };



    const FuelConvElig = () => {
        let token = AppUserData.token
        let EmplID = AppUserData?.data?.userId
        console.log("this empid", EmplID)
        let apiData = {

        }

        //Set Loader
        setLoader(true);

        ApiService.PostMethode('/getLovmConv', apiData, token)
            .then(result => {
                console.log('fuel data', result.Value);
                let FuelData = result.Value
                let FuelValue = []

                FuelData.map((data) => {
                    FuelValue.push({id: data.LOVM_VALUE_CODE, title: data.LOVM_VALUE_DESC})
                })
                console.log('FuelValue', FuelValue);
                setFuelValue(FuelValue)
                //stop Loader
                stopLoader();

            })
            .catch(error => {
                console.log(error)
                //stop Loader
                stopLoader();
                //Show Error Massage
                showErrorMessage(error)
            });
    };


    const SubmitConveyance = (values) => {
        Alert.alert(
            "Payroll",
            "Are you sure want to submit?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                let token = AppUserData.token
                let EmplID = AppUserData?.data?.userId
                let apiData = {
                    "UserName": EmplID,
                    ...values
                }

                apiData.BillDate = moment(apiData.BillDate).format('DD-MMM-YYYY')


                console.log(apiData);
                // return;

                
                //Set Loader
                setLoader(true);
                ApiService.PostMethode('/SubmitConveyBill', apiData, token)
                    .then(result => {    
                        stopLoader();
                        if(result.Result){                               
                        // console.log('submit data result', result.Result);
                            Toast.show(result.Result);
                            fromRef.current.resetForm();
                            GetConvElig();
                        }else{
                            Toast.show("Failed to submit try again");
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        //stop Loader
                        stopLoader();
                        //Show Error Massage
                        showErrorMessage(error)
                    });
              }}
        ])

    };

    useEffect(() => {
        GetConvElig()
        FuelConvElig()
    }, []);

    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);
    }



    return (
        <SafeAreaView  style={styles.container}>
            {loader == true ? (
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            ) : null}
            <Header title="Conveyance Bills Submission" />
            <ScrollView style={styles.container}>
            <Formik
                innerRef={fromRef}
                validationSchema={loginValidationSchema}
                initialValues={{ 
                    "BillNo": "",
                    "BillDate": "",
                    "BillAmount": "",
                    "BillKMR": "",
                    "BillType": ""
                }}
                onSubmit={values => {
                    SubmitConveyance(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  isValid,
                }) => (
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{
                            width: '100%',
                            // alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
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
                                <Text Bold>Bill No.</Text>
                                <View style={{ width:"60%" }}>
                                    <TextInput
                                     style={{ height: 35, borderBottomWidth: 0.5, borderColor: GlobalColor.LightDark, textAlign: "left", }}
                                     keyboardType={'numeric'}
                                     onChangeText={handleChange('BillNo')}
                                     onBlur={handleBlur('BillNo')}
                                     value={values.BillNo}
                                    />
                                    {errors.BillNo && touched.BillNo && (
                                        <View
                                            style={{
                                            paddingVertical: 2,
                                            }}>
                                            <Text style={styles.error}>
                                            {errors.BillNo}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>


                            <View style={[styles.box]}>
                                <Text Bold>Bill Date</Text>
                                <View style={{ width:"60%" }}>
                                    <DatePicker
                                        modal
                                        mode='date'
                                        open={open}
                                        date={date}
                                        onConfirm={date => {
                                            setOpen(false);
                                            setDate(date);
                                            setFieldValue("BillDate",date)
                                        }}
                                        onCancel={() => {
                                            setOpen(false);
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            backgroundColor: GlobalColor.White,
                                            borderWidth: 1,
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            padding: 6,
                                            alignSelf: 'center',
                                            borderColor: GlobalColor.Secondary
                                        }}
                                        onPress={() => (setOpen(true))}
                                    >
                                        <Text style={{ color: 'gray'}} Bold>
                                            {values.BillDate ? moment(values.BillDate).format('MMM Do YYYY'):null}
                                        </Text>
                                        <View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    // width: 65,
                                                    justifyContent: 'space-around',
                                                }}>
                                                <Ionicons
                                                    name="calendar-outline"
                                                    size={25}
                                                    color={GlobalColor.PrimaryGradient}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {errors.BillDate && touched.BillDate && (
                                    <View
                                        style={{
                                        paddingVertical: 2,
                                        }}>
                                        <Text style={styles.error}>
                                        {errors.BillDate}
                                        </Text>
                                        </View>
                                    )}
                                </View>
                            </View>


                            <View style={[styles.box, { paddingVertical: 5 }]}>
                                <Text Bold>Fuel Type</Text>
                                <View>
                                    <View style={{  borderWidth:1, borderColor:GlobalColor.Secondary }}>
                                        <SelectDropdown
                                            defaultButtonText='Fuel Type'
                                            dropdownIconPosition={'right'}
                                            data={FuelValue}
                                            onSelect={(selectedItem, index) => {
                                                setFuelType(selectedItem);
                                                setFieldValue("BillType", selectedItem.id);
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem.title
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item.title
                                            }}
                                            buttonStyle={styles.dropdown2BtnStyle}
                                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                            renderDropdownIcon={isOpened => {
                                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                            }}
                                            dropdownStyle={styles.dropdown2DropdownStyle}
                                            rowStyle={styles.dropdown2RowStyle}
                                            rowTextStyle={styles.dropdown2RowTxtStyle}
                                        />
                                    </View>       


                                {errors.BillType && touched.BillType && (
                                    <View
                                        style={{
                                        paddingVertical: 2,
                                        }}>
                                        <Text style={styles.error}>
                                        {errors.BillType}
                                        </Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            <View style={styles.box}>
                                <Text Bold>Mileage (Kms)</Text>
                                <View style={{ width:"60%"}}>
                                    <TextInput
                                     style={{  height: 35, borderBottomWidth: 0.5, borderColor: GlobalColor.LightDark, textAlign: "left", }}
                                        keyboardType={'numeric'}
                                        onChangeText={handleChange('BillKMR')}
                                        onBlur={handleBlur('BillKMR')}
                                        value={values.BillKMR}
                                        placeholder="Kms" />
                                {errors.BillKMR && touched.BillKMR && (
                                    <View
                                        style={{
                                        paddingVertical: 2,
                                        }}>
                                        <Text style={styles.error}>
                                        {errors.BillKMR}
                                        </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            
                            <View style={[styles.box, { borderBottomWidth: 0 }]}>
                                <Text Bold>Amount</Text>
                                <View style={{ width:"60%" }}>
                                    <TextInput 
                                    style={{ height: 35, borderBottomWidth: 0.5, borderColor: GlobalColor.LightDark, textAlign: "left", }}
                                    keyboardType={'numeric'}
                                    onChangeText={handleChange('BillAmount')}
                                    onBlur={handleBlur('BillAmount')}
                                    value={values.BillAmount}
                                    placeholder="Rs." />
                                    {errors.BillAmount && touched.BillAmount && (
                                    <View
                                        style={{
                                        paddingVertical: 2,
                                        }}>
                                        <Text style={styles.error}>
                                        {errors.BillAmount}
                                        </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={{  }}>
                            <Button onPress={() => {
                                // SubmitConveyance();
                                handleSubmit();
                            }} title="SUBMIT"></Button>
                            <Text style={{ textAlign: 'center' }}>Report</Text>
                        </View>
                    </View>
                )}
                </Formik>

                <View style={{ paddingHorizontal: 10 }}>
                    <View
                        style={styles.reportHeader}>
                        <Text Bold style={styles.textline}>Bill No</Text>
                        <Text Bold style={styles.textline}>Bill Date</Text>
                        <Text Bold style={styles.textline}>Amount (Rs.)</Text>
                    </View>
                    
                    {
                        Bill.length > 0 && Bill.map((item)=>{
                            return(
                                <View style={styles.reportHeaderBody}>
                                    <Text style={styles.textline}>{item.BILL_NO ?item.BILL_NO:'-'}</Text>
                                    <Text style={styles.textline}>{item.BILL_DATE ? item.BILL_DATE:'-'}</Text>
                                    <Text style={styles.textline}>{item.BILL_AMT ? item.BILL_AMT : '-'}</Text>
                                </View>
                            )
                        }) 
                    }                        
                </View>
            </ScrollView>
        </SafeAreaView >

    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        width: '100%',
        backgroundColor: GlobalColor.PrimaryLight,
    },
    box: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: GlobalColor.LightDark,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    reportHeader: {
        width: '100%',
        marginVertical: 7,
        backgroundColor: GlobalColor.White,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: GlobalColor.LightDark
    },

    reportHeaderBody:{
        width: '100%',
        backgroundColor: GlobalColor.White,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: GlobalColor.LightDark,
        marginTop:10
    },
    textline:{
        width:"33%"
    },
    reportData: {

    },
    dropdown2BtnStyle: {
        // width: "50%",
        height: 40,
        backgroundColor: '#FFF',
        marginLeft: 10,
    },
    dropdown2BtnTxtStyle: { textAlign: 'left', fontSize: 16 },
    dropdown2DropdownStyle: { backgroundColor: GlobalColor.White, color: GlobalColor.Secondary },
    dropdown2RowStyle: { backgroundColor: GlobalColor.White, borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: { textAlign: 'left', fontSize: 16 },
    error:{
        color:GlobalColor.Danger,
        fontSize:GlobalFontSize.Error
    }

})
export default ConveyanceBillsSubmission