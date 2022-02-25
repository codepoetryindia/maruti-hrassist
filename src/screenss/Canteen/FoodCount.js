//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Canteen from './Canteen';

const FoodCount = ({navigation}) => {
  const Calander = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#9f9f9f',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
          marginVertical: 10,
        }}>
        <Text style={{color: '#fff'}}>Today Menu (current Date)</Text>

        <Ionicons name="calendar-outline" size={30} color={'#fff'} />
      </View>
    );
  };

   const Gurgaon = ({navigation}) =>{
    return (
      <View>
         <Calander/>
        <Text>Gurgaon</Text>
      </View>
    )
  };
  
   const Manesar = ({navigation}) =>{
    return (
      <View>
         <Calander/>
        <Text>Manesar</Text>
      </View>
    )
  };
  
  const Mpt = ({navigation}) =>{
    return (
      <View>
         <Calander/>
        <Text>MPT</Text>
      </View>
    )
  };
  
  const Rothak = ({navigation}) =>{
    return (
      <View>
        <Calander/>
        <Text>Rothak</Text>
      </View>
    )
  };

  const renderScene = SceneMap({
    first: Gurgaon,
    second: Manesar,
    third: Mpt,
    fourth : Rothak,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Gurgaon'},
    {key: 'second', title: 'Manesar'},
    {key: 'first', title: 'MPT'},
    {key: 'second', title: 'Rothak'},
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
              size={15}
              color={'white'}
              onPress={() => navigation.navigate(Canteen)}
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
            Employee Lookup
          </Text>
        </View>
      </LinearGradient>
      <TabView
        renderTabBar={props => {
          return (
            <LinearGradient colors={['#ad3231', '#bd5b5a']} style={{marginTop:-1,zIndex:-1}}>
              <TabBar
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

// //make this component available to the app
export default FoodCount;
