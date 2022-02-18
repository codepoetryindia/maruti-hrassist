//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

// create a component
const Birthdays = () => {
  const BirthdayData = [
    {
      dept: 'EPP',
      name: 'MR. Dahal',
      email: 'mrdahal@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'ENGG',
      name: 'MR. Kunal',
      email: 'mrKunal@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'CPP',
      name: 'MR. Amit',
      email: 'amit@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'ENGG',
      name: 'MR. Diwas',
      email: 'diwas@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'cpp',
      name: 'MR. Brashant',
      email: 'Brashant@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'EPP',
      name: 'MR. Dahal',
      email: 'mrdahal@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'ENGG',
      name: 'MR. Kunal',
      email: 'mrKunal@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'CPP',
      name: 'MR. Amit',
      email: 'amit@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'ENGG',
      name: 'MR. Diwas',
      email: 'diwas@.codepoetry.in',
      divison: 'MGR | GPA',
    },
    {
      dept: 'cpp',
      name: 'MR. Brashant',
      email: 'Brashant@.codepoetry.in',
      divison: 'MGR | GPA',
    },
  ];

  //   const {Birthdays, Tomorow} = route.params;
  const [CurrentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = index => {
    setCurrentPage(index);
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <SegmentedControlTab
          borderRadius={0}
          values={['Today', 'Tomorrow']}
          selectedIndex={CurrentPage}
          onTabPress={index => {
            handleCurrentPage(index);
          }}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
      </View>

      <View>
        {CurrentPage == 0 ? (
          <View>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Birthday_candles.jpg/1200px-Birthday_candles.jpg',
              }}
              style={styles.img}
            />

            <View style={{height: '65%', marginTop: 10, marginBottom: '30%'}}>
              <FlatList
              showsVerticalScrollIndicator={false}
                data={BirthdayData}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <View style={styles.itemView}>
                    <View
                      style={{
                        borderRightWidth: 1,
                        paddingVertical: 15,
                        borderColor:'gray',
                        width: '20%',
                      }}>
                      <Text style={{textAlign: 'center'}}>{item.dept}</Text>
                    </View>
                    <View
                      style={{
                        width: '80%',
                        paddingVertical: 5,
                        paddingLeft: 15,
                      }}>
                      <Text style>{item.name}</Text>
                      <Text>{item.email}</Text>
                      <Text>{item.divison}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={{height: '95%', paddingVertical: 10}}>
              <FlatList
               showsVerticalScrollIndicator={false}
                data={BirthdayData}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <View style={styles.itemView}>
                    <View
                      style={{
                        borderRightWidth: 2,
                        paddingVertical: 8,
                        width: '20%',
                      }}>
                      <Text style={{textAlign: 'center'}}>{item.dept}</Text>
                    </View>
                    <View
                      style={{
                        width: '80%',
                        paddingVertical: 5,
                        paddingLeft: 15,
                      }}>
                      <Text style>{item.name}</Text>
                      <Text>{item.email}</Text>
                      <Text>{item.divison}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width:"90%",
  },
  tabsContainerStyle: {
    marginTop: 20,
  },
  tabStyle: {
    //custom styles
    paddingVertical: 10,
    borderColor: '#ad3231',
  },
  tabTextStyle: {
    //custom styles
    fontWeight: '700',
    color: 'grey',
  },
  activeTabStyle: {
    //custom styles
    backgroundColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: '#2757C3',
    // borderColor:Colors.primaryColor
  },
  activeTabTextStyle: {
    color: '#2757C3',
  },

  img: {
    width: '100%',
    height: '15%',
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemView: {
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.0,

    elevation: 2,
  },
});

//make this component available to the app
export default Birthdays;
