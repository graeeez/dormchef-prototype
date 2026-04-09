import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plus, Camera, ChevronRight, Leaf } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import IngredientTag from '../components/IngredientTag';

export default function HomeScreen() {
  const [ingredients, setIngredients] = useState(['rice', 'egg', 'canned tuna']);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isLargeScreen = width > 768;

  const addIngredient = () => {
    if (input.trim()) {
      const lower = input.toLowerCase();
      if (!ingredients.includes(lower)) setIngredients([...ingredients, lower]);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.responsiveWrapper}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <LinearGradient colors={['#1b5e20', '#2e7d32']} style={[styles.heroCard, isLargeScreen && { padding: 50 }]}>
              <Leaf color="#FFD700" size={width > 600 ? 50 : 40} />
              <Text style={[styles.heroTitle, isLargeScreen && { fontSize: 42 }]}>What's in your{"\n"}pantry today?</Text>
              <TouchableOpacity style={styles.scanBadge} onPress={() => navigation.navigate('Scan')}>
                <Camera color="#1b5e20" size={18} />
                <Text style={styles.scanBadgeText}>AI SCANNER</Text>
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Quick Add</Text>
              <View style={styles.inputCard}>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. Chicken breast..." 
                  value={input} 
                  onChangeText={setInput} 
                  placeholderTextColor="#A0AAA0"
                />
                <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
                  <Plus color="#1b5e20" size={24} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Your Pantry ({ingredients.length})</Text>
              <View style={styles.tagGrid}>
                {ingredients.map((item) => (
                  <IngredientTag key={item} name={item} onDelete={() => setIngredients(ingredients.filter(i => i !== item))} />
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Tools', { ingredients })}>
              <LinearGradient colors={['#1b5e20', '#0a2e0c']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.gradientBtn}>
                <Text style={styles.primaryBtnText}>Continue to Tools</Text>
                <View style={styles.btnIconContainer}><ChevronRight color="#1b5e20" size={20} /></View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfef0' },
  responsiveWrapper: { flex: 1, width: '100%', maxWidth: 850, alignSelf: 'center' },
  scrollContent: { padding: 24, paddingBottom: 140 },
  heroCard: { borderRadius: 32, padding: 30, marginBottom: 32 },
  heroTitle: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 15, letterSpacing: -0.5 },
  scanBadge: { flexDirection: 'row', backgroundColor: '#FFD700', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, marginTop: 20, alignItems: 'center' },
  scanBadgeText: { color: '#1b5e20', fontWeight: '800', marginLeft: 8, fontSize: 13 },
  section: { marginBottom: 32 },
  sectionLabel: { fontSize: 13, fontWeight: '800', color: '#8a9a8a', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 },
  inputCard: { backgroundColor: '#fff', borderRadius: 20, padding: 6, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: 'rgba(27, 94, 32, 0.05)' },
  input: { flex: 1, height: 54, paddingHorizontal: 16, fontSize: 16, fontWeight: '500', color: '#1b5e20' },
  addBtn: { backgroundColor: '#FFD700', width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  tagGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, backgroundColor: '#fdfef0', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.04)' },
  primaryBtn: { height: 64, borderRadius: 22, overflow: 'hidden' },
  gradientBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 },
  primaryBtnText: { color: '#FFD700', fontSize: 18, fontWeight: '800' },
  btnIconContainer: { backgroundColor: '#FFD700', width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }
});