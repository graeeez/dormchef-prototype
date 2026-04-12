import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Central Illustration Area */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/sdsd.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Branding Section */}
      <View style={styles.textSection}>
        <Text style={styles.appName}>NAME OF APP</Text>
        <Text style={styles.tagline}>
          We make use of what's already{"\n"}in your pantry.
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        style={styles.startBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.startBtnText}>START NOW</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF5E6', padding: 30 },
  imageContainer: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  illustration: { width: '100%', height: '80%' },
  textSection: { flex: 1, alignItems: 'center' },
  appName: { fontSize: 42, fontWeight: '900', color: '#000', textAlign: 'center' },
  tagline: { fontSize: 18, fontWeight: '700', color: '#000', textAlign: 'center', marginTop: 10 },
  startBtn: { backgroundColor: '#FFB300', height: 65, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  startBtnText: { fontSize: 22, fontWeight: '900', color: '#000' }
});