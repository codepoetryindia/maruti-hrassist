//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
// create a component
const Hospital = () => {

  // const {hospitalDetails} = useSelector (state => state.apiHospitalDetails);
  // const dispatch = useDispatch();

  // useEffect(() =>{
  //   dispatch(hospitalData());
  // },[]);
 
  return (
    <View style={styles.container}>
      <View style={styles.itemBox}>
        <Text>HospitalList</Text>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          // data={hospitalDetails}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.box}>
              <View style={{width: '90%'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <Text>{item.body}</Text>
              </View>
              <TouchableOpacity style={{width: '10%'}}>
                <Feather name="phone-call" size={20} color={'#ad3231'} />
              </TouchableOpacity> 
            </View>
          )}
        /> */}
        
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemBox: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  box: {
    width: '90%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Hospital;
