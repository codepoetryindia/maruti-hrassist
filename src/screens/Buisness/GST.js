//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, ActivityIndicator, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import TextInput from '../../components/reusable/TextInput'
import { Header } from '../../components/reusable/Header';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import Text from '../../components/reusable/Text';
// create a component
const Gst = ({ navigation }) => {
  const [gst, setGst] = useState([])

  const { authContext, AppUserData } = useContext(AuthContext);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');


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


  const GetGSTDetailstApi = () => {
    let token = AppUserData.token
    let UserId = AppUserData.data
    setLoader(true);
    ApiService.PostMethode('/GetGSTDetails', UserId, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("setGst", ApiValue);
        setGst(ApiValue)
      })
      .catch(error => {
        setLoader(false);
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
  };

  const filterdData = (text) => {
    if (text) {
      const NewData = gst.filter((item) => {
        const itemData = item.MAPP_GSTN_STATE_NAME ? item.MAPP_GSTN_STATE_NAME.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(NewData);
      setSearchText(text);
      console.log("newData", NewData);
    }
    else {
      setFilteredDataSource(gst);
      setSearchText()
    }
  }
  useEffect(() => {
    GetGSTDetailstApi()
    filterdData()
  }, [])

  if (loader) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={"GST Details"} back />
        <LoadingScreen />
      </SafeAreaView>
    )
  }

  return (

    <SafeAreaView style={styles.container}>
      <Header title={"GST Details"} />
      {loader == true ? (
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : null}

      {/* BODY   ##########################3############       */}

      {/* SEARCH BOX */}
      <View style={styles.MainContainer}>
      <View
        style={styles.SearchContainer}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={25}
          color="#b2bec3"
        />

        <TextInput
          placeholder="Search By StateName"
          secureTextEntry={false}
          autoCapitalize='characters'
          onChangeText={(text) => {
            filterdData(text)
          }}
          value={searchText}
        />
      </View>

      {/* FLATLIST */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredDataSource.length == 0 ? gst : filteredDataSource}
        style={{ height: '80%' }}

        ListEmptyComponent={() => <ListEmptyComponent title="No Data Found" enableRefresh={true} onRefreshCallback={() => SearchEmployee()} refreshing={refresh}></ListEmptyComponent>}

        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return (
            <View>
              <TouchableOpacity style={styles.TouchableOpacity}>
                <View
                  style={styles.HeadingContainer}>
                  <Text style={{ fontSize: 16, color: GlobalColor.White, padding: 10, }}>
                    {item.MAPP_GSTN_STATE_NAME}
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                  <Text style={styles.GStBox}>GST Number</Text>
                  <Text style={{ color: GlobalColor.Black }}>{item.MAPP_GSTN_REG_NO}</Text>
                  <Text style={styles.GStBox}>Company Name</Text>
                  <Text style={{ color: GlobalColor.Black }}>{item.MAPP_GSTN_COMPANY_NAME}</Text>
                  <Text style={styles.GStBox}>Address</Text>
                  <Text style={{ color: GlobalColor.Black }}>{item.MAPP_GSTN_ADDRESS}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: GlobalColor.PrimaryLight,   
  },
  MainContainer:{
    paddingHorizontal:20
  },
  SearchContainer: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: "#fff",
    color: GlobalColor.Primary,
    fontSize: GlobalFontSize.Small,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    paddingHorizontal: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,

  },


  TouchableOpacity: {
    width: '100%',
    paddingTop: 1,
    backgroundColor: GlobalColor.White,
    alignSelf: 'center',
    margin: 10,
    paddingVertical: 10,
    shadowColor: GlobalColor.ShadowColor,
    shadowOffset: {
      width: -0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    borderRadius: 8,
  },
  HeadingContainer:{
    width: '100%',
    backgroundColor: GlobalColor.PrimaryGradient,
    alignSelf: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  searchIcon: {
    padding: 10,
  },
  GStBox: {
    fontSize: 16,
    color: GlobalColor.LightDark,
    paddingVertical: 10,
    paddingBottom: 5,
    letterSpacing: 1,
  },
  spinnerTextStyle: {
    color: GlobalColor.White,
  },
});

//make this component available to the app
export default Gst;
