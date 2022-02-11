import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

 function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" />
      <Drawer.Screen name="Article" />
    </Drawer.Navigator>
  );
}
export default MyDrawer;