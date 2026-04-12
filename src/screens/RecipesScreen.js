import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Home, Heart, Clock, DollarSign, Zap } from 'lucide-react-native';
import { useRecipes } from '../context/RecipeContext';

const RECIPES = [
  { 
    id: '1', 
    title: 'Easy Egg Fried Rice', 
    tags: ['Healthy', 'Budget', 'Easy'],
    ingredients: ['Rice', 'Egg', 'Soy Sauce', 'Oil'],
    missingText: 'No soy sauce? Try salt and a bit of butter instead.',
    instructions: ['Cook rice', 'Scramble eggs', 'Mix together with soy sauce'],
    time: '15 mins'
  },
  { 
    id: '2', 
    title: 'Tuna Rice Bowl', 
    tags: ['Healthy', 'Budget', 'Easy'],
    ingredients: ['Rice', 'Egg', 'Canned Tuna'],
    missingText: 'Missing canned tuna? Try using shredded chicken.',
    instructions: ['Cook rice', 'Add tuna and egg', 'Steam for 2 mins'],
    time: '12 mins'
  },
  { 
    id: '3', 
    title: 'Instant Noodle Upgrade', 
    tags: ['Budget', 'Easy'],
    ingredients: ['Instant Noodles', 'Egg', 'Vegetables'],
    missingText: 'No veggies? Use frozen peas or corn.',
    instructions: ['Boil noodles', 'Add egg', 'Season'],
    time: '8 mins'
  },
  { 
    id: '4', 
    title: 'Steam Veggie Medley', 
    tags: ['Healthy', 'Easy'],
    ingredients: ['Broccoli', 'Carrots', 'Corn'],
    missingText: 'Any veggie works!',
    instructions: ['Steam all veggies until soft'],
    time: '10 mins'
  }
];

export default function RecipesScreen() {
  const navigation = useNavigation();
  const { toggleFavorite, isRecipeSaved } = useRecipes();

  // 1. STATE FOR ACTIVE FILTER
  const [activeFilter, setActiveFilter] = useState(null);

  // 2. FILTER LOGIC
  // This logic automatically updates the list when activeFilter changes
  const filteredRecipes = useMemo(() => {
    if (!activeFilter) return RECIPES;
    return RECIPES.filter(recipe => recipe.tags.includes(activeFilter));
  }, [activeFilter]);

  const toggleFilter = (filterName) => {
    // If clicking the same filter twice, turn it off (show all)
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const renderTag = (tag) => {
    let bgColor, textColor, Icon;
    if (tag === 'Healthy') {
      bgColor = '#C8E6C9'; textColor = '#2E7D32'; Icon = Heart;
    } else if (tag === 'Budget') {
      bgColor = '#FFF9C4'; textColor = '#FBC02D'; Icon = DollarSign;
    } else {
      bgColor = '#BBDEFB'; textColor = '#1976D2'; Icon = Zap;
    }

    return (
      <View key={tag} style={[styles.tag, { backgroundColor: bgColor }]}>
        <Icon size={12} color={textColor} fill={tag === 'Healthy' ? textColor : 'transparent'} />
        <Text style={[styles.tagText, { color: textColor }]}>{tag}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="#000" size={40} strokeWidth={3} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Recipes For You</Text>
            <Text style={styles.subtitleText}>{filteredRecipes.length} Recipes Found</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Home color="#000" size={32} />
          </TouchableOpacity>
        </View>

        {/* 3. FUNCTIONAL FILTER CHIPS */}
        <View style={styles.filterRow}>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Healthy' && styles.activeChip]} 
            onPress={() => toggleFilter('Healthy')}
          >
            <Heart size={16} color={activeFilter === 'Healthy' ? "#fff" : "#000"} />
            <Text style={[styles.filterText, activeFilter === 'Healthy' && styles.activeText]}>Healthy</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Budget' && styles.activeChip]} 
            onPress={() => toggleFilter('Budget')}
          >
            <DollarSign size={16} color={activeFilter === 'Budget' ? "#fff" : "#000"} />
            <Text style={[styles.filterText, activeFilter === 'Budget' && styles.activeText]}>Low Budget</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'Easy' && styles.activeChip]} 
            onPress={() => toggleFilter('Easy')}
          >
            <Zap size={16} color={activeFilter === 'Easy' ? "#fff" : "#000"} />
            <Text style={[styles.filterText, activeFilter === 'Easy' && styles.activeText]}>Easy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.yellowBody}>
        <FlatList
          data={filteredRecipes} // Using the filtered list here
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No recipes match this filter.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.recipeCard}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <Heart 
                    size={26} 
                    color={isRecipeSaved(item.id) ? "#E91E63" : "#999"} 
                    fill={isRecipeSaved(item.id) ? "#E91E63" : "transparent"} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.tagRow}>
                {item.tags.map((tag) => renderTag(tag))}
              </View>

              <View style={styles.timeRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleContainer: { flex: 1, marginLeft: 10 },
  titleText: { fontSize: 24, fontWeight: '900', color: '#000' },
  subtitleText: { fontSize: 14, fontWeight: '700', color: '#666' },
  
  filterRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
  filterChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1.5, 
    borderColor: '#000', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20, 
    gap: 6,
    backgroundColor: '#fff'
  },
  activeChip: { backgroundColor: '#1B4D2E', borderColor: '#1B4D2E' }, // Dark green when active
  filterText: { fontSize: 13, fontWeight: '800', color: '#000' },
  activeText: { color: '#fff' },

  yellowBody: { 
    flex: 1, 
    backgroundColor: '#FFB300', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 20, 
    paddingTop: 20 
  },
  recipeCard: { backgroundColor: '#fff', borderRadius: 25, padding: 20, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  recipeTitle: { fontSize: 20, fontWeight: '900', color: '#000', flex: 0.85 },
  tagRow: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  tag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, gap: 4 },
  tagText: { fontSize: 12, fontWeight: '800' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timeText: { fontSize: 14, color: '#666', fontWeight: '800' },
  emptyText: { textAlign: 'center', color: '#fff', fontWeight: 'bold', marginTop: 50, fontSize: 16 }
});