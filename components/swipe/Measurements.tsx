import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface MeasurementProps {
  imageUri: string;
  height: number;
  gender: string;
}

export function Measurement({ imageUri, height, gender }: MeasurementProps) {
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate measurements
  const calculateMeasurements = () => {
    if (height <= 0) {
      return {
        shoulderWidth: 'N/A',
        chestWidth: 'N/A',
        shirtLength: 'N/A',
        armhole: 'N/A',
        sleeveLength: 'N/A'
      };
    }

    return {
      shoulderWidth: (height * 0.23).toFixed(1),
      chestWidth: (height * 0.48).toFixed(1),
      shirtLength: (height * 0.40).toFixed(1),
      armhole: (height * 0.18).toFixed(1),
      sleeveLength: (height * 0.38).toFixed(1)
    };
  };

  const measurements = calculateMeasurements();
  const cmToInches = (cm: string) => {
    if (cm === 'N/A') return 'N/A';
    return (parseFloat(cm) * 0.3937).toFixed(1);
  };

  const TableRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.row}>
      <View style={[styles.cell, styles.measurementCell]}>
        <ThemedText style={styles.cellText}>{label}</ThemedText>
      </View>
      <View style={[styles.cell, styles.valueCell]}>
        <ThemedText style={styles.cellText}>{value} cm</ThemedText>
      </View>
      <View style={[styles.cell, styles.valueCell]}>
        <ThemedText style={styles.cellText}>{cmToInches(value)} in</ThemedText>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedText style={styles.title}>Measurements</ThemedText>
      
      <View style={[styles.table, { width: screenWidth * 0.98 }]}>
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

        {/* Measurement Rows */}
        <TableRow label="Shoulder Width" value={measurements.shoulderWidth} />
        <TableRow label="Chest Width" value={measurements.chestWidth} />
        <TableRow label="Shirt Length" value={measurements.shirtLength} />
        <TableRow label="Armhole Circumference" value={measurements.armhole} />
        <TableRow label="Sleeve Length" value={measurements.sleeveLength} />
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
    padding: 18,
    justifyContent: 'center',
  },
  measurementCell: {
    flex: 2.5,
    paddingLeft: 36,
    alignItems: 'flex-start',
  },
  valueCell: {
    flex: 1.2,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 17,
    color: '#333',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 