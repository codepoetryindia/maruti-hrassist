//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Payroll from './Payroll';
import Benifits from './Benifits';
import TouchID from 'react-native-touch-id';

const FirstRoute = () => <Payroll />;
const SecondRoute = () => <Benifits />;
const CompensationBenifits = ({navigation}) => {
  const [isAuth, setIsAuth] = useState();
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  useEffect(() => {
    handelBiometric();
  }, []);
  
  const handelBiometric = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              console.log('Authenticated Successfully', success);
              setIsAuth(true);
              console.log('state data',isAuth)
            })
            .catch(error => {
              console.log('Authentication Failed', error);
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log('not supported', error);
      });
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Payroll'},
    {key: 'second', title: 'Benifits'},
  ]);
  return (
    <View style={{flex:1}}>
      {isAuth == true ? ( <View style={{flex:1}}>
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
                  onPress={() => navigation.navigate("Home")}
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
                Compensation And Benifits
              </Text>
            </View>
          </LinearGradient>
          <TabView
            renderTabBar={props => {
              return (
                <LinearGradient
                  colors={['#ad3231', '#bd5b5a']}
                  style={{marginTop: -1, zIndex: -1}}>
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
      </View>
        
      ) : 
       null
      }
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
export default CompensationBenifits;

// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// const EmployeLookUp = () => {
//     return (
//         <View style={styles.container}>
//             <Text>EmployeLookUp</Text>
//         </View>
//     );
// };

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

// //make this component available to the app
// export default EmployeLookUp;