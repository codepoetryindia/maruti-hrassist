//import liraries
import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ApiService from '../../Utils/Utils';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
// create a component
const EmployeeDirect = () => {
  const [search,setSearch] = useState ('')
  const [loader,setLoader]= useState(false)
  const [searchedData,setSearchData]= useState([])

  const token = useSelector(state => {
    return {
      token: state.LoginThunkReducers.token,
    };
  });
  const SearchEmployee = () => {
    console.log('post data' , search);
    if(search === ''){
      alert("please enter a valid keyWord ")
      return
    } else{
      let apiData = {
        Search:search
      }
      setLoader(true);
    ApiService.PostMethode('/GetEmplLookup', apiData, token)
      .then(result => {
        setLoader(false);
        console.log('ApiResult', result);
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
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
  return (
    loader ==true ? (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator color='red'size={30}/>
        <Text>
          Loading...
        </Text>
      </View>
    ):(
    <View style={styles.container}>
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
          onChangeText={(data) => {setSearch(data)}}
        />
        <TouchableOpacity onPress={() => {SearchEmployee()}}>
        <Ionicons
          style={styles.searchIcon}
          name="send"
          size={20}
          color="#2757C3"
        />
        </TouchableOpacity>
      </View>
    </View>
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
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#ad3231',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '77%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    
  },
});

//make this component available to the app
export default EmployeeDirect;
