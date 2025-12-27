import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, View, Alert, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

export default function DigitalAvatar() {
  const [image, setImage] = useState<string | null>(null);
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [showInputs, setShowInputs] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowInputs(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load image');
    }
  };

  const confirmSelections = () => {
    Keyboard.dismiss();
    if (!image) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    if (!gender) {
      Alert.alert('Error', 'Please select a gender');
      return;
    }

    if (!height.trim()) {
      Alert.alert('Error', 'Please enter your height');
      return;
    }

    const userHeight = parseFloat(height);
    if (isNaN(userHeight)) {
      Alert.alert('Error', 'Invalid height format');
      return;
    }

    // Navigate to SwipeActivity with the data
    router.push({
      pathname: '/swipe',
      params: {
        imageUri: image,
        height: userHeight,
        gender: gender,
        hasCompletedSetup: 'true'
      }
    });
  };

  return (
    <ThemedView style={styles.container}>
      {!image ? (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <ThemedText style={styles.buttonText}>Select Image</ThemedText>
        </TouchableOpacity>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <ThemedText style={styles.buttonText}>Reselect Image</ThemedText>
          </TouchableOpacity>

          {showInputs && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
                  onPress={() => setGender('male')}>
                  <ThemedText style={styles.genderText}>Male</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
                  onPress={() => setGender('female')}>
                  <ThemedText style={styles.genderText}>Female</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, (!height || !gender) && styles.disabledButton]}
            disabled={!height || !gender}
            onPress={confirmSelections}>
            <ThemedText style={styles.buttonText}>Confirm Selections</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A1CEDC',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A1CEDC',
  },
  selectedGender: {
    backgroundColor: '#A1CEDC',
  },
  genderText: {
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});