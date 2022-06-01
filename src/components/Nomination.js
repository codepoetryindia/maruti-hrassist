import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, TouchableOpacity, Linking, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';
import * as ApiService from '../Utils/Utils';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

const Nomination = ({ navigation, route }) => {



    const [loader, setLoader] = useState(false)
    const { authContext, AppUserData } = useContext(AuthContext);
    const [employeeData, setEmployeeData] = useState([]);
    const [empphoto, setPhoto] = useState();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isOpen, setIsOpen] = useState('');

    let NominationData = route.params.data
    // setIsOpen(NominationData)
    console.log("NominationData", NominationData);

    
// const head = (item) =>{
//     return(
//         <Separator bordered style={{alignItems:'center'}}>
//           <Text>{item.title}</Text>
//         </Separator>
//     );
// }
// const body = (item) =>{
//     return (
//         <View style={{padding:10}}>
//           <Text style={{textAlign:'center'}}>{item.body}</Text>
//         </View>
//     );
// }
const handleDropDown =() => {
    setIsOpen(!isOpen)
}
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <LinearGradient
                colors={['#4174D0', '#6ef7ff']}
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
                            size={25}
                            color={'white'}
                            onPress={() => navigation.navigate("EditProfile")}
                        />
                        <Ionicons
                            name="menu-outline"
                            size={25}
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
                        Nomination
                    </Text>
                </View>
            </LinearGradient>

            {loader == true ? (
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            ) : null}

            {/* <Collapse>
                <CollapseHeader>
                    <View>
                        <Text>Click here</Text>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    <Text>Ta daa!</Text>
                </CollapseBody>
            </Collapse>

//Accordion List
            <AccordionList
                list={NominationData}
                header={head}
                body={body}
                keyExtractor={({ item, index }) => index}
            /> */}
            {/* <FlatList
                data={NominationData}
                keyExtractor={({ item, index }) => index}
                renderItem={({ item, index }) => {
                    return (
                        
                       
                    )
                }} /> */}

                {NominationData.map((item)=> {
                    return (
                        <View>
                        <TouchableOpacity
                            onPress={(index) => {
                                handleDropDown()
                                console.log(index)
                            }}
                            style={styles.tabStyle}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.NOMM_DESC}</Text>
                            {isOpen==true ? (<Text>{item.ENOM_PERCENT}</Text>):null}

                            {/* {isOpen == true ? (
                                <Ionicons name={'ios-chevron-up'} size={20} />
                            ) : (
                                <Ionicons name={'ios-chevron-down'} size={20} />
                            )} */}
                        </TouchableOpacity>
                    </View>
                    )
                })}
            <View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    gradient: {
        padding: 20,
    },
    container: {
        flexDirection: 'row',
    },
    tabStyle: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        paddingVertical: 10
    }
})
export default Nomination
