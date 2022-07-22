//import liraries
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Modal, Pressable, Image, SafeAreaView,Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { GlobalColor } from '../../constants/Colors';
import { GlobalFontSize } from '../../constants/FontSize';
import { LoadingScreen } from '../../components/reusable/LoadingScreen';
import Button from '../../components/reusable/Button';
import { Header } from '../../components/reusable/Header';
import TextInput from '../../components/reusable/TextInput';
import Text from '../../components/reusable/Text';
import ListEmptyComponent from '../../components/reusable/ListEmptyComponent';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

// create a component
const Feedback = ({ navigation, route }) => {
    const { authContext, AppUserData } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [FeedbackData, setFeedbackData] = useState("");

    const BookShuttleSeatApi = () => {
        if(!FeedbackData){
            Alert.alert("Alert", "Please fill feedback");
            return;
        }
        let token = AppUserData.token
        let userId = AppUserData?.data?.userId
        let apiData = {
            "FeedbackID" : route.params.bookingid,
            "Feedback"  : FeedbackData
        }
        setLoader(true);
        ApiService.PostMethode('/ShuttleSeatFeedback', apiData, token)
            .then(result => {
                setLoader(false);
                let responseData = result.Result;
                if(result.Result){
                    Toast.show(responseData);
                    navigation.goBack();
                }
                console.log('ApiResult', responseData);
                // setBookData(responseData)
                // alert(responseData)                
            })
            .catch(error => {
                setLoader(false);
                console.log('Error occurred==>', error);
                if (error.response) {
                    if (error.response.status == 401) {
                        console.log('error from api', error.response);
                    }
                    Toast.show(error.response.data.title);
                } else if (error) {
                    Toast.show('Network Error');
                } else {
                    Toast.show('Something Went Wrong');
                }
            });
    }


    return (
        <SafeAreaView style={styles.container}>
            {loader == true ? (
                <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                />
            ) : null}

            <Header title={"Feedback"} />    
            <View style={{flex:1, paddingHorizontal:10}}>
                <View style={{ flex:1}}>
                    <Text Bold style={{ color: GlobalColor.Text, fontSize: GlobalFontSize.P, marginVertical: 7 }}>Give your feedback!</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                                style={styles.input}
                                value={FeedbackData}
                                onChangeText={setFeedbackData}
                                placeholder=""
                                multiline={true}
                                numberOfLines={3}     
                            />
                    </View>
                    <Button title="Submit" onPress={() => {BookShuttleSeatApi()}} />
                </View>
            </View>        
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor:GlobalColor.PrimaryLight,
    },

    inputBox: {
        height: 100,
        borderWidth: 1,
        padding: 10,
        backgroundColor:GlobalColor.White
      },
});

//make this component available to the app
export default Feedback;
