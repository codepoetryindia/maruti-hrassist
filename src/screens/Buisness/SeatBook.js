//import liraries
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Modal, Pressable, Image } from 'react-native';
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
// create a component
const SeatBook = ({ navigation }) => {
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


    let inputNameData = AppUserData.data.EMPL_NAME
    let inputDegnData = AppUserData.data.EMPL_DESG_CODE
    console.log(inputDegnData);

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
    const BookShuttleSeatApi = () => {
        let token = AppUserData.token
        let userId = AppUserData.data.userId
        let apiData;
        if (isSelected == 0) {
            apiData = {
                UserName: userId
            }
        }
        else {
            apiData = {
                UserName: searchedNameData['Staff No']
            }
        }
        console.log("apiData", apiData)
        setLoader(true);
        ApiService.PostMethode('/BookShuttleSeat', apiData, token)
            .then(result => {
                setLoader(false);
                let responseData = result.Result;
                console.log('ApiResult', responseData);
                // setBookData(responseData)
                alert(responseData)
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
        <View style={styles.container}>
            <LinearGradient
                style={{ padding: 20 }}
                colors={['#00B4DB', '#0083B0']}>
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
                        Shuttle Seat Book
                    </Text>
                </View>
            </LinearGradient>

            {/* BODY */}

            <RadioForm
                formHorizontal={true}
                style={{
                    width: '90%',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                    marginVertical: 10
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
                buttonInnerColor={'#e74c3c'}
                buttonOuterColor={'#23f'}
                buttonSize={10}
                buttonOuterSize={20}
            />

            {isSelected == 0 ? (
                <View style={{ width: '90%', alignSelf: 'center', }}>
                    <Text>Name</Text>
                    <TextInput
                        value={inputNameData}
                        editable={false}
                        style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} />

                    <Text>Designation</Text>
                    <TextInput
                        value={inputDegnData}
                        editable={false}
                        style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} />

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => {
                            BookShuttleSeatApi()
                        }}>
                            {Loader == true ? (
                                <Spinner
                                    visible={Loader}
                                    textContent={'Loading...'}
                                    textStyle={{ color: '#fff' }}
                                />
                            ) : null}
                            <LinearGradient
                                style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                colors={['#4174D0', '#6ef7ff']}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>BOOK</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("ShuttleBooking")
                        }}>
                            <LinearGradient
                                style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                colors={['#4174D0', '#6ef7ff']}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>CANCLE</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            ) : isSelected == 1 ? (
                <View>
                    <View style={{ width: '100%' }}>
                        <View
                            style={{
                                width: '90%',
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderTopColor: '#80406A',
                                borderStartColor: '#6ef7ff',
                                borderBottomColor: '#2757C3',
                                borderEndColor: '#6ef7ff',
                                borderRadius: 5,
                                alignSelf: 'center',
                            }}>
                            <View
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
                    <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
                        <Text>Name</Text>
                        <TextInput
                            value={searchedNameData.Name}
                            editable={false}
                            style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} />

                        <Text>Designation</Text>
                        <TextInput
                            value={searchedNameData.Desg}
                            editable={false}
                            style={{ marginVertical: 10, width: '100%', borderWidth: 1, paddingVertical: 10, alignSelf: 'center', borderRadius: 8 }} />

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => {

                                handleSubmit()
                            }}>
                                {Loader == true ? (
                                    <Spinner
                                        visible={Loader}
                                        textContent={'Loading...'}
                                        textStyle={{ color: '#fff' }}
                                    />
                                ) : null}
                                <LinearGradient
                                    style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                    colors={['#4174D0', '#6ef7ff']}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>BOOK</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ShuttleBooking")
                            }}>
                                <LinearGradient
                                    style={{ padding: 20, margin: 5, borderRadius: 8, alignItems: 'center' }}
                                    colors={['#4174D0', '#6ef7ff']}>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>CANCLE</Text>
                                </LinearGradient>
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
                            }}>

                            <View
                                style={{
                                    minHeight: '80%',
                                    backgroundColor: '#fff',
                                    padding: 20,
                                    borderRadius: 15,
                                    width: '90%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: '18%'
                                }}>

                                {userList.length > 0 ? (

                                    <FlatList
                                        style={{ width: "100%", marginHorizontal: 10 }}
                                        data={userList}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={require('../../assets/Images/dataNotFound.png')}
                                                        style={{ width: 300, height: 300, resizeMode: 'contain', marginLeft: -50 }} />
                                                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                                                        <Ionicons
                                                            style={styles.searchIcon}
                                                            name="close"
                                                            size={25}
                                                            color="#2757C3"
                                                            onPress={() => {
                                                                setModalVisible(false)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        }}
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
                                                    color="#2757C3"
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
                                ) : (
                                    <Text>Searched Data not found</Text>
                                )}
                            </View>
                        </Pressable>

                    </Modal>
                </View>
            ) : null}
        </View>
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
    searchIcon: {
        padding: 10,
    },
    FlatListData: {
        width: "95%",
        borderWidth: 1,
        borderTopColor: '#80406A',
        borderStartColor: '#6ef7ff',
        borderBottomColor: '#2757C3',
        borderEndColor: '#6ef7ff',
        borderRadius: 7,
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
