import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';

// create a component
const Benifits = () => {
  const data = [
    {id: '1', text: 'PL Encashment'},
    {id: '2', text: 'LTA Encashment'},
    {id: '3', text: 'Conveyance Bills (SMGR & Above)'},
    
    
  ];
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.box}>
            <View style={styles.iconBox}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#ad3231',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Foundation
                  name="page-export-pdf"
                  size={20}
                  color={'#ad3231'}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text>{item.text}</Text>
              <Feather name="corner-up-right" size={20} />
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '90%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 15,
  },
  iconBox: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

//make this component available to the app
export default Benifits;
