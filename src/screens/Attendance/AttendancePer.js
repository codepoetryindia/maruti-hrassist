//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Alert,
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



const AttendancePer = ({ navigation }) => {
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
      "UserName": userId,
      "Years":3
    };
    ApiService.PostMethode('/GetAttendancePercentageYearwise  ', apiData, token)
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
  useEffect(() => {
    GetAttendancePercentageYearwise();
  }, []);




  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
      <Header title="Attendance Percentage"/>
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
export default AttendancePer;
