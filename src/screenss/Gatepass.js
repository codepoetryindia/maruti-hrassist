// /import liraries
import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RadioButtonRN from 'radio-buttons-react-native';
import SelectDropdown from 'react-native-select-dropdown';
// import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'
const Gatepass = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalVisibleSecond, setmodalVisibleSecond] = useState(false);
  // const [modalVisibleThird, setmodalVisibleThird] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [state, setState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [searchLevel, setSearchLevel] = useState('');
  const options = ['Yes', 'No'];
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])

  // const []
  // const [toBeSearchLevel, setToBeSearchLevel] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(formatedDate);
    let formatedDate = moment(currentDate).format('LLL');
    console.log(formatedDate);
    setText(formatedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // const handleRadioStatusSecond = value =>{}

  const handleRadioStatus = value => {
    switch (value) {
      case 'A':
        setSelection(true);
        setState(false);
        break;
      case 'B':
        setSelection(false);
        setState(true);
      default:
        break;
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const radioData = [
    {
      label: 'NO SEARCH REQUIRED',
    },
    {
      label: 'INDIVIDUAL AND BELONGING TO BE',
    },
    {
      label: 'INDIVIDUAL AND BELONGING TO BE',
    },
  ];

  // data for Select Building

  const BuildingData = [
    {
      item: 'Juventus',
      id: 'JUVE',
    },
    {
      item: 'Real Madrid',
      id: 'RM',
    },
    {
      item: 'Barcelona',
      id: 'BR',
    },
    {
      item: 'PSG',
      id: 'PSG',
    },
    {
      item: 'FC Bayern Munich',
      id: 'FBM',
    },
    {
      item: 'Manchester United FC',
      id: 'MUN',
    },
    {
      item: 'Manchester City FC',
      id: 'MCI',
    },
    {
      item: 'Everton FC',
      id: 'EVE',
    },
    {
      item: 'Tottenham Hotspur FC',
      id: 'TOT',
    },
    {
      item: 'Chelsea FC',
      id: 'CHE',
    },
    {
      item: 'Liverpool FC',
      id: 'LIV',
    },
    {
      item: 'Arsenal FC',
      id: 'ARS',
    },
  
    {
      item: 'Leicester City FC',
      id: 'LEI',
    },
  ]
  
  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }

  function onChangeOne() {
    return (val) => setSelectedTeam(val)
  }


  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
        style={styles.gradient}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 40,
              alignItems: 'center',
            }}>
            <Ionicons
              name="chevron-back-outline"
              size={15}
              color={'white'}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="menu-outline"
              size={20}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            Visitor Gatepass
          </Text>
        </View>
      </LinearGradient>

      {/* BODY */}
      <View style={{width: '100%', paddingVertical: 10}}>
        <Text
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Your Location
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '90%',
            borderWidth: 1,
            borderTopColor: '#80406A',
            borderStartColor: '#ad3231',
            borderBottomColor: '#2757C3',
            borderEndColor: '#ad3231',
            alignSelf: 'center',
            padding: 10,
            justifyContent: 'space-between',
          }}
          onPress={toggleModal}>
          <Text>
            {isSelected == true ? 'GURGAON FACTORY' : 'HEAD OFFICE - DELHI'}
          </Text>
          <Feather name="chevron-down" size={20} />
          <Modal isVisible={isModalVisible} SLI>
            <View
              style={{
                flex: 0.2,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <View style={{width: '90%', justifyContent: 'space-evenly'}}>
                <LinearGradient
                  style={{margin: 5, borderRadius: 8}}
                  colors={['#2757C3', '#80406A', '#ad3231']}>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                      padding: 10,
                    }}
                    onPress={() => {
                      handleRadioStatus('A');
                      setModalVisible(false);
                    }}>
                    <Text style={{color: 'white'}}>GURGAON FACTORY</Text>
                    {isSelected == true ? (
                      <Ionicons name="checkbox" size={20} color={'#fff'} />
                    ) : (
                      <Ionicons
                        name="square-outline"
                        size={20}
                        color={'#fff'}
                      />
                    )}
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  style={{margin: 5, borderRadius: 8}}
                  colors={['#2757C3', '#80406A', '#ad3231']}>
                  <TouchableOpacity
                    onPress={() => {
                      handleRadioStatus('B');
                      setModalVisible(false);
                    }}
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                      padding: 10,
                    }}>
                    <Text style={{color: 'white'}}>HEAD OFFICE - DELHI</Text>
                    {state == true ? (
                      <Ionicons name="checkbox" size={20} color={'#fff'} />
                    ) : (
                      <Ionicons
                        name="square-outline"
                        size={20}
                        color={'#fff'}
                      />
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>

        {/* Selct Date And Time */}

        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '99%',
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
                paddingVertical: 5,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Select Date and Time
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
                paddingVertical: 5,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Duration
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: '69%',
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 6,
                alignSelf: 'center',
              }}>
              <Text style={{color: 'gray'}}>{text}</Text>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 65,
                    justifyContent: 'space-around',
                  }}>
                  <Ionicons
                    name="calendar-outline"
                    size={25}
                    color={'#ad3231'}
                    onPress={showDatepicker}
                  />

                  <Ionicons
                    name="time-outline"
                    size={25}
                    color={'#ad3231'}
                    onPress={showTimepicker}
                  />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Duration"
              keyboardType={'numeric'}
              style={{
                width: '30%',
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderLeftColor: '#a03231',
                borderBottomColor: '#2757C3',
                borderRightColor: '#ad3231',
                paddingVertical: -1,
              }}
            />
          </View>
        </View>

        {/* Search Level */}
        <View style={{width: '100%'}}>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Search Level *
          </Text>
          <TouchableOpacity
            onPress={() => {
              setmodalVisibleSecond(true);
            }}
            style={{
              width: '90%',
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderTopColor: '#80406A',
              borderStartColor: '#ad3231',
              borderBottomColor: '#2757C3',
              borderEndColor: '#ad3231',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 6,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'gray'}}>{searchLevel}</Text>
            <View>
              <Feather name="chevron-down" size={20} color={'#ad3231'} />
            </View>
          </TouchableOpacity>

          <Modal isVisible={modalVisibleSecond}>
            <View style={{flex: 0.5, paddingVertical: 10}}>
              <LinearGradient
                style={{
                  borderRadius: 8,
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                }}
                colors={['#2757C3', '#80406A', '#ad3231']}>
                <RadioButtonRN
                  boxStyle={{backgroundColor: 'transparent'}}
                  textStyle={{color: '#fff'}}
                  duration={100}
                  data={radioData}
                  selectedBtn={e => {
                    console.log(e);
                    let data = e.label;
                    setSearchLevel(data);
                    setmodalVisibleSecond(false);
                  }}
                  icon={
                    searchLevel == true ? (
                      <Feather name="check-circle" size={25} color="#2c9dd1" />
                    ) : null
                  }
                />
              </LinearGradient>
            </View>
          </Modal>
        </View>

        {/* personal vehical */}

        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '99%',
            }}>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              personal vehical
            </Text>

            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Internal vehical
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <SelectDropdown
              defaultButtonText="Yes"
              buttonStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                width: '49%',
                height: 40,
                borderRadius: 5,
              }}
              buttonTextStyle={{fontSize: 16}}
              dropdownStyle={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                borderRadius: 5,
              }}
              dropdownBackgroundColor={'transparent'}
              data={options}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
            />

            <SelectDropdown
              defaultButtonText="Yes"
              buttonStyle={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                width: '49%',
                height: 40,
                borderRadius: 5,
              }}
              dropdownStyle={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                borderRadius: 5,
              }}
              buttonTextStyle={{fontSize: 16, justifyContent: 'flex-start'}}
              dropdownBackgroundColor={
                <LinearGradient
                  style={{margin: 5, borderRadius: 8}}
                  colors={['#2757C3', '#80406A', '#ad3231']}
                />
              }
              data={options}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              icon={
              <Feather name="chevron-down" size={30} />
            }
            />
          </View>
        </View>

        {/* Vehicle number */}
        <View style={{width: '100%'}}>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Vehicle Number *
          </Text>
          <TextInput
            style={{
              width: '90%',
              alignSelf: 'center',
              borderWidth: 1,
              borderTopColor: '#80406A',
              borderStartColor: '#ad3231',
              borderBottomColor: '#2757C3',
              borderEndColor: '#ad3231',
              borderRadius: 5,
            }}
          />
        </View>

        {/* Select Building / multiple selection*/}

        <View style={{ margin: 30 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
      </View>
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
      {/* <SelectBox
        label="Select single"
        options={BuildingData}
        value={selectedTeam}
        onChange={onChangeOne()}
        hideInputFilter={false}
      /> */}
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text>
      {/* <SelectBox
        label="Select multiple"
        options={BuildingData}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      /> */}
    </View>

    {/* SEARCH BOX */}
    
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },
});

// //make this component available to the app
export default Gatepass;
