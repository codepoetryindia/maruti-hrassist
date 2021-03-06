//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    useWindowDimensions,
    SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast'
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';



const CompayShiftDe = ({ navigation }) => {


    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false)
    const [companyShiftMaster, setCompanyShiftMaster] = useState('');
    const [refresh, setrefresh] = useState(false);


    const stopLoader = () => {
        try {
            setLoader(false);
            setrefresh(false);
        } catch (error) {
            console.log(error)
        }
    }


    const CompanyShiftMaster = (pulldown = false) => {
        if (!pulldown) {
            setLoader(true);
        }
        let userId = AppUserData?.data?.userId
        let token = AppUserData.token;
        let apiData = {
            "UserName": userId
        };
        ApiService.PostMethode('/CompanyShiftMaster  ', apiData, token)
            .then(result => {
                console.log("APiresult CompanyShiftMaster", result);
                stopLoader(false);
                ApiResult = result.Value
                setCompanyShiftMaster(ApiResult)
            })
            .catch(error => {
                stopLoader(false);
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
    useEffect(() => {
        CompanyShiftMaster();
    }, []);


    if (loader) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header title={"Company Shift Details"} back />
                <LoadingScreen />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
            <Header title={"Company Shift Details"} back />
            <View style={{ flex: 1, backgroundColor: GlobalColor.PrimaryLight, paddingHorizontal: 10, paddingTop: 10 }}>

                <FlatList
                    contentContainerStyle={{ flexGrow: 1, paddingVertical: 5 }}
                    data={companyShiftMaster}
                    ListEmptyComponent={() => <ListEmptyComponent title="No Data Found" enableRefresh={true} onRefreshCallback={() => CompanyShiftMaster(true)} refreshing={refresh} ></ListEmptyComponent>}
                    keyExtractor={({ item, index }) => index}
                    renderItem={({ item, index }) => {
                        return (
                            // <View
                            //     style={styles.canteen}>
                            //     <Text>{item.CAL_NO}</Text>
                            //     <Text>{item.SHIFT}</Text>
                            //     <Text>{item.START_TIME}</Text>
                            //     <Text>{item.FIRST_HALF_END}</Text>
                            // </View>

                            <View style={styles.cardContainer}>
                                <View style={styles.cardRow}>
                                    <View style={styles.cardColumn}>
                                        <Text style={styles.cardLabel}>
                                            Shift
                                        </Text>
                                        <Text Bold style={styles.cardValue}>{item.SHIFT}</Text>
                                    </View>
                                    <View style={styles.cardColumn}>
                                        <Text style={styles.cardLabelRight}>
                                            Cal Type
                                        </Text>
                                        <Text Bold style={styles.cardValueRight}>{item.CAL_NO}</Text>
                                    </View>
                                </View>


                                <View style={styles.cardRow}>
                                    <View style={styles.cardColumn}>
                                        <Text style={styles.cardLabel}>Start</Text>
                                        <Text Bold style={styles.cardValue}>{item.START_TIME}</Text>
                                    </View>
                                    <View style={styles.cardColumn}>
                                    <Text style={styles.cardLabelRight}>End</Text>
                                        <Text Bold style={styles.cardValueRight}>{item.END_TIME}</Text> 
                                    </View>
                                </View>


                                <View style={styles.cardRow}>
                                    <View style={styles.cardColumn}>
                                        <Text style={styles.cardLabel}>
                                        1st Half End
                                        </Text>
                                        <Text Bold style={styles.cardValue}>
                                        {item.FIRST_HALF_END}
                                        </Text>
                                    </View>
                                    <View style={styles.cardColumn}>
                                    <Text style={styles.cardLabelRight}>
                                    2nd Half Start
                                        </Text>
                                        <Text Bold style={styles.cardValueRight}>{item.SECOND_HALF_START}   
                                        </Text>
                                        
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
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

    canteenBox: {
        width: '100%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColor.Secondary
    },
    canteen: {
        width: '100%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: GlobalColor.Secondary,
        marginBottom: 10
    },

    cardContainer: {
        backgroundColor: GlobalColor.White,
        borderWidth: 1,
        borderColor: GlobalColor.Secondary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardValueRight: {
        textAlign: 'right',
        color: GlobalColor.Primary
    },
    cardLabel: {
        color: GlobalColor.Primary,
        fontSize: GlobalFontSize.Error
    },
    cardLabelRight: {
        textAlign: 'right',
        color: GlobalColor.Primary,
        fontSize: GlobalFontSize.Error
    }
});

// //make this component available to the app
export default CompayShiftDe;
