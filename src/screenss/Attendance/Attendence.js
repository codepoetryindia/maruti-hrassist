//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DateTimePicker from '@react-native-community/datetimepicker';
// create a component
const Attendance = () => {
    const [mode, setMode] = useState('date');
    const [MarkAttandance , setMarkAttandance] = useState(0)
    const handleMarkAttandance = index => {
        setMarkAttandance(index);
      };
    return (
        <View style={styles.container}>
           <View style={{width: '100%'}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Mark Attendance', 'View Report']}
          selectedIndex={MarkAttandance}
          onTabPress={index => {
            handleMarkAttandance(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>


      <View>
          {
             MarkAttandance== 0 ?(
                 <View>
                     <View style={styles.content}>
                        <Text>Live Location</Text>
                        <Text>PF95+6MM,</Text>
                        <Text>West Bengal , siliguri 734004</Text>
                     </View>
                 </View>) : (<View>
                    <Text>Date Picker</Text>
                 </View>)
          }
      </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"90%",
        alignSelf: 'center',
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
export default Attendance;
