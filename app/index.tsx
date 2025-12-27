import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handleGetStarted = () => {
    router.push('/mainpage');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>SizeSync</ThemedText>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <ThemedText style={styles.buttonText}>Get Started</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 35,
    paddingTop: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
