import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type DrawerProps = {visible: boolean; onClose: () => void; onItemPress: () => void};
const drawerWidth = Dimensions.get('window').width * 0.8;
const menuItems = [
  {title: 'Districts', detail: 'Explore administrative areas', icon: 'D'},
  {title: 'Cities', detail: 'Browse places and towns', icon: 'C'},
  {title: 'Roads', detail: 'View routes and connections', icon: 'R'},
  {title: 'Landmarks', detail: 'Discover points of interest', icon: 'L'},
];

function Drawer({visible, onClose, onItemPress}: DrawerProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  const safeBounds = {top: insets.top, bottom: insets.bottom};

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.scrim, safeBounds, {opacity: translateX.interpolate({inputRange: [-drawerWidth, 0], outputRange: [0, 0.26]})}]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View style={[styles.drawer, safeBounds, {transform: [{translateX}]}]}>
        <View style={styles.brandRow}><View style={styles.mark}><Text style={styles.markText}>C</Text></View><View><Text style={styles.appName}>C MAPS</Text><Text style={styles.tagline}>A clearer way to explore</Text></View><Pressable onPress={onClose} style={styles.closeButton} accessibilityLabel="Close menu"><Text style={styles.closeText}>x</Text></Pressable></View>
        <View style={styles.divider} /><Text style={styles.sectionLabel}>EXPLORE</Text>
        {menuItems.map(item => <Pressable key={item.title} onPress={onItemPress} style={({pressed}) => [styles.item, pressed && styles.itemPressed]}><View style={styles.iconBox}><Text style={styles.icon}>{item.icon}</Text></View><View style={styles.itemText}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.itemDetail}>{item.detail}</Text></View><Text style={styles.chevron}>{'>'}</Text></Pressable>)}
        <View style={styles.footer}><Text style={styles.footerText}>MAP DATA BY OPENSTREETMAP</Text></View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#173044'},
  drawer: {position: 'absolute', top: 0, bottom: 0, width: drawerWidth, backgroundColor: '#ffffff', paddingHorizontal: 22, paddingTop: 18, paddingBottom: 20, elevation: 18, shadowColor: '#102535', shadowOpacity: 0.3, shadowRadius: 24, shadowOffset: {width: 5, height: 0}},
  brandRow: {flexDirection: 'row', alignItems: 'center'}, mark: {width: 42, height: 42, borderRadius: 13, backgroundColor: '#1678b6', alignItems: 'center', justifyContent: 'center', marginRight: 11}, markText: {fontSize: 21, fontWeight: '800', color: '#ffffff'}, appName: {fontSize: 16, fontWeight: '800', letterSpacing: 1.5, color: '#18324a'}, tagline: {marginTop: 2, fontSize: 11, color: '#718696'}, closeButton: {marginLeft: 'auto', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f6f8'}, closeText: {fontSize: 20, lineHeight: 24, color: '#526a7b', fontWeight: '500'}, divider: {height: 1, backgroundColor: '#e7eef2', marginVertical: 27}, sectionLabel: {marginBottom: 12, fontSize: 10, fontWeight: '800', letterSpacing: 1.3, color: '#8196a5'}, item: {flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 8, marginHorizontal: -8, borderRadius: 14}, itemPressed: {backgroundColor: '#f0f7fb'}, iconBox: {width: 40, height: 40, borderRadius: 12, backgroundColor: '#edf6fb', alignItems: 'center', justifyContent: 'center', marginRight: 13}, icon: {fontSize: 16, color: '#1678b6', fontWeight: '700'}, itemText: {flex: 1}, itemTitle: {fontSize: 16, fontWeight: '700', color: '#213d50'}, itemDetail: {fontSize: 11, color: '#78909f', marginTop: 2}, chevron: {fontSize: 20, color: '#a9bac4', fontWeight: '500'}, footer: {marginTop: 'auto', paddingTop: 20}, footerText: {fontSize: 9, letterSpacing: 1, color: '#a3b2bc'},
});

export default Drawer;