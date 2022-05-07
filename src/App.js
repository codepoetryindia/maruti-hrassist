import * as React from 'react';
import {StatusBar, View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Routes from './navigations/Routes';
export default function App() {
  // const StatusBarHeight = StatusBar.currentHeight
  
  return (
    <>
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
