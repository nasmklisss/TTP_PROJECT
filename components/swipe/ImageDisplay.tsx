import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ImageDisplayProps {
  imageUri: string;
  height: number;
  gender: string;
}

export function ImageDisplay({ imageUri, height, gender }: ImageDisplayProps) {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  // Calculate image dimensions while maintaining aspect ratio
  const maxWidth = screenWidth * 0.8;
  const maxHeight = screenHeight * 0.5;
  
  // Calculate aspect ratio
  const aspectRatio = 3 / 4; // Assuming a typical portrait photo ratio
  
  let imageWidth = maxWidth;
  let imageHeight = imageWidth * aspectRatio;
  
  // If height exceeds maxHeight, scale down based on height
  if (imageHeight > maxHeight) {
    imageHeight = maxHeight;
    imageWidth = imageHeight / aspectRatio;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.image,
            {
              width: imageWidth,
              height: imageHeight,
            },
          ]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <ThemedText style={styles.title}>Your Measurements</ThemedText>
        <ThemedText style={styles.subtitle}>Height: {height}cm</ThemedText>
        <ThemedText style={styles.subtitle}>Gender: {gender}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    borderRadius: 8,
  },
  infoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    color: '#666',
  },
}); 