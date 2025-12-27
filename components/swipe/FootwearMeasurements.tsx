import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface FootwearMeasurementsProps {
  imageUri: string;
  height: number;
  gender: string;
}

export function FootwearMeasurements({ imageUri, height, gender }: FootwearMeasurementsProps) {
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate measurements
  const calculateMeasurements = () => {
    let footLength = height * 0.15; // Foot length is approx. 15% of total height
    let footWidth = height * 0.06; // Example ratio for foot width
    let insoleLength = footLength + 1.5; // Add 1.5cm for comfort
    let footCircumference = height * 0.23; // Example ratio
    
    if (gender.toLowerCase() === 'male') {
      // Slight adjustments for male
      footLength *= 1.02;
      footWidth *= 1.05;
    }
    
    return { footLength, footWidth, insoleLength, footCircumference };
  };

  const measurements = calculateMeasurements();
  const cmToInches = (cm: number) => (cm * 0.3937).toFixed(1);

  const TableRow = ({ label, value }: { label: string; value: number }) => (
    <View style={styles.row}>
      <View style={[styles.cell, styles.measurementCell]}>
        <ThemedText style={styles.cellText}>{label}</ThemedText>
      </View>
      <View style={[styles.cell, styles.valueCell]}>
        <ThemedText style={styles.cellText}>{value.toFixed(1)} cm</ThemedText>
      </View>
      <View style={[styles.cell, styles.valueCell]}>
        <ThemedText style={styles.cellText}>{cmToInches(value)} in</ThemedText>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedText style={styles.title}>Footwear Measurements</ThemedText>
      
      <View style={[styles.table, { width: screenWidth * 0.95 }]}>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow]}>
          <View style={[styles.cell, styles.measurementCell]}>
            <ThemedText style={[styles.cellText, styles.headerText]}>Measurement</ThemedText>
          </View>
          <View style={[styles.cell, styles.valueCell]}>
            <ThemedText style={[styles.cellText, styles.headerText]}>Size (cm)</ThemedText>
          </View>
          <View style={[styles.cell, styles.valueCell]}>
            <ThemedText style={[styles.cellText, styles.headerText]}>Size (in)</ThemedText>
          </View>
        </View>

        {/* Data Rows */}
        <TableRow label="Foot Length" value={measurements.footLength} />
        <TableRow label="Foot Width" value={measurements.footWidth} />
        <TableRow label="Insole Length" value={measurements.insoleLength} />
        <TableRow label="Foot Circumference" value={measurements.footCircumference} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerRow: {
    backgroundColor: '#A1CEDC',
  },
  cell: {
    padding: 16,
    justifyContent: 'center',
  },
  measurementCell: {
    flex: 2,
    paddingLeft: 32,
    alignItems: 'flex-start',
  },
  valueCell: {
    flex: 0.8,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 16,
    color: '#333',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 