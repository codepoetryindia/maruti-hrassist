// /import liraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import Toast from 'react-native-simple-toast'
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../../../constants/Colors';
import Text from '../../../components/reusable/Text';
import TextInput from '../../../components/reusable/TextInput';
import { Header } from '../../../components/reusable/Header';
import Button from '../../../components/reusable/Button';



const ManagerTaxiApproval = ({ navigation }) => {
    const { authContext, AppUserData } = useContext(AuthContext)
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalVisibleSecond, setmodalVisibleSecond] = useState(false);
    const [empLoc, setEmpLoc] = useState([]);
    const [empLocCode, setEmpLocCode] = useState([]);
    const [searchLevel] = useState();
    const [searchLevelData, setSearchLevelData] = useState([])
    const [loader, setLoader] = useState(false)

    const [selectBuilding, setSelectBuilding] = useState([]);
    const [BuildingData, setBuildingData] = useState([]);
    const [removeBuilding, setRemoveBuilding] = useState()
    const [selectTime, setselectTime] = useState();
    const [OpenDateTimePicker, setOpenDateTimePicker] = useState(false);
    const [OpenDateTimePicker2, setOpenDateTimePicker2] = useState(false);

    const [duration, setDuration] = useState('');
    const [reason, setReason] = useState('');
    const [employ, setEmploy] = useState([]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [searchedNameData, setSearchedNameData] = useState('');
    const [empmodalVisible, setEmpModalVisible] = useState(false);


    const [Locations, setLocations] = useState([]);


    const GetLocationListVGPSApi = () => {
        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        console.log("UserName", userId);
        let apiData = { "UserName": userId }
        console.log(apiData)
        setLoader(true);
        ApiService.PostMethode('/GetLocationListVGPS', apiData, token)
            .then(result => {
                console.log("APiresult GetLocationListVGPS", result);
                setLoader(false);

                setLocations(result.Value);
                let Location = result.Value[0].LOCN
                let LocationCode = result.Value[0].CODE
                console.log("LocationCode", LocationCode)
                setEmpLoc(Location)
                setEmpLocCode(LocationCode)
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



    const GetSearchLevelsListVGPSApi = () => {
        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        console.log("UserName", userId);
        let apiData = { "UserName": userId }
        console.log(apiData)
        setLoader(true);
        ApiService.PostMethode('/GetSearchLevelsListVGPS', apiData, token)
            .then(result => {
                console.log(result);
                setLoader(false);
                let arrData = result.Value.map((item) => { return { 'label': item.MEANING, value: item.VAL } })
                setSearchLevelData(arrData)
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

    const SearchEmployee = () => {
        console.log('post data', search);
        if (search === '') {
            alert("Please enter a valid keyWord ")
            return
        } else {
            let apiData = {
                Search: search
            }
            let token = AppUserData.token
            setLoader(true);
            ApiService.PostMethode('/GetEmplLookup', apiData, token)
                .then(result => {
                    setLoader(false);

                    console.log('ApiResult', result);

                    let responseData = result.Value;
                    console.log('ApiResult', responseData);
                    setEmploy(responseData)
                    setEmpModalVisible(true)

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
        }
    };
    const GetAccessListVGPSApi = (locationcode = '001') => {
        let userId = AppUserData?.data?.userId
        // let newLoc = empLocCode.split(",")[0]
        let apiData = {
            UserName: userId,
            LocationCode: locationcode,
            LevelID: "1"
        }
        console.log('post data', apiData);
        console.log('post userId', userId);
        let token = AppUserData.token
        setLoader(true);
        ApiService.PostMethode('/GetAccessListVGPS', apiData, token)
            .then(result => {
                setLoader(false);
                let responseData = result.Value
                // console.log('building data', responseData)
                let responseDataNew = responseData.map(element => {
                    return {
                        ...element,
                        isSelected: false
                    }
                })
                // console.log("response data new", responseDataNew);
                setBuildingData(responseDataNew)
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
    }


    useEffect(() => {
        GetLocationListVGPSApi()
        GetSearchLevelsListVGPSApi()
        GetAccessListVGPSApi()
    }, [])
    // useEffect(() => {
    //   console.log(selectBuilding);
    // }, [selectBuilding])

    const emptyList = () => {
        setSearch('')
    }


    const gatePassScheema = yup.object().shape({
        office: yup.string().required('Location is required'),
        // date: yup.string().required('select one is required'),
        duration: yup
            .string()
            .required('Duration  is required')
            .max(24, 'Duration should be less then 24 hours'),
        searchLevel: yup.string().required('select one search level please'),
        reason: yup.string().required('Reason is required'),
        persionalVehical: yup.string().required('Select an option'),
        internalVehical: yup.string().required('Select an option'),
        vehicleNumber: yup.string()
            .test('Vehicle Number is required', function () {
                if (this.parent.persionalVehical === 'N') {
                    return true;
                } else {
                    if (this.parent.vehicleNumber) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }),
        building: yup.string().required('Building it is required'),
        searchEmp: yup.string().required('Please select an employee'),
    });
    const fromRef = useRef(null);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleBuilding = () => {
        setShow(!show);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        setselectTime(date);
        hideDatePicker();
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
            <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Header title="Taxi Approval" back />
            {/* BODY */}
            <Formik
                innerRef={fromRef}
                validationSchema={gatePassScheema}
                initialValues={{
                    office: '',
                    date: new Date(),
                    duration: '',
                    searchLevel: '',
                    reason: '',
                    persionalVehical: '',
                    internalVehical: '',
                    vehicleNumber: '',
                    building: '',
                    searchEmp: '',
                    "perName": "",
                    "Desig": "",
                    "noOfPerson": "",
                    "empId": "",
                }}
                onSubmit={values => {
                    console.log("values", BuildingData);

                    let buldings = BuildingData.filter(element => {
                        if (element.isSelected) {
                            return element.BID;
                        }
                    }).map(obj => obj.BID)

                    if (buldings.length == 0) {
                        Alert.alert(
                            "Error",
                            "Building Not selected",
                            [
                                {
                                    text: "okay",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                            ]
                        );
                        return;
                    }
                    let newdata = {
                        "id": "1",
                        "location": values.office.split(",")[0],
                        "visitDate": moment(values.date).format('YY/MM/DD'),
                        "authorizedPerson": AppUserData?.data?.userId,
                        "Pvehicle": values.persionalVehical,
                        "VisType": "O",
                        "visLevel": "1",
                        "buildings": buldings,
                        "duration": values.duration,
                        "exArrTime": moment(values.date).format('MM-DD-YY hh:mm'),
                        "SearchLevel": values.searchLevel,
                        "interVehicle": values.internalVehical,
                        "ReasonToCome": values.reason,
                        "perName": values.perName,
                        "Desig": values.Desig,
                        "noOfPerson": "5",
                        "empId": values.empId,
                        "vehicleNumber": values.vehicleNumber,
                        "dateDummy": values.date
                    }
                    console.log("payload", newdata);
                    navigation.navigate("VisitorDetails", {
                        visitorpayload: newdata,
                    })
                }}>


                {

                    ({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched,
                        isValid,
                    }) => (
                        <ScrollView nestedScrollEnabled={true} style={{ marginTop: 5, paddingHorizontal: 10 }}>


                            {/* Employee ID and Slip No */}

                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                    <View style={{ width: "30%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Employee ID
                                        </Text>
                                        <TextInput
                                            onChangeText={handleChange('reason')}
                                            onBlur={handleBlur('reason')}
                                            value={values.reason}
                                            style={styles.TextInputStyle}
                                        />
                                    </View>
                                    <View style={{ width: "67%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Slip No.
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                             />
                                    </View>
                                </View>

                            </View>

                            {/* DepartMent and Name  */}
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                    <View style={{ width: "30%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Department
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                        />
                                    </View>
                                    <View style={{ width: "67%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,
                                            }} Bold>
                                            Name
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                        />
                                    </View>
                                </View>
                            </View>


                            <DatePicker
                                modal
                                mode="datetime"
                                open={OpenDateTimePicker}
                                date={values.date}
                                onConfirm={date => {
                                    console.log(date);
                                    setFieldValue('date', date);
                                    setOpenDateTimePicker(false);
                                    // setDate(date);
                                    // console.log(date);
                                }}
                                onCancel={() => {
                                    setOpenDateTimePicker(false);
                                }}
                            />

                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                    <View style={{ width: "50%", paddingRight: 5 }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,
                                            }} Bold>
                                            Appx. Time Out
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.DateInOut}
                                            onPress={() => setOpenDateTimePicker(true)}
                                        >
                                            <Text style={{ color: 'gray' }}>
                                                {moment(values.date).format('YY/MM/DD hh:mm')}
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
                                    </View>

                                    <DatePicker
                                        modal
                                        mode="datetime"
                                        open={OpenDateTimePicker2}
                                        date={values.date}
                                        onConfirm={date => {
                                            console.log(date);
                                            setFieldValue('date', date);
                                            setOpenDateTimePicker2(false);
                                            // setDate(date);
                                            // console.log(date);
                                        }}
                                        onCancel={() => {
                                            setOpenDateTimePicker2(false);
                                        }}
                                    />


                                    <View style={{ width: "50%", paddingLeft: 5 }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Appx. Time In
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.DateInOut}
                                            onPress={() => setOpenDateTimePicker2(true)}
                                        >
                                            <Text style={{ color: 'gray' }}>
                                                {moment(values.date).format('YY/MM/DD hh:mm')}
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
                                    </View>
                                </View>
                                {errors.duration && touched.duration && (
                                    <View
                                        style={{
                                            width: '100%',
                                            alignSelf: 'center',
                                            paddingVertical: 2,
                                        }}>
                                        <Text style={{ color: 'red', textAlign: 'right' }}>
                                            {errors.duration}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Purpose of Visit */}

                            <View style={{ marginVertical: 5 }}>
                                <View style={{ width: '100%' }}>
                                    <Text
                                        style={{
                                            paddingHorizontal: 0,
                                            marginVertical: 5,

                                        }} Bold>
                                        Purpose of Visit
                                    </Text>
                                    <TextInput

                                        onChangeText={handleChange('reason')}
                                        onBlur={handleBlur('reason')}
                                        value={values.reason}
                                        style={styles.TextInputStyle}
                                    />
                                    {errors.reason && touched.reason && (
                                        <View
                                            style={{
                                                width: '100%',
                                                alignSelf: 'center',
                                                paddingVertical: 2,
                                            }}>
                                            <Text
                                                style={{ color: 'red', textAlign: 'left' }}>
                                                {errors.reason}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>


                            {/* Source And Destination */}

                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                    <View style={{ width: "50%", paddingRight: 5 }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Source
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputDesign}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}

                                        />
                                    </View>
                                    <View style={{ width: "50%", paddingLeft: 5 }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,


                                            }} Bold>
                                            Destination
                                        </Text>
                                        <TextInput
                                           style={styles.TextInputDesign}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}

                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Kms.  And Party Code */}
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>

                                    <View style={{ width: "30%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Kms (Appx.)
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                            />
                                    </View>
                                    <View style={{ width: "67%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Party Code
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                             />
                                    </View>
                                </View>
                            </View>

                            {/* Addl. Persons and Persons Staff Id */}
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                    <View style={{ width: "30%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,
                                            }} Bold>
                                            Addl. Persons
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                             />
                                    </View>
                                    <View style={{ width: "67%" }}>
                                        <Text
                                            style={{
                                                paddingHorizontal: 0,
                                                paddingTop: 10,
                                                paddingVertical: 5,

                                            }} Bold>
                                            Persons Staff Id
                                        </Text>
                                        <TextInput
                                            style={styles.TextInputStyle}
                                            onChangeText={handleChange('duration')}
                                            onBlur={handleBlur('duration')}
                                            value={values.duration}
                                            />
                                    </View>
                                </View>
                            </View>

                            {/* Taxi */}

                            <View style={{ marginVertical: 5, }}>
                                <View style={{ marginBottom: 5 }}>
                                    <Text
                                        style={{
                                            paddingHorizontal: 0,
                                            // paddingVertical: 5,

                                        }} Bold>
                                        Taxi
                                    </Text>
                                </View>
                                <SelectDropdown
                                    data={searchLevelData}

                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        console.log("selectedItem", selectedItem);
                                        setFieldValue('searchLevel', selectedItem.value);

                                    }}
                                    defaultButtonText={'Select Taxi'}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.label
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.label
                                    }}
                                    buttonStyle={styles.dropdown2BtnStyle}
                                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={styles.dropdown2DropdownStyle}
                                    rowStyle={styles.dropdown2RowStyle}
                                    rowTextStyle={styles.dropdown2RowTxtStyle}
                                />
                                {errors.searchLevel && touched.searchLevel && (
                                    <View
                                        style={{
                                            width: '100%',
                                            alignSelf: 'center',
                                            paddingVertical: 2,
                                        }}>
                                        <Text style={{ color: 'red', textAlign: 'left' }}>
                                            {errors.searchLevel}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Approve Request Button */}
                            <View style={{ paddingVertical: 10, flexDirection: "row" }}>
                                <View style={{ width: "50%", padding: 5 }}>
                                    <Button title="Approve Request"
                                    // onPress={() => {handleSubmit();}}
                                    />
                                </View>

                                <View style={{ width: "50%", padding: 5 }}>
                                    <Button title="Cancel"
                                    // onPress={() => {handleSubmit();}}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    )}
            </Formik>
        </SafeAreaView>

    );

}
// define your styles
const styles = StyleSheet.create({
    gradient: {
        padding: 20,
    },


    // Dropdown styles
    dropdown2BtnStyle: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        borderColor: GlobalColor.Secondary,
    },
    dropdown2BtnTxtStyle: { textAlign: 'left', fontSize: 16 },
    dropdown2DropdownStyle: { backgroundColor: GlobalColor.White },
    dropdown2RowStyle: { backgroundColor: GlobalColor.White, borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: { textAlign: 'left', fontSize: 16 },
    centeredView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff'

    },
    Modalclose: {
        position: 'absolute',
        right: 0,
        backgroundColor: GlobalColor.Primary,
        justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 55,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    TextInputStyle: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 6,
        alignSelf: 'center',
        borderColor: GlobalColor.Secondary,
        fontSize: 16,
    },
    TextInputDesign: {
        width: '100%',
        borderWidth: 1,
        padding: 6,
        backgroundColor: '#fff',
        borderColor: GlobalColor.Secondary
    },
    DateInOut:{
        width: '100%',
        backgroundColor: GlobalColor.White,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 6,
        alignSelf: 'center',
        borderColor: GlobalColor.Secondary
    }

});

// //make this component available to the app
export default ManagerTaxiApproval;
