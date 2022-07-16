import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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



import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';

const ConveyanceBillsSubmission = ({ navigation, route }) => {

    // let pageName = route.params.pageName
    // console.log("pagename", pageName);

    const [loader, setLoader] = useState(false)
    const [encashment, setEncashment] = useState([]);

    const [encashDays, setEncashDays] = useState('');
    // const [encashDays, setEncashDays] = useState('');
    // const [encashDays, setEncashDays] = useState('');
    // const [encashDays, setEncashDays] = useState('');
    // const [encashDays, setEncashDays] = useState('');





    const [refresh, setrefresh] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    // const [refresh, setrefresh] = useState(false);
    const { authContext, AppUserData } = useContext(AuthContext);

    const [Bill, setBill] = useState('')
    const [Fuel, setFuel] = useState('')
    const [FuelValue, setFuelValue] = useState([])



    // const options = [{
    //     label: "PETROL",
    //     value: "PETROL"
    // }, {
    //     label: "CNG",
    //     value: "CNG"
    // },
    // {
    //     label: "DISEL",
    //     value: "DISEL"
    // }];


    const GetConvElig = () => {
        let token = AppUserData.token
        let EmplID = AppUserData.data.userId
        console.log("this empid", EmplID)
        let apiData = {
            "UserName": EmplID
        }

        //Set Loader
        setLoader(true);

        ApiService.PostMethode('/reportCONV', apiData, token)
            .then(result => {
                console.log('This setTaxSaving', result.Value[0]);

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
        let EmplID = AppUserData.data.userId
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
                    FuelValue.push(data.LOVM_VALUE_DESC)
                })
                console.log('FuelValue', FuelValue);
                setFuel(result.Value)
                setFuelValue(FuelValue)

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


    const SubmitConveyance = () => {
        let token = AppUserData.token
        let EmplID = AppUserData.data.userId
        console.log("this empid", EmplID)
        let apiData = {

            "UserName": EmplID,
            "BillNo": "",
            "BillDate": "01-APR-2022",
            "BillAmount": "1000",
            "BillKMR": "200",
            "BillType": "2"

        }

        //Set Loader
        setLoader(true);

        ApiService.PostMethode('/SubmitConveyBill', apiData, token)
            .then(result => {
                console.log('submit data result', result.Value);

                setFuel(result.Value)

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












    useEffect(() => {
        GetConvElig()
        FuelConvElig()
    }, [])


    if (loader) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title="Conveyance Bills Submission" />
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
            <Header title="Conveyance Bills Submission" />
            <ScrollView style={styles.container}>




                <View style={{ paddingHorizontal: 10 }}>

                    {/* {pageName == 'PL Encashment' ? ( */}
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
                                <Text Bold>Bill No.</Text>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <TextInput style={{ width: 200, height: 35, borderBottomWidth: 0.5, borderColor: GlobalColor.LightDark, textAlign: "left", }}
                                        keyboardType={'numeric'} onChangeText={(text) => { setEncashDays(text) }} value={encashDays} />
                                </View>
                            </View>
                            <View style={[styles.box,]}>
                                <Text Bold>Bill Date</Text>

                                <View style={{ width: "50%", }}>

                                    <DatePicker
                                        modal
                                        open={open}
                                        date={date}
                                        onConfirm={date => {
                                            setOpen(false);
                                            setDate(date);
                                            console.log(date);
                                        }}
                                        onCancel={() => {
                                            setOpen(false);
                                        }}
                                    />

                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            backgroundColor: GlobalColor.White,
                                            borderWidth: 0,
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            padding: 6,
                                            alignSelf: 'center',
                                            borderColor: GlobalColor.Secondary
                                        }}
                                        onPress={() => (setOpen(true))}
                                    >
                                        <Text style={{ color: 'gray', fontWeight: '800' }}>
                                            {moment(date).format('MMM Do YYYY')}
                                        </Text>
                                        {/* <Text style={{ color: 'gray' }}>
                                           {moment(selectTime).format('LT')}
                                          </Text> */}
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
                                </View>

                            </View>
                            <View style={[styles.box, { paddingVertical: 5 }]}>
                                <Text Bold>Fuel Type</Text>
                                {/* <SelectDropdown
                                    defaultButtonText='Fuel Type'

                                    // buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.label }}
                                    rowTextForSelection={(item, index) => {
                                        return item.label
                                    }}
                                    dropdownBackgroundColor={'transparent'}
                                    data={FuelValue}
                                    // onSelect={(selectedItem, index) => {
                                    //     // console.log(selectedItem, index);
                                    //     setFieldValue("persionalVehical", selectedItem.value);
                                    // }}
                                    buttonStyle={styles.dropdown2BtnStyle}
                                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.dropdown2DropdownStyle}
                                    rowStyle={styles.dropdown2RowStyle}
                                    rowTextStyle={styles.dropdown2RowTxtStyle}
                                /> */}


                                <SelectDropdown
                                    data={FuelValue}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </View>

                            <View style={styles.box}>
                                <Text Bold>Mileage (Kms)</Text>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <TextInput style={{ width: 200, height: 35, borderBottomWidth: 0.5, borderColor: GlobalColor.LightDark, textAlign: "left", }}
                                        keyboardType={'numeric'} onChangeText={(text) => { setEncashDays(text) }} value={encashDays} placeholder="Kms" />
                                </View>

                            </View>
                            <View style={[styles.box, { borderBottomWidth: 0 }]}>
                                <Text Bold>Amout</Text>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <TextInput style={{ width: 200, height: 35, borderBottomWidth: 0.5, borderColor: GlobalColor.LightDark, textAlign: "left", }}
                                        keyboardType={'numeric'} onChangeText={(text) => { setEncashDays(text) }} value={encashDays} placeholder="Kms" />
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 100, marginTop: 10 }}>

                            <Button onPress={() => {
                                SubmitConveyance();

                            }} title="SUBMIT"></Button>
                            <Text style={{ textAlign: 'center' }}>Report</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 10 }}>

                    <View
                        style={styles.reportHeader}>
                        <Text Bold>Bill No</Text>
                        <Text Bold>Bill Date</Text>
                        <Text Bold>Amount (Rs.)</Text>
                    </View>



                    <FlatList
                        data={Bill}
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
                            // console.log("ITEN", item)
                            <View style={styles.reportHeader}>
                                <Text>{item.BILL_NO}</Text>
                                <Text>{item.BILL_DATE}</Text>
                                <Text>{item.BILL_AMT}</Text>
                            </View>
                        )}

                    />






                    {/* {
                        Bill.length > 0 ? (
                            <View>

                                {Bill && Bill.map((item) => {
                                    console.log(item,"kudfdghf")
                                    return (
                                        <TouchableOpacity style={styles.reportHeader}>
                                            <Text>item.BILL_AMT</Text>
                                            <Text>Year</Text>
                                            <Text>Amount (Rs.)</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        ) : (
                            <ListEmptyComponent title="No Data Found"
                            ></ListEmptyComponent>
                            //  <View style={{ width: '90%', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            //    <Text>Not Data Found</Text>
                            //  </View>
                        )
                    } */}

                </View>



            </ScrollView>
        </SafeAreaView >

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
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: "center",

        borderBottomWidth: 0.5,
        borderColor: GlobalColor.LightDark,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    reportHeader: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 7,
        backgroundColor: GlobalColor.White,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: GlobalColor.LightDark



    },
    reportData: {

    },
    dropdown2BtnStyle: {
        width: "40%",
        height: 40,
        backgroundColor: '#FFF',
        marginLeft: 10,



    },
    dropdown2BtnTxtStyle: { textAlign: 'left', fontSize: 16 },
    dropdown2DropdownStyle: { backgroundColor: GlobalColor.White, color: GlobalColor.Secondary },
    dropdown2RowStyle: { backgroundColor: GlobalColor.White, borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: { textAlign: 'left', fontSize: 16 },


})
export default ConveyanceBillsSubmission