import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ShirtMeasurementsProps {
  imageUri: string;
  height: number;
  gender: string;
}

export function ShirtMeasurements({ imageUri, height, gender }: ShirtMeasurementsProps) {
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate measurements
  const calculateMeasurements = () => {
    let chest, sleeve, shoulder, shirtLength, armholeCircumference;
    
    if (gender.toLowerCase() === 'male') {
      chest = height * 0.6;
      sleeve = height * 0.38;
      shoulder = height * 0.265;
      shirtLength = height * 0.42;
      armholeCircumference = height * 0.13;
    } else {
      chest = height * 0.635;
      sleeve = height * 0.36;
      shoulder = height * 0.245;
      shirtLength = height * 0.45;
      armholeCircumference = height * 0.12;
    }
    
    return { chest, sleeve, shoulder, shirtLength, armholeCircumference };
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
      <ThemedText style={styles.title}>Shirt Measurements</ThemedText>
      
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
        <TableRow label="Chest" value={measurements.chest} />
        <TableRow label="Sleeve" value={measurements.sleeve} />
        <TableRow label="Shoulder" value={measurements.shoulder} />
        <TableRow label="Shirt Length" value={measurements.shirtLength} />
        <TableRow label="Armhole Circumference" value={measurements.armholeCircumference} />
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