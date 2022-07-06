import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';
import * as ApiService from '../Utils/Utils';
import Spinner from 'react-native-loading-spinner-overlay';
import { Header } from './reusable/Header';
import Text from './reusable/Text';
import { GlobalColor } from '../constants/Colors';

const Nomination = ({ navigation, route }) => {
    const [loader, setLoader] = useState(false)
    const { authContext, AppUserData } = useContext(AuthContext);
    const [nominidata, setNominiData] = useState();
    const [NominationArrya, setNominationArrya] = useState();

    useEffect(() => {
        const NominationData = route.params.data
        const responseArr = [];
        let ArrayKeys = [];
        /*
        NominationData.forEach(element => {
            if(!ArrayKeys.includes(element.NOMM_DESC)){
                ArrayKeys.push(element.NOMM_DESC);
            }
        });

        NominationData.forEach(element => {
            let index = ArrayKeys.find((elements )=>elements == element.NOMM_DESC)
            // console.log(index);
            if(responseArr[index]){
                responseArr[index].push(element);
            }else{
                responseArr[index] = [element];
            }
        });
        console.log(responseArr);
        setNominiData(NominationData);
        setNominationArrya(responseArr);
        */

        NominationData.map((item) => {
            return (
                responseArr.push({
                    ...item,
                    isClicked: false,
                })
            )
        })
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
        <SafeAreaView style={{ flex: 1, backgroundColor:GlobalColor.PrimaryLight }}>
            <Header title="Nomination" back></Header>
            <View style={ styles.containerBody}>
                <FlatList
                    data={nominidata}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity onPress={() => {
                                    handleDropDown(index)
                                }} style={[styles.tabStyle, { borderBottomLeftRadius: item.isClicked ? 0 : 3, borderBottomRightRadius: item.isClicked ? 0 : 3 }]}>
                                    <Text Bold style={{  }}>{item.NOMM_DESC}</Text>
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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gradient: {
        paddingVertical: 20,
        paddingHorizontal:10
    },
    container: {
        flexDirection: 'row',
    },
    containerBody:{
        paddingHorizontal:10,
        flex:1
    },
    tabStyle: {
        paddingVertical:16,
        width: '99%',
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
        borderRadius: 3,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        paddingVertical: 15,
    }
})
export default Nomination
