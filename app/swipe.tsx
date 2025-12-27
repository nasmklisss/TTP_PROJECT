import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { ImageDisplay } from '@/components/swipe/ImageDisplay';
import { ShirtMeasurements } from '@/components/swipe/ShirtMeasurements';
import { PantsMeasurements } from '@/components/swipe/PantsMeasurements';
import { JacketMeasurements } from '@/components/swipe/JacketMeasurements';
import { FootwearMeasurements } from '@/components/swipe/FootwearMeasurements';
import { Measurement } from '@/components/swipe/Measurements';
import { PlatformPagerView } from '@/components/swipe/PlatformPagerView';

export default function SwipeScreen() {
  const params = useLocalSearchParams();
  const [measurementsProps, setMeasurementsProps] = useState({
    imageUri: '',
    height: 0,
    gender: '',
  });

  useEffect(() => {
    if (params) {
      setMeasurementsProps({
        imageUri: params.imageUri as string,
        height: parseFloat(params.height as string) || 0,
        gender: params.gender as string,
      });
    }
  }, [params]);

  // Debug log to check if data is being received
  useEffect(() => {
    console.log('Current measurements props:', measurementsProps);
  }, [measurementsProps]);

  return (
    <ThemedView style={styles.container}>
      <PlatformPagerView style={styles.pagerView} initialPage={0}>
        <View key="0" style={styles.page}>
          <ImageDisplay {...measurementsProps} />
        </View>
        <View key="1" style={styles.page}>
          <ShirtMeasurements {...measurementsProps} />
        </View>
        <View key="2" style={styles.page}>
          <PantsMeasurements {...measurementsProps} />
        </View>
        <View key="3" style={styles.page}>
          <JacketMeasurements {...measurementsProps} />
        </View>
        <View key="4" style={styles.page}>
          <FootwearMeasurements {...measurementsProps} />
        </View>
        <View key="5" style={styles.page}>
          <FootwearMeasurements {...measurementsProps} />
        </View>
      </PlatformPagerView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
