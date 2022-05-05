//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';

// create a component
export const Leave = () => {
  const [approve, setApprove] = useState(0);
  const handleApprove = index => {
    setApprove(index);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 15}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Approve Leave', 'View Report']}
          selectedIndex={approve}
          onTabPress={index => {
            handleApprove(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>

      <View>
        {approve == 0 ? (
          <View style={{padding: 10, backgroundColor: '#a9bce7'}}>
            <Text style={{color: '#000', fontWeight: '600'}}>
              Tap On Leave To View Details
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{color: '#000', fontWeight: '600',paddingHorizontal:'5%'}}>Select Employee</Text>
          </View>
        )}
      </View>
    </View>
  );
};


export const FlexiShift = () => {
  return (
    <View>
      <Text>FlexiShift</Text>
    </View>
  );
};



export const Taxi = () => {
  const [approve, setApprove] = useState(0);
  const handleApprove = index => {
    setApprove(index);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 15}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Approve Taxi', 'View Report']}
          selectedIndex={approve}
          onTabPress={index => {
            handleApprove(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>
      <View>
        {approve == 0 ? (
            <View style={{width: '100%'}}>
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
                placeholder="Search By Slip No/Staff ID"
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
            <View style={{margin: '5%',}}>
              <Text>No Data Found</Text>
              </View>
          </View>
        ) : (
          <View style={{margin: '5%',}}>
          <Text>No Data Found</Text>
          </View>
        )}
      </View>
    </View>
  );
};


export const Attendance = () => {
  return (
    <View>
       <View style={{width: '100%'}}>
           
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                marginTop:'5%',
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

          <View style={{margin: '5%',}}>
          <Text>No Contacts Exist</Text>
          </View>
    </View>
  );
};

const ManagerMode = ({navigation}) => {
  const [manager, setManager] = useState();

  const renderScene = SceneMap({
    first: Leave,
    second: FlexiShift,
    third: Taxi,
    fourth: Attendance,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Leave'},
    {key: 'second', title: 'FlexiShift'},
    {key: 'third', title: 'Taxi'},
    {key: 'fourth', title: 'Attendance'},
  ]);
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
              size={25}
              color={'white'}
              onPress={() => navigation.goBack()}
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
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            ManagerMode
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: manager == true ? '50%' : '8%',
              position: 'absolute',
              bottom: -5,

              right: -20,
              alignItems: 'center',
              backgroundColor: '#23f',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              paddingVertical: 5,
            }}>
            <TouchableOpacity>
              <Ionicons
                style={{marginLeft: '5%'}}
                name="ios-person-circle-outline"
                size={25}
                color={'white'}
                onPress={() => {
                  manager == true ? setManager(false) : setManager(true);
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                // navigation.navigate('ManagerMode');
                navigation.goBack();
              }}>
              {manager == true ? (
                <Text style={{color: '#fff', marginLeft: 0}}>
                  Back To Employ-Mode
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <TabView
        renderTabBar={props => {
          return (
            <LinearGradient
              colors={['#ad3231', '#bd5b5a']}
              style={{marginTop: -1, zIndex: -1}}>
              <TabBar
                renderLabel={({route, focused, color}) => (
                  <Text style={{fontSize: 13, color: '#fff'}}>
                    {route.title}
                  </Text>
                )}
                {...props}
                style={{backgroundColor: 'transparent', elevation: 0}}
              />
            </LinearGradient>
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
  gradient: {
    padding: 20,
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
  container: {
    flexDirection: 'row',
  },
  searchSection: {
    top: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 7,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width: '77%',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

export default ManagerMode;
