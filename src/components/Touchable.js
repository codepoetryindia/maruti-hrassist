//import liraries
import React, {Component} from 'react';
import {numColumns, Text, StyleSheet, TouchableOpacity, Image,FlatList} from 'react-native';
import { setDisabled } from 'react-native/Libraries/LogBox/Data/LogBoxData';

// create a component
const TouchableCard = () => {
  const Data = [
    {
      id: '1',
      name: 'Employee Lookup',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '2',
      name: 'Attendance & Admin',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '3',
      name: 'Compliances & Benifis',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '4',
      name: 'Hospital & Emergency',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '5',
      name: 'Canteen Menu',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '6',
      name: 'Visitor Gatepass',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '7',
      name: 'Employee Lookup',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '8',
      name: 'Attendance & Admin',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '9',
      name: 'Compliances & Benifis',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '10',
      name: 'Hospital & Emergency',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '11',
      name: 'Canteen Menu',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '12',
      name: 'Visitor Gatepass',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '13',
      name: 'Employee Lookup',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '14',
      name: 'Attendance & Admin',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '15',
      name: 'Compliances & Benifis',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '16',
      name: 'Hospital & Emergency',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '17',
      name: 'Canteen Menu',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    {
      id: '18',
      name: 'Visitor Gatepass',
      images: 'https://tjan90.github.io/code-blog//assets/img/profile.png',
    },
    
  ];
    return (
        <FlatList
        // scrollEnabled={false}
          numColumns={3}
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
            <Image source={{uri :item.images}} style={styles.cardimg} />
            <Text style={{fontSize:10}}>{item.name}</Text>
          </TouchableOpacity>
           
            )}/>
    )
          }
// define your styles
const styles = StyleSheet.create({
  card: {
    width: 108,
    height: 75,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginTop: 10,
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  cardimg: {
    width: 30,
    height: 30,
    margin:10,
  },
});

//make this component available to the app
export default TouchableCard;
