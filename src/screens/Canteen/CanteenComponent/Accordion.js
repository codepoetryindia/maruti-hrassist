import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const Accordion = ({ data, name, handleDropDown, isOpen }) => {
    return (
        <ScrollView style={styles.lunchBoxContainer}>
            <TouchableOpacity style={styles.lunchBox} onPress={() => handleDropDown()}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}> {name} </Text>
                <Ionicons name={isOpen == true ? 'ios-chevron-up' : 'ios-chevron-down'} size={20} />
            </TouchableOpacity>
            {
                isOpen == true ?
                    <View style={styles.AccordionTab}>
                        <FlatList
                            ListEmptyComponent={() => {
                                return(
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/Images/dataNotFound.png')}
                                        style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: -50 }} />
                                    <Text style={{ fontSize: 20, textAlign: 'center', }}>No Data found</Text>
                                </View>
                                )
                            }}
                            data={data}
                            keyExtractor={({ item, index }) => index}
                            renderItem={
                                ({ item, index }) => {
                                    return (
                                        <View>
                                            <Text style={{ fontSize: 16 }}>SHIFT {item.CANT_SHFT}</Text>
                                            <Text style={{ fontSize: 16, marginTop: 10 }}>{item.CANT_ITEM1}</Text>
                                            <Text style={{ fontSize: 16 }}>{item.CANT_ITEM2}</Text>
                                            <Text style={{ fontSize: 16 }}>{item.CANT_ITEM3}</Text>
                                            <Text style={{ fontSize: 16 }}>{item.CANT_ITEM4}</Text>
                                            <Text style={{ fontSize: 16 }}>{item.CANT_ITEM5}</Text>
                                            <Text style={{ fontSize: 16 }}>{item.CANT_ITEM6}</Text>
                                            <Text style={{ fontSize: 16, marginBottom: 30 }}>{item.CANT_ITEM7}</Text>
                                        </View>
                                    )
                                    // return (<View key={index}>
                                    //     {
                                    //         Object.keys(item).map((key, index) => {
                                    //             return <Text key={index} style={{ fontSize: 16 }}>{ item.CANT_ITEM1 }</Text>
                                    //         })
                                    //     }
                                    // </View>)
                                }
                            }
                        />
                    </View>
                    : null
            }
        </ScrollView>
    )
}


// define your styles
const styles = StyleSheet.create({
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
        marginBottom: 10
    },
    AccordionTab: {
        padding: 15,
        borderTopWidth: 1
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

export default Accordion