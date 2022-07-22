//import liraries
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import AuthContext from '../../context/AuthContext';
import * as ApiService from '../../Utils/Utils';
import Text from '../../components/reusable/Text';
import { GlobalColor } from '../../constants/Colors';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { showErrorMessage } from '../../Utils/Utils';
import { Header } from '../../components/reusable/Header';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';


const PFBalance = () => {
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

   // // Pf Balance Api 
  const PfBalance = async () => {
    //set Loader
    setLoader(true);

    try {

      //get Api Data
      let result = await ApiService.PostMethode('/GetPFStatement', {
        "EmplID": AppUserData?.data?.userId,
        "FNYR": month
      }, AppUserData.token)

      //stop Loader
      stopLoader();
      if(result.Value){
        //Set Data
        let CB1_CB2 = result.Value.Table1[0].CB1_CB2
        let PFST_MUL_CB3 = result.Value.Table2[0].PFST_MUL_CB3
        let NetBalance = CB1_CB2 + PFST_MUL_CB3
        setEmployeePf(CB1_CB2)
        setEmployerPf(PFST_MUL_CB3)
        setNetBalance(NetBalance)
      }

    } catch (error) {
      //stop Loader
      stopLoader()
      //Show Error Massage
      showErrorMessage(error)
    }
  };

    useEffect(() => {
        PfBalance()
    }, [])


    if(loader){
        return(
            <SafeAreaView style={{ flex: 1,backgroundColor: GlobalColor.PrimaryLight  }}>
                <Header title="PF Balance" back/>
                <LoadingScreen/>
            </SafeAreaView>          
        )
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>
            <Header title="PF Balance" back />
            <View style={[styles.MainCard, { padding: 10,backgroundColor: GlobalColor.White }]}>
                <View>
                    <View style={styles.textContainer}>
                        <Text >Employee's</Text>
                        <Text Bold>
                            Rs.{employeePf}
                        </Text>
                    </View>
                    <View style={{ borderBottomWidth:0.5,marginHorizontal:5, borderColor:GlobalColor.Secondary,}}/>
                    <View style={styles.textContainer}>
                        <Text >Employer's</Text>
                        <Text Bold>
                            Rs.{employerPf}
                        </Text>
                    </View>
                    <View style={{ borderBottomWidth:0.5,marginHorizontal:5, borderColor:GlobalColor.Secondary,}}/>
                    <View style={styles.textContainer}>
                        <Text Bold>Net Balance</Text>
                        <Text Bold>
                            Rs.{netBalance}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PFBalance

const styles = StyleSheet.create({

    textContainer: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,

    },
    MainCard: {

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