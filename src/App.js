import * as React from 'react';
import {StatusBar, View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Routes from './navigations/Routes';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { Store } from './store/store';
export default function App() {
  // const StatusBarHeight = StatusBar.currentHeight
  
  return (
    <>
      <Provider store={Store}>
        <StatusBar
        />
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
