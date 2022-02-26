//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
// create a component
const VisitDetails = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      {/* BODY */}
      <ScrollView nestedScrollEnabled={true} style={{marginBottom: '18%'}}>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Enter Person Details
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text>sfidlug</Text>
          <Text>sfidlug</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
            alignSelf: 'center',
            paddingVertical: 5,
          }}>
          <TextInput
            style={{
              width: '49.5%',
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderTopColor: '#80406A',
              borderStartColor: '#ad3231',
              borderBottomColor: '#2757C3',
              borderEndColor: '#ad3231',
            }}
          />
          <TextInput
            style={{
              width: '49.5%',
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderTopColor: '#80406A',
              borderStartColor: '#ad3231',
              borderBottomColor: '#2757C3',
              borderEndColor: '#ad3231',
            }}
          />
        </View>

        {/* SECOND */}

        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <Text>Title</Text>
            <Text>Name *</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignSelf: 'center',
              paddingVertical: 5,
            }}>
            <TextInput
              style={{
                width: '21%',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
              }}
            />
            <TextInput
              style={{
                width: '78%',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
              }}
            />
          </View>
        </View>

        {/* THIRD ONE */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <Text>Designation *</Text>
            <Text>Laptop/Ipad/Tablet</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignSelf: 'center',
              paddingVertical: 5,
            }}>
            <TextInput
              style={{
                width: '49.5%',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
              }}
            />
            <TextInput
              style={{
                width: '49.5%',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
              }}
            />
          </View>
        </View>

        {/* FourthONe */}
        <View>
            <Text style={{padding:5,paddingLeft:20}}>Address</Text>
            <TextInput
              style={{
                width: '90%',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderTopColor: '#80406A',
                borderStartColor: '#ad3231',
                borderBottomColor: '#2757C3',
                borderEndColor: '#ad3231',
                alignSelf:'center'
              }}
            />
        </View>
        <TouchableOpacity style={{padding:10,paddingStart:20,}}>
        <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
        style={{padding:10,width:'40%',borderRadius:5}}>
            <Text style={{color:'#fff',textAlign:'center'}}>Add More Person</Text>
            </LinearGradient>
            </TouchableOpacity>

            <View style={{paddingVertical:10}}>
          <LinearGradient
            style={{margin: 5, borderRadius: 8,width:'90%',alignSelf:'center'}}
            colors={[ '#a67997', '#b54746']}>
            <TouchableOpacity style={{width: '100%', paddingVertical: 10,alignItems:'center',marginTop:5}}>
              <Text style={{fontSize: 16, fontWeight: 'bold',color:'#fff',letterSpacing:2}}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>
          </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  gradient: {
    padding: 20,
  },
});

//make this component available to the app
export default VisitDetails;
