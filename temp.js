//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet , TouchableOpacity,
    useWindowDimensions,} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Todays from './Todays';
import Tommorow from './Tomorow';
import SegmentedControlTab from "react-native-segmented-control-tab";

// create a component
const FirstRoute = () => <Todays />;

const SecondRoute = () => <Tommorow />;
const Birthdays = () => {
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });
      const layout = useWindowDimensions();
      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        {key: 'first', title: 'Todays'},
        {key: 'second', title: 'Tommorow'},
      ]);
    return (
        <View style={styles.container}>
            <TabView
            style={{}}

renderTabBar={props => {
    return (
        <TabBar
          {...props}
          style={{backgroundColor: 'green',color:'#000', elevation: 0,}}
        />
     
    );
  }}


        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // buttonBack:{
    //     flexDirection:'row',
    //     alignSelf:'center',
    //     top:10,
    // },
    // today:{
    //     width:'45%',
    //     borderWidth:1,
    //     borderColor: '#d9d9d9',
    //     height:30,
    // }
});

//make this component available to the app
export default Birthdays;
<View style={styles.itemView}>
<View
  style={{
    borderRightWidth: 2,
    paddingVertical: 8,
    width: '20%',
  }}>
  <Text style={{textAlign: 'center'}}>{item.dept}</Text>
</View>
<View
  style={{
    width: '80%',
    paddingVertical: 5,
    paddingLeft: 15,
  }}>
  <Text style>{item.name}</Text>
  <Text>{item.email}</Text>
  <Text>{item.divison}</Text>
</View>


<TouchableOpacity
            style={{
              width: '80%',
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
              <View style={{flexDirection:'row',width:80,justifyContent:'space-between'}}>
                <Ionicons name="calendar-outline" size={30} color={'#ad3231'}  onPress={showDatepicker} />
              
            
                <Ionicons name="time-outline" size={30} color={'#ad3231'}  onPress={showTimepicker} />
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
          <TextInput style={{width:'20%',padding:20}}>

          </TextInput>



          <Text
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingVertical: 5,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
           Search Level
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
            { noSearchLevel== true ? 'ONLY BELONGING TO BE SAERCH' :(toBeSearchLevel==true) ? 'INDIVIDUAL AND BELONGING TO BE':'NO SEARCH REQUIRED'}
          </Text>
          <Feather name="chevron-down" size={20} />
          <Modal isVisible={isModalVisible}>
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
                      handleRadioStatus('C');
                      setModalVisible(false);
                    }}>
                    <Text style={{color: 'white'}}>ONLY BELONGING TO BE SAERCH</Text>
                    {noSearchLevel == true ? (
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
                      handleRadioStatus('D');
                      setModalVisible(false);
                    }}
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                      padding: 10,
                    }}>
                    <Text style={{color: 'white'}}>INDIVIDUAL AND BELONGING TO BE</Text>
                    {toBeSearchLevel == true ? (
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







        <View style={{width: '100%', height: '100%'}}>
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
                icon={<Feather name="chevron-down" size={30} />}
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
                paddingVertical: 5,
              }}
            />
          </View>

          {/* Select Building / multiple selection*/}
          <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
            <Text style={{fontSize: 16, top: 1}}>Select Building *</Text>
            <SelectBox
              toggleIconColor={'#ad3231'}
              optionsLabelStyle={{paddingHorizontal: 10}}
              selectedItemStyle={{backgroundColor: 'transparent'}}
              label=""
              options={BuildingData}
              selectedValues={selectedTeams}
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
                height: 90,
                borderWidth: 1,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                borderRadius: 5,
              }}
              inputFilterContainerStyle={{width: 0, display: 'none'}}
            />
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

          <LinearGradient
            style={{margin: 5, borderRadius: 8}}
            colors={['#2757C3', '#80406A', '#ad3231']}>
            <TouchableOpacity style={{width: '90%', paddingVertical: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>












      
</View>







