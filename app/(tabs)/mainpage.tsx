import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function MainPage() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarStyle: styles.tabBar,
        }}>
        <Tabs.Screen
          name="bodyscanning"
          options={{
            title: 'Body Scanning',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="camera.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="digitalavatar"
          options={{
            title: 'Digital Avatar',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 5,
  },
});
