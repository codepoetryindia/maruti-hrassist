import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
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
                            data={data}
                            keyExtractor={({ item, index }) => index}
                            renderItem={
                                ({ item, index }) => {
                                    return (<View key={index}>
                                        {
                                            Object.keys(item).map((key, index) => {
                                                return <Text key={index} style={{ fontSize: 16 }}>{ item[key] }</Text>
                                            })
                                        }
                                    </View>)
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