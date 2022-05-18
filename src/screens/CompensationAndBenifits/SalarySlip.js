//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

const SalarySlip = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [month, setMonth] = useState();
    const [loader, setLoader] = useState(false)
    const[date,setDate] = useState(new Date())
    const { authContext, AppUserData } = useContext(AuthContext);
    const GetMonth = () => {
        let token = AppUserData.token
        let EmplID = AppUserData.data
        let apiData = {
            EmplID: EmplID
        }
        setLoader(true);
        ApiService.PostMethode('/GetSalaryMonth', apiData, token)
            .then(result => {
                setLoader(false);
                // console.log('ApiResult', result);
                let responseData = result.Value
                setMonth(responseData)
                // console.log('responseData', responseData)
                let current
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
    }, [])
    console.log("month data",month);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        loader == true ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color='red' size={30} />
                <Text>
                    Loading...
                </Text>
            </View>) : (
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <LinearGradient
                 colors={['#4174D0','#6ef7ff']}
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
                        toggleModal()
                    }}>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                        }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                          {moment(date).format('YYYYMM')}
                          
                        </Text>
                        <Feather name="corner-up-right" size={20} />
                    </View>
                </TouchableOpacity>

                {/* salary month modal */}

                <Modal
                    backdropOpacity={0.1}
                    animationInTiming={300}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    animationOutTiming={500}
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
                                  <View style={{ width:'100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/Images/dataNotFound.png')}
                                      style={{ width: 300, height: 300, resizeMode: 'contain',}} />
                                    <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                                  </View>
                                )
                              }}
                            keyExtractor={({ item, index }) => index}
                            renderItem={({ item, index }) => (
                                <View style={styles.textContainer}>
                                    <Text>{item.SHIS_YYMM_CODE}</Text>
                                </View>
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Main Salary For 2022</Text>
                        <Feather name="corner-up-right" size={20} />
                    </View>
                </TouchableOpacity>
            </View>
        )
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
        flex: 0.9,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#f8edec',
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
    },
});

// //make this component available to the app
export default SalarySlip;
