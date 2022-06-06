//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay/lib';


const SalarySlip = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [month, setMonth] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [defaultDate, setDefaultDate] = useState('');
    const [loader, setLoader] = useState(false)
    const [table1Data, setTable1Data] = useState('')
    const [table2Data, setTable2Data] = useState('')
    const [table3Data, setTable3Data] = useState('')
    const [table4Data, setTable4Data] = useState('')
    const [salaryType, setSalaryType = useState] = useState()
    const { authContext, AppUserData } = useContext(AuthContext);

    const GetMonth = () => {
        let token = AppUserData.token
        let EmplID = AppUserData.data.userId
        let apiData = {
            EmplID: EmplID
        }
        setLoader(true);
        ApiService.PostMethode('/GetSalaryMonth', apiData, token)
            .then(result => {
                console.log('GetSalaryMonth', result);
                setLoader(false);
                let responseData = result.Value
                let defaultDate = result.Value[0].SHIS_YYMM_CODE
                console.log('defaultDate', defaultDate);
                setDefaultDate(defaultDate);
                setMonth(responseData);
                GetSalaryTypeApi(defaultDate)
                GetSalaryData(defaultDate)
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


    const GetSalaryTypeApi = (data) => {
        let token = AppUserData.token
        let EmplID = AppUserData.data.userId
        let apiData = {
            "SalaryMonth": data,
            "EmplID": EmplID,
        }
        console.log("SalaryMonth", apiData)
        setLoader(true);
        ApiService.PostMethode('/GetSalaryType', apiData, token)
            .then(result => {
                setLoader(false);
                console.log('GetSalaryType', result);
                let responseData = result.Value
                setSalaryType(responseData)
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
    const GetSalaryData = (data) => {
        let token = AppUserData.token
        let EmplID = AppUserData.data.userId
        let apiData = {
            "EmplID": EmplID,
            "SalaryMonth": data,
            "SalType": "0"

        }
        console.log("GetSalaryData", apiData)
        setLoader(true);
        ApiService.PostMethode('/GetSalaryData', apiData, token)
            .then(result => {
                setLoader(false);
                let responseData = result.Value.Table1
                let responseData2 = result.Value.Table2
                let responseData3 = result.Value.Table3
                let responseData4 = result.Value.Table4
                setTable1Data(responseData)
                setTable2Data(responseData2)
                setTable3Data(responseData3)
                setTable4Data(responseData4)
                console.log('GetSalaryData', responseData2);
                console.log('GetSalaryData3', responseData3,);
                console.log('GetSalaryData4', responseData4,);
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
        GetSalaryData()
        GetSalaryTypeApi()
    }, [])
    console.log("month data", month);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (

        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            {loader == true ? (
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            ) : null}

            <LinearGradient
                colors={['#4174D0', '#6ef7ff']}
                style={styles.gradient}>
                <View style={styles.container}>
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
                        Salary Slip
                    </Text>
                </View>
            </LinearGradient>

            <TouchableOpacity
                style={styles.Salary}
                onPress={() => {
                    // GetSalaryTypeApi()
                    toggleModal()
                    console.log(month)
                }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {defaultDate}
                    </Text>
                    <Feather name="corner-up-right" size={20} />
                </View>
            </TouchableOpacity>

            {/* salary month modal */}

            <Modal
                backdropOpacity={0.1}
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
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={month}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/Images/dataNotFound.png')}
                                        style={{ width: 300, height: 300, resizeMode: 'contain', }} />
                                    <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                                </View>
                            )
                        }}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(item.SHIS_YYMM_CODE)
                                    setDefaultDate(item.SHIS_YYMM_CODE)
                                    GetSalaryTypeApi(item.SHIS_YYMM_CODE)
                                    GetSalaryData(item.SHIS_YYMM_CODE)
                                    toggleModal()
                                }}
                                style={styles.textContainer}>
                                <Text>{item.SHIS_YYMM_CODE}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.Salary}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                    }}>
                    {salaryType && salaryType.map((item) => {
                        return (
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {item.PYDT_DESCRIPTION}
                            </Text>
                        )
                    })}
                    <Feather name="corner-up-right" size={20} />
                </View>
            </TouchableOpacity>

            <ScrollView>
                {/* Table */}
                <View style={[styles.Table,{alignSelf:'center'}]}>
                    <View style={styles.tableRow}>
                        <Text>Pay Element</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text>Earnings</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text>Deduction</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text>Remarks</Text>
                    </View>


                </View>
                {table1Data.length > 0 ? (
                    <FlatList
                        data={table1Data}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.Table}>
                                    <View style={styles.tableRow}>
                                        <Text>{item.MDESC}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text>{item.EARNING}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text>{item.DED}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text>{item.SHIS_REMARKS}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                ) : null}

                <View style={[styles.Table,{}]}>
                    <View style={styles.tableRow}>
                        <Text>Earnings</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text>Deduction</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text>Total</Text>
                    </View>
                </View>
                {table4Data.length > 0 ? (
                    <FlatList
                        data={table4Data}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.Table,{alignSelf:'center',}]}>
                                    <View style={styles.tableRow}>
                                        <Text>{item.EARNING}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text>{item.DED}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text>{item.NET}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                ) : null}
                <View style={{alignItems:'flex-start',margin:15,}}>
                    <Text>General Message</Text>
                </View>
                {table2Data.length > 0 ? (
                    <FlatList
                        data={table2Data}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.Table, { flexDirection: 'column' }]}>
                                    <Text>{item.GLMS_MESSAGES}</Text>
                                   
                                </View>
                            )
                        }} />
                ) : null}
                <View style={styles.Table}>
                    <Text>Employee Message</Text>
                </View>
                {table3Data.length > 0 ? (
                    <FlatList
                        data={table3Data}
                        keyExtractor={({ item, index }) => index}
                        renderItem={({ item, index }) => {
                           
                            return (
                                <View style={[styles.Table, { flexDirection: 'column' }]}>
                                    <Text style = {{color:'#000'}}>{item.EXMS_MESSAGES}</Text>
                                   
                                </View>
                            )
                        }} />
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    gradient: {
        padding: 20,
    },
    container: {
        flexDirection: 'row',
    },
    modal: {
        paddingVertical: 15,
        height: '100%',
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
    Salary: {
        top: 10,
        marginVertical: 10,
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
        borderRadius: 8
    },
    textContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: 8.5,
        borderBottomWidth: 1,
        borderBottomColor: '#4174D0'
    },
    Table: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
        borderBottomWidth: 0.5,
        marginTop: 30
    },
    tableRow: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        alignSelf:'center'
    }
});

// //make this component available to the app
export default SalarySlip;
