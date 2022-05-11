//import liraries
import React,{ useState,useEffect ,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast'
import * as ApiService from '../../Utils/Utils';
import AuthContext from '../../context/AuthContext';


const CanteenMenu = ({ navigation }) => {
  
  const[menu,setMenu] = useState([])
  const [loader, setLoader] = useState(false);
  const { authContext, AppUserData } = useContext(AuthContext);
  const GetMenuCanttApi = () => {
  let token = AppUserData.token
  // let FilterData =  {LOCN_DESC:ABOHAR}
  let apidata = {
    MenuType: "Canteen",
    MenuDate: "01-APR-2021",
    MenuLocation: "002"
  }
  setLoader(true);
  ApiService.PostMethode('/GetMenuCant', apidata, token)
    .then(result => {
      setLoader(false);
      let ApiValue = result.Value
      console.log("setMenu", ApiValue);
      setMenu(ApiValue)
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
useEffect(() => {
GetMenuCanttApi()
}, [])


  const Calander = () => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

   
    return (
      <View>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={{
            width: '100%',
            marginTop: 10,
            backgroundColor: '#a9bce7',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingVertical: 6
          }}>
          <Text style={{ color: 'gray', fontWeight: '800' }}>
            (Todays Menu ) -- {moment(date).format('MMM Do YYYY')}
          </Text>
          <View>
            <View>
              <TouchableOpacity onPress={() => (setOpen(true))}>
                <Ionicons name="calendar-outline" size={30} color={'#ad3231'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Gurgaon

  const Gurgaon = ({ navigation }) => {

    const [lunch, setLunch] = useState(false);
    const [snacks, setSnacks] = useState(false);
    const [dinner, setDinner] = useState(false);


    const handleDropDown = () => {
      if (lunch == true) {
        setLunch(false);
      } else if (lunch != true) {
        setLunch(true);
      }
    };

    const handleDropDownSeond = () => {
      if (snacks == true) {
        setSnacks(false);
      } else if (snacks != true) {
        setSnacks(true);
      }
    };

    const handleDropDownThird = () => {
      if (dinner == true) {
        setDinner(false);
      } else if (dinner != true) {
        setDinner(true);
      }
    };
    const foodLunch = [
      { lunchCatogory: 'Ag-Shift' },
      { data: 'Jeera Rice' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];
    const foodSnacks = [
      {
        catogory: 'AG-Shift',
        data: 'Tea & Bread Butter',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'B-Shift',
        data: 'Tea , Samosa & Ketchup',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'C-Shift',
        data: 'Tea paneer braed pakora & Ketchup',
        subData: 'Milk & Poha',
        subData2: 'Bread Butter',
      },
    ];
    const foodDinner = [
      { data: 'Jeera' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];

    const renderfoodLunch = ({ item, index }) => {
      return (
        <View>
          <Text style={{ fontSize: 16 }}>{item.CANT_SHFT}</Text>
          <Text>{item.CANT_ITEM1}</Text>
          <Text>{item.CANT_ITEM2}</Text>
          <Text>{item.CANT_ITEM3}</Text>
          <Text>{item.CANT_ITEM4}</Text>
          <Text>{item.CANT_ITEM5}</Text>
          <Text>{item.CANT_ITEM6}</Text>
          <Text>{item.CANT_ITEM7}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({ item, index }) => {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 16 }}>{item.CANT_SHFT}</Text>
          <Text>{item.CANT_ITEM1}</Text>
          <Text>{item.CANT_ITEM2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    return (
      <View>
        <Calander />
        {/* Lunch */}
        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDown()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> LUNCH </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {lunch == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {lunch == true ? (
            <View
              style={{
                borderWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {lunch ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={menu}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* SNACKS */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownSeond()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> SNACKS </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {snacks == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {snacks == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
              }}
            />
          ) : null}
          {snacks ? (
            <View style={{ padding: 15, justifyContent: 'space-evenly' }}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* DINNER */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownThird()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> DINNER </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {dinner == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {dinner == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {dinner ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodDinner}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  // GURGAON End

  // MANSEAR START
  const Manesar = ({ navigation }) => {
    const [lunch, setLunch] = useState(false);
    const [snacks, setSnacks] = useState(false);
    const [dinner, setDinner] = useState(false);
    const handleDropDown = () => {
      if (lunch == true) {
        setLunch(false);
      } else if (lunch != true) {
        setLunch(true);
      }
    };

    const handleDropDownSeond = () => {
      if (snacks == true) {
        setSnacks(false);
      } else if (snacks != true) {
        setSnacks(true);
      }
    };

    const handleDropDownThird = () => {
      if (dinner == true) {
        setDinner(false);
      } else if (dinner != true) {
        setDinner(true);
      }
    };
    const foodLunch = [
      { data: 'Jeera Rice' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];
    const foodSnacks = [
      {
        catogory: 'AG-Shift',
        data: 'Tea & Bread Butter',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'B-Shift',
        data: 'Tea , Samosa & Ketchup',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'C-Shift',
        data: 'Tea paneer braed pakora & Ketchup',
        subData: 'Milk & Poha',
        subData2: 'Bread Butter',
      },
    ];
    const foodDinner = [
      { data: 'Jeera' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];

    const renderfoodLunch = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({ item, index }) => {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 16 }}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    return (
      <View>
        <Calander />
        {/* Lunch */}
        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDown()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> LUNCH </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {lunch == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {lunch == true ? (
            <View
              style={{
                borderWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {lunch ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodLunch}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* SNACKS */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownSeond()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> SNACKS </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {snacks == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {snacks == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
              }}
            />
          ) : null}
          {snacks ? (
            <View style={{ padding: 15, justifyContent: 'space-evenly' }}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* DINNER */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownThird()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> DINNER </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {dinner == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {dinner == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {dinner ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodDinner}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const Mpt = ({ navigation }) => {
    const [lunch, setLunch] = useState(false);
    const [snacks, setSnacks] = useState(false);
    const [dinner, setDinner] = useState(false);
    const handleDropDown = () => {
      if (lunch == true) {
        setLunch(false);
      } else if (lunch != true) {
        setLunch(true);
      }
    };

    const handleDropDownSeond = () => {
      if (snacks == true) {
        setSnacks(false);
      } else if (snacks != true) {
        setSnacks(true);
      }
    };

    const handleDropDownThird = () => {
      if (dinner == true) {
        setDinner(false);
      } else if (dinner != true) {
        setDinner(true);
      }
    };
    const foodLunch = [
      { data: 'Jeera Rice' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];
    const foodSnacks = [
      {
        catogory: 'AG-Shift',
        data: 'Tea & Bread Butter',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'B-Shift',
        data: 'Tea , Samosa & Ketchup',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'C-Shift',
        data: 'Tea paneer braed pakora & Ketchup',
        subData: 'Milk & Poha',
        subData2: 'Bread Butter',
      },
    ];
    const foodDinner = [
      { data: 'Jeera' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];

    const renderfoodLunch = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({ item, index }) => {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 16 }}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    return (
      <View>
        <Calander />
        {/* Lunch */}
        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDown()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> LUNCH </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {lunch == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {lunch == true ? (
            <View
              style={{
                borderWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {lunch ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodLunch}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* SNACKS */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownSeond()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> SNACKS </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {snacks == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {snacks == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
              }}
            />
          ) : null}
          {snacks ? (
            <View style={{ padding: 15, justifyContent: 'space-evenly' }}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* DINNER */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownThird()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> DINNER </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {dinner == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {dinner == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {dinner ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodDinner}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const Rothak = ({ navigation }) => {
    const [lunch, setLunch] = useState(false);
    const [snacks, setSnacks] = useState(false);
    const [dinner, setDinner] = useState(false);
    const handleDropDown = () => {
      if (lunch == true) {
        setLunch(false);
      } else if (lunch != true) {
        setLunch(true);
      }
    };

    const handleDropDownSeond = () => {
      if (snacks == true) {
        setSnacks(false);
      } else if (snacks != true) {
        setSnacks(true);
      }
    };

    const handleDropDownThird = () => {
      if (dinner == true) {
        setDinner(false);
      } else if (dinner != true) {
        setDinner(true);
      }
    };
    const foodLunch = [
      { data: 'Jeera Rice' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];
    const foodSnacks = [
      {
        catogory: 'AG-Shift',
        data: 'Tea & Bread Butter',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'B-Shift',
        data: 'Tea , Samosa & Ketchup',
        subData: 'Tea & Buiscuits Parle-G',
      },
      {
        catogory: 'C-Shift',
        data: 'Tea paneer braed pakora & Ketchup',
        subData: 'Milk & Poha',
        subData2: 'Bread Butter',
      },
    ];
    const foodDinner = [
      { data: 'Jeera' },
      { data: 'Dal Punjabi' },
      { data: 'Began Bharta' },
      { data: ' plain Chapatti' },
      { data: 'plain curd' },
      { data: 'khichidi , Kheera ,Gajar' },
      { data: 'Green Chatney' },
      { data: 'Banana' },
    ];

    const renderfoodLunch = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({ item, index }) => {
      return (
        <View style={{}}>
          <Text style={{ fontSize: 16 }}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({ item, index }) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    return (
      <View>
        <Calander />
        {/* Lunch */}
        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDown()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> LUNCH </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {lunch == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {lunch == true ? (
            <View
              style={{
                borderWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {lunch ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodLunch}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* SNACKS */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownSeond()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> SNACKS </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {snacks == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {snacks == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
              }}
            />
          ) : null}
          {snacks ? (
            <View style={{ padding: 15, justifyContent: 'space-evenly' }}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>

        {/* DINNER */}

        <View style={styles.lunchBoxContainer}>
          <TouchableOpacity
            style={styles.lunchBox}
            onPress={() => handleDropDownThird()}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> DINNER </Text>
            {/* <Ionicons name="chevron-down" size={30} color={'#ad3231'} /> */}
            {dinner == true ? (
              <Ionicons name={'ios-chevron-up'} size={20} />
            ) : (
              <Ionicons name={'ios-chevron-down'} size={20} />
            )}
          </TouchableOpacity>
          {dinner == true ? (
            <View
              style={{
                borderTopWidth: 0.5,
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          ) : null}
          {dinner ? (
            <View style={{ padding: 15 }}>
              <FlatList
                data={foodDinner}
                keyExtractor={({ item, index }) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{ marginVertical: 5 }} />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };
  const renderScene = SceneMap({
    first: Gurgaon,
    second: Manesar,
    third: Mpt,
    fourth: Rothak,
  });
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Gurgaon' },
    { key: 'second', title: 'Manesar' },
    { key: 'third', title: 'MPT' },
    { key: 'fourth', title: 'Rothak' },
  ]);
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <LinearGradient
        colors={['#2757C3', '#80406A', '#ad3231']}
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
              onPress={() => navigation.navigate("Canteen")}
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
            Canteen Menu
          </Text>
        </View>
      </LinearGradient>
      <TabView
        renderTabBar={props => {
          return (
            <LinearGradient
              colors={['#ad3231', '#bd5b5a']}
              style={{ marginTop: -1, zIndex: -1 }}>
              <TabBar
                {...props}
                style={{ backgroundColor: 'transparent', elevation: 0 }}
              />
            </LinearGradient>
          );
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
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

// //make this component available to the app
export default CanteenMenu;
