//import liraries
import React, {useState} from 'react';
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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Canteen from './Canteen';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

const CanteenMenu = ({navigation}) => {
  const Calander = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(formatedDate);
      let formatedDate= moment(currentDate).format('MMMM Do YYYY, h:mm:ss a');
      console.log(formatedDate)
      setText(formatedDate)
    };
    // let tempDate = new Date();
    // let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + ' /' + tempDate.getFullYear();
    //  setText(fDate);
    // setText(currentDate);
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#9f9f9f',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
          marginVertical: 10,
        }}>
        <Text style={{color: '#fff'}}>Today's Menu - {text}</Text>
        <View>
      <View>
        <Ionicons name="calendar-outline" onPress={showDatepicker} size={30} color={'#fff'} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
      </View>
      
    );
  };

  // Gurgaon

  const Gurgaon = ({navigation}) => {
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
      {lunchCatogory:'Ag-Shift'},
      {data: 'Jeera Rice'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
     
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
      {data: 'Jeera'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
    ];

    const renderfoodLunch = ({item, index}) => {
      return (
        <View>
          <Text>{item.lunchCatogory}</Text>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({item, index}) => {
      return (
        <View style={{}}>
          <Text style={{fontSize: 16}}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({item, index}) => {
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> LUNCH </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodLunch}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> SNACKS </Text>
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
            <View style={{padding:15,justifyContent:'space-evenly'}}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> DINNER </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodDinner}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
  const Manesar = ({navigation}) => {
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
      {data: 'Jeera Rice'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
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
      {data: 'Jeera'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
    ];

    const renderfoodLunch = ({item, index}) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({item, index}) => {
      return (
        <View style={{}}>
          <Text style={{fontSize: 16}}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({item, index}) => {
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> LUNCH </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodLunch}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> SNACKS </Text>
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
            <View style={{padding:15,justifyContent:'space-evenly'}}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> DINNER </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodDinner}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const Mpt = ({navigation}) => {
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
      {data: 'Jeera Rice'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
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
      {data: 'Jeera'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
    ];

    const renderfoodLunch = ({item, index}) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({item, index}) => {
      return (
        <View style={{}}>
          <Text style={{fontSize: 16}}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({item, index}) => {
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> LUNCH </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodLunch}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> SNACKS </Text>
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
            <View style={{padding:15,justifyContent:'space-evenly'}}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> DINNER </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodDinner}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const Rothak = ({navigation}) => {
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
      {data: 'Jeera Rice'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
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
      {data: 'Jeera'},
      {data: 'Dal Punjabi'},
      {data: 'Began Bharta'},
      {data: ' plain Chapatti'},
      {data: 'plain curd'},
      {data: 'khichidi , Kheera ,Gajar'},
      {data: 'Green Chatney'},
      {data: 'Banana'},
    ];

    const renderfoodLunch = ({item, index}) => {
      return (
        <View>
          <Text>{item.data}</Text>
        </View>
      );
    };
    const renderfoodSnacks = ({item, index}) => {
      return (
        <View style={{}}>
          <Text style={{fontSize: 16}}>{item.catogory}</Text>
          <Text>{item.data}</Text>
          <Text>{item.subData}</Text>
          <Text>{item.subData2}</Text>
        </View>
      );
    };
    const renderfoodDinner = ({item, index}) => {
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> LUNCH </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodLunch}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodLunch}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> SNACKS </Text>
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
            <View style={{padding:15,justifyContent:'space-evenly'}}>
              <FlatList
                data={foodSnacks}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodSnacks}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> DINNER </Text>
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
            <View style={{padding: 15}}>
              <FlatList
                data={foodDinner}
                keyExtractor={({item, index}) => index}
                renderItem={renderfoodDinner}
                ItemSeparatorComponent={() => (
                  <View style={{marginVertical: 5}} />
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
    {key: 'first', title: 'Gurgaon'},
    {key: 'second', title: 'Manesar'},
    {key: 'first', title: 'MPT'},
    {key: 'second', title: 'Rothak'},
  ]);
  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
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
              onPress={() => navigation.navigate(Canteen)}
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
              style={{marginTop: -1, zIndex: -1}}>
              <TabBar
                {...props}
                style={{backgroundColor: 'transparent', elevation: 0}}
              />
            </LinearGradient>
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
