import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecipeCard({ recipe }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.name}</Text>
      <View style={styles.tagsRow}>
        {recipe.healthy && (
          <Text style={[styles.tag, {backgroundColor: '#eaffee', color: '#21af5a'}]}>Healthy</Text>
        )}
        {recipe.budget && (
          <Text style={[styles.tag, {backgroundColor: '#fffbe0', color: '#dfb500'}]}>Budget</Text>
        )}
        {recipe.easy && (
          <Text style={[styles.tag, {backgroundColor: '#e2edff', color: '#2169af'}]}>Easy</Text>
        )}
      </View>
      <Text numberOfLines={1} style={styles.desc}>
        Ingredients: {recipe.ingredients.map(i => i.name).join(', ')}
      </Text>
      <Text style={styles.time}>⏱ {recipe.time_min || 0} min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#bbb",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.13,
    elevation: 2
  },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  desc: { color: '#555', marginBottom: 10 },
  time: { color: '#777', fontSize: 13 },
  tagsRow: { flexDirection: 'row', marginBottom: 4 },
  tag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 7,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});