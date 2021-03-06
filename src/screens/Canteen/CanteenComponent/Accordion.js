import { View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import ListEmptyComponent from '../../../components/reusable/ListEmptyComponent';
import Text from '../../../components/reusable/Text';
import { GlobalColor } from '../../../constants/Colors';
import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

const Accordion = ({ data, name, handleDropDown, isOpen }) => {
    const [refresh, setrefresh] = useState(false);
    const [loader, setLoader] = useState(false);


    const stopLoader = () => {
        try {
          setLoader(false);
          setrefresh(false);
        } catch(error){
            console.log(error)
        }
    }
    

    return (
        <View style={{paddingHorizontal:0, flex:1}}>
        <View style={styles.lunchBoxContainer}>
            <TouchableOpacity style={styles.lunchBox} onPress={() => handleDropDown()}>
                <Text Bold> {name} </Text>
                <Ionicons name={isOpen == true ? 'ios-chevron-up' : 'ios-chevron-down'} size={20} />
            </TouchableOpacity>
            <Collapsible collapsed={!isOpen}>
            <View style={styles.AccordionTab}>
                        <FlatList
                            ListEmptyComponent={<ListEmptyComponent 
                            title="No Data Found"
                            subtitle="please select date & retry"                           
                             enableRefresh={true} 
                             refreshing={refresh}
                             showsVerticalScrollIndicator={false}
                            ></ListEmptyComponent>}
                            data={data}
                            keyExtractor={({ item, index }) => index}
                            renderItem={
                                ({ item, index }) => {
                                    
                                    return (
                                        <View>
                                            <Text >SHIFT {item.CANT_SHFT}</Text>
                                            <Text style={{marginTop: 10 }}>{item.CANT_ITEM1}</Text>
                                            <Text >{item.CANT_ITEM2}</Text>
                                            <Text >{item.CANT_ITEM3}</Text>
                                            <Text >{item.CANT_ITEM4}</Text>
                                            <Text >{item.CANT_ITEM5}</Text>
                                            <Text >{item.CANT_ITEM6}</Text>
                                            <Text style={{marginBottom: 30 }}>{item.CANT_ITEM7}</Text>
                                        </View>
                                    )
                                }
                            }
                        />
                    </View>
            </Collapsible>



            {/* {
                isOpen == true ?
                    <View style={styles.AccordionTab}>
                        <FlatList
                            ListEmptyComponent={<ListEmptyComponent 
                            title="No Data Found"
                            subtitle="please select date & retry"                           
                             enableRefresh={true} 
                             refreshing={refresh}
                             showsVerticalScrollIndicator={false}
                            ></ListEmptyComponent>}
                            data={data}
                            keyExtractor={({ item, index }) => index}
                            renderItem={
                                ({ item, index }) => {
                                    
                                    return (
                                        <View>
                                            <Text >SHIFT {item.CANT_SHFT}</Text>
                                            <Text style={{marginTop: 10 }}>{item.CANT_ITEM1}</Text>
                                            <Text >{item.CANT_ITEM2}</Text>
                                            <Text >{item.CANT_ITEM3}</Text>
                                            <Text >{item.CANT_ITEM4}</Text>
                                            <Text >{item.CANT_ITEM5}</Text>
                                            <Text >{item.CANT_ITEM6}</Text>
                                            <Text style={{marginBottom: 30 }}>{item.CANT_ITEM7}</Text>
                                        </View>
                                    )
                                }
                            }
                        />
                    </View>
                    : null
            } */}
        </View>
        </View>
    )
}


// define your styles
const styles = StyleSheet.create({
    // Gurgaon Lunch section
    lunchBoxContainer: {     
        marginVertical: 10,
        paddingVertical:10,
        backgroundColor: GlobalColor.White,
        borderRadius: 4,
        // alignSelf: 'center',
        shadowColor: GlobalColor.Black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: 10,
        
    },
    AccordionTab: {
        padding: 15,
        borderTopWidth: 1.5,
        borderColor:GlobalColor.Secondary
    },
    lunchBox: {
        flexDirection: 'row',        
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        
        // backgroundColor:'red'
    },
});

export default Accordion