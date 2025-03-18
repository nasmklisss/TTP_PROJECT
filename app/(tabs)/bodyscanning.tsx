import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function BodyScanning() {
  const handleOpenCamera = () => {
    router.push('/camera');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>How it works</ThemedText>
      <ThemedText style={styles.description}>
        SizeSync makes sizing effortless, just snap a photo with your phone, and our system will automatically determine your body measurements!
      </ThemedText>
      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <ThemedText style={styles.buttonText}>Unlock Your Size</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
