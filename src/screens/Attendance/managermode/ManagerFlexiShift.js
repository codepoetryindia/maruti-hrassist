import React, { Component, useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as ApiService from '../../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../../context/AuthContext';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { GlobalColor } from '../../../constants/Colors';
import Text from '../../../components/reusable/Text';
import { Header } from '../../../components/reusable/Header';
import { GlobalFontSize } from '../../../constants/FontSize';
import ListEmptyComponent from '../../../components/reusable/ListEmptyComponent';
import TextInput from '../../../components/reusable/TextInput';
import { LoadingScreen } from '../../../components/reusable/LoadingScreen';






export const ManagerFlexiShift = () => {
    const [flexiShift, setFlexiShift] = useState('')
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [refresh, setrefresh] = useState(false);

    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);
    }  

    const FlexiShiftPendAppLOV = () => {
      let userId = AppUserData?.data?.userId
      let token = AppUserData.token;
      let apiData = {
        // "UserName": "spnayak",
        "StaffNo": userId,
      };
      setLoader(true);
      ApiService.PostMethode('/FlexiShiftPendAppLOV  ', apiData, token)
        .then(result => {
          console.log("APiresult FlexiShiftPendAppLOV", result);
          stopLoader();
            if(result.Value){
                ApiResult = result.Value
                setFlexiShift(ApiResult)
            }else{
                setFlexiShift([]);
            }
        })
        .catch(error => {
          stopLoader();
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
    }

    const rejectFlexiShift = (data) =>{
        Alert.alert(
            "Reject",
            "Are You sure want to Reject ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => rejectFlexiShiftDone(data, "R")}
            ]
          );
    }

    const approveFlexiShift = (data) =>{
        Alert.alert(
            "Approve",
            "Are You sure want to Approve ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => rejectFlexiShiftDone(data, "A")}
            ]
          );
    }

    const rejectFlexiShiftDone = (data, type) =>{
        let userId = AppUserData?.data?.userId
        let token = AppUserData.token;
        let apiData = {
            "Staffid" : data.EMPL_ID,
            "ShiftID" : data.SHFT_ID,
            "MgrID"   : userId,
            "AppFlag" :type,
        };
        setLoader(true);
        ApiService.PostMethode('/ApproveFlexiShift  ', apiData, token)
          .then(result => {
            console.log("APiresult ApproveFlexiShift", result);
            stopLoader();
              if(result.Result){
                if(type == "A"){
                    Toast.show(result.Result);
                }else{
                    Toast.show(result.Result);
                }
              }else{
                Toast.show("Failed");
              }
          })
          .catch(error => {
            stopLoader();
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
    }




    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = FlexiShiftPendAppLOV();
          return () => unsubscribe;
        }, [])
    );
    
  const ItemRender = ({ item }) => (
    <View style={styles.item}>
       <View style={[styles.itemColumn, {flex:0.40}]}>
         <Text style={styles.itemText}>{item.EMPL_NAME}</Text>
       </View>
       <View style={styles.itemColumn}>
         <Text style={styles.itemText}>{item.SHFT_START_SHIFT}</Text>
       </View>
       <View style={styles.itemColumn}>
         <Text style={styles.itemText}>{moment(item.SHFT_START_DATE).format("MM/DD/YY")}</Text>
       </View>
       <View style={styles.itemColumnButtons}>  
            <TouchableOpacity style={[styles.itemButton, {marginRight:10}]} onPress={()=>approveFlexiShift(item)}>
                <Ionicons name='checkmark-done-sharp' size={20} color={GlobalColor.Primary}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButton} onPress={()=>rejectFlexiShift(item)}>
                <Ionicons name='close-sharp' size={20} color={GlobalColor.Danger}/>
            </TouchableOpacity>         
       </View>      
    </View>
  );


  const FlatList_Header = () => {
    return (
      <View style={{
        width: "100%",
        justifyContent: 'space-between',
        paddingHorizontal:10,
        paddingVertical:15,
        backgroundColor:GlobalColor.White,
        flexDirection:'row'
      }}>        
        <Text Bold style={[styles.HeaderColumn, {flex:0.40}]}>Name</Text>
        <Text Bold style={styles.HeaderColumn}>Shift</Text>
        <Text Bold style={styles.HeaderColumn}>Date</Text>
        <Text Bold style={styles.HeaderColumn}>Approval</Text>
      </View>
    );
  }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight }}>  

            {loader == true ? (
              <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            ) : null}   

        <FlatList
            contentContainerStyle={{ flex:1 }}
            data={flexiShift}
            renderItem={ItemRender}
            keyExtractor={item => item.id}
            ListHeaderComponent={FlatList_Header}
            ListHeaderComponentStyle={{ borderBottomColor: GlobalColor.Secondary, borderBottomWidth: 1 }}
            ListEmptyComponent={<ListEmptyComponent 
                title="No Data Found"
                enableRefresh={true} onRefreshCallback={() => FlexiShiftPendAppLOV(true)} refreshing={refresh}
                ></ListEmptyComponent>
            }
        />
      </SafeAreaView>
    );
};

export default ManagerFlexiShift;

const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        backgroundColor:GlobalColor.White,
        paddingHorizontal:10, 
        marginTop:5,
        justifyContent:'space-between',
        paddingVertical:5,
        borderBottomWidth:0.5,
        borderBottomColor:GlobalColor.Secondary
    },
    HeaderColumn:{
        flex:0.25,
    },
    itemColumn:{
        flex:0.25,
        justifyContent:'center',
    },
    itemButton:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:GlobalColor.PrimaryLight,
        alignItems:'center',
        justifyContent:'center',
    },
    itemColumnButtons:{
        flex:0.25,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        flexDirection:'row',
    },
    spinnerTextStyle: {
        color: '#fff'
    }
})

