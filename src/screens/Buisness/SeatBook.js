//import liraries
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Modal, Pressable, Image, SafeAreaView,Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import Button from '../../components/reusable/Button';
import { Header } from '../../components/reusable/Header';
import TextInput from '../../components/reusable/TextInput';
import Text from '../../components/reusable/Text';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import moment from 'moment';

// create a component
const SeatBook = ({ navigation, route }) => {
    console.log(route.params.data);
    console.log(route.params.date);

    let radio_props = [
        { label: 'Self', value: 0 },
        { label: 'On Behalf', value: 1 },
    ];

    const [isSelected, setSelection] = useState(0);
    const [search, setSearch] = useState('')
    const { authContext, AppUserData } = useContext(AuthContext);
    const [userList, setUserList] = useState([])
    const [searchedNameData, setSearchedNameData] = useState(true)
    const [field, setField] = useState('')
    const [Loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)


    let inputNameData = AppUserData?.data?.EMPL_NAME
    let inputDegnData = AppUserData.data.EMPL_DESG_CODE

    const SearchEmployee = () => {
        console.log('post data', search);
        if (search === '') {
            alert("please enter a valid keyWord ")
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
                    setUserList(responseData)
                    setModalVisible(true)
                })
                .catch(error => {
                    setLoader(false);
                    console.log('Error occurred==>', error);
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
    const BookShuttleSeatApi = () => {
        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        let apiData;
        if (isSelected == 0) {
            apiData = {
                "BKDTID":"",
                "BKDTShtlID": route.params.data.SHTL_ROUT_MAPP_ID,
                "BKDTEmplID": userId,
                "StartDate": moment().format("DD-MMMM-YYYY"),
                "EndDate": moment().format("DD-MMMM-YYYY"),
                "Reason": "",
                "BKDTFlag": "I",
                "BKDTUser": userId
            }
            // route.params.date
            // route.params.date
        }
        else {
            apiData = {
                "BKDTID":"",
                "BKDTShtlID": route.params.data.SHTL_ROUT_MAPP_ID,
                "BKDTEmplID": searchedNameData['Staff No'],
                "StartDate": moment().format("DD-MMMM-YYYY"),
                "EndDate": moment().format("DD-MMMM-YYYY"),
                "Reason": "",
                "BKDTFlag": "I",
                "BKDTUser": userId
            }
        }
        // console.log("apiData", apiData)
        // return;
        setLoader(true);
        ApiService.PostMethode('/BookShuttleSeat', apiData, token)
            .then(result => {
                setLoader(false);
                let responseData = result.Result;
                console.log('ApiResult', responseData);
                // setBookData(responseData)
                Alert.alert("Success",responseData);
                navigation.goBack();
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
    const handleSubmit = () => {
        if (search == '') {
            alert("Search By Name/Dept/Staff/ID please")
        }
        else {
            BookShuttleSeatApi()
            setSearch('')
            setSearchedNameData('')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Shuttle Seat Book"} />
            {/* BODY */}
            <View style={{flex:1, paddingHorizontal:10}}>
                <RadioForm
                    formHorizontal={true}
                    style={{
                        width: '50%',
                        justifyContent: 'space-between',
                        // alignSelf: 'center',
                        marginVertical: 10, 
                        marginRight:20
                    }}
                    borderRadius={0}
                    radio_props={radio_props}
                    initial={0}
                    onPress={() => {
                        setSelection(!isSelected);
                        // setField(isSelected)
                        // console.log(isSelected)
                    }}
                    borderWidth={0.5}
                    buttonInnerColor={GlobalColor.Secondary}
                    buttonOuterColor={GlobalColor.PrimaryGradient}
                    buttonSize={18}
                    buttonOuterSize={28}
                />

            {isSelected == 0 ? (
                <View style={{  }}>
                    <Text style={{ color: GlobalColor.Text, fontSize: GlobalFontSize.P, marginVertical: 7 }}>Name</Text>


                    {/* <TextInput
                        value={inputNameData}
                        editable={false}
                        style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} /> */}

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            borderRadius: 8,

                            alignItems: 'center',
                            borderWidth: 0,
                            borderColor: GlobalColor.PrimaryGradient,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: GlobalColor.White,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            borderRadius: 4,


                        }}
                    >

                        <TextInput
                            style={{paddingHorizontal:10}}
                            // placeholder="Login Id"
                            editable={false}
                            // onChangeText={handleChange('UserName')}
                            // onBlur={handleBlur('UserName')}
                            value={inputNameData}
                        />
                    </TouchableOpacity>


                    <Text style={{ color: GlobalColor.Text, fontSize: GlobalFontSize.P, marginVertical: 7 }}>Designation</Text>


                    <TouchableOpacity
                        style={{
                            width: '100%',
                            borderRadius: 8,


                            alignItems: 'center',
                            borderWidth: 0,
                            borderColor: GlobalColor.PrimaryGradient,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: GlobalColor.White,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            borderRadius: 4,
                        }}
                    >
                        {/* <TextInput
                        value={inputDegnData}
                        editable={false}
                        style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} /> */}

                        <TextInput
                             style={{paddingHorizontal:10}}
                            value={inputDegnData}
                            editable={false}

                        />


                    </TouchableOpacity>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <TouchableOpacity
                            style={{ width: "47%" }}

                        >
                            {Loader == true ? (
                                <Spinner
                                    visible={Loader}
                                    textContent={'Loading...'}
                                    textStyle={{ color: '#fff' }}
                                />
                            ) : null}
                            {/* <LinearGradient
                                style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                colors={['#4174D0', '#6ef7ff']}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>BOOK</Text>
                            </LinearGradient> */}

                            <Button title="BOOK" onPress={() => {
                                BookShuttleSeatApi()
                            }} />


                        </TouchableOpacity>

                        <TouchableOpacity

                            style={{ width: "47%" }}
                        >
                            {/* <LinearGradient
                                style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                colors={['#4174D0', '#6ef7ff']}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>CANCEL</Text>
                            </LinearGradient> */}

                            <Button title="CANCEL" onPress={() => {
                                navigation.navigate("ShuttleBooking")
                            }} />
                        </TouchableOpacity>
                    </View>
                </View>

            ) : isSelected == 1 ? (
                <View>
                    <View style={{ width: '100%' }}>
                        <View
                            style={{  
                            backgroundColor: '#fff',
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            margin:10,
                            borderWidth: 1,
                            borderColor:'#cacaca',
                            backgroundColor:'#fff',
                            shadowColor: "#444",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            }}>
                            {/* <View
                                style={{
                                    width: '15%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Feather name="search" size={20} color={'#4174D0'} />
                            </View>
                            <TextInput
                                placeholder="Search By Name/Dept/Staff/ID"
                                value={search}
                                onChangeText={(data) => { setSearch(data) }}
                                style={{
                                    width: '70%',
                                    paddingVertical: 5,
                                }}
                            /> */}

                            <Ionicons
                                style={styles.searchIcon}
                                name="ios-search"
                                size={25}
                                color="#b2bec3"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Search By Name/Dept/Staff ID"
                                value={search}
                                onChangeText={(data) => { setSearch(data) }}
                            />




                            <TouchableOpacity
                                onPress={() => {
                                    SearchEmployee()
                                }}
                                style={{
                                    width: '15%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Ionicons name="send" size={20} color={'#4174D0'} />
                            </TouchableOpacity>
                        </View>






                    </View>
                    {Loader == true ? (
                        <Spinner
                            visible={Loader}
                            textContent={'Loading...'}
                            textStyle={{ color: '#fff' }}
                        />
                    ) : null}
                    <View style={{ width: '100%', alignSelf: 'center', marginVertical: 10 }}>
                        <Text style={{ color: GlobalColor.Text, fontSize: GlobalFontSize.P, marginVertical: 7 }}>Name</Text>
                        {/* <TextInput
                            value={searchedNameData.Name}
                            editable={false}
                            style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} /> */}

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                borderRadius: 8,
                                alignItems: 'center',
                                borderWidth: 0,
                                borderColor: GlobalColor.PrimaryGradient,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: GlobalColor.White,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                borderRadius: 4,
                            }}
                        >
                            <TextInput
                                style={{paddingHorizontal:10}}
                                value={searchedNameData.Name}
                                editable={false}
                            />


                        </TouchableOpacity>

                        <Text style={{ color: GlobalColor.Text, fontSize: GlobalFontSize.P, marginVertical: 7 }}>Designation</Text>
                        {/* <TextInput
                            value={searchedNameData.Desg}
                            editable={false}
                            style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} /> */}

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                borderRadius: 8,
                                alignItems: 'center',
                                borderWidth: 0,
                                borderColor: GlobalColor.PrimaryGradient,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: GlobalColor.White,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                borderRadius: 4,
                            }}
                        >


                            <TextInput
                                editable={false}
                                value={searchedNameData.Desg}
                            />


                        </TouchableOpacity>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <TouchableOpacity
                                style={{ width: "47%" }}
                            >
                                {Loader == true ? (
                                    <Spinner
                                        visible={Loader}
                                        textContent={'Loading...'}
                                        textStyle={{ color: '#fff' }}
                                    />
                                ) : null}
                                {/* <LinearGradient
                                    style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                    colors={['#4174D0', '#6ef7ff']}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>BOOK</Text>
                                </LinearGradient> */}

                                <Button title="BOOK" onPress={() => {
                                    handleSubmit()
                                }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: "47%" }}
                            >
                                {/* <LinearGradient
                                    style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                    colors={['#4174D0', '#6ef7ff']}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>CANCEL</Text>
                                </LinearGradient> */}

                                <Button title="CANCEL" onPress={() => {
                                    navigation.navigate("ShuttleBooking")
                                }} />


                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal transparent={true} visible={modalVisible}>
                        <Pressable
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{
                                backgroundColor: '#000000aa',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width:'100%', 
                                paddingHorizontal:20
                            }}>

                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    padding: 10,
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    margin:50
                                }}>
                                    <FlatList
                                        style={{ width: "100%", marginHorizontal: 10 }}
                                        data={userList}
                                        ListEmptyComponent={() => <ListEmptyComponent subtitle="Please retry with diffrent keyword"/>}
                                        keyExtractor={({ item, index }) => index}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity style={styles.FlatListData}
                                                onPress={() => {
                                                    console.log(item);
                                                    setSearchedNameData(item)
                                                    setModalVisible(false)
                                                }}>
                                                <Ionicons
                                                    style={styles.searchIcon}
                                                    name="person-circle-outline"
                                                    size={25}
                                                    color={GlobalColor.Secondary}
                                                />
                                                <View style={{ flexDirection: 'column', width: '90%' }}>
                                                    <Text style={{ fontSize: 16 }}>
                                                        {item.Name}
                                                    </Text>
                                                    <Text>
                                                        {item.Desg} , {item.Dept} ({item['Staff No']})
                                                    </Text>
                                                </View>
                                                <TouchableOpacity>
                                                    <Ionicons
                                                        style={styles.searchIcon}
                                                        name="chevron-forward-circle-outline"
                                                        size={25}
                                                        color="#2757C3" />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )}
                                    />
                              
                            </View>
                        </Pressable>

                    </Modal>
                </View>
            ) : null}
            </View>        
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor:GlobalColor.PrimaryLight,
    },
    box: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '100%',
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
    searchIcon: {
        padding: 10,
    },
    FlatListData: {
        width: "100%",
        borderWidth: 1,
        borderColor:GlobalColor.Secondary,
        borderRadius: 3,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: '#fff'
    }
});

//make this component available to the app
export default SeatBook;
