import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, useWindowDimensions, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { ArrowLeft, Microwave, Flame, Coffee, Refrigerator, Zap, ChefHat, ChevronRight, CheckCircle2 } from 'lucide-react-native';

const allTools = [
  { id: 'microwave', name: "Microwave", Icon: Microwave },
  { id: 'stove', name: "Stove", Icon: Flame },
  { id: 'kettle', name: "Kettle", Icon: Coffee },
  { id: 'fridge', name: "Fridge", Icon: Refrigerator },
  { id: 'blender', name: "Blender", Icon: Zap },
  { id: 'oven', name: "Oven", Icon: ChefHat },
];

export default function ToolsScreen() {
  const [selectedTools, setSelectedTools] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredients } = route.params || { ingredients: [] };
  const { width } = useWindowDimensions();

  const numColumns = width > 768 ? 3 : 2;
  const availableWidth = Math.min(width, 1020) - 48;
  const itemWidth = (availableWidth / numColumns) - 16;

  const toggleTool = (id) => {
    setSelectedTools(prev => prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]);
  };

  const renderItem = ({ item }) => {
    const active = selectedTools.includes(item.id);
    return (
      <TouchableOpacity onPress={() => toggleTool(item.id)} style={{ width: itemWidth, margin: 8, aspectRatio: 1 }}>
        <MotiView animate={{ backgroundColor: active ? '#1b5e20' : '#ffffff', scale: active ? 0.95 : 1 }} style={styles.toolCard}>
          <View style={[styles.iconCircle, active && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <item.Icon color={active ? "#FFD700" : "#1b5e20"} size={width > 600 ? 32 : 28} />
          </View>
          <Text style={[styles.toolName, active && { color: '#fff' }]}>{item.name}</Text>
          {active && <CheckCircle2 size={16} color="#FFD700" style={styles.checkBadge} />}
        </MotiView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.responsiveWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ArrowLeft color="#1b5e20" size={24} /></TouchableOpacity>
          <Text style={styles.title}>Kitchen Tools</Text>
        </View>
        <FlatList
          data={allTools}
          renderItem={renderItem}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate('Recipes', { ingredients, tools: selectedTools })}>
            <LinearGradient colors={['#1b5e20', '#2e7d32']} style={styles.gradientBtn}>
              <Text style={styles.nextBtnText}>Find Recipes ({selectedTools.length})</Text>
              <ChevronRight color="#FFD700" size={24} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFCF5' },
  responsiveWrapper: { flex: 1, maxWidth: 1020, alignSelf: 'center', width: '100%' },
  header: { padding: 24, flexDirection: 'row', alignItems: 'center', gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  title: { fontSize: 28, fontWeight: '800', color: '#1b5e20' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 120 },
  toolCard: { flex: 1, borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fff' },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f0f4f0', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  toolName: { fontWeight: '700', color: '#1b5e20', fontSize: 15 },
  checkBadge: { position: 'absolute', top: 12, right: 12 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 24, backgroundColor: '#fbfcf5' },
  nextBtn: { height: 64, borderRadius: 22, overflow: 'hidden' },
  gradientBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 },
  nextBtnText: { color: '#FFD700', fontSize: 18, fontWeight: '800' }
});