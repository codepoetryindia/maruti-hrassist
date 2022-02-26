//import liraries
import React, {Component, useState} from 'react';
import VisitDetails from '../../components/VisitDetails';
import { View ,StyleSheet,Text,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
// create a component
// const [count,setCount] = useState(1);
// const handleClick = ()=>{
//   let newValue =count++;
//   setCount (newValue);
// }
const VisitorDetails = ({navigation}) => {
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
          Visito Details
        </Text>
      </View>
    </LinearGradient>
    {/* Body */}
    <ScrollView nestedScrollEnabled={true} style={{marginBottom: '18%',}}>
    <VisitDetails/>
    {/* <TouchableOpacity style={{paddingStart:20,}}>
        <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
        style={{padding:10,width:'40%',borderRadius:5}}>
            <Text style={{color:'#fff',textAlign:'center'}}>Add More Person</Text>
            </LinearGradient>
            </TouchableOpacity> */}
    </ScrollView>

    </View>
  );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    gradient: {
      padding: 20,
    },
  });
//make this component available to the app
export default VisitorDetails;
