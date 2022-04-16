// /import liraries
import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Gatepass = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalVisibleSecond, setmodalVisibleSecond] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [state, setState] = useState(false);
  const [searchLevel, setSearchLevel] = useState('');
  const options = ['Yes', 'No'];
  const [selectBuilding, setSelectBuilding] = useState([]);
  const [BuildingData, setBuildingData] = useState([
    {
      data: 'Juventus',
      id: 'JUVE',
      checked: 'false',
    },
    {
      data: 'Real Madrid',
      id: 'RM',
      checked: 'false',
    },
    {
      data: 'Barcelona',
      id: 'BR',
      checked: 'false',
    },
    {
      data: 'PSG',
      id: 'PSG',
      checked: 'false',
    },
    {
      data: 'FC Bayern Munich',
      id: 'FBM',
      checked: 'false',
    },
    {
      data: 'Manchester United FC',
      id: 'MUN',
      checked: 'false',
    },
    {
      data: 'Manchester City FC',
      id: 'MCI',
      checked: 'false',
    },
    {
      data: 'Everton FC',
      id: 'EVE',
      checked: 'false',
    },
    {
      data: 'Tottenham Hotspur FC',
      id: 'TOT',
      checked: 'false',
    },
    {
      data: 'Chelsea FC',
      id: 'CHE',
      checked: 'false',
    },
    {
      data: 'Liverpool FC',
      id: 'LIV',
      checked: 'false',
    },
    {
      data: 'Arsenal FC',
      id: 'ARS',
      checked: 'false',
    },

    {
      data: 'Leicester City FC',
      id: 'LEI',
      checked: 'false',
    },
  ]);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectTime, setselectTime] = useState();
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [employ, setEmploy] = useState('');
  const [show, setShow] = useState(false);
  // const handleRadioStatusSecond = value =>{}

  // const handleSubmit = () => {
  //   if (date == '') {
  //     alert('select a date');
  //   }
  //   // else if(selectTime < 9 && selectTime>18){
  //   //   alert('Duration should be less then ');
  //   // }
  //   else if (duration > 24) {
  //     alert('Duration should be less then 24Hour');
  //   } else if (duration == '') {
  //     alert('select a duration please');
  //   } else if (searchLevel == '') {
  //     alert('select a search level please');
  //   } else if (reason == '') {
  //     alert('enter your vehical number please');
  //   } else if (selectBuilding == '') {
  //     alert('select buildings please');
  //   } else if (employ == '') {
  //     alert('enter staff ID/Name/Dept please');
  //   } else {
  //     navigation.navigate('VisitorDetails');
  //   }
  // };
  const fromReff = useRef(null);
  const gatePassScheema = yup.object().shape({
    office: yup.string().required('leave type is required'),
    date: yup.string().required('select one is required'),
    time: yup.string().required('select one period'),
    duration: yup
      .string()
      .required('duration  is required')
      .max(24, 'duration should be less then 24 hours'),
    searchLevel: yup.string().required('select one searchLevel please'),
    reason: yup.string().required('select one reason please'),
    persionalVehical: yup.string().required('post one comment'),
    internalVehical: yup.string().required('select one period'),
    building: yup.string().required('selectDate  is required'),
    vehicalNumber: yup.string().required('Provide Your reason please'),
  });
  const fromRef = useRef(null);

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
  const toggleBuilding = () => {
    setShow(!show);
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

  const handelMulipleSelect = index => {
    let newData = [...BuildingData];
    let selectedData = [];
    newData[index].checked = !newData[index].checked;
    setBuildingData(newData);
    BuildingData.forEach(element => {
      newData.forEach(data => {
        if (element.id == data.id && data.checked == true) {
          selectedData.push(element);
        } else {
          return;
        }
      });
    });
    console.log('nahi', selectedData);
    setSelectBuilding(selectedData);
  };

  // function onMultiChange() {
  //   return data => setSelectBuilding(xorBy(selectBuilding, [item], 'id'));
  // }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setselectTime(date);
    hideDatePicker();
  };

  return (
    <View style={{flex: 1}}>
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
              size={25}
              color={'white'}
              onPress={() => navigation.navigate('Home')}
            />
            <Ionicons
              name="menu-outline"
              size={25}
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
      <Formik
        innerRef={fromRef}
        validationSchema={gatePassScheema}
        initialValues={{
          office: '',
          date: '',
          time: '',
          duration: '',
          searchLevel: '',
          reason: '',
          persionalVehical: '',
          internalVehical: '',
          building: '',
          vehicalNumber: '',
        }}
        onSubmit={values => {
       
          // console.log('values', values);
          console.log('values', values);
          // if(values){
          //   navigation.navigate("VisitorDetails")
          // }
          // else{
          //   alert('error')
          // }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <ScrollView nestedScrollEnabled={true} style={{marginBottom: '18%'}}>
            <View style={{paddingBottom: 20}}>
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
                  {isSelected == true
                    ? 'GURGAON FACTORY'
                    : 'HEAD OFFICE - DELHI'}
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
                    <View
                      style={{width: '90%', justifyContent: 'space-evenly'}}>
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
                            <Ionicons
                              name="checkbox"
                              size={20}
                              color={'#fff'}
                            />
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
                          <Text style={{color: 'white'}}>
                            HEAD OFFICE - DELHI
                          </Text>
                          {state == true ? (
                            <Ionicons
                              name="checkbox"
                              size={20}
                              color={'#fff'}
                            />
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

              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  console.log(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale="en_GB"
                date={new Date()}
                isDarkModeEnabled={true}
                is24Hour={true}
              />

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
                    <Text style={{color: 'gray'}}>
                      {moment(date).subtract(10, 'days').calendar()}
                    </Text>
                    <Text style={{color: 'gray'}}>
                      {moment(selectTime).format('LT')}
                    </Text>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: 65,
                          justifyContent: 'space-around',
                        }}>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                          <Ionicons
                            name="calendar-outline"
                            size={25}
                            color={'#ad3231'}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            showDatePicker();
                          }}>
                          <Ionicons
                            name="time-outline"
                            size={25}
                            color={'#ad3231'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    onChangeText={() => {
                      handleChange('duration');
                    }}
                    value={duration}
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
                {/* {errors.duration && touched.duration && (
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      paddingVertical: 2,
                    }}>
                    <Text style={{fontSize: 12, color: 'red',textAlign:'right'}}>
                      {errors.duration}
                    </Text>
                  </View>
                )} */}
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
                  <Text style={{color: 'gray'}}>{values.searchLevel}</Text>
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
                          setFieldValue('searchLevel', data);
                          setmodalVisibleSecond(false);
                        }}
                        icon={
                          searchLevel == true ? (
                            <Feather
                              name="check-circle"
                              size={25}
                              color="#2c9dd1"
                            />
                          ) : null
                        }
                      />
                    </LinearGradient>
                  </View>
                </Modal>
              </View>
              {errors.searchLevel && touched.searchLevel && (
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    paddingVertical: 2,
                  }}>
                  <Text style={{fontSize: 12, color: 'red'}}>
                    {errors.searchLevel}
                  </Text>
                </View>
              )}

              {/* Vehicle number */}
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Reason To Come *
                </Text>
                <TextInput
                  placeholder="reason"
                  onChangeText={handleChange('reason')}
                  onBlur={handleBlur('reason')}
                  value={values.reason}
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderTopColor: '#80406A',
                    borderStartColor: '#ad3231',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#ad3231',
                    borderRadius: 5,
                    paddingVertical: 5,
                  }}
                />
                {errors.reason && touched.reason && (
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      paddingVertical: 2,
                    }}>
                    <Text
                      style={{fontSize: 12, color: 'red', textAlign: 'left'}}>
                      {errors.reason}
                    </Text>
                  </View>
                )}
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
                      width: '50%',
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
                    renderDropdownIcon={isOpened => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#444'}
                          size={18}
                        />
                      );
                    }}
                    dropdownBackgroundColor={'transparent'}
                    data={options}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    icon={
                      <Feather
                        name="chevron-down"
                        size={20}
                        color={'#ad3231'}
                      />
                    }
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
                      width: '50%',
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
                    renderDropdownIcon={isOpened => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#444'}
                          size={18}
                        />
                      );
                    }}
                    buttonTextStyle={{
                      fontSize: 16,
                      justifyContent: 'flex-start',
                    }}
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
                    icon={<Feather name="chevron-down" size={30} />}
                  />
                </View>
              </View>

              {/* Select Building / multiple selection*/}
              {/* <View style={{backgroundColor:'red',marginVertical:20}}> */}
              <View>
                <View
                  style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
                  <Text style={{fontSize: 16, top: 1}}>Select Building *</Text>
                  <View
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderTopColor: '#80406A',
                      borderStartColor: '#ad3231',
                      borderBottomColor: '#2757C3',
                      borderEndColor: '#ad3231',
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {selectBuilding.map(item => (
                          <TouchableOpacity
                            style={{
                              padding: 5,
                              backgroundColor: '#ad3213',
                              margin: 5,
                              borderRadius: 20,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text style={{color: '#fff', padding: 5}}>
                              {item.data}
                            </Text>
                            {/* <Ionicons
                          name="close-circle"
                          size={25}
                          color={'#fff'}
                       onPress={() =>{handelMulipleSelect()}}
                        /> */}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <TouchableOpacity onPress={toggleBuilding}>
                        {show == true ? (
                          <Ionicons name="caret-up" size={30} />
                        ) : (
                          <Ionicons name="caret-down" size={30} />
                        )}
                      </TouchableOpacity>
                    </View>
                    {show == true ? (
                      <View
                        style={{
                          width: '100%',
                          padding: 10,
                          borderWidth: 0.5,
                          // borderTopColor: '#80406A',
                          borderStartColor: '#ad3231',
                          borderBottomColor: '#2757C3',
                          borderEndColor: '#ad3231',
                          borderRadius: 5,
                        }}>
                        <FlatList
                          data={BuildingData}
                          keyExtractor={item => item.id}
                          renderItem={({item, index}) => (
                            <View
                              style={{
                                width: '100%',
                                padding: 10,
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 2,
                                alignSelf: 'center',
                                borderTopColor: '#80406A',
                                borderStartColor: '#ad3231',
                                borderBottomColor: '#2757C3',
                                borderEndColor: '#ad3231',
                                borderRadius: 5,
                              }}>
                              <Text>{item.data}</Text>
                              <TouchableOpacity
                                onPress={() => {
                                  handelMulipleSelect(index);
                                }}>
                                {item.checked == true ? (
                                  <Ionicons
                                    name="remove-circle"
                                    size={25}
                                    color={'#ad3231'}
                                  />
                                ) : (
                                  <Ionicons
                                    name="add-circle"
                                    size={25}
                                    color={'#ad3231'}
                                  />
                                )}
                              </TouchableOpacity>
                            </View>
                          )}
                        />
                      </View>
                    ) : null}
                  </View>
                  {/* <SelectBox
              ScrollView={true}
                toggleIconColor={'#ad3231'}
                optionsLabelStyle={{paddingHorizontal: 10}}
                selectedItemStyle={{backgroundColor: 'transparent'}}
                label=""
                options={BuildingData}
                selectedValues={selectBuilding}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                containerStyle={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  marginTop: -10,
                  borderWidth: 1,
                  borderTopColor: '#80406A',
                  borderStartColor: '#ad3231',
                  borderBottomColor: '#2757C3',
                  borderEndColor: '#ad3231',
                  borderRadius: 5,
                }}
                optionContainerStyle={{
                  margin: 1,
                  borderWidth: 1,
                  borderTopColor: '#80406A',
                  borderStartColor: '#ad3231',
                  borderBottomColor: '#2757C3',
                  borderEndColor: '#ad3231',
                  borderRadius: 5,
                }}
                listOptionProps={{
                 paddingVertical:10,
                  borderWidth: 1,
                  borderTopColor: '#80406A',
                  borderStartColor: '#ad3231',
                  borderBottomColor: '#2757C3',
                  borderEndColor: '#ad3231',
                  borderRadius: 5,
                }}
                inputFilterContainerStyle={{width: 0, display: 'none'}}
              /> */}
                </View>
              </View>

              {/* SEARCH BOX */}
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
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderTopColor: '#80406A',
                    borderStartColor: '#ad3231',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#ad3231',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Feather name="search" size={20} color={'#ad3231'} />
                  </View>
                  <TextInput
                    onChangeText={handleChange('vehicalNumber')}
                    onBlur={handleBlur('vehicalNumber')}
                    value={values.vehicalNumber}
                    placeholder="Search By Name/Dept/Staff/ID"
                    style={{
                      width: '70%',
                      paddingVertical: 5,
                    }}
                  />
                  
                  <TouchableOpacity
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons name="send" size={20} color={'#ad3231'} />
                  </TouchableOpacity>
                </View>
                  {errors.vehicalNumber && touched.vehicalNumber && (
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      paddingVertical: 2,
                    }}>
                    <Text
                      style={{fontSize: 12, color: 'red', textAlign: 'left'}}>
                      {errors.vehicalNumber}
                    </Text>
                  </View>
                )}
              </View>

              {/* TExtInput */}
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Name
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: '90%',
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderTopColor: '#80406A',
                    borderStartColor: '#ad3231',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#ad3231',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View style={{width: '100%'}}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Name
                </Text>
                <TextInput
                  editable={false}
                  style={{
                    width: '90%',
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderTopColor: '#80406A',
                    borderStartColor: '#ad3231',
                    borderBottomColor: '#2757C3',
                    borderEndColor: '#ad3231',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}
                />
              </View>

              {/* Next Button */}

              <View style={{paddingVertical: 10}}>
                <LinearGradient
                  style={{
                    margin: 5,
                    borderRadius: 8,
                    width: '90%',
                    alignSelf: 'center',
                  }}
                  colors={['#a67997', '#b54746']}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                        letterSpacing: 2,
                      }}>
                      Next
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
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
