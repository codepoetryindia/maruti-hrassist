import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';
import * as ApiService from '../Utils/Utils';
import Spinner from 'react-native-loading-spinner-overlay';

const Nomination = ({ navigation, route }) => {
    const [loader, setLoader] = useState(false)
    const { authContext, AppUserData } = useContext(AuthContext);
    const [nominidata, setNominiData] = useState([]);

    useEffect(() => {
        const NominationData = route.params.data
        console.log("route.params.data", NominationData)
        let responseArr = []
        NominationData.map((item) => {
            return (
                responseArr.push({
                    ...item,
                    isClicked: false,
                })
            )
        })
        console.log("responseArr", responseArr)
        setNominiData(NominationData)
    }, [])
    const handleDropDown = (ind) => {
        let dummyData = [...nominidata]
        let arr = dummyData.map((item, index) => {
            if (ind == index) {
                item.isClicked = !item.isClicked
            }
            return {
                ...item
            }
        })
        console.log("selectedData", arr)
        setNominiData(arr)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                            onPress={() => navigation.navigate("EditProfile")}
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
                        Nomination
                    </Text>
                </View>
            </LinearGradient>

            {loader == true ? (
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            ) : null}
            <FlatList
                data={nominidata}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <TouchableOpacity onPress={() => {
                                handleDropDown(index)
                            }} style={[styles.tabStyle, { borderBottomLeftRadius: item.isClicked ? 0 : 8, borderBottomRightRadius: item.isClicked ? 0 : 8 }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.NOMM_DESC}</Text>
                                {item.isClicked == true ? (<Ionicons name={'ios-chevron-up'} size={20} />) : (<Ionicons name={'ios-chevron-down'} size={20} />)}
                            </TouchableOpacity>
                            {item.isClicked == true ? (
                                <View>
                                    <View style={[styles.tabStyle, { marginTop: 0, elevation: 0, borderTopEndRadius: 0, borderTopStartRadius: 0 }]}>
                                        <Text>{item.ENOM_PERCENT}</Text>
                                        <Text>{item.ENOM_NAME}</Text>
                                    </View>
                                </View>
                            ) : null}
                        </>
                    )
                }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gradient: {
        padding: 20,
    },
    container: {
        flexDirection: 'row',
    },
    tabStyle: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        paddingVertical: 10
    }
})
export default Nomination
