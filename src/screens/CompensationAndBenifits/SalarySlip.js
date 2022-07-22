//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
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
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import { GlobalColor } from '../../constants/Colors';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { showErrorMessage } from '../../Utils/Utils';
import { GlobalFontSize } from '../../constants/FontSize';

const SalarySlip = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [month, setMonth] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [defaultDate, setDefaultDate] = useState('Select Month');
    const [loader, setLoader] = useState(false)
    const [table1Data, setTable1Data] = useState('')
    const [table2Data, setTable2Data] = useState('')
    const [table3Data, setTable3Data] = useState('')
    const [table4Data, setTable4Data] = useState('')
    const [salaryType, setSalaryType = useState] = useState('')
    const { authContext, AppUserData } = useContext(AuthContext);
    const [refresh, setrefresh] = useState(false);




    const GetMonth = () => {
        let token = AppUserData.token
        let EmplID = AppUserData?.data?.userId
        let apiData = {
            EmplID: EmplID
        }
        //set loader
        setLoader(true);
        ApiService.PostMethode('/GetSalaryMonth', apiData, token)
            .then(result => {
                console.log('GetSalaryMonth', result);

                // Stop Loader
                stopLoader()

                let responseData = result.Value
                let defaultDate = result.Value[0].SHIS_YYMM_CODE
                console.log('defaultDate', defaultDate);
                setDefaultDate(defaultDate);
                setMonth(responseData);
                GetSalaryTypeApi(defaultDate)
                GetSalaryData(defaultDate)
            })
            .catch(error => {

                // Stop Loader
                stopLoader()

                // console.log('Error occurred==>', error);

                //Show Error Massage
                showErrorMessage(error)
            });
    };


    const GetSalaryTypeApi = (data) => {
        let token = AppUserData.token
        let EmplID = AppUserData?.data?.userId
        let apiData = {
            "SalaryMonth": data,
            "EmplID": EmplID,
        }
        console.log("SalaryMonth", apiData)
        //set Loader
        setLoader(true);
        ApiService.PostMethode('/GetSalaryType', apiData, token)
            .then(result => {

                // Stop Loader
                stopLoader()

                console.log('GetSalaryType', result);
                let responseData = result.Value
                setSalaryType(responseData)
            })
            .catch(error => {

                // Stop Loader
                stopLoader()

                // console.log('Error occurred==>', error);

                //Show Error Massage
                showErrorMessage(error)
            });
    };
    const GetSalaryData = (data) => {
        let token = AppUserData.token
        let EmplID = AppUserData?.data?.userId
        let apiData = {
            "EmplID": EmplID,
            "SalaryMonth": data,
            "SalType": "0"

        }
        console.log("GetSalaryData", apiData)

        //set Loader
        setLoader(true);

        ApiService.PostMethode('/GetSalaryData', apiData, token)
            .then(result => {
                // Stop Loader
                stopLoader()
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
                // Stop Loader
                stopLoader()
                // console.log('Error occurred==>', error);

                //Show Error Massage
                showErrorMessage(error)
            });
    };

    useEffect(() => {
        GetMonth()
        GetSalaryData()
        GetSalaryTypeApi()
        console.log("first massage", table3Data)
    }, [])
    console.log("month data", month);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };



    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);
    }

    if (loader) {
        return (
            <SafeAreaView style={styles.containerLoading}>
                <Header title="Salary Slip" />
                <LoadingScreen />
            </SafeAreaView>
        )
    }




    return (

        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: GlobalColor.PrimaryLight }}>
            {loader == true ? (
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            ) : null}


            <Header title="Salary Slip" />

            {/* <LinearGradient
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
            </LinearGradient> */}

            <View style={{ flex: 1, paddingHorizontal: 10, marginVertical: 10, }}>

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
                        <Text >
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
                                color={GlobalColor.Black}
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
                                    <ListEmptyComponent title="No Data Found"
                                    // enableRefresh={true}
                                    // onRefreshCallback={()=>GetShutlPastFutrReportApi(true)} refreshing={refresh}
                                    ></ListEmptyComponent>
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
                                    <Text style={{ paddingVertical: 5, paddingHorizontal: 8, color: "#000", fontSize: GlobalFontSize.P }}>{item.SHIS_YYMM_CODE}</Text>
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
                        {salaryType == '' ? (
                            <Text >
                                Select Type
                            </Text>
                        ) : (

                            salaryType && salaryType.map((item) => {
                                return (
                                    <Text >
                                        {item.PYDT_DESCRIPTION}
                                    </Text>
                                )
                            })

                        )}
                        <Feather name="corner-up-right" size={20} />
                    </View>
                </TouchableOpacity>


                
                <ScrollView style={{ backgroundColor: GlobalColor.White, marginVertical: 10, }} >
                    {/* Table */}

                    {table1Data.length > 0 ? (
                        <>
                            <View style={[styles.Table, {}]}>
                                <View style={styles.tableRow}>
                                    <Text Bold>Pay Element</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text Bold>Earnings</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text Bold>Deduction</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text Bold>Remarks</Text>
                                </View>
                            </View>
                            <FlatList
                                data={table1Data}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.Table}>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black, fontSize: GlobalFontSize.P - 2 }}>{item.MDESC}</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black, fontSize: GlobalFontSize.P - 2 }}>{item.EARNING}</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black, fontSize: GlobalFontSize.P - 2 }}>{item.DED}</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black, fontSize: GlobalFontSize.P - 2 }}>{item.SHIS_REMARKS}</Text>
                                            </View>
                                        </View>
                                    )
                                }} />
                        </>
                    ) : null}


                    {table4Data.length > 0 ? (
                        <>
                            <View style={[styles.Table, {}]}>
                                <View style={styles.tableRow}>
                                    <Text Bold>Earnings</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text Bold>Deduction</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text Bold>Total</Text>
                                </View>
                            </View>
                            <FlatList
                                data={table4Data}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={[styles.Table, { alignSelf: 'center', }]}>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black }}>{item.EARNING}</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black }}>{item.DED}</Text>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <Text style={{ color: GlobalColor.Black }}>{item.NET}</Text>
                                            </View>
                                        </View>
                                    )
                                }} />
                        </>
                    ) : null}

                    {table2Data.length > 0 ? (
                        <>
                            <View style={styles.Table}>

                                <Text Bold>General Message</Text>
                            </View>
                            <FlatList
                                data={table2Data}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={[styles.Table, { flexDirection: 'column' }]}>
                                            <Text style={{ color: GlobalColor.Black }}>{item.GLMS_MESSAGES}</Text>

                                        </View>
                                    )
                                }} />
                        </>
                    ) : null}

                    {table3Data.length > 0 ? (
                        <><View style={[styles.Table,]}>
                            <Text Bold >Employee Message</Text>
                        </View>

                            <FlatList
                                data={table3Data}
                                keyExtractor={({ item, index }) => index}
                                renderItem={({ item, index }) => {

                                    return (
                                        <View style={[styles.Table, { flexDirection: 'column' }]}>
                                            <Text style={{ color: GlobalColor.Black }}>{item.EXMS_MESSAGES}</Text>

                                        </View>
                                    )

                                }} />
                        </>
                    ) : null}
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    gradient: {
        padding: 20,
    },
    containerLoading: {
        flex: 1,
        width: '100%', height: '100%',
        backgroundColor: GlobalColor.PrimaryLight
    },
    container: {
        flexDirection: 'row',

    },
    modal: {
        paddingVertical: 15,
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: GlobalColor.White,
        borderRadius: 5,
        shadowColor: GlobalColor.Black,
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
        width: '100%',
        backgroundColor: GlobalColor.White,
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
    textContainer: {
        width: '100%',
        padding: 5,
        backgroundColor: GlobalColor.White,
        alignSelf: 'center',
        // marginVertical: 8.5,
        // shadowColor: GlobalColor.Black,
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.18,
        // shadowRadius: 3.0,
        // elevation: 5,
        // borderRadius:3,
        // paddingVertical: 10,
        // paddingHorizontal: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderColor: GlobalColor.LightDark
    },
    Table: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        borderBottomWidth: 0.5,
        borderColor: GlobalColor.Secondary,
        marginTop: 30
    },
    tableRow: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        alignSelf: 'center'
    }
});

// //make this component available to the app
export default SalarySlip;
