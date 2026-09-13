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

type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  onOptionChange: (chipId: string, enabled: boolean) => void;
};
type MenuOption = { id: string; label: string };
type MenuItem = { title: string; options: MenuOption[] };

const drawerWidth = Dimensions.get('window').width * 0.8;
const menuItems: MenuItem[] = [
  {
    title: 'Admin',
    options: [
      { id: '11', label: 'ADM 3' },
      { id: '12', label: 'Color' },
      { id: '13', label: 'Labels' },
    ],
  },
  {
    title: 'Local',
    options: [
      { id: '21', label: 'Local' },
      { id: '22', label: 'Color' },
      { id: '23', label: 'Labels' },
    ],
  },
  {
    title: 'Colombo',
    options: [
      { id: '31', label: 'Postal' },
      { id: '32', label: 'Color' },
      { id: '33', label: 'Labels' },
    ],
  },
];

function Drawer({ visible, onClose, onOptionChange }: DrawerProps) {
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

  const toggleOption = (chipId: string) => {
    const enabled = !enabledOptions[chipId];
    setEnabledOptions(current => ({ ...current, [chipId]: enabled }));
    onOptionChange(chipId, enabled);
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
                        const enabled = !!enabledOptions[option.id];
                        return (
                          <Pressable
                            key={option.id}
                            accessibilityRole="button"
                            accessibilityState={{ selected: enabled }}
                            onPress={() => toggleOption(option.id)}
                            style={({ pressed }) => [
                              styles.chip,
                              enabled && styles.chipEnabled,
                              pressed && styles.chipPressed,
                            ]}
                          >
                            <Text
                              style={[
                                styles.chipText,
                                enabled && styles.chipTextEnabled,
                              ]}
                            >
                              {option.label}
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
  menuList: { paddingBottom: 16 },
  itemDivider: { height: 1, backgroundColor: '#e7eef2', marginVertical: 8 },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemText: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#213d50' },
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
  optionsArea: { paddingBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: {
    borderWidth: 1,
    borderColor: '#d8e5eb',
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  chipEnabled: { borderColor: '#1678b6', backgroundColor: '#eaf6fc' },
  chipPressed: { opacity: 0.72 },
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
