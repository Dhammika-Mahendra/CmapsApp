/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Drawer from './components/Drawer';
import Map from './components/Map';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <Map />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu"
          onPress={() => setDrawerOpen(true)}
          style={({pressed}) => [styles.drawerTab, pressed && styles.drawerTabPressed]}>
          <Text style={styles.drawerTabArrow}>›</Text>
        </Pressable>
        <Drawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerTab: {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: 30,
    height: 76,
    marginTop: -38,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#18324a',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  drawerTabPressed: {
    backgroundColor: '#edf6fb',
  },
  drawerTabArrow: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '300',
    color: '#1678b6',
  },
});

export default App;
