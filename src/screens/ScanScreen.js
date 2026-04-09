import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; 
import { useNavigation } from '@react-navigation/native';
import { X } from 'lucide-react-native';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 20 }}>Camera access required</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}><Text style={{color: '#fff'}}>Grant Permission</Text></TouchableOpacity>
      </View>
    );
  }

  const handleCapture = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home', { scannedIngredient: 'Tomato' });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} />
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}><X color="#fff" size={30} /></TouchableOpacity>
      <View style={styles.overlay}>
        <View style={[styles.reticle, { width: width * 0.7, height: width * 0.7 }]} />
        <Text style={styles.hint}>Align ingredient within the frame</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.shutter} onPress={handleCapture} disabled={loading}>
          <View style={styles.shutterInner}>{loading ? <ActivityIndicator color="#1b5e20" /> : <View style={styles.innerCircle} />}</View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  close: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  reticle: { borderWidth: 2, borderColor: '#FFD700', borderRadius: 40 },
  hint: { color: '#fff', marginTop: 20, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  footer: { position: 'absolute', bottom: 50, width: '100%', alignItems: 'center' },
  shutter: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#fff' },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', borderWidth: 2, borderColor: '#1b5e20' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdfef0' },
  btn: { backgroundColor: '#1b5e20', padding: 15, borderRadius: 15 }
});