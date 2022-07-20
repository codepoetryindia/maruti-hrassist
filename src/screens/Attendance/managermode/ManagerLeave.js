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
import CheckBox from '@react-native-community/checkbox';
import Button from '../../../components/reusable/Button';






export const ManagerLeave = () => {
    const [approve, setApprove] = useState(0);
    const [EmplLevDetail, setGetEmplLevDetail] = useState([]);
    const [PendingLeaveReq, setGetPendingLeaveReq] = useState([]);
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [LeaveDetailModal, setLeaveDetailModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [remarkModal, setremarkModal] = useState(false);
    const [remarkModalText, setremarkModalText] = useState(false);
    const [remarkModalData, setremarkModalData] = useState(false);



    let userId = AppUserData?.data?.userId;
    let UserName = AppUserData?.data?.EMPL_NAME
    let date = moment(new Date()).format("DD-MMMM-YYYY");

    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);        
    }  


    const GetEmplLevDetail = () => {
        let userId = AppUserData?.data?.userId
        let token = AppUserData.token;
        let apiData = {
          "StaffNo": userId,
          "FromDate": "01-Feb-2020",
          "ToDate": date
        };
        setLoader(true);
        ApiService.PostMethode('/GetEmplLevDetail  ', apiData, token)
          .then(result => {
            console.log("APiresult `GetEmplLevDetail`", result);
            stopLoader();
            ApiResult = result.Value
            setGetEmplLevDetail(ApiResult)
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
    
    
    
      const GetPendingLeaveReq = () => {
        const stopLoader = () => {
          setLoader(false);
          // setrefresh(false);
        }
        let UserName = AppUserData?.data?.EMPL_NAME
        let token = AppUserData.token;
        let apiData = {
          "UserName": "spnayak",
          // "UserName": UserName,
        };
        setLoader(true);
        ApiService.PostMethode('/GetPendingLeaveReq  ', apiData, token)
          .then(result => {
            console.log("APiresult GetPendingLeaveReq", result);
            stopLoader();
            if(result.Value.length > 0){
                let apidata = result.Value;
                let newarray = [];
                apidata.forEach(element => {
                    newarray.push({...element, selected:false})
                });
                setGetPendingLeaveReq(newarray)
            }else{
                Toast("No Pending Request Found");
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

      const changeValue= (item, value)=>{
        console.log(item, value);
        let data = PendingLeaveReq;
        let newArray = [];
        data.forEach(element => {
            if(element.LEV_ATTENDANCE_ID==item.LEV_ATTENDANCE_ID ){
                newArray.push({...element, selected:value});
            }else{
                newArray.push({...element});
            }            
        });
        setGetPendingLeaveReq(newArray);
      }


      const rejectLeave = (data, modal=false) =>{
        if(modal){
            setremarkModalText("");
            setremarkModalData(data)
            setremarkModal(true);
            return;
        }

        let newData = data;
        newData.remark = "";
    
        Alert.alert(
            "Reject",
            "Are You sure want to Reject ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => rejectLeaveDone(newData, "R")}
            ]
          );
    }

    const approveLeave = (data) =>{
        let newData = data;
        newData.remark = remarkModalText;
        Alert.alert(
            "Approve",
            "Are You sure want to Approve ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => rejectLeaveDone(newData, "A")}
            ]
          );
    }

    const rejectLeaveDone = (data, type) =>{
        let userId = AppUserData?.data?.userId
        let token = AppUserData.token;
        let apiData = {
            "ApplicationID" : data.LEV_ATTENDANCE_ID,
            "AppRejFlag" : type,
            "UserName" : userId,
            "Remarks": data.remark
        };
        setLoader(true);
        ApiService.PostMethode('/ApproveRejectLeave  ', apiData, token)
          .then(result => {
            console.log("APiresult ApproveRejectLeave", result);
            stopLoader();
              if(result.Result){
                if(type == "A"){
                    Toast.show(result.Result);
                }else{
                    Toast.show(result.Result);
                }
                GetPendingLeaveReq();
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
    

    
    
      const handleApprove = index => {
        setApprove(index);
      };

      const initialLoading = () =>{
        GetPendingLeaveReq();
        GetEmplLevDetail();
      }

    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = initialLoading();
          return () => unsubscribe;
        }, [])
    );

    
  const ItemRender = ({ item }) => (
    <TouchableOpacity style={styles.item}
        onPress={()=>{
            setModalData(item)
            setLeaveDetailModal(!LeaveDetailModal)
        }}>
       <View style={[styles.itemColumn, {flex:0.30}]}>
         <Text style={styles.itemText}>{item["From Date"]}</Text>
         <Text style={styles.itemText}>{item["To Date"]}</Text>
       </View>
       <View style={styles.itemColumn}>
         <Text style={styles.itemText}>{item["Leave Type"]}</Text>
       </View>
       <View style={[styles.itemColumn, {flex:0.30}]}>
         <Text style={styles.itemText}>{item.Period}</Text>
       </View>
       <View style={styles.itemColumn}>  
         <Text style={styles.itemText}>{item.Status}</Text>                  
       </View>      
    </TouchableOpacity>
  );

  const ItemRenderLeave = ({ item }) => (
    <TouchableOpacity style={styles.item}
    onPress={()=>{
        console.log(item);
        setModalData(item)
        setLeaveDetailModal(!LeaveDetailModal)
    }}
    >
       <View style={[styles.itemColumn, {flex:0.30}]}>
         <Text style={styles.itemText}>{item.EMPL_NAME}</Text>
       </View>
       <View style={styles.itemColumn}>
         <Text style={styles.itemText}>{item["NAME"]}</Text>
       </View>
       <View style={[styles.itemColumn, {flex:0.30}]}>
       <Text style={styles.itemText}>{item["FROM_DATE"]}</Text>
         <Text style={styles.itemText}>{item["TO_DATE"]}</Text>
       </View>
       <View style={styles.itemColumnButtons}>  
          {/* <CheckBox
            disabled={false}
            value={item.selected}
            onValueChange={(newValue) => changeValue(item,newValue)}
          />                    */}

            <TouchableOpacity style={[styles.itemButton, {marginRight:10}]} onPress={()=>approveLeave(item)}>
                <Ionicons name='checkmark-done-sharp' size={20} color={GlobalColor.Primary}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemButton} onPress={()=>rejectLeave(item, true)}>
                <Ionicons name='close-sharp' size={20} color={GlobalColor.Danger}/>
            </TouchableOpacity> 


       </View>      
    </TouchableOpacity>
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
        <Text Bold style={[styles.HeaderColumn, {flex:0.30}]}>Date</Text>
        <Text Bold style={styles.HeaderColumn}>Type</Text>
        <Text Bold style={[styles.HeaderColumn, {flex:0.30}]}>Periord</Text>
        <Text Bold style={styles.HeaderColumn}>Status</Text>
      </View>
    );
  }

  const FlatList_Header_Leave = () => {
    return (
      <View style={{
        width: "100%",
        justifyContent: 'space-between',
        paddingHorizontal:10,
        paddingVertical:15,
        backgroundColor:GlobalColor.White,
        flexDirection:'row'
      }}>        
        <Text Bold style={[styles.HeaderColumn, {flex:0.30}]}>Name</Text>
        <Text Bold style={styles.HeaderColumn}>Type</Text>
        <Text Bold style={[styles.HeaderColumn, {flex:0.30}]}>Date</Text>
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


        <View style={{ width: '100%', alignSelf: 'center', marginBottom: 5, paddingHorizontal: 10 }}>
            <SegmentedControlTab
            borderRadius={0}
            values={['Approve Leave', 'View Report']}
            selectedIndex={approve}
            onTabPress={index => {
                handleApprove(index);
            }}
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            />
      </View>

      <View style={{ paddingHoriZontal: 10, flex: 1 }}>
        {approve == 0 ? (
          <View style={{ flex: 1 }}>
            {/* <TouchableOpacity style={{ padding: 10, backgroundColor: '#a9bce7' }}>
              <Text style={{ color: '#000', fontWeight: '600' }}>
                Tap On Leave To View Details
              </Text>
            </TouchableOpacity> */}
            <FlatList
                contentContainerStyle={{ flexGrow:1 }}
                data={PendingLeaveReq}
                renderItem={ItemRenderLeave}
                keyExtractor={item => item.id}
                ListHeaderComponent={FlatList_Header_Leave}
                ListHeaderComponentStyle={{ borderBottomColor: GlobalColor.Secondary, borderBottomWidth: 1 }}
                ListEmptyComponent={<ListEmptyComponent 
                    title="No Data Found"
                    enableRefresh={true} onRefreshCallback={() => GetPendingLeaveReq(true)} refreshing={refresh}
                    ></ListEmptyComponent>
                }
            />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.reportHeader}>
              <Text style={{ color: '#000' }}>{userId}  {UserName}</Text>
              <Ionicons name="send" size={20} color={GlobalColor.Secondary} />
            </TouchableOpacity>            
            <FlatList
                contentContainerStyle={{ flexGrow:1 }}
                data={EmplLevDetail}
                renderItem={ItemRender}
                keyExtractor={item => item.id}
                ListHeaderComponent={FlatList_Header}
                ListHeaderComponentStyle={{ borderBottomColor: GlobalColor.Secondary, borderBottomWidth: 1 }}
                ListEmptyComponent={<ListEmptyComponent 
                    title="No Data Found"
                    enableRefresh={true} onRefreshCallback={() => GetEmplLevDetail(true)} refreshing={refresh}
                    ></ListEmptyComponent>
                }
            />
          </View>
        )}

                <Modal
                    transparent={true}
                    visible={LeaveDetailModal}
                  >
                    <View style={{ width:"100%", justifyContent:'center', alignItems:'center', flex:1, backgroundColor:'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 10 ,borderRadius:0}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: 15,
                          paddingVertical: 5,
                        }}>
                        <Text
                          Bold
                          style={{
                            fontSize: GlobalFontSize.H4, 
                            color:GlobalColor.Primary
                          }}>
                          Leave Details
                        </Text>

                        <TouchableOpacity onPress={() => setLeaveDetailModal(!LeaveDetailModal)}>
                          <Ionicons
                            name="close-circle-outline"
                            size={30}
                            color={GlobalColor.Danger}
                          />
                        </TouchableOpacity>
                      </View>
                
                      <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '90%', }}>
                          {/* <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Emp. Name : {modalData["Leave Type"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Emp. Id : {modalData["Leave Type"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Dept : {modalData["Leave Type"]}
                          </Text> */}
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Leave Type : {approve ? modalData["Leave Type"]:modalData["NAME"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Leave From : {approve ? modalData["From Date"]: modalData["FROM_DATE"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Leave To : {approve ? modalData["To Date"]: modalData["TO_DATE"]}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            No of Days : {approve ? modalData.Days: modalData["DAYS"]}
                          </Text>
                          <Text style={{fontWeight: "700", marginVertical: 8}}>
                              Planned/Unplanned : {approve?  modalData['Planned/Unplanned']: modalData["PLANNED_UNPLANNED"]}
                          </Text>                                      
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Period : {approve? modalData.Period: modalData.PERIOD }
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 8 }}>
                            Reason : {approve? modalData.Reason: modalData.REASON}
                          </Text>
                          <Text style={{ fontWeight: "700", marginVertical: 12 }}>
                            Remark : {modalData.LEV_REMARKS}
                          </Text>
                          <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end'}}>
                          {/* {
                              modalData.Status && modalData.Status.toLowerCase() == 'pending' ? (
                                <TouchableOpacity
                                style={{ padding: 12, borderRadius: 5,backgroundColor: GlobalColor.Secondary, minWidth:100, marginRight:25 }} 
                                onPress={() => {
                                  setLeaveDetailModal(!LeaveDetailModal);
                                  DeleteLeavePending(modalData);
                                }}>
                                <Text style={{color:'#fff', alignSelf:'center'}} Bold>Delete</Text>
                              </TouchableOpacity>
                              ) : null
                            } */}
                              <TouchableOpacity
                                style={{ padding: 12, borderRadius: 5,backgroundColor: GlobalColor.Secondary, minWidth:100 }} 
                                onPress={() => {
                                  setLeaveDetailModal(!LeaveDetailModal)
                                }}>
                                <Text style={{color:'#fff', alignSelf:'center'}} Bold>Okay</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>                  
                    </View>
                    </View>
                  </Modal>
                    <Modal
                        transparent={true}
                        visible={remarkModal}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setremarkModal(!remarkModal)} style={styles.modalClose}>
                            <Ionicons
                                name="close-circle-outline"
                                size={30}
                                color={GlobalColor.Danger}
                            />
                            </TouchableOpacity>


                            
                            <View style={styles.inputBox}>
                                <Text Bold style={styles.modalText}>Enter Remark</Text>
                                <TextInput
                                    placeholder="Enter Remark"
                                    style={{
                                        // width: '100%',
                                        borderWidth: 1,
                                        padding: 6,
                                        height:40,
                                        backgroundColor: '#fff',
                                        borderColor: GlobalColor.Secondary
                                    }}
                                    onChangeText={(text)=> setremarkModalText(text)}
                                />
                            </View>
                            
                            <Button title="Submit" onPress={()=>{
                                    if(!remarkModalText){
                                        Alert.alert(
                                            "Error",
                                            "Please enter remark",
                                            [
                                              {
                                                text: "Okay",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                              },                                         
                                            ]
                                          );
                                    }else{
                                        setremarkModal(!remarkModal);
                                        rejectLeave(remarkModalData);                                        
                                    }
                            }}/>
                        </View>
                    </View>
                </Modal>
            </View>      
      </SafeAreaView>
    );
};

export default ManagerLeave;

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
    },
    tabsContainerStyle: {
        marginTop: 10,
        borderRadius: 0,
        width: '100%',
      },
      tabStyle: {
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 0,
        borderColor: GlobalColor.Secondary
      },
      tabTextStyle: {
        fontSize: GlobalFontSize.P,
        color: 'grey',
        fontFamily: 'Roboto-Bold',
      },
      activeTabStyle: {
        backgroundColor: GlobalColor.PrimaryLight,
        borderBottomWidth: 4,
        borderBottomColor: GlobalColor.Secondary,
      },
      activeTabTextStyle: {
        color: GlobalColor.Secondary,
      },  
      reportHeader: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: GlobalColor.White,
        shadowColor: GlobalColor.Black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 2.0,
        elevation: 5,
        borderRadius: 5,
        marginBottom:5
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.5)'
      },
      modalView: {
        position:'relative',
        width:"90%",
        backgroundColor:GlobalColor.White,
        padding:20, 
        // minHeight:200
      },
      modalText:{
        marginBottom:20
      },
      modalClose:{
        right:5,
        top:5, 
        position:'absolute',
        zIndex:55555555
      },
      inputBox:{
        height:100,
        marginBottom:5
      }
})

