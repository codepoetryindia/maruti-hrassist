//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native-gesture-handler';

// create a component
const Payroll = () => {
  // >Tax Computation Slip
  const data = [
    {Component: 'Gross Salary', Amount: '876540'},
    {Component: 'Standard Deduction', Amount: '8784'},
    {Component: 'Net Salary', Amount: '87654'},
    {Component: 'Declared Income', Amount: '0'},
    {Component: 'NPS CONTRI BY EMPLOYER', Amount: '0'},
    {Component: 'TOTAL INCOME', Amount: '554754657'},
    {Component: 'TOTAL DEDUCTION', Amount: '847654'},
    {Component: 'GROSS INCOME', Amount: '66637654'},
    {Component: 'total saving', Amount: '1187654'},
    {Component: 'REBATE (MAX 1500000)', Amount: '15000000'},
    {Component: 'Net income', Amount: '6257220'},
    {Component: 'Tax Payable', Amount: '3695'},
    {Component: 'Tax Paid', Amount: '30654'},
    {Component: 'Tax Due', Amount: '8754'},
  ];
  //   end >Tax Computation Slip

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Salary Slip</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>

      {/* Tax  */}

      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.box}>
          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#ad3231',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
            </View>
          </View>
          <View style={styles.item}>
            <Text>Tax Computation Slip</Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </View>

        <Modal
          backdropOpacity={0.1}
          animationInTiming={300}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationOutTiming={500}
          coverScreen={true}
          isVisible={isModalVisible}>
          <View style={styles.modal}>
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Feather
                name="x-circle"
                color={'#000'}
                size={20}
                onPress={toggleModal}
                style={{margin: 10}}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Component</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Amount(Rs.)
              </Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.textContainer}>
                  <Text>{item.Component}</Text>
                  <Text>{item.Amount}</Text>
                </View>
              )}
            />
          </View>
        </Modal>
      </TouchableOpacity>

      {/* PF */}

      <TouchableOpacity>
        <View style={styles.box}>
          <View style={styles.iconBox}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: '#ad3231',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
            </View>
          </View>
          <View style={styles.item}>
            <Text>Pf Balance </Text>
            <Feather name="corner-up-right" size={20} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Tax Saving */}

      <TouchableOpacity style={styles.box}>
        <View style={styles.iconBox}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#ad3231',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Foundation name="page-export-pdf" size={20} color={'#ad3231'} />
          </View>
        </View>
        <View style={styles.item}>
          <Text>Tax Saving</Text>
          <Feather name="corner-up-right" size={20} />
        </View>
      </TouchableOpacity>
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
  modal: {
    flex: 0.9,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#f8edec',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.0,

    elevation: 5,
  },
  textContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 8.5,
  },
});

//make this component available to the app
export default Payroll;
