//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import { useDispatch , useSelector } from 'react-redux';
import { hospitalData } from '../../actions/hospitalData';
// create a component
const Hospital = () => {

  const {hospitalDetails} = useSelector (state => state.apiHospitalDetails);
  const dispatch = useDispatch();
  // const handleHospitalApi = () =>{
  //  dispatch (hospitalData())
  // }
  // }
  useEffect(() =>{
    hospitalData();
  },[]);
  // const hospitals = [
  //   {
  //     'id': '1',
  //     'hospitalName': 'ACMH Hospital',
  //     'hospialAdd': '1 Nolte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     'id': '2',
  //     'hospitalName': 'AADHAR HEALTH INSSTITUTE',
  //     'hospialAdd': 'SILIGURI 734004 , NEAR SEIVOK MORE',
  //   },
  //   {
  //     id: '3',
  //     hospitalName: 'SOLKHA HOSPITAL',
  //     hospialAdd: 'NAGRAKATA , SOLKHAPARA ,735225',
  //   },
  //   {
  //     id: '4',
  //     hospitalName: 'ACMH Hospital',
  //     hospialAdd: '1 Nolte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '5',
  //     hospitalName: 'AADHAR HEALTH INSSTITUTE',
  //     hospialAdd: 'SILIGURI 734004 , NEAR SEIVOK MORE',
  //   },
  //   {
  //     id: '6',
  //     hospitalName: 'SOLKHA HOSPITAL',
  //     hospialAdd: 'NAGRAKATA , SOLKHAPARA ,735225',
  //   },
  //   {
  //     id: '7',
  //     hospitalName: 'ACMHFDD Hospital',
  //     hospialAdd: '1 Drive Kittanning, PA 16201-7111',
  //   },

  //   {
  //     id: '8',
  //     hospitalName: 'ACMHDV Hospital',
  //     hospialAdd: 'ENoDDDlte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '9',
  //     hospitalName: 'ACMDDH Hospital',
  //     hospialAdd: '1 NDSDFDDColte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '10',
  //     hospitalName: 'ACMH Hospital',
  //     hospialAdd: '1 Nolte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '11',
  //     hospitalName: 'AADHAR HEALTH INSSTITUTE',
  //     hospialAdd: 'SILIGURI 734004 , NEAR SEIVOK MORE',
  //   },
  //   {
  //     id: '12',
  //     hospitalName: 'SOLKHA HOSPITAL',
  //     hospialAdd: 'NAGRAKATA , SOLKHAPARA ,735225',
  //   },
  //   {
  //     id: '13',
  //     hospitalName: 'ACMHFDD Hospital',
  //     hospialAdd: '1 Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '14',
  //     hospitalName: 'ACMHDV Hospital',
  //     hospialAdd: 'ENoDDDlte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '15',
  //     hospitalName: 'ACMDDH Hospital',
  //     hospialAdd: '1 NDSDFDDColte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '16',
  //     hospitalName: 'ACMH Hospital',
  //     hospialAdd: '1 Nolte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '17',
  //     hospitalName: 'AADHAR HEALTH INSSTITUTE',
  //     hospialAdd: 'SILIGURI 734004 , NEAR SEIVOK MORE',
  //   },
  //   {
  //     id: '18',
  //     hospitalName: 'SOLKHA HOSPITAL',
  //     hospialAdd: 'NAGRAKATA , SOLKHAPARA ,735225',
  //   },
  //   {
  //     id: '19',
  //     hospitalName: 'ACMHFDD Hospital',
  //     hospialAdd: '1 Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '20',
  //     hospitalName: 'ACMHDV Hospital',
  //     hospialAdd: 'ENoDDDlte Drive Kittanning, PA 16201-7111',
  //   },
  //   {
  //     id: '',
  //     hospitalName: 'ACMDDH Hospital',
  //     hospialAdd: '1 NDSDFDDColte Drive Kittanning, PA 16201-7111',
  //   },
  // ];
  return (
    <View style={styles.container}>
      <View style={styles.itemBox}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={hospitalDetails}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.box}>
              <View style={{width: '90%'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <Text>{item.body}</Text>
              </View>
              <TouchableOpacity style={{width: '10%'}} onPress={() =>{handleHospitalApi()}}>
                <Feather name="phone-call" size={20} color={'#ad3231'} />
              </TouchableOpacity> 
            </View>
          )}
        />
        
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
