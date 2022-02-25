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
</View>







