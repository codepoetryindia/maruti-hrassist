//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BuisnessTravel from './BuisnessTravel';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';


// create a component
const Book = () => {
  return (
    <View
      style={{flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5}}>
      <Text style={{paddingVertical: 5, fontSize: 16, fontWeight: 'bold'}}>
        Select Date
      </Text>
      <TouchableOpacity
        style={{
          width: '100%',
          padding: 10,
          alignItems: 'center',
          borderWidth: 1,
          borderTopColor: '#80406A',
          borderStartColor: '#ad3231',
          borderBottomColor: '#2757C3',
          borderEndColor: '#ad3231',
        }}>
        <Text>28 -feb 2022</Text>
      </TouchableOpacity>
      <Text style={{paddingVertical: 10, fontSize: 16, fontWeight: 'bold'}}>
        Available Shuttle Routes
      </Text>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          paddingVertical: 10,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.84,

          elevation: 5,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text>Registration No.</Text>
          <Text>source</Text>
          <Text>Destination</Text>
          <Text>Time</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text>HR63552</Text>
          <Text>RHTK</Text>
          <Text>GGN</Text>
          <Text>04:55</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderTopWidth: 0.2,
            borderTopColor: '#80406A',
          }}>
          <Text>HR6354452</Text>
          <Text>RHTK</Text>
          <Text>GGN</Text>
          <Text>05:55</Text>
        </View>
      </View>
    </View>
  );
};

// second Route

export const PastBooking = () => {
  return (
    <View
      style={{flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5}}>
      <Text style={{paddingVertical: 5, fontSize: 16, fontWeight: 'bold'}}>
        Select Date
      </Text>
    </View>
  );
};
// Third Route
const FutureBooking = () => {
  return (
    <View
      style={{flex: 1, width: '90%', alignSelf: 'center', paddingVertical: 5}}>
      <Text style={{paddingVertical: 5, fontSize: 16, fontWeight: 'bold'}}>
        No dataFOund
      </Text>
    </View>
  );
};

const ShuttleBooking = ({navigation}) => {
   

    const initialLayout = { width: Dimensions.get('window').width }; 
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'book' },
      { key: 'second', title: 'pastBooking' },
      { key: 'third', title: 'futureBooking' },
    ]);
   
    const renderScene = SceneMap({
      first: Book,
      second: PastBooking,
      third: FutureBooking,
    });





  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
        style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
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
              onPress={() => navigation.navigate(BuisnessTravel)}
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
            Visito Details
          </Text>
        </View>
      </LinearGradient>
      <TabView
      style={{fontSize:10}}
        renderTabBar={props => {
          return (
            <LinearGradient
              colors={['#ad3231', '#bd5b5a']}
              style={{marginTop: -1, zIndex: -1}}>
              <TabBar
              renderLabel={({ route, focused, color }) => (
                <Text style={{ fontSize:13,color:'#fff' }}>
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
        initialLayout={initialLayout}
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
});

//make this component available to the app
export default ShuttleBooking;
