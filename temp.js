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
</View>