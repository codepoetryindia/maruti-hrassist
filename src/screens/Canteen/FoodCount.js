// //import liraries
// import React, {Component,useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   useWindowDimensions,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
// import moment from 'moment';
// import DatePicker from 'react-native-date-picker';

// const FoodCount = ({navigation}) => {
//   const Calander = () => {
//     const [date, setDate] = useState(new Date());
//     const [open, setOpen] = useState(false);

//     return (
//       <View>
//         <DatePicker
//           modal
//           open={open}
//           date={date}
//           onConfirm={date => {
//             setOpen(false);
//             setDate(date);
//             console.log(date);
//           }}
//           onCancel={() => {
//             setOpen(false);
//           }}
//         />
//         <View
//           style={{
//             width: '100%',
//             backgroundColor: '#9f9f9f',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: 'row',
//             padding: 10,
//             marginVertical: 10,
//           }}>
//           <Text style={{color: '#fff'}}>(Todays Menu ) -- {moment(date).format('MMM Do YYYY')}</Text>
//           <TouchableOpacity onPress={() => setOpen(true)}>
//             <Ionicons name="calendar-outline" size={30} color={'#4174D0'} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const Gurgaon = ({navigation}) => {
//     return (
//       <View>
//         <Calander />
//         <Text>Gurgaon</Text>
//       </View>
//     );
//   };

//   const Manesar = ({navigation}) => {
//     return (
//       <View>
//         <Calander />
//         <Text>Manesar</Text>
//       </View>
//     );
//   };

//   const Mpt = ({navigation}) => {
//     return (
//       <View>
//         <Calander />
//         <Text>MPT</Text>
//       </View>
//     );
//   };

//   const Rothak = ({navigation}) => {
//     return (
//       <View>
//         <Calander />
//         <Text>Rothak</Text>
//       </View>
//     );
//   };

//   const renderScene = SceneMap({
//     first: Gurgaon,
//     second: Manesar,
//     third: Mpt,
//     fourth: Rothak,
//   });
//   const layout = useWindowDimensions();
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'first', title: 'Gurgaon'},
//     {key: 'second', title: 'Manesar'},
//     {key: 'third', title: 'MPT'},
//     {key: 'fourth', title: 'Rothak'},
//   ]);
//   return (
//     <View style={{flex: 1, width: '100%', height: '100%'}}>
//       <LinearGradient
//      colors={['#4174D0','#6ef7ff']}
//         style={styles.gradient}>
//         <View style={styles.container}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: 40,
//               alignItems: 'center',
//             }}>
//             <Ionicons
//               name="chevron-back-outline"
//               size={25}
//               color={'white'}
//               onPress={() => navigation.navigate("Canteen")}
//             />
//             <Ionicons
//               name="menu-outline"
//               size={25}
//               color={'white'}
//               onPress={() => navigation.openDrawer()}
//             />
//           </View>

//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 16,
//               letterSpacing: 1,
//               marginLeft: 30,
//             }}>
//             Food Count
//           </Text>
//         </View>
//       </LinearGradient>
//       <TabView
//         renderTabBar={props => {
//           return (
//             <View
            
