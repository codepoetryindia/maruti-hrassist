//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

// create a component
const Shift = () => {
    const [Shift , setShift] = useState ([])
    const handleShift = index =>{
        setShift(index);
    };
    return (
        <View style={styles.container}>
            <View style={{width: '100%'}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Shift Details', 'Flexi Shift']}
          selectedIndex={Shift}
          onTabPress={index => {
            handleShift(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"90%",
        alignSelf:'center',
        marginTop:10,
    },
    tabStyle: {
        //custom styles
        paddingVertical: 10,
        borderColor: '#ad3231',
      },
      tabTextStyle: {
        //custom styles
        fontWeight: '700',
        color: 'grey',
      },
      activeTabStyle: {
        //custom styles
        backgroundColor: 'transparent',
        borderBottomWidth: 4,
        borderBottomColor: '#2757C3',
        // borderColor:Colors.primaryColor
      },
      activeTabTextStyle: {
        color: '#2757C3',
      },
      content:{
          top:10,
            alignItems:'center',
            padding:10,
            backgroundColor:'white',
            borderRadius:5,
            shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 2.0,
            
                elevation: 5,
           
      }
});

//make this component available to the app
export default Shift;
