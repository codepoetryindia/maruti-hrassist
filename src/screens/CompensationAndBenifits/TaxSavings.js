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






const TaxSavings = () => {

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

    // Get Tax Savings
    const GetTaxSavings = async () => {

        //Set Loader
        setLoader(true);
    
        try {
          //getting Data
          let result = await ApiService.PostMethode('/GetTaxSavings', {
            "EmplID": AppUserData?.data?.userId,
            "FNYR": month,
          }, AppUserData.token)
    
          //remove loader
          stopLoader()
    
          //set Data
          setTaxSaving(result?.Value?.Table2)
        } catch (error) {
    
          //remove loader
          stopLoader()
    
          //Show Error Massage
          showErrorMessage(error)
        }
      };

    useEffect(() => {
        GetTaxSavings()
    }, [])




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
            <Header title="Tax Savings" back />

            <View style={[styles.MainCard, {backgroundColor: GlobalColor.White }]}>

                
                <View style={styles.textContainer}>
                    <Text Bold>Description</Text>
                    <Text Bold> Amount (Rs.)</Text>
                </View>
                <View style={{ borderBottomWidth:1,marginHorizontal:20,
        borderColor:GlobalColor.Secondary,}}/>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={taxSaving}
                    ListEmptyComponent={() => {
                        return (
                            <ListEmptyComponent title="No Data Found"
                            ></ListEmptyComponent>
                        )
                    }}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item, index }) => (
                        <View style={styles.textContainerFlatList}>
                            <View style={{ width: '70%' }}><Text>{item.SAVG_DESC}</Text></View>
                            <Text>{item.SVDT_AMT}</Text>
                            {/* <View style={{width:'50%',justifyContent:'flex-end'}}>></View> */}
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default TaxSavings

const styles = StyleSheet.create({

    textContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        padding:10,            
     

    },
    textContainerFlatList: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,        
        borderBottomWidth:0.5,
        borderColor:GlobalColor.Secondary

    },
    MainCard: {
        flex:1,
        margin: 10,
        shadowColor: GlobalColor.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3.0,
        elevation: 3,
        borderRadius: 4,
    }


})