//import liraries
import React, {useContext,useEffect} from 'react';
import axios from "axios";
import {View, Text, StyleSheet,Image,FlatList,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';

// create a component
const Notification = ({navigation}) => {
  const { authContext, AppUserData } = useContext(AuthContext);
  const NotifiApi = () => {
    let token = 'Basic ZDU5NjEyY2ItYTI3NS00ZTYzLTkyMGItNGE4ODJmYjFiOTVm'
    axios.get('https://onesignal.com/api/v1/notifications?app_id=42fcb50a-922f-4b0e-9ba3-701d663beede',
    {
      headers:{
        'Authorization': token
      }
    })
    .then(resp => {
      let result = resp.data.notifications
      console.log("notification",result);
  });
  }
useEffect(() => {
  NotifiApi()
}, [])
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{flex: 1}}
     colors={['#4174D0','#6ef7ff']}>
        <View style={{flexDirection: 'row', paddingVertical: 15, padding: 10}}>
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
          </View>

          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              letterSpacing: 1,
              marginLeft: 25,
            }}>
            Notification
          </Text>
        </View>

        {/* BODY */}
        <View
          style={{
            backgroundColor: '#fff',
            width: '97%',
            height: '90%',
            alignSelf: 'flex-end',
            padding: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,

          }}>
          <FlatList
            data={NotifiApi}
            ListEmptyComponent={() => {
              return (
                <View style={{ width:'100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/Images/dataNotFound.png')}
                    style={{ width: 300, height: 300, resizeMode: 'contain',}} />
                  <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                </View>
              )
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={({item,index})=>index}
                renderItem={({ item,index }) => (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  alignSelf:'center',
                  marginVertical:8,
                  padding: 10,
                  paddingVertical:10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  borderRadius:8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical:10,
                  }}>
                  <Text style={{fontSize:16}}>{item.contents}</Text>
                 <TouchableOpacity>
                 <Ionicons
                    name="notifications-circle-outline"
                    size={25}
                    color={'#6ef7ff'}
                  />
                 </TouchableOpacity>
                </View>
                <Image  source={{ uri:"https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2019/01/25/70507-maruti-suzuki-ians.jpg?itok=qdimqkst&c=c5af8c0f92ccc8e249257bf0f1cb18e8"}}
                style={{width:'100%',height:120,resizeMode:'stretch',borderRadius:8,marginVertical:10}}/>
              </View>
            )}
          />
        </View>
      </LinearGradient>
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
export default Notification;
