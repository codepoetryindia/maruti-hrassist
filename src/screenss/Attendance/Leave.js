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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import {DataTable} from 'react-native-paper';
// create a component
const Leave = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [applyLeave, setapplyLeave] = useState([0]);
  const [isSelected, setSelection] = useState('');
  const [period, setPeriod] = useState('');
  const [checked, setChecked] = useState('');
  const [validReason, setValidReason] = useState('Select Reason');
  const [comment, setComment] = useState('');

  var radio_props = [
    {label: 'Planned', value: 0},
    {label: 'Unplanned', value: 1},
  ];
  var radio_propsSecond = [
    {label: 'Full Day', value: 0},
    {label: '1st Half', value: 1},
    {label: '2nd Half', value: 2},
  ];

  const checkData = () => {
    if (checked == '') {
      alert('All field is Required');
    }
    // else if(isSelected==''){
    //   alert('select planed')
    //   console.log('value',isSelected)
    // }
    else if (validReason === 'Select Reason') {
      alert('select one ');
    } else alert('sucessfull');
  };
  // const leaveSchema = yup.object().shape({
  //   leave: yup.required('Leave Type Required'),
  //   RadioForm: yup.required('RadioForm is required'),
  // });
  // const handleLogin = data => {
  //   dispatch(loginAction(data));
  // };
  const financeData = [
    {
      id: '1',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'AEDFGRD',
      period: 'full Day',
      Status: 'Success',
    },
    {
      id: '2',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'AJJJRD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '3',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARJJD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '4',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARYYD',
      period: 'full Day',
      Status: 'Success',
    },
    {
      id: '5',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARGGD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '6',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARRRRD',
      period: 'full Day',
      Status: 'Success',
    },
    {
      id: '7',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARGGD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '8',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARAAD',
      period: 'full Day',
      Status: 'Success',
    },
    {
      id: '9',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ABRD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '10',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'A5RRD',
      period: 'full Day',
      Status: 'Success',
    },
    {
      id: '11',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARGD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '12',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ADRD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '13',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARGD',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '14',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARDF',
      period: 'full Day',
      Status: 'pending',
    },
    {
      id: '15',
      FromDate: '12-05-1999',
      toDate: '24-09-2021',
      type: 'ARD',
      period: 'full Day',
      Status: 'pending',
    },
  ];
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
      id: '6',
      Type: 'CBR',
    },
    {
      id: '7',
      Type: 'CBR',
    },
    {
      id: '8',
      Type: 'CBR',
    },
  ];

  const reason = [
    {
      id: '1',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '2',
      reason:
        'Adverse House situations. You are urgently needed at home because there was a fire, structural damage to your home, a flooded bathroom, etc.',
    },
    {
      id: '3',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '4',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '5',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '6',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '7',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '8',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '9',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '10',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '11',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '12',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '13',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '14',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '15',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '16',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '17',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '18',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '19',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
    {
      id: '20',
      reason:
        'Someone at-home is sick (e.g. your husband, mother, father, son, daughter, etc.)',
    },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLeave = index => {
    setapplyLeave(index);
  };

  const FinancialYear = ['2021', '2022', '1999'];

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
            setValidReason(item.reason);
            setModalVisible(false);
          }}>
          <Text style={{color: '#fff', fontSize: 15}}>{item.reason}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <SegmentedControlTab
          borderRadius={8}
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
            <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
              Leave Type
            </Text>
            <View style={styles.box}>
              <FlatList
                numColumns={4}
                data={leave}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setChecked(item.id);
                    }}
                    style={[
                      styles.circle,
                      {
                        backgroundColor: checked == item.id ? '#ad3231' : null,
                      },
                    ]}>
                    <Text style={{color: checked == item.id ? '#fff' : '#000'}}>
                      {item.Type}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
              Planned/Unplanned
            </Text>
            <View style={styles.box}>
              <View style={{flexDirection: 'row', padding: 8}}>
                <RadioForm
                  borderRadius={0}
                  radio_props={radio_props}
                  initial={isSelected}
                  onPress={value => {
                    setSelection(isSelected);
                    console.log('value', value);
                  }}
                  borderWidth={0.5}
                  buttonInnerColor={'#e74c3c'}
                  buttonOuterColor={'#23f'}
                  buttonSize={10}
                  buttonOuterSize={20}
                />
              </View>
            </View>

            <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
              Period
            </Text>
            <View style={styles.box}>
              <View style={{flexDirection: 'row', padding: 8}}>
                <RadioForm
                  borderRadius={0}
                  radio_props={radio_propsSecond}
                  initial={period}
                  onPress={value => {
                    setPeriod(period);
                    console.log('second', value);
                  }}
                  borderWidth={0.5}
                  buttonInnerColor={'#e74c3c'}
                  buttonOuterColor={'#23f'}
                  buttonSize={10}
                  buttonOuterSize={20}
                />
              </View>
            </View>
            <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
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
              <View
                style={{
                  width: '48%',
                }}>
                <Text>Start Date</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    ...{moment(fromDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity onPress={() => setOpen(true)}>
                        <Ionicons
                          name="calendar-outline"
                          size={30}
                          color={'#ad3231'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <DatePicker
                  modal
                  open={open}
                  date={fromDate}
                  mode="date"
                  onConfirm={fromDate => {
                    setOpen(false);
                    setFromDate(fromDate);
                    console.log(fromDate);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <DatePicker
                  modal
                  mode="date"
                  open={openSecond}
                  date={toDate}
                  onConfirm={toDate => {
                    setOpenSecond(false);
                    setToDate(toDate);
                    console.log(toDate);
                  }}
                  onCancel={() => {
                    setOpenSecond(false);
                  }}
                />
              </View>
              <View
                style={{
                  width: '48%',
                }}>
                <Text>End Date</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    padding: 3,
                  }}>
                  <Text style={{color: 'gray'}}>
                    ...{moment(toDate).format('MMM Do YYYY')}
                  </Text>
                  <View>
                    <View>
                      <TouchableOpacity onPress={() => setOpenSecond(true)}>
                        <Ionicons
                          name="calendar-outline"
                          size={30}
                          color={'#ad3231'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Text style={{paddingVertical: 15, paddingHorizontal: 20}}>
              Choose Your Reason
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
                <Text>{validReason}</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  color={'#23d'}
                  size={20}
                />
                <Modal isVisible={isModalVisible}>
                  <View>
                    <LinearGradient
                      colors={['#2757C3', '#80406A', '#ad3231']}
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
                          paddingHorizontal: 30,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 18,
                            letterSpacing: 1,
                          }}>
                          Select Reason
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
                        data={reason}
                        keyExtractor={item => item.id}
                        renderItem={rederReason}
                      />
                    </LinearGradient>
                  </View>
                </Modal>
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
                onPress={() => {
                  checkData();
                }}>
                <LinearGradient
                  style={{
                    padding: 20,
                    borderRadius: 8,
                    alignItems: 'center',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}
                  colors={['#2757C3', '#80406A', '#AD3231']}>
                  <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <ScrollView style={{paddingVertical: 10, height: '82%'}}>
            <Text style={{paddingHorizontal: 20}}>Select Financial Year</Text>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 2.0,
                elevation: 2,
                marginVertical: 15,
              }}>
              <SelectDropdown
                defaultButtonText="Select Any Year"
                data={FinancialYear}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: 40,
                  borderRadius: 5,
                }}
                dropdownStyle={{borderRadius: 10}}
                rowTextStyle={{textAlign: 'left', marginLeft: 5}}
                buttonTextStyle={{textAlign: 'left', marginLeft: 1}}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={18}
                    />
                  );
                }}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            <Text style={{textAlign: 'center'}}>
              Tap on Leave To View Details
            </Text>

            {/* Headings */}

            <View>
              <DataTable
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  marginVertical: '5%',
                }}>
                <DataTable.Header style={{backgroundColor: '#f8eded'}}>
                  <DataTable.Title>
                    <Text style={{color: 'gray', fontSize: 18}}>Date</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric>
                    <Text style={{color: 'gray', fontSize: 16}}>Type</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric>
                    <Text style={{color: 'gray', fontSize: 16}}>Period</Text>
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
                      <TouchableOpacity  onPress={toggleModal}>
                      <Modal isVisible={isModalVisible}>
                  <View>
                    <LinearGradient
                      colors={['#2757C3', '#80406A', '#ad3231']}
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
                          paddingHorizontal: 30,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 18,
                            letterSpacing: 1,
                          }}>
                          Select Reason
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
                        data={reason}
                        keyExtractor={item => item.id}
                        renderItem={rederReason}
                      />
                    </LinearGradient>
                  </View>
                </Modal>
                      <DataTable.Row style={{borderBottomWidth:1,paddingVertical:5}}>
                        <View
                          style={{flexDirection: 'column', marginTop: '2%'}}>
                          <DataTable.Cell numeric>
                            {item.FromDate}
                          </DataTable.Cell>
                          <DataTable.Cell numeric>{item.toDate}</DataTable.Cell>
                        </View>
                        <DataTable.Cell numeric>{item.type}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.period}</DataTable.Cell>
                        <DataTable.Cell numeric>
                          {item.Status === 'Success' ? (
                            <Text style={{color: 'green'}}>Success</Text>
                          ) : (
                            <Text style={{color: 'red'}}>pending</Text>
                          )}
                        </DataTable.Cell>
                      </DataTable.Row>
                     

                      </TouchableOpacity>
                    </View>
                  )}
                />
              </DataTable>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    borderRadius: 10,
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
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '2%',
    marginHorizontal: 28,

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
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  comment: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
    maxHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,
    elevation: 2,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

//make this component available to the app
export default Leave;
