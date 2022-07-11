//import liraries
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalFontSize } from '../../constants/FontSize';
import { GlobalColor } from '../../constants/Colors';
import Text from '../../components/reusable/Text';
import { Header } from '../../components/reusable/Header';

const Canteen = ({ navigation }) => {
  // ]);
  return (
    <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: GlobalColor.PrimaryLight }}>
      <Header title="Canteen" />


      <View style={{width:"100%",paddingHorizontal:10}}>
        <TouchableOpacity
          style={styles.canteen}
          onPress={() => navigation.navigate("CanteenMenu")}>
          {/* <View style={{ width: '20%', justifyContent: "center" }}>
            <Image
              source={require('../../assets/Images/canteen/fork.png')}
              style={{ width: 45, height: 45 }}
              resizeMode={'cover'}
            />
          </View> */}

          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: GlobalColor.PrimaryGradient,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Images/canteen/fork.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          <View
            style={styles.MenuContainer}>
            <Text Bold>Canteen Menu</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.canteen}
          onPress={() => navigation.navigate("FoodCount")}>
          {/* <View style={{width: '20%',justifyContent:"center"}}>  

          <Image
            style={{width: 45, height: 45}}
            source={require('../../assets/Images/canteen/turkey.png')}
          />          
        </View> */}
          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: GlobalColor.PrimaryGradient,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/Images/canteen/turkey.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          <View
            style={styles.MenuContainer}>
            <Text Bold>Food Count</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </TouchableOpacity>



      </View>
    </SafeAreaView>
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
  canteen: {
    top: 10,
    marginVertical: 10,
    backgroundColor: GlobalColor.White,
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: GlobalColor.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 5
  },
  MenuContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconBox: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// //make this component available to the app
export default Canteen;
