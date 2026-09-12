import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DrawerProps = { visible: boolean; onClose: () => void };
type MenuItem = { title: string; options: string[] };

const drawerWidth = Dimensions.get('window').width * 0.8;
const menuItems: MenuItem[] = [
  { title: 'Admin', options: ['Level 3', 'Level 2', 'Level 1'] },
  { title: 'Local', options: ['Local 3', 'Local 2', 'Local 1'] },
  { title: 'Roads', options: ['Highways', 'Main', 'Local', 'Railways'],
  },
];

function Drawer({ visible, onClose }: DrawerProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [enabledOptions, setEnabledOptions] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [translateX, visible]);

  const toggleOption = (option: string) => {
    setEnabledOptions(current => ({ ...current, [option]: !current[option] }));
  };

  const safeBounds = { top: insets.top, bottom: insets.bottom };

  return (
    <View
      pointerEvents={visible ? 'auto' : 'none'}
      style={StyleSheet.absoluteFill}
    >
      <Animated.View
        style={[
          styles.scrim,
          safeBounds,
          {
            opacity: translateX.interpolate({
              inputRange: [-drawerWidth, 0],
              outputRange: [0, 0.26],
            }),
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[styles.drawer, safeBounds, { transform: [{ translateX }] }]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
        >
          {menuItems.map((item, index) => {
            const isExpanded = expandedItem === item.title;
            return (
              <View key={item.title}>
                {index > 0 && <View style={styles.itemDivider} />}
                <View style={styles.itemHeader}>
                  <View style={styles.itemText}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${
                      isExpanded ? 'Collapse' : 'Expand'
                    } ${item.title}`}
                    onPress={() =>
                      setExpandedItem(isExpanded ? null : item.title)
                    }
                    style={({ pressed }) => [
                      styles.expandButton,
                      pressed && styles.expandButtonPressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.expandIcon,
                        isExpanded && styles.expandIconOpen,
                      ]}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>
                {isExpanded && (
                  <View style={styles.optionsArea}>
                    <View style={styles.chipRow}>
                      {item.options.map(option => {
                        const optionKey = `${item.title}:${option}`;
                        const enabled = !!enabledOptions[optionKey];
                        return (
                          <Pressable
                            key={option}
                            accessibilityRole="button"
                            accessibilityState={{ selected: enabled }}
                            onPress={() => toggleOption(optionKey)}
                            style={({ pressed }) => [
                              styles.chip,
                              enabled && styles.chipEnabled,
                              pressed && styles.chipPressed,
                            ]}
                          >
                            <View
                              style={[
                                styles.chipIndicator,
                                enabled && styles.chipIndicatorEnabled,
                              ]}
                            />
                            <Text
                              style={[
                                styles.chipText,
                                enabled && styles.chipTextEnabled,
                              ]}
                            >
                              {option}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
        <Text style={styles.footerText}>MAP DATA BY OPENSTREETMAP</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#173044',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    width: drawerWidth,
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    elevation: 18,
    shadowColor: '#102535',
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 5, height: 0 },
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  mark: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#1678b6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  markText: { fontSize: 21, fontWeight: '800', color: '#ffffff' },
  appName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#18324a',
  },
  tagline: { marginTop: 2, fontSize: 11, color: '#718696' },
  closeButton: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f6f8',
  },
  closeText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#526a7b',
    fontWeight: '500',
  },
  divider: { height: 1, backgroundColor: '#e7eef2', marginVertical: 24 },
  sectionLabel: {
    marginBottom: 10,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    color: '#8196a5',
  },
  menuList: { paddingBottom: 16 },
  itemDivider: { height: 1, backgroundColor: '#e7eef2', marginVertical: 8 },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#edf6fb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  icon: { fontSize: 16, color: '#1678b6', fontWeight: '700' },
  itemText: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#213d50' },
  itemDetail: { fontSize: 11, color: '#78909f', marginTop: 2 },
  expandButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#f0f6f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButtonPressed: { backgroundColor: '#dceef7' },
  expandIcon: {
    fontSize: 21,
    lineHeight: 24,
    color: '#1678b6',
    fontWeight: '400',
  },
  expandIconOpen: { transform: [{ rotate: '45deg' }] },
  optionsArea: { paddingLeft: 53, paddingBottom: 12 },
  optionsHint: { fontSize: 10, color: '#8499a7', marginBottom: 9 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8e5eb',
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  chipEnabled: { borderColor: '#1678b6', backgroundColor: '#eaf6fc' },
  chipPressed: { opacity: 0.72 },
  chipIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#bdcbd3',
    marginRight: 6,
  },
  chipIndicatorEnabled: { backgroundColor: '#1678b6' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#5f7685' },
  chipTextEnabled: { color: '#126394' },
  footerText: {
    fontSize: 9,
    letterSpacing: 1,
    color: '#a3b2bc',
    paddingTop: 10,
  },
});

export default Drawer;
