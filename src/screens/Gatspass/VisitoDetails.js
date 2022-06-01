//import liraries
import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import VisitDetails from '../../components/VisitDetails';
import SelectDropdown from 'react-native-select-dropdown';
import {Formik, Form, Field, ErrorMessage, FieldArray, getIn} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-simple-toast'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import AuthContext from '../../context/AuthContext';
import moment from 'moment';
import * as ApiService from '../../Utils/Utils';






const VisitorDetails = ({navigation,route}) => {
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);

  const fromRef = useRef(null);

  const insertVGPE = () => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    // let apiData = {
    //   'ntLogin':route.params.visitorpayload.authorizedPerson,
    //   'type':route.params.visitorpayload.VisType,
    //   'visitDateTo':moment(new Date(route.params.visitorpayload.dateDummy)).format('MM/DD/YY'),
    //   'visitDateFrom':moment(new Date(route.params.visitorpayload.dateDummy)).format('MM/DD/YY'),
    //   'noOfPerson':'1',
    //   'vehicleIndicator':route.params.visitorpayload.Pvehicle,
    //   'vehicleNumber':route.params.visitorpayload.vehicleNumber,
    //   'duration':route.params.visitorpayload.duration,
    //   'reason':route.params.visitorpayload.ReasonToCome,
    //   'internalVehicleIndicator':route.params.visitorpayload.interVehicle,
    //   'expectedArrivalTime':route.params.visitorpayload.exArrTime,
    //   'searchLevel':route.params.visitorpayload.SearchLevel,
    //   'locationCode':route.params.visitorpayload.location,
    //   'vglmId':route.params.visitorpayload.buildings,
    //   'multipleEmployeeIndicator':route.params.visitorpayload.empId,
    // };


    let apiData = {
        "UserName" : userId,
        "Type" : route.params.visitorpayload.VisType,
        "VisitDateFrom" : moment(new Date(route.params.visitorpayload.dateDummy)).format('MM-DD-YY'),
        "NoOfPerson" : "1",
        "VehicleIndicator" : route.params.visitorpayload.Pvehicle,
        "VehicleNumber" : route.params.visitorpayload.vehicleNumber,
        "Duration" : route.params.visitorpayload.duration,
        "Reason" : route.params.visitorpayload.ReasonToCome,
        "InternalVehicleIndicator" : route.params.visitorpayload.interVehicle,
        "ExpectedArrivalTime" : route.params.visitorpayload.exArrTime,
        "SearchLevel" : route.params.visitorpayload.SearchLevel,
        "LocationCode" : route.params.visitorpayload.location,
        "VisitDateTo" : moment(new Date(route.params.visitorpayload.dateDummy)).format('MM-DD-YY'),
        "VglmID" : "",
        "MultipleEmployeeIndicator" : route.params.visitorpayload.empId,     
        }

        // route.params.visitorpayload.buildings,
    

    setLoader(true);
    ApiService.PostMethode('/SubmitVGPE', apiData, token)
      .then(result => {
        console.log("APiresult SubmitVGPE", result);
        if(result.Result){
          SubmitVSDT(result.Result);
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };

  const GetVisitorPhoneBygps = (phone, index) => {
    let token = AppUserData.token;
    let userId = AppUserData.data.userId;
    let apiData ={"Search": phone};
    setLoader(true);
    ApiService.PostMethode('/GetVisitorByPhoneVGPS', apiData, token)
      .then(result => {
        console.log(result.Value);
        if(result.Value.length > 0){
          console.log(fromRef, `actionPlans[${index}].vendor`);
          fromRef.current.setFieldValue(`actionPlans[${index}].vendor`,result.Value[0].VENDOR);
          fromRef.current.setFieldValue(`actionPlans[${index}].title`,result.Value[0].TITLE);
          fromRef.current.setFieldValue(`actionPlans[${index}].name`, result.Value[0]['VISITOR NAME']);
          fromRef.current.setFieldValue(`actionPlans[${index}].designation`, result.Value[0].DESG);
          fromRef.current.setFieldValue(`actionPlans[${index}].laptop`, result.Value[0].LAPTOP);
          fromRef.current.setFieldValue(`actionPlans[${index}].adddress`, result.Value[0].ADDR1);
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };


  const SubmitVSDT = (controlno) => {
    let token = AppUserData.token
    let userId = AppUserData.data.userId
    let apiData = [{
      "ControlNo" : controlno,
      "EmplID" : "270679",
      "VisitorName" : "DEMO",
      "AddressLine1" : "hsdbnok",
      "AddressLine2" : "dfss",
      "VisitorDesg" : "AM",
      "VisitorPhone" : "52635263",
      "VisitorLaptopID" : "",
      "VisitorTitle" : "ewf",
      "VisitorUserID" : "222852",
      "VisitorVendor" : "asdf"
      },
      {
        "ControlNo" : controlno,
        "EmplID" : "270679",
        "VisitorName" : "DEMO",
        "AddressLine1" : "hsdbnok",
        "AddressLine2" : "dfss",
        "VisitorDesg" : "AM",
        "VisitorPhone" : "52635263",
        "VisitorLaptopID" : "",
        "VisitorTitle" : "ewf",
        "VisitorUserID" : "222852",
        "VisitorVendor" : "asdf"
        }, ]
        // route.params.visitorpayload.buildings
    setLoader(true);
    ApiService.PostMethode('/SubmitVSDT', apiData, token)
      .then(result => {
        console.log("APiresult SubmitVSDT", result);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('Error occurred==>', error);
        if (error.response) {
          if (error.response.status == 401) {
            console.log('error from api', error.response);
          }
          // client received an error response (5xx, 4xx)
          Toast.show(error.response.data.title);
        } else if (error.request) {
          // client never received a response, or request never left
          Toast.show('Network Error');
          // console.log("error.request", error.request._response);
        } else {
          // anything else
          Toast.show('Something Went Wrong');
        }
      });
  };




  const [ActionPlans, setActionPlans] = useState([
    {
      phone: '',
      vendor: '',
      title:'',
      name:'',
      designation:'',
      laptop:'',
      adddress:''
    },
  ]);




  const schema = Yup.object().shape({
    actionPlans: Yup.array().of(
      Yup.object().shape({
        // ColourQuentity: Yup.string()
        //   .min(1, 'too short')
        //   .required('Required')
        //   .test('should', 'Please enter a valid number.', (text) => {
        //     let reg1 = /^[1-9][0-9]*$/;
        //     if (reg1.test(text) == false) {
        //       return false;
        //     }
  
        //     let reg = /^[0-9]*$/;
        //     if (reg.test(text) === false) {
        //       return false;
        //     } else {
        //       return true;
        //     }
        //   })
        //   .test('Quantity', 'Max Quantity 15', (text) => {
        //     if (text < 16) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   }), 
          // these constraints take precedence
          phone: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence
          vendor: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence
          title: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence
          name: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence
          designation: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence
          laptop: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence
          adddress: Yup.string().min(1, 'too short').required('Required'), // these constraints take precedence

      }),
    ),
    // .required('Minimum one product required'), // these constraints are shown if and only if inner constraints are satisfied
    //.min(3, 'Minimum of 3 friends'),
  });


  let visitorData =  route.params.visitorData;


  // console.log("visitorData",visitorData);
  return (
    <SafeAreaView style={{flex: 1}}>
        <Spinner
          visible={loader}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <LinearGradient
          colors={['#00B4DB','#0083B0']}
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
                size={15}
                color={'white'}
                onPress={() => navigation.goBack()}
              />
              <Ionicons
                name="menu-outline"
                size={20}
                color={'white'}
                onPress={() => navigation.openDrawer()}
              />
            </View>

            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                letterSpacing: 1,
                marginLeft: 30,
                fontWeight:'700'
              }}>
              Visitor Details
            </Text>
          </View>
        </LinearGradient>
        {/* Body */}
        <ScrollView nestedScrollEnabled={true} style={{paddingHorizontal:10}}>

            <Formik
              innerRef={fromRef}
              enableReinitialize
              initialValues={{
                actionPlans: ActionPlans,
              }}
              validationSchema={schema}
              onSubmit={(values) => {

                insertVGPE();

                console.log(values);
                return;
                if (!values.actionPlans.length) {
                  Alert.alert('Error', 'Minimum one product required');
                  return;
                }

                this.submitProducts(values);

                // console.log(values.actionPlans.length);
                // if (values.actionPlans.length > 0) {
                //   submitAnswer(values);
                // } else {
                //   console.log('Updating');
                //   UpdateAnswer();
                // }
              }}>
              {({
                values,
                handleBlur,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
              }) => {
                return (
                  <FieldArray name="actionPlans">
                    {(arrayHelpers) => {
                      // console.log(errors);
                      return (
                        <View>
                          {
                            values.actionPlans && values.actionPlans.length > 0
                              ? values.actionPlans.map((actionPlans, index) => {
                                  return (
                                    <View key={index} style={styles.card}>
                                      <TouchableOpacity
                                        style={styles.deleteIcon}
                                        onPress={() =>
                                          arrayHelpers.remove(index)
                                        }>
                                        <Icon
                                          name="trash"
                                          size={25}
                                          style={styles.iconTrash}></Icon>
                                      </TouchableOpacity>
                                          <Text
                                            style={styles.labelHeading}>
                                           Enter Person Details
                                          </Text>


                                      <View style={styles.singlerow}>
                                        <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Phone
                                          </Text>
                                          <TextInput
                                            key={index.ColourQuentity}
                                            keyboardType='number-pad'
                                            // maxLength={5}
                                            style={styles.input}
                                            // placeholder="Enter phone"
                                            onChangeText={handleChange(
                                              `actionPlans[${index}].phone`,
                                            )}
                                            onBlur={() => {
                                              handleBlur(
                                                `actionPlans[${index}].phone`,
                                              );
                                              GetVisitorPhoneBygps(values.actionPlans[index].phone, index);

                                            }}
                                          />
                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .phone
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>

                                        <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Vendor
                                          </Text>
                                          <TextInput
                                              key={index.ColourQuentity}
                                              // maxLength={5}
                                              style={styles.input}
                                              value={values.actionPlans[index].vendor}
                                              // placeholder="Enter vendor"
                                              onChangeText={handleChange(
                                                `actionPlans[${index}].vendor`,
                                              )}
                                              onBlur={() => {
                                                handleBlur(
                                                  `actionPlans[${index}].vendor`,
                                                );
                                              }}
                                            />
                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .vendor
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>
                                      </View>

                                      <View style={styles.singlerow}>
                                        <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Title
                                          </Text>
                                          {/* <TextInput
                                            key={index.ColourQuentity}
                                            // maxLength={5}
                                            style={styles.input}
                                            // placeholder="Enter title"
                                            onChangeText={handleChange(
                                              `actionPlans[${index}].title`,
                                            )}
                                            onBlur={() => {
                                              handleBlur(
                                                `actionPlans[${index}].title`,
                                              );
                                            }}
                                          /> */}

                                        <SelectDropdown
                                          buttonTextAfterSelection={(selectedItem, index) => {
                                          // text represented after item is selected
                                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                                          return selectedItem.label
                                          }}
                                          rowTextForSelection={(item, index) => {
                                          // text represented for each item in dropdown
                                          // if data array is an array of objects then return item.property to represent item in dropdown
                                          return item.label
                                          }}
                                          // defaultButtonText="Yes"
                                          dropdownBackgroundColor={'transparent'}
                                          data={[
                                            {
                                              label:"Mr",
                                              value:"MR"
                                            }, {
                                              label:"MRS",
                                              value:"MRS"
                                            }
                                          ]}
                                          onSelect={(selectedItem) => {
                                            // console.log(selectedItem, index);
                                            setFieldValue(`actionPlans[${index}].title`,selectedItem.value);
                                          }}
                                          buttonStyle={styles.dropdown2BtnStyle}
                                          buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                          renderDropdownIcon={isOpened => {
                                            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                          }}
                                          dropdownIconPosition={'right'}
                                          dropdownStyle={styles.dropdown2DropdownStyle}
                                          rowStyle={styles.dropdown2RowStyle}
                                          rowTextStyle={styles.dropdown2RowTxtStyle}
                                        />

                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .title
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>

                                        <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Name
                                          </Text>
                                          <TextInput
                                              key={index.ColourQuentity}
                                              // maxLength={5}
                                              style={styles.input}
                                              value={values.actionPlans[index].name}
                                              // placeholder="Enter name"
                                              onChangeText={handleChange(
                                                `actionPlans[${index}].name`,
                                              )}
                                              onBlur={() => {
                                                handleBlur(
                                                  `actionPlans[${index}].name`,
                                                );
                                              }}
                                            />
                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .name
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>
                                      </View>
                                      
                                      <View style={styles.singlerow}>
                                        <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Designation
                                          </Text>
                                          <TextInput
                                            key={index.ColourQuentity}
                                            // maxLength={5}
                                            style={styles.input}
                                            value={values.actionPlans[index].designation}
                                            // placeholder="Enter designation"
                                            onChangeText={handleChange(
                                              `actionPlans[${index}].designation`,
                                            )}
                                            onBlur={() => {
                                              handleBlur(
                                                `actionPlans[${index}].designation`,
                                              );
                                            }}
                                          />
                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .designation
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>

                                        <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Laptop/ipad/tablet
                                          </Text>
                                          <TextInput
                                              key={index.ColourQuentity}
                                              // maxLength={5}
                                              style={styles.input}
                                              value={values.actionPlans[index].laptop}
                                              // placeholder="Enter laptop"
                                              onChangeText={handleChange(
                                                `actionPlans[${index}].laptop`,
                                              )}
                                              onBlur={() => {
                                                handleBlur(
                                                  `actionPlans[${index}].laptop`,
                                                );
                                              }}
                                            />
                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .laptop
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>
                                      </View>

                                      <View style={styles.columnsingle}>
                                          <Text
                                            style={styles.label}>
                                           Adddress
                                          </Text>
                                          <TextInput
                                              key={index.ColourQuentity}
                                              // maxLength={5}
                                              style={styles.input}
                                              value={values.actionPlans[index].adddress}
                                              // placeholder="Enter adddress"
                                              onChangeText={handleChange(
                                                `actionPlans[${index}].adddress`,
                                              )}
                                              onBlur={() => {
                                                handleBlur(
                                                  `actionPlans[${index}].adddress`,
                                                );
                                              }}
                                            />
                                          {errors.actionPlans &&
                                            errors.actionPlans.length >= index ? (
                                              <Text style={styles.errorLabel}>
                                                {errors.actionPlans[index] !=
                                                undefined ? (
                                                  <Text>
                                                    {
                                                      errors.actionPlans[index]
                                                        .adddress
                                                    }
                                                  </Text>
                                                ) : null}
                                              </Text>
                                            ) : null}
                                        </View>


                                    </View>
                                  );
                                  // <View key={index}>
                                  //   <TextInput
                                  //     onChangeText={handleChange(
                                  //       actionPlans.actionPlanAns,
                                  //     )}
                                  //     onBlur={handleBlur(actionPlans.actionPlanAns)}
                                  //     value={actionPlans.actionPlanAns}
                                  //   />
                                  //   <Button
                                  //     title="(-)"
                                  //     onPress={() => arrayHelpers.remove(index)}></Button>
                                  //   <Button
                                  //     title="(+)"
                                  //     onPress={() => {
                                  //       arrayHelpers.insert(index, '');
                                  //     }}></Button>
                                  // </View>;
                                })
                              : null
                            // : (
                            // <Button
                            //   title="Submit"
                            //   onClick={() => arrayHelpers.push('')}>
                            //   Add a friend
                            // </Button>
                            // )
                          }
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#fff',
                              marginTop: 20,
                              // marginBottom: 50,
                              height: 50,
                              justifyContent: 'center',
                            }}
                            onPress={() =>
                              arrayHelpers.push({
                                phone: '',
                                vendor: '',
                                title:'',
                                name:'',
                                designation:'',
                                laptop:'',
                                adddress:''
                              })
                            }>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: '500',
                              }}>
                              Add New
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              backgroundColor: '#2980b9',
                              marginTop: 20,
                              marginBottom: 50,
                              height: 50,
                              justifyContent: 'center',
                            }}
                            name="submit"
                            onPress={handleSubmit}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: '#fff',
                                fontWeight: '700',
                              }}>
                              Submit
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  </FieldArray>
                );
              }}
            </Formik>
        </ScrollView>
    </SafeAreaView>
  );
};
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    gradient: {
      padding: 20,
    },
    card:{
      backgroundColor:'#fff',
      marginTop:10,
      position:'relative',
      padding:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconTrash: {
      color: '#f00',
    },
    deleteIcon: {
      position: 'absolute',
      right: 10,
      top: 10,
      width: 30,
      height: 30,
      zIndex: 40,
    },
    errorLabel: {
      color: '#f00',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor:'#4a4a4a',
      padding: 5,
      borderRadius: 5,
    },
    singlerow:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:5
    },
    columnsingle:{
      width:"49%",
    },
    label:{
      paddingHorizontal: 0,
      fontSize: 16,
      fontWeight: '700',
      marginBottom:3
    },
    labelHeading:{
      paddingHorizontal: 0,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom:10
    },
    // Dropdown styles
    dropdown2BtnStyle: {
      width: '100%',
      height: 40,
      borderWidth:1,
      borderRadius: 3,
      backgroundColor: '#FFF',
      borderColor:'#444',
    },
    dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize:16},
    dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {color: '#444', textAlign: 'left', fontSize:16},


  });
//make this component available to the app
export default VisitorDetails;
