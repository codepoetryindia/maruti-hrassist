// /import liraries
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert,
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../../Utils/Utils';
import AuthContext from '../../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { GlobalColor } from '../../../constants/Colors';
import Text from '../../../components/reusable/Text';
// import TextInput from '../../../components/reusable/TextInput';
import { Header } from '../../../components/reusable/Header';
import Button from '../../../components/reusable/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListEmptyComponent from '../../../components/reusable/ListEmptyComponent';



const ManagerAttandancePercentage = ({ navigation, route }) => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const [Attendance, setAttendance] = useState('');
  const [loader, setLoader] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
    } catch (error) {
      console.log(error)
    }
  }


  const GetAttendancePercentageYearwise = (pulldown = false) => {
    if (!pulldown) {
      //Set Loader
      setLoader(true);
    }
    let userId = AppUserData?.data?.userId;
    let token = AppUserData.token;


    let apiData = {
      "UserName": route?.params?.data,
      "Years":3
    };


    ApiService.PostMethode('/GetAttendancePercentageYearwise', apiData, token)
      .then(result => {
        console.log("GetAttendancePercentageYearwise", result);
        stopLoader(false);
        let ApiResult = result.Value
        setAttendance(ApiResult)
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



  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = GetAttendancePercentageYearwise();
      return () => unsubscribe;
    }, [])
);




  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title="Attendance Percentage" back/>
      <View style={{ flex:1, paddingHorizontal:10 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={Attendance}
          ListEmptyComponent={() =>  <ListEmptyComponent title="No Data Found" enableRefresh={true} onRefreshCallback={() => GetAttendancePercentageYearwise(true)} refreshing={refresh} ></ListEmptyComponent>}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.canteen}>
                <Text>{item.MATT_FNYR_YEAR}</Text>
                <Text>{item.MATT_PERCENT}</Text>
              </TouchableOpacity>
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
  canteen: {
    top: 10,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    paddingVertical:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 0
  },
});

// //make this component available to the app
export default ManagerAttandancePercentage;