//               style={{marginTop: -1, zIndex: -1,backgroundColor:'#5dc0e9'}}>
//               <TabBar
//                 {...props}
//                 style={{backgroundColor: 'transparent', elevation: 10}}
//               />
//             </View>
//           );
//         }}
//         navigationState={{index, routes}}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{width: layout.width}}
//       />
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   gradient: {
//     padding: 20,
//   },
//   container: {
//     flexDirection: 'row',
//   },
//   searchSection: {
//     top: 10,
//     width: '90%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: '#d9d9d9',
//     borderRadius: 7,
//   },
//   searchIcon: {
//     padding: 10,
//   },
//   input: {
//     width: '77%',
//     paddingTop: 10,
//     paddingRight: 10,
//     paddingBottom: 10,
//     paddingLeft: 0,
//     backgroundColor: '#fff',
//     color: '#424242',
//   },
// });

// // //make this component available to the app
// export default FoodCount;


//import liraries
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Accordion from './CanteenComponent/Accordion';

const FoodCount = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);
  const [lunch, setLunch] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [currentInd, setCurrentInd] = useState(0)
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();


  const GetMenuCanttApi = () => {
    let token = AppUserData.token
    let userId = AppUserData.data
    let formatedDate = moment(date).format("DD-MMMM-YYYY").toUpperCase();
    console.log("currentdate", formatedDate);
    let apidata;
    if (currentInd == 0) {
      apidata = {
        MenuType: "F",
        staffid:userId,
        MenuDate: formatedDate,
        MenuLocation: "002"
      }
      console.log("index 0 ", apidata);
    }
    else if (currentInd == 1) {
      apidata = {
        MenuType: "F",
        staffid:userId,
        MenuDate: formatedDate,
        MenuLocation: "010"
      }
      console.log("index 0 ", apidata);
    }
    else if (currentInd == 2) {
      apidata = {
        MenuType: "F",
        staffid:userId,
        MenuDate: formatedDate,
        MenuLocation: "011"
      }
      console.log("index 0 ", apidata);
    }
    else if (currentInd == 3) {
      apidata = {
        MenuType: "F",
        staffid:userId,
        MenuDate: formatedDate,
        MenuLocation: "041"
      }
      console.log("index 0 ", apidata);
    }
    console.log("apidata", apidata);
    setLoader(true);
    ApiService.PostMethode('/GetMenuCant', apidata, token)
      .then(result => {
        setLoader(false);
        let ApiValue = result.Value
        console.log("setMenu", ApiValue);
        let lunch = result.Value.filter(item => {
          if (item.CANT_MEAL === "Lunch") {
            return item
          }
        })

        let snacks = result.Value.filter(item => {
          if (item.CANT_MEAL === "Snacks") {
            return item
          }
        })

        let dinner = result.Value.filter(item => {
          if (item.CANT_MEAL === "Dinner") {
            return item
          }
        })

        setLunch(lunch);
        setSnacks(snacks);
        setDinner(dinner);
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };
  useEffect(() => {
    GetMenuCanttApi()
    console.log('index', currentInd);
    console.log("GetMenuCanttApi", GetMenuCanttApi);
  }, [currentInd, date])


  // Gurgaon

  const Gurgaon = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color='red' size={30} />
          <Text>
            Loading...
          </Text>
        </View>
      ) : (

        <View style={{ marginTop:70,}}>
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      )
    );
  };

  // GURGAON End

  // MANSEAR START
  const Manesar = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color='red' size={30} />
          <Text>
            Loading...
          </Text>
        </View>
      ) : (

        <View>
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      )
    );
  };

  const Mpt = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color='red' size={30} />
          <Text>
            Loading...
          </Text>
        </View>
      ) : (

        <View>
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      )
    );
  };

  const Rothak = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState('');
    return (
      loader == true ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color='red' size={30} />
          <Text>
            Loading...
          </Text>
        </View>
      ) : (

        <View>
          {/* <Calander /> */}
          <Accordion data={lunch} name={'Lunch'} handleDropDown={() => setIsOpen(isOpen === 'lunch' ? '' : 'lunch')} isOpen={isOpen === 'lunch'} />
          <Accordion data={snacks} name={'Snacks'} handleDropDown={() => setIsOpen(isOpen === 'snacks' ? '' : 'snacks')} isOpen={isOpen === 'snacks'} />
          <Accordion data={dinner} name={'Dinner'} handleDropDown={() => setIsOpen(isOpen === 'dinner' ? '' : 'dinner')} isOpen={isOpen === 'dinner'} />
        </View>
      )
    );
  };
  const renderScene = SceneMap({
    first: Gurgaon,
    second: Manesar,
    third: Mpt,
    fourth: Rothak,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Gurgaon' },
    { key: 'second', title: 'Manesar' },
    { key: 'third', title: 'MPT' },
    { key: 'fourth', title: 'Rothak' },
  ]);
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <LinearGradient
        colors={['#437cd5', '#5dc0e9']}
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
              onPress={() => navigation.navigate("Canteen")}
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
            Canteen Menu
          </Text>
        </View>
      </LinearGradient>
      <TabView
        renderTabBar={props => {
          return (
            <LinearGradient
              colors={['#5dc0e9', '#5dc0e9']}
              style={{ marginTop: -1, zIndex: -1 }}>
              <TabBar
                {...props}
                style={{ backgroundColor: 'transparent', elevation: 0 }}
              />
            </LinearGradient>
          );
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(screen) => {
          console.log("screen", screen);
          setCurrentInd(screen)
        }}
        initialLayout={{ width: layout.width }}
      />
      <View style={{position:'absolute',top:'17%'}}>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date)
            console.log("new", date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
           style={{
            width: '95%',
            backgroundColor: '#9f9f9f',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignSelf:'center',
            paddingVertical:8,
            marginVertical: 10,
            borderRadius:8,
          }}>
          <Text style={{ color: '#fff' }}>(Todays Menu ) -- {moment(date).format('MMM Do YYYY')}</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={30} color={'#5dc0e9'} />
          </TouchableOpacity>
        </View>
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

  // Gurgaon Lunch section
  lunchBoxContainer: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  lunchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingVertical: 15,
    // backgroundColor:'red'
  },
});

// //make this component available to the app
export default FoodCount;
