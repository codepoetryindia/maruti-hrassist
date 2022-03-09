//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { FlatList } from 'react-native-gesture-handler';

// create a component
const Leave = () => {
  const [applyLeave, setapplyLeave] = useState([0]);
  const [isSelected, setSelection] = useState([0]);
  var radio_props = [
    {label: 'Planned', value: 0},
    {label: 'Unplanned', value: 1},
  ];
  var radio_propsSecond = [
    {label: 'Full Day', value: 0},
    {label: '1st Half', value: 1},
    {label: '2nd Half', value: 2},
  ];
  const handleLeave = index => {
    setapplyLeave(index);
  };

  const leave = [
    {
      id: '1',
      Type: 'CBR',
    },
    {
      id: '2',
      Type: 'CBR',
    },
    {
      id: '3',
      Type: 'CBR',
    },
    {
      id: '4',
      Type: 'CBR',
    },
    {
      id: '5',
      Type: 'CBR',
    },
    {
      id:'6',
      Type:'CBR',
    },
    {
      id:'7',
      Type:'CBR',
    },
    {
      id:'8',
      Type:'CBR',
    }
  ];
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Apply Leave', 'View Report']}
          selectedIndex={applyLeave}
          onTabPress={index => {
            handleLeave(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>
      <View>
        {applyLeave == 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: '80%', paddingVertical: 1}}>
            <Text style={{paddingVertical: 15}}>Leave Type</Text>
            <View style={styles.box}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}>
               <FlatList
               numColumns= {4}
               data={leave}
               keyExtractor={item => item.id}
               renderItem = {({item}) => (
                <View style={styles.circle}>
                <Text>{item.Type}</Text>
              </View>
               )}
               />
              </View>
            </View>

            <Text style={{paddingVertical: 15}}>Planned/Unplanned</Text>
            <View style={styles.box}>
              <View style={{flexDirection: 'row', padding: 8}}>
                <RadioForm
                  borderRadius={0}
                  radio_props={radio_props}
                  initial={isSelected}
                  onPress={value => {
                    setSelection(isSelected);
                  }}
                  borderWidth={0.5}
                  buttonInnerColor={'#e74c3c'}
                  buttonOuterColor={'#23f'}
                  buttonSize={10}
                  buttonOuterSize={20}
                />
              </View>
            </View>

            <Text style={{paddingVertical: 15}}>Period</Text>
            <View style={styles.box}>
              <View style={{flexDirection: 'row', padding: 8}}>
                <RadioForm
                  borderRadius={0}
                  radio_props={radio_propsSecond}
                  initial={isSelected}
                  onPress={value => {
                    setSelection(isSelected);
                  }}
                  borderWidth={0.5}
                  buttonInnerColor={'#e74c3c'}
                  buttonOuterColor={'#23f'}
                  buttonSize={10}
                  buttonOuterSize={20}
                />
              </View>
            </View>
            <Text style={{paddingVertical: 15}}>Select Date</Text>
            <View style={styles.box}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TextInput value="Start Date" />
                <TextInput value="End Date" />
              </View>
            </View>
            <Text style={{paddingVertical: 15}}>Select Your Reason</Text>

            <View style={styles.box}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                }}>
                <Text>Select Reason</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  color={'#23d'}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.comment}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                placeholder={'Comment'}
              />
            </View>

            <View style={{height: 100, marginTop: 10}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  backgroundColor: '#fff',
                  width: '100%',
                  paddingVertical: 25,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 2.0,
                  elevation: 2,
                  borderWidth: 0,
                  marginTop: 10,
                }}>
                <Text>Submit</Text>
                <Ionicons
                  name="cloud-upload-outline"
                  color={'#23d'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View>
            <Text>View report</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  tabStyle: {
    //custom styles
    paddingVertical: 10,
    borderWidth: 1,
    borderTopColor: '#80406A',
    borderStartColor: '#ad3231',
    borderBottomColor: '#2757C3',
    borderEndColor: '#ad3231',
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
  circle: {
    borderWidth: 0.5,
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    margin: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 2.0,

    // elevation: 2,
  },
  box: {
    width: '100%',
    padding: 5,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,

    elevation: 5,
  },
  comment: {
    borderWidth: 0,
    marginTop: 20,
    width: '100%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,

    elevation: 2,
  },
});

//make this component available to the app
export default Leave;
