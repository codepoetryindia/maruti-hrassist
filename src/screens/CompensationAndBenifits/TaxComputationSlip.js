//import liraries
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
// import BillIcon from '../../assets/Images/compensation and benefits/bill.png'
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Text from '../../components/reusable/Text';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import { GlobalColor } from '../../constants/Colors';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { showErrorMessage } from '../../Utils/Utils';
import { Header } from '../../components/reusable/Header';






const TaxComputationSlip = () => {

    const [loader, setLoader] = useState(false)
    const [taxData, setTaxData] = useState([]);
    const [taxSaving, setTaxSaving] = useState();
    const [month, setMonth] = useState();
    const [employeePf, setEmployeePf] = useState();
    const [employerPf, setEmployerPf] = useState();
    const [netBalance, setNetBalance] = useState();
    const { authContext, AppUserData } = useContext(AuthContext);
    const [refresh, setrefresh] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [taxModalVisible, setTaxModalVisible] = useState(false);
    const [pfModalVisible, setPfModalVisible] = useState(false);
    const [savingModalVisible, setSevingModalVisible] = useState(false);

    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);
    }

    // tax Saving Api
    const GetTaxAppApi = async () => {
        setLoader(true);
        try {
            //Get Data
            let result = await ApiService.PostMethode('/GetTaxApp', {
                "UserName": AppUserData?.data?.userId
            }, AppUserData.token)

            // Stop Loader
            stopLoader()

            //Set Data
            setTaxData(result.Value)
        }
        catch (error) {
            //Stop Loader
            stopLoader()
            //Show Error Massage
            showErrorMessage(error)
        }
    };

    useEffect(() => {
        GetTaxAppApi()
    }, [])




    return (
        <SafeAreaView style={{ flex: 1,backgroundColor: GlobalColor.PrimaryLight  }}>
            <Header title="Tax Computation Slip" back/>

            <View style={[styles.MainCard,{padding:10,backgroundColor: GlobalColor.White}]}>
                <View style={styles.textContainer}>
                    <Text Bold>Component</Text>
                    <Text Bold>Amount (Rs.)</Text>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={taxData}
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
                        <View style={styles.textContainer}>
                            <Text>{item.SALARY_HEAD}</Text>
                            <Text>{item.AMOUNT}</Text>
                        </View>
                    )}
                />
            </View>
            


        </SafeAreaView>
    )
}

export default TaxComputationSlip

const styles = StyleSheet.create({

    textContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,       
        
    },
    MainCard:{
        
        margin:10,
        shadowColor: GlobalColor.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3.0,
        elevation: 3,
        borderRadius:4,
    }


})