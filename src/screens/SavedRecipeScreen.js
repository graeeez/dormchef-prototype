import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft, Heart, Bookmark } from 'lucide-react-native';
import { useRecipes } from '../context/RecipeContext'; // Points to src/RecipeContext.js

export default function SavedRecipesScreen({ navigation }) {
  const { savedRecipes, toggleFavorite } = useRecipes();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color="#000" size={35} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.headerTitle}>My Saved Recipes</Text>
          <Text style={{ fontSize: 13, fontWeight: '700' }}>{savedRecipes.length} recipes found</Text>
        </View>
        <Bookmark color="#1B4D2E" size={28} fill="#1B4D2E" />
      </View>
      
      <View style={styles.yellowBody}>
        {savedRecipes.length === 0 ? (
          <View style={styles.empty}><Text style={styles.emptyText}>No saved recipes yet!</Text></View>
        ) : (
          <FlatList
            data={savedRecipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
              >
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Heart color="#E91E63" fill="#E91E63" size={24} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  yellowBody: { flex: 1, backgroundColor: '#FFB300', padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 25, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '900' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});