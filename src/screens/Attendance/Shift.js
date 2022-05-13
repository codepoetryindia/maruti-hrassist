//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {DataTable} from 'react-native-paper';
// create a component
const Shift = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [second, setSecond] = useState(false);
  const [textinputDate, setTextinputDate] = useState('');
  const [textinputSecondDate, setTextinputSecondDate] = useState('');
  const [openThird, setOpenThird] = useState(false);
  const [Shift, setShift] = useState([]);
  const [shiftName, setShiftName] = useState('Select Shift');
  const [isModalVisible, setModalVisible] = useState(false);
  const [choseDate, setChoseDate] = useState('');
  const handleShift = index => {
    setShift(index);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const financeData = [
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Approved',
    },
    {
      Shift: 'G(09:30 To 18:15)',
      Date: '30/02/2099',
      status: 'Approved',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Approved',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Approved',
    },
    {
      Shift: 'G(09:30 To 18:15)',
      Date: '30/02/2099',
      status: 'Pending',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Approved',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Pending',
    },
    {
      Shift: 'G(09:30 To 18:15)',
      Date: '30/02/2099',
      status: 'Approved',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Pending',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Approved',
    },
    {
      Shift: 'G(09:30 To 18:15)',
      Date: '30/02/2099',
      status: 'Approved',
    },
    {
      Shift: 'G(09:00 To 18:45)',
      Date: '30/02/2999',
      status: 'Pending',
    },
  ];

  const shiftType = [
    {
      id: '1',
      shift: 'G ~ G Shift',
    },
    {
      id: '2',
      shift: 'K ~ G Shift',
    },
    {
      id: '3',
      shift: 'N ~ G Shift',
    },
    {
      id: '4',
      shift: 'F ~ G Shift',
    },
    {
      id: '5',
      shift: 'E ~ G Shift',
    },
    {
      id: '6',
      shift: 'H ~ G Shift',
    },
    {
      id: '7',
      shift: 'L ~ G Shift',
    },
  ];

  const rederReason = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          margin: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // console.log('selected reason', item);
            setShiftName(item.shift);
            setModalVisible(false);
            console.log('data', shiftName);
          }}>
          <Text style={{color: '#fff', fontSize: 15, paddingHorizontal: 10}}>
            {item.shift}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <SegmentedControlTab
          borderRadius={8}
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

      {Shift == 0 ? (
        <ScrollView>
          <Text style={{paddingTop: 10, paddingHorizontal: 20}}>
            Select Date
          </Text>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#fff',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 10,
              marginVertical: 8,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <DatePicker
              modal
              open={open}
              date={fromDate}
              mode="date"
              onConfirm={fromDate => {
                setOpen(false);
                setFromDate(fromDate);
                let format = moment(fromDate).format('MMM Do YYYY');
                setTextinputDate(format);
                console.log(setTextinputDate);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '49%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder="From"
                style={{color: '#000', letterSpacing: 1}}
                editable={false}
                paddingHorizontal={14}
                value={textinputDate}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Ionicons name="calendar-outline" size={30} color={'#ad3231'} />
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              open={second}
              date={toDate}
              mode="date"
              onConfirm={toDate => {
                setSecond(false);
                setToDate(toDate);
                let formatSecond = moment(toDate).format('MMM Do YYYY');
                setTextinputSecondDate(formatSecond);
                console.log(setTextinputSecondDate);
              }}
              onCancel={() => {
                setSecond(false);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{color: '#000', letterSpacing: 1}}
                placeholder="To"
                editable={false}
                paddingHorizontal={14}
                value={textinputSecondDate}
              />
              <TouchableOpacity onPress={() => setSecond(true)}>
                <Ionicons name="calendar-outline" size={30} color={'#ad3231'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Button */}

          <TouchableOpacity>
            {/* onPress={() => 
             handelDate();
           }} */}

            <LinearGradient
              style={{
                padding: 20,
                borderRadius: 8,
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
              }}
           colors={['#4174D0','#6ef7ff']}>
              <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Show Data */}
          <DataTable
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginVertical: 10,
              marginBottom: '20%',
            }}>
            <DataTable.Header style={{backgroundColor: '#f8eded'}}>
              <DataTable.Title>
                <Text style={{color: 'gray', fontSize: 16}}>Shift</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>
                  Applicable Data
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>Status</Text>
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={financeData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View>
                  <DataTable.Row>
                    <DataTable.Cell numeric>{item.Shift}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.Date}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.status === 'Approved' ? (
                        <Text style={{color: 'green'}}>Approved</Text>
                      ) : (
                        <Text style={{color: 'red'}}>Pending</Text>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              )}
            />
          </DataTable>
        </ScrollView>
      ) : (
        <ScrollView>
          <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
            Shift Name
          </Text>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text>{shiftName}</Text>
              <Ionicons name="arrow-forward-outline" color={'#23d'} size={20} />
              <Modal isVisible={isModalVisible}>
                <View>
                  <LinearGradient
                 colors={['#4174D0','#6ef7ff']}
                    style={{
                      height: '100%',
                      backgroundColor: 'red',
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          letterSpacing: 1,
                        }}>
                        Select Shift
                      </Text>
                      <TouchableOpacity onPress={toggleModal}>
                        <Ionicons
                          name="close-circle-outline"
                          size={30}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={shiftType}
                      keyExtractor={item => item.id}
                      renderItem={rederReason}
                    />
                  </LinearGradient>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>

          <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
            Applicable Date
          </Text>
          <DatePicker
            modal
            open={openThird}
            date={selectDate}
            mode="date"
            onConfirm={selectDate => {
              setOpenThird(false);
              setSelectDate(selectDate);
              let formatDate = moment(selectDate).format('MMM Do YYYY');
              setChoseDate(formatDate);
              console.log(choseDate);
            }}
            onCancel={() => {
              setOpenThird(false);
            }}
          />
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Select Date"
              width={'90%'}
              editable={false}
              paddingHorizontal={14}
              value={choseDate}
            />
            <TouchableOpacity onPress={() => setOpenThird(true)}>
              <Ionicons name="calendar-outline" size={30} color={'#ad3231'} />
            </TouchableOpacity>
          </View>
          <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
            Current Shift
          </Text>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="G(09:12 To 04:45)"
              width={'80%'}
              editable={false}
              paddingHorizontal={14}
            />
          </View>
          {/* Button */}
          <TouchableOpacity>
            <LinearGradient
              style={{
                width: '90%',
                alignSelf: 'center',
                padding: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginVertical: '5%',
              }}
           colors={['#4174D0','#6ef7ff']}>
              <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Report */}
          <Text style={{textAlign: 'center'}}>Report</Text>

          <DataTable
            style={{
              width: '100%',
              backgroundColor: '#fff',
              marginVertical: 10,
              marginBottom: '20%',
            }}>
            <DataTable.Header style={{backgroundColor: '#f8eded'}}>
              <DataTable.Title>
                <Text style={{color: 'gray', fontSize: 16}}>Shift</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>
                  Applicable Data
                </Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={{color: 'gray', fontSize: 16}}>Status</Text>
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={financeData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View>
                  <DataTable.Row>
                    <DataTable.Cell numeric>{item.Shift}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.Date}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.status === 'Approved' ? (
                        <Text style={{color: 'green'}}>Approved</Text>
                      ) : (
                        <Text style={{color: 'red'}}>Pending</Text>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              )}
            />
          </DataTable>
        </ScrollView>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  box: {
    width: '90%',
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
    borderRadius: 8,
  },
  inputBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 5,
    borderRadius: 8,
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
  content: {
    top: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,

    elevation: 5,
  },
});

//make this component available to the app
export default Shift;
