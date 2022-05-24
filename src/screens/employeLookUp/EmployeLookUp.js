//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmployeeDirect from './EmployeeDirect';
import Birthdays from './Birthday/Birthdays';

const FirstRoute = () => <EmployeeDirect />;

const SecondRoute = () => <Birthdays />;


const EmployeLookUp = ({navigation}) => {
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Employee Direct'},
    {key: 'second', title: 'Birthdays'},
  ]);
  return (
    <SafeAreaView style={{flex: 1, width: '100%', height: '100%'}}>
      <LinearGradient
     colors={['#00B4DB','#0083B0']}
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
              onPress={() => navigation.navigate("Home")}
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
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 30,
            }}>
            Employee Lookup
          </Text>
        </View>
      </LinearGradient>


      <TabView
        renderTabBar={props => {
          return (
            <LinearGradient  colors={['#5dc0e9', '#5dc0e9']} style={{marginTop:-1,zIndex:-1}}>
              <TabBar
                {...props}
                style={{
                  backgroundColor: '#2980b9', elevation: 5
                }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={{ color, fontWeight:'700', textTransform:'uppercase'}}>
                    {route.title}
                  </Text>
                )}
                indicatorContainerStyle={{backgroundColor:'#2980b9'}}
                indicatorStyle={{color:"#f00", backgroundColor:'#fff',height:5}}
              />
            </LinearGradient>
          );
        }}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        sceneContainerStyle={{backgroundColor:"#dfe6e9", width:"100%"}}
        style={{backgroundColor:'#f00'}}
      />
    </SafeAreaView>
  )
};

// define your styles
const styles = StyleSheet.create({
  gradient: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    // flex:1
  },
  // searchSection: {
  //   top: 10,
  //   width: '90%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   borderWidth: 1,
  //   borderColor: '#d9d9d9',
  //   borderRadius: 7,
  // },
  // searchIcon: {
  //   padding: 10,
  // },
  // input: {
  //   width: '77%',
  //   paddingTop: 10,
  //   paddingRight: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 0,
  //   backgroundColor: '#fff',
  //   color: '#424242',
  // },
});

// //make this component available to the app
export default EmployeLookUp;
