//import liraries
import React, { useEffect, useState, useContext, } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image,SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import AuthContext from '../../context/AuthContext'
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// create a component
const EmployeeDirect = () => {
  const myNavigation = useNavigation();

  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(false)
  const [searchedData, setSearchedData] = useState([])
  const { authContext, AppUserData } = useContext(AuthContext);
  useEffect(() => {
    console.log("navigation", myNavigation)
  }, [])
  const SearchEmployee = () => {
    console.log('post data', search);
    if (search === '') {
      alert("please enter a valid keyWord ")
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

  // console.log('searchedData',searchedData)
  return (
    loader == true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='red' size={30} />
        <Text>
          Loading...
        </Text>
      </View>
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color="#2757C3"
          />
          <TextInput
            style={styles.input}
            placeholder="Search By Name/Dept/Staff ID"
            value={search}
            onChangeText={(data) => { setSearch(data) }}
          />
          {search !== '' ? (
            <TouchableOpacity
              style={{ backgroundColor: '#6ef7ff', borderRadius: 8, marginLeft: -3 }} onPress={() => { emptyList() }}>
              <Ionicons
                style={styles.searchIcon}
                name="close-circle-outline"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={() => { SearchEmployee() }}>
            <Ionicons
              style={[styles.searchIcon, { marginLeft: search == '' ? 35 : null }]}
              name="send"
              size={20}
              color="#2757C3"
            />
          </TouchableOpacity>
        </View>
        {searchedData.length > 0 ? (
          <FlatList
            style={{ height: '70%', marginTop: 15 }}
            data={searchedData}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.FlatListData}>
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
        ) : (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/Images/dataNotFound.png')}
            style={{ width: '100%', height: '80%', resizeMode: 'contain', marginLeft: -50 }} />
          <Text style={{ fontSize: 20, textAlign: 'center', }}>No Searched Data</Text>
        </View>)
        }
      </SafeAreaView>
    )
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    top: 10,
    backgroundColor: '#fff',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#6ef7ff',
    borderBottomColor: '#2757C3',
    borderEndColor: '#6ef7ff',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '67%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
  },
  FlatListData: {
    width: '90%',
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#6ef7ff',
    borderBottomColor: '#2757C3',
    borderEndColor: '#6ef7ff',
    borderRadius: 7,
    flexDirection: 'row',
    margin: 3,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 5
  }
});

//make this component available to the app
export default EmployeeDirect;
