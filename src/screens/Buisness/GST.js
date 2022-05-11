//import liraries
import React,{ useState,useEffect ,useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList,TextInput, ScrollView,ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
// create a component
const Gst = ({navigation}) => {
  const[gst,setGst] = useState([])
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);
  const[filteredDataSource,setFilteredDataSource]=useState(null);
  const[searchText,setSearchText] = useState('');

  // const searchFilterFunction = (text) => {
  //   let filterSearchData = gst
  //   setSearchText(text);
  //   // console.log(text);
  //   const newData = filterSearchData.filter((item) => {
  //     // ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}
  //     const itemData = `${item.MAPP_GSTN_REG_NO.toUpperCase()}`;
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });

  //   if(filterSearchData.length > 0){
  //     let data = [];
  //     newData.forEach(element => {
  //       if(element===searchText){
  //         console.log("newDara",newData);
  //         data.push(newData)
  //       }
  //     });
  //     // console.log("filtered Data" , data);
  //     setGst(data);
  //   }else{
  //     setGst([]);    
  //   }
  //   // setEnquiryList(newData);  
  // };

  
  const GetGSTDetailstApi = () => {
  let token = AppUserData.token
  let UserId = AppUserData.data
  setLoader(true);
  ApiService.PostMethode('/GetGSTDetails', UserId, token)
    .then(result => {
      setLoader(false);
      let ApiValue = result.Value
      console.log("setMenu", ApiValue);
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
  const filterdData = 
    searchText ? gst.filter(item => {
        const itemData = item.MAPP_GSTN_REG_NO.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : gst;
    console.log("gst",gst);

useEffect(() => {
  GetGSTDetailstApi()
}, [])
  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='red' size={30} />
        <Text>
          Loading...
        </Text>
      </View>
    ) :(
    <View style={styles.container}>
      <LinearGradient
        style={{padding: 20}}
        colors={['#2757C3', '#80406A', '#ad3231']}>
        <View style={{flexDirection: 'row'}}>
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
          borderTopColor: '#80406A',
          borderStartColor: '#ad3231',
          borderBottomColor: '#2757C3',
          borderEndColor: '#ad3231',
          borderRadius: 5,
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Feather name="search" size={20} color={'#ad3231'} />
        </View>
        <TextInput
          placeholder="Search By Name/Dept/Staff/ID"
          autoCapitalize='characters'
          onChangeText={(searchText) => {
            setSearchText(searchText)
          }}
          value={searchText}
          style={{
            width: '70%',
            paddingVertical: 5,
          }}
        />
        <TouchableOpacity
          style={{
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="send" size={20} color={'#ad3231'} />
        </TouchableOpacity>
      </View>

      {/* FLATLIST */}

      <FlatList
        data={filterdData}
        keyExtractor={item => item.MAPP_GSTN_REG_NO}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity style={styles.TouchableOpacity}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#f8eded',
                    alignSelf: 'center',
                    paddingBottom: 5,
                  }}>
                  <Text style={{fontSize: 16, color: '#000', padding: 10}}>
                    {item.MAPP_GSTN_STATE_NAME}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
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
    </View>
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
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#ad3231',

    borderRadius: 8,
  },
  GStBox: {
    fontSize: 16,
    color: 'grey',
    paddingVertical: 10,
    paddingBottom: 5,
    letterSpacing: 1,
  },
});

//make this component available to the app
export default Gst;
// '#',