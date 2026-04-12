import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ChevronLeft, Heart, Clock, AlertCircle } from 'lucide-react-native';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { toggleFavorite, isRecipeSaved } = useRecipes();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft color="#000" size={35} strokeWidth={3} />
        </TouchableOpacity>

        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.mainTitle}>{recipe.title}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(recipe)}>
              <Heart 
                size={24} 
                color={isRecipeSaved(recipe.id) ? "#E91E63" : "#999"} 
                fill={isRecipeSaved(recipe.id) ? "#E91E63" : "transparent"} 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeRow}>
            <Clock size={18} color="#666" />
            <Text style={styles.timeText}>{recipe.time}</Text>
          </View>
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.sectionLabel}>Ingredients</Text>
          <View style={styles.pillContainer}>
            {recipe.ingredients.map(ing => (
              <View key={ing} style={styles.ingPill}><Text style={styles.ingText}>{ing}</Text></View>
            ))}
          </View>
        </View>

        <View style={styles.warningBox}>
          <View style={styles.warningHeader}>
            <AlertCircle color="#D84315" size={24} fill="#FFAB91" />
            <Text style={styles.warningTitle}>Missing Ingredients?</Text>
          </View>
          <Text style={styles.warningText}>{recipe.missingText}</Text>
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.sectionLabel}>Cooking Instructions</Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}><Text style={styles.stepNumText}>{index + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.tryNewBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tryBtnText}>Try New Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9fcc4c' },
  scroll: { padding: 20 },
  backBtn: { marginBottom: 10 },
  whiteCard: { backgroundColor: '#fff', borderRadius: 25, padding: 20, marginBottom: 15, elevation: 3 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#000', flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 14, color: '#666', fontWeight: '700' },
  sectionLabel: { fontSize: 20, fontWeight: '900', marginBottom: 15 },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  ingPill: { backgroundColor: '#C8E6C9', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  ingText: { color: '#2E7D32', fontWeight: '800' },
  warningBox: { backgroundColor: '#FFF3E0', borderRadius: 25, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#FF7043' },
  warningHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  warningTitle: { color: '#D84315', fontSize: 20, fontWeight: '900' },
  warningText: { color: '#BF360C', fontSize: 14, fontWeight: '600' },
  stepRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  stepNumber: { backgroundColor: '#a6eea9', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  stepNumText: { color: '#0a3f0d', fontWeight: '900' },
  stepText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#333', lineHeight: 20 },
  tryNewBtn: { backgroundColor: '#47831d', height: 65, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10, elevation: 5, borderColor: '#09330b', borderWidth: 1 },
  tryBtnText: { color: '#16410b', fontSize: 20, fontWeight: '900' }
});