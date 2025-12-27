import React from 'react';
import { Platform, View, StyleSheet, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';

interface PlatformPagerViewProps {
  children: React.ReactNode;
  style?: any;
  initialPage?: number;
}

export const PlatformPagerView: React.FC<PlatformPagerViewProps> = ({ children, style, initialPage = 0 }) => {
  if (Platform.OS === 'web') {
    // For web, we'll create a simple tab-based view
    const [currentPage, setCurrentPage] = React.useState(initialPage);
    const childrenArray = React.Children.toArray(children);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          {childrenArray[currentPage]}
        </View>
        <View style={styles.tabs}>
          {childrenArray.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.tab,
                currentPage === index && styles.activeTab,
              ]}
              onPress={() => setCurrentPage(index)}
            />
          ))}
        </View>
      </View>
    );
  }

  // For native platforms, use the actual PagerView
  return (
    <PagerView style={[styles.container, style]} initialPage={initialPage}>
      {children}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  tab: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
}); 