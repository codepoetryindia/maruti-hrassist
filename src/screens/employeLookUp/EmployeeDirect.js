//import liraries
import React, { useEffect, useState, useContext, } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image,SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import AuthContext from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import Text from '../../components/reusable/Text';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import TextInput from '../../components/reusable/TextInput';

// create a component
const EmployeeDirect = () => {
  const myNavigation = useNavigation();
  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(false)
  const [searchedData, setSearchedData] = useState([])
  const { authContext, AppUserData } = useContext(AuthContext);
  const [refresh, setrefresh] = useState(false);

  const stopLoader = () => {
    try {
      setLoader(false);
      setrefresh(false);
    } catch(error){
        console.log(error)
    }
  }





  const SearchEmployee = () => {
    if (search === '') {
      alert("Please enter a valid keyword ")
      return
    } else {
      let apiData = {
        Search: search
      }
      let token = AppUserData.token
      setLoader(true);
      ApiService.PostMethode('/GetEmplLookup', apiData, token)
        .then(result => {
          setLoader(false);
          // console.log('ApiResult', result);
          let responseData = result.Value
          setSearchedData(responseData)
          
          // console.log('responseData', responseData)
        })
        .catch(error => {
          setLoader(false);
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

  const emptyList = () => {
    setSearch('')
  }

  if(loader){
    return(
        <LoadingScreen/>
    )
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={25}
            color="#b2bec3"
          />
          <TextInput
            style={styles.input}
            placeholder="Search By Name/Dept/Staff ID"
            value={search}
            onChangeText={(data) => { setSearch(data) }}
          />
          {search !== '' ? (
            <TouchableOpacity
              style={{ borderRadius: 8, marginLeft: -3 }} onPress={() => { emptyList() }}>
              <Ionicons
                style={styles.searchIcon}
                name="close-circle-outline"
                size={25}
                color="#b2bec3"
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => { 
            SearchEmployee() 
            }}>
            <Ionicons
              style={[styles.searchIcon, { marginLeft: search == '' ? 35 : null }]}
              name="send"
              size={25}
              color='#2980b9'
            />
          </TouchableOpacity>
        </View>


          <FlatList
            style={{ width:"100%",marginHorizontal:0 }}
            contentContainerStyle={{ flexGrow:1 }}
            data={searchedData}

            ListEmptyComponent={() => <ListEmptyComponent title="No Data Found" subtitle={search ? "No results please retry with diffrent keyword": "Enter keyword and press search to continue"} enableRefresh={true} onRefreshCallback={()=>SearchEmployee()} refreshing={refresh}></ListEmptyComponent>}


            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.FlatListData} onPress={()=>{
                  // console.log('staff No', item['Staff No']);
                  myNavigation.navigate('EmployProfile',{
                    data:item['Staff No']
                  })                
              }}>
                <Ionicons
                  style={styles.searchIcon}
                  name="person-circle-outline"
                  size={25}
                  color="#2757C3"
                />
                <View style={{ flexDirection: 'column', width: '70%' }}>
                  <Text style={{ fontSize: 16 }}>
                    {item.Name}
                  </Text>
                  <Text>
                    {item.Desg} , {item.Dept} ({item['Staff No']})
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // console.log('staff No', item['Staff No']);
                    myNavigation.navigate('EmployProfile',{
                      data:item['Staff No']
                    })
                  }
                  }>
                  <Ionicons
                    style={styles.searchIcon}
                    name="chevron-forward-circle-outline"
                    size={25}
                    color="#2757C3"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
      </SafeAreaView>
    
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor:'#fff',
  },
  searchSection: {
    backgroundColor: '#fff',
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    margin:10,
    borderWidth: 1,
    borderColor:'#cacaca',
    backgroundColor:'#fff',
    shadowColor: "#444",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '67%',
    paddingTop: 12,
    paddingRight: 10,
    paddingBottom: 12,
    paddingLeft: 0,
    backgroundColor: '#fff',
    fontSize:16
  },
  FlatListData: {
    width:"95%",
    borderWidth: 1,
    borderRadius: 3,
    borderColor:'#ccc',
    flexDirection: 'row',
    // margin:10,
    // width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor:'#fff'
  }
});

//make this component available to the app
export default EmployeeDirect;
