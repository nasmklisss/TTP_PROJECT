import { StyleSheet, ScrollView, Image, Dimensions, TextInput, View, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLocalSearchParams } from 'expo-router';

// Sample clothing data with brand and price
const clothingItems = [
  { 
    image: require('@/assets/images/whitetshirt.png'), 
    brand: 'ZARA', 
    price: 'RM 220.00' 
  },
  { 
    image: require('@/assets/images/greyshirt.png'), 
    brand: 'H&M', 
    price: 'RM 175.00' 
  },
  { 
    image: require('@/assets/images/greypants.png'), 
    brand: 'MANGO', 
    price: 'RM 169.00' 
  },
  { 
    image: require('@/assets/images/brownpants.png'), 
    brand: 'Bonito', 
    price: 'RM 355.00' 
  },
  { 
    image: require('@/assets/images/brownloafer.png'), 
    brand: 'ZARA', 
    price: 'RM 189.00' 
  },
  { 
    image: require('@/assets/images/blackloafer.png'), 
    brand: 'H&M', 
    price: 'RM 145.00' 
  },
];

export default function MainPage() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const hasCompletedSetup = params.hasCompletedSetup === 'true';

  return (
    <ThemedView style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarStyle: styles.tabBar,
        }}>
        <Tabs.Screen
          name="bodyscanning"
          options={{
            title: 'Body Scanning',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="camera.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="digitalavatar"
          options={{
            title: 'Digital Avatar',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>

      {!hasCompletedSetup ? (
        <ThemedView style={styles.instructionsContainer}>
          <ThemedText style={styles.title}>Receive your measurements</ThemedText>
          <ThemedText style={styles.instructions}>
            Digital Avatar → Select Image → Input Details
          </ThemedText>
        </ThemedView>
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Search Bar and Cart */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol size={20} name="magnifyingglass" color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#999"
              />
            </View>
            <IconSymbol size={24} name="cart" color="#000" />
          </View>

          {/* Recommended Header */}
          <View style={styles.recommendedHeader}>
            <ThemedText style={styles.recommendedTitle}>Recommended</ThemedText>
            <ThemedText style={styles.itemCount}>6 items</ThemedText>
          </View>

          {/* Category Tab */}
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryTab}>
              <IconSymbol size={20} name="star.fill" color="#fff" />
              <ThemedText style={styles.categoryLabel}>Popular</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Clothing Grid */}
          <View style={styles.clothingGrid}>
            {clothingItems.map((item, index) => (
              <View key={index} style={styles.clothingItem}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.clothingImage} />
                  <View style={styles.saveButton}>
                    <IconSymbol size={20} name="bookmark" color="#777" />
                  </View>
                </View>
                <View style={styles.itemDetails}>
                  <ThemedText style={styles.brandName}>{item.brand}</ThemedText>
                  <ThemedText style={styles.priceText}>{item.price}</ThemedText>
                </View>
              </View>
            ))}
          </View>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <IconSymbol size={24} name="house.fill" color="#000" />
            <IconSymbol size={24} name="bookmark" color="#999" />
            <IconSymbol size={24} name="bell" color="#999" />
            <IconSymbol size={24} name="person" color="#999" />
          </View>
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 5,
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  recommendedHeader: {
    alignItems: 'center',
    marginVertical: 10,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 14,
    color: '#777',
  },
  categoryContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  categoryTab: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    width: 100,
  },
  categoryLabel: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  clothingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  clothingItem: {
    width: (Dimensions.get('window').width - 45) / 2,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    aspectRatio: 0.8,
  },
  clothingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: {
    marginTop: 8,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    marginTop: 10,
  },
});
