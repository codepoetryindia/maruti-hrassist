//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
// create a component
const Gst = ({ navigation }) => {
  const [gst, setGst] = useState([])
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');


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
  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    ) : (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          style={{ padding: 20 }}
       colors={['#4174D0','#6ef7ff']}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 40,
                alignItems: 'center',
              }}>
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color={'white'}
                onPress={() => navigation.navigate("BuisnessTravel")}
              />
              <Ionicons
                name="menu-outline"
                size={25}
                color={'white'}
                onPress={() => navigation.openDrawer()}
              />
            </View>

            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                letterSpacing: 1,
                marginLeft: 30,
              }}>
              GST Details
            </Text>
          </View>
        </LinearGradient>
        

        {/* BODY */}

        {/* SEARCH BOX */}
        <View
          style={{
            marginVertical: 10,
            width: '90%',
            flexDirection: 'row',
            borderWidth: 1,
            borderTopColor: '#2757C3',
            borderStartColor: '#6ef7ff',
            borderBottomColor: '#2757C3',
            borderEndColor: '#6ef7ff',
            borderRadius: 5,
            alignSelf: 'center',
          }}>
          <TextInput
            placeholder="Search By StateName"
            autoCapitalize='characters'
            onChangeText={(text) => {
              filterdData(text)
            }}
            value={searchText}
            style={{
              width: '70%',
              paddingVertical: 5,
            }}
          />
        </View>

        {/* FLATLIST */}

        <FlatList
        showsVerticalScrollIndicator={false}
          data={filteredDataSource.length==0 ? gst : filteredDataSource}
          ListEmptyComponent={() => {
            return (
              <View style={{ width:'100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('.././../assets/Images/dataNotFound.png')}
                  style={{ width: 300, height: 300, resizeMode: 'contain',}} />
                <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index}
          renderItem={({ item,index }) => {
            return (
              <View>
                <TouchableOpacity style={styles.TouchableOpacity}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#6ef7ff',
                      alignSelf: 'center',
                      overflow:'hidden',
                      borderWidth:0.5,
                      borderColor:'#6ef7ff',
                      borderTopLeftRadius:8,
                      borderTopRightRadius:8
                    }}>
                    <Text style={{ fontSize: 16, color: '#000', padding: 10 }}>
                      {item.MAPP_GSTN_STATE_NAME}
                    </Text>
                  </View>
                  <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <Text style={styles.GStBox}>GST Number</Text>
                    <Text>{item.MAPP_GSTN_REG_NO}</Text>
                    <Text style={styles.GStBox}>Company Name</Text>
                    <Text>{item.MAPP_GSTN_COMPANY_NAME}</Text>
                    <Text style={styles.GStBox}>Address</Text>
                    <Text>{item.MAPP_GSTN_ADDRESS}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </SafeAreaView>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TouchableOpacity: {
    width: '90%',
    paddingTop: 1,
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    // borderWidth: 1,
    // borderTopColor: '#80406A',
    // borderStartColor: '#6ef7ff',
    // borderBottomColor: '#2757C3',
    // borderEndColor: '#6ef7ff',

    borderRadius: 8,
  },
  GStBox: {
    fontSize: 16,
    color: 'grey',
    paddingVertical: 10,
    paddingBottom: 5,
    letterSpacing: 1,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

//make this component available to the app
export default Gst;
