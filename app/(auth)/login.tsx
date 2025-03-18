import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const gotomain = () => {
    router.replace('/(tabs)/mainpage');
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempted with:', email, password);
  };

  const handleSignUp = () => {
    router.replace('/(auth)/signup');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Log In</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={gotomain}>
        <ThemedText style={styles.buttonText}>Log In</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.signupContainer}>
        <ThemedText>Don't have an account? </ThemedText>
        <TouchableOpacity onPress={handleSignUp}>
          <ThemedText style={styles.signupText}>Sign Up</ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#A1CEDC',
    fontWeight: 'bold',
  },
});
