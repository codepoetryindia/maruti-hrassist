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






export const ManagerTaxi = ({navigation}) => {
    const [flexiShift, setFlexiShift] = useState('')
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [taxiPending, setTaxiPending] = useState([]);
    const [approvedTaxiReport, setApprovedTaxiReport] = useState([]);
    const [search, setSearch] = useState('');
    const [employ, setEmploy] = useState([]);
    const [approve, setApprove] = useState(0);


    const stopLoader = () => {
        setLoader(false);
        setrefresh(false);
    }  

    const GetTaxiPendingList = () => {
        const stopLoader = () => {
          setLoader(false);
          // setrefresh(false);
        }
    
        let userId = AppUserData?.data?.userId
        let token = AppUserData.token;
        let apiData = {
          // "UserName": "spnayak",
          "StaffNo": "516260",
    
        };
        setLoader(true);
        ApiService.PostMethode('/GetTaxiPendingList  ', apiData, token)
          .then(result => {
            console.log("APiresult GetTaxiPendingList", result);
            stopLoader();
            ApiResult = result.Value
            setTaxiPending(ApiResult)
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
    
      const ApprovedTaxiReport = () => {
        const stopLoader = () => {
          setLoader(false);
          // setrefresh(false);
        }
        let userId = AppUserData?.data?.userId
        let token = AppUserData.token;
        let apiData = {
          "UserName": userId//"NSTHAKUR"
        };
        setLoader(true);
        ApiService.PostMethode('/ApprovedTaxiReport  ', apiData, token)
          .then(result => {
            console.log("APiresult ApprovedTaxiReport", result);
            stopLoader();
            if(result.Value && result.Value.length > 0){
                ApiResult = result.Value
                setApprovedTaxiReport(ApiResult);
            }else{
                setApprovedTaxiReport([]);
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
    
    
      const SearchEmployee = () => {
        const stopLoader = () => {
          setLoader(false);
          setrefresh(false);
        }
    
        if (search === '') {
          Alert.alert("please enter a valid keyWord ")
          return
        } else {
          let apiData = {
            Search: search
          }
          let token = AppUserData.token
          setLoader(true);
          ApiService.PostMethode('/GetEmplLookup', apiData, token)
            .then(result => {
              stopLoader();
              if(result.Value && result.Value.length > 0 ){
                let responseData = result.Value;
                setEmploy(responseData);
              }else{
                Toast.show('Try with diffrent keyword');
              }
            })
            .catch(error => {
              stopLoader();
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
    


      
      const handleApprove = index => {
        setApprove(index);
      };
      
      const emptyList = () => {
        setSearch('')
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




    const initialLoading = () =>{
        GetTaxiPendingList()
        ApprovedTaxiReport()
      }

    useFocusEffect(
        React.useCallback(() => {
          const unsubscribe = initialLoading();
          return () => unsubscribe;
        }, [])
    );
    
  const ItemRender = ({ item }) => (
    <View style={styles.item}>
       <View style={[styles.itemColumn]}>
         <Text style={styles.itemText}>{moment(item.TCAR_APPROX_TIME_OUT).format("MM/DD/YY")}</Text>
       </View>
       <View style={[styles.itemColumn, {flex:0.40}]}>
         <Text style={styles.itemText}>{item.EMPL_NAME}</Text>
       </View>
       <View style={styles.itemColumn}>
         <Text style={styles.itemText}>{item.TCAR_SLIP_NO}</Text>
       </View>
       <View style={styles.itemColumn}>         
        <Text style={styles.itemText}>{item.EMPL_DEPT_CODE}</Text>        
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
        <Text Bold style={[styles.HeaderColumn]}>Date</Text>
        <Text Bold style={[styles.HeaderColumn, {flex:0.40}]}>Name</Text>
        <Text Bold style={styles.HeaderColumn}>Slip No.</Text>
        <Text Bold style={styles.HeaderColumn}>Dept</Text>
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

    <View style={{ width: '100%', marginVertical: 0 }}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Approve Taxi', 'View Report']}
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


      <View style={{ flex: 1 }}>
        {approve == 0 ? (
          <View style={{flex: 1, width: '100%', marginVertical: 0,paddingHorizontal:10}}>
            <View
              style={styles.SearchInput}>
              <View
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="search" size={20} color={GlobalColor.Secondary} />
              </View>
              <TextInput
                placeholder="Search By Name/Dept/Staff/ID"
                value={search}
                onChangeText={(data) => {
                  setSearch(data)
                }}
                style={{
                  width: '65%',
                  paddingVertical: 5,
                  fontSize: 16
                }}
              />

              {search !== '' ? (
                <TouchableOpacity
                  style={{}} onPress={() => { emptyList() }}>
                  <Ionicons
                    style={{ paddingVertical: 10 }}
                    name="close-circle-outline"
                    size={25}
                    color={GlobalColor.Secondary}
                  />
                </TouchableOpacity>
              ) : null}


              <TouchableOpacity
                onPress={() => {
                  SearchEmployee()
                }}
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="send" size={20} color={GlobalColor.Secondary} />
              </TouchableOpacity>
            </View>


            <FlatList
              contentContainerStyle={{ flexGrow:1 }}            
              data={employ}
              keyExtractor={({ item, index }) => index}
              ListEmptyComponent={() => {
                return (
                    <ListEmptyComponent 
                    title="No Data Found"
                    enableRefresh={true} onRefreshCallback={() => ApprovedTaxiReport(true)} refreshing={refresh}
                    ></ListEmptyComponent>      
                )
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.FlatListData} 
                  onPress={() => {
                    navigation.navigate('ManagerTaxiApproval',{data:item})
                  }}
                  >
                    <Ionicons
                      style={styles.searchIcon}
                      name="person-circle-outline"
                      size={25}
                      color={GlobalColor.Secondary}
                    />
                    <View style={{ flexDirection: 'column', width: '70%' }}>
                      <Text >
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
                        color={GlobalColor.Secondary}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
                contentContainerStyle={{ flex:1 }}
                data={approvedTaxiReport}
                renderItem={ItemRender}
                keyExtractor={item => item.id}
                ListHeaderComponent={FlatList_Header}
                ListHeaderComponentStyle={{ borderBottomColor: GlobalColor.Secondary, borderBottomWidth: 1 }}
                ListEmptyComponent={<ListEmptyComponent 
                    title="No Data Found"
                    enableRefresh={true} onRefreshCallback={() => ApprovedTaxiReport(true)} refreshing={refresh}
                    ></ListEmptyComponent>
                }
            />
          </View>
        )}
      </View>
      </SafeAreaView>
    );
};

export default ManagerTaxi;

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
        paddingHorizontal:10,
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
      SearchInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: GlobalColor.Secondary,
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 5,
        marginTop:5,
        height:50,
        backgroundColor: GlobalColor.White
      },
      FlatListData: {
        width: "100%",    
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal:5,
        marginTop: 10,
        backgroundColor: GlobalColor.White,
        shadowColor: GlobalColor.Black,
        shadowOffset: {
          width: -0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        borderRadius: 3,
      },
})

