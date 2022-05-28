//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
// create a component
const Guidelines = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                style={{ padding: 20 }}
                colors={['#437cd5', '#5dc0e9']}>
                <View style={{ flexDirection: 'row' }}>
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
                            onPress={() => navigation.navigate("Home")}
                        />
                    </View>

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            letterSpacing: 1,
                            marginLeft: 30,
                        }}>
                        Guidelines
                    </Text>
                </View>
            </LinearGradient>

            {/* BODY */}
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image style={{ height:500, width: '90%', alignSelf: 'center',resizeMode:'contain' }} source={require('../../assets/Images/guidelineimage.png')} />
            </SafeAreaView>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '90%',
        paddingVertical: 10,
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 15,
    },
    iconBox: {
        width: '20%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
});

//make this component available to the app
export default Guidelines;
