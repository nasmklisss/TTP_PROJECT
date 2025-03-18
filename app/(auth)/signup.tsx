import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface SignupResponse {
  message: string;
}

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    // Basic validation
    if (!username || !fullName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post<SignupResponse>('http://localhost:3000/user', {
        username,
        fullName,
        email,
        phoneNumber,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'User registered successfully', [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login')
          }
        ]);
      }
    } catch (error) {
      console.error('🔥 Error during signup:', error);
      const axiosError = error as AxiosError<SignupResponse>;
      Alert.alert(
        'Error',
        axiosError.response?.data?.message || 'Failed to register user'
      );
    }
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Sign Up</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />

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
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <ThemedText style={styles.buttonText}>Create Account</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.loginContainer}>
        <ThemedText>Already have an account? </ThemedText>
        <TouchableOpacity onPress={handleBackToLogin}>
          <ThemedText style={styles.loginText}>Log In</ThemedText>
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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#A1CEDC',
    fontWeight: 'bold',
  },
});
