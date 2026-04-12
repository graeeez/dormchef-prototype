import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  Alert,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';
import { Plus, Heart, BookOpen, X } from 'lucide-react-native';
import { useRecipes } from '../context/RecipeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { savedRecipes } = useRecipes();
  const [ingredients, setIngredients] = useState(['rice', 'canned tuna', 'egg']);
  const [input, setInput] = useState('');

  const addIngredient = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed.length > 0 && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInput('');
    } else if (ingredients.includes(trimmed)) {
      Alert.alert("Already exists", "This ingredient is already in your pantry.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>BESTIE BITES</Text>
            <Text style={styles.tagline}>What's in your pantry?</Text>
          </View>
          <View style={styles.bookIconBox}>
            {/* FIX: Removed fill property to stop the HostFunction error */}
            <BookOpen color="#ffffff" size={24} strokeWidth={2.5} />
          </View>
        </View>

        {/* Welcome Card - KEPT EXACTLY AS REQUESTED */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            👋 <Text style={{fontWeight: 'bold'}}>Welcome to Bestie Bites!</Text> Easy recipes for busy students with limited tools and budget. Let's cook something delicious!
          </Text>
        </View>

        {/* Saved Recipes */}
        <TouchableOpacity style={styles.savedButton} onPress={() => navigation.navigate('SavedRecipes')}>
          <View style={styles.heartCircle}>
            {/* FIX: We use color and strokeWidth instead of fill to prevent the crash */}
            {savedRecipes.length > 0 ? (
              <Heart size={22} color="#E91E63" strokeWidth={3} />
            ) : (
              <Heart size={22} color="#9E9E9E" strokeWidth={2} />
            )}
          </View>
          <Text style={styles.savedText}>Saved Recipes ({savedRecipes.length})</Text>
        </TouchableOpacity>

       
        <View style={styles.card}>
          <Text style={styles.label}>Input Your Ingredients</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Type ingredient name..." 
              placeholderTextColor="#757575"
              value={input} 
              onChangeText={setInput} 
              onSubmitEditing={addIngredient}
              // FIX: Removes the black border seen in your screenshots
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.plusBtn} onPress={addIngredient}>
              <Plus color="#000000" size={24} strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Inventory Tags */}
        <View style={[styles.card, { minHeight: 120 }]}>
          <Text style={styles.label}>Your ingredients: ({ingredients.length})</Text>
          <View style={styles.tagContainer}>
            {ingredients.map((item) => (
              <View key={item} style={styles.pill}>
                <Text style={styles.pillText}>{item}</Text>
                <TouchableOpacity onPress={() => setIngredients(ingredients.filter(i => i !== item))}>
                  <X size={14} color="#ffffff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.mainBtn} onPress={() => navigation.navigate('Tools', { ingredients })}>
          <Text style={styles.mainBtnText}>Next: Select Tools</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFB300' },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  brandName: { fontSize: 28, fontWeight: '900', color: '#000' },
  tagline: { fontSize: 14, fontWeight: '800', color: '#000' },
  bookIconBox: { backgroundColor: '#1B4D2E', padding: 8, borderRadius: 12 },
  welcomeCard: { backgroundColor: '#C0CA33', padding: 18, borderRadius: 25, marginBottom: 15 },
  welcomeText: { fontSize: 14, color: '#000', lineHeight: 19 },
  savedButton: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 22, marginBottom: 15 },
  heartCircle: { backgroundColor: '#E0E0E0', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  savedText: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 25, marginBottom: 15 },
  label: { fontSize: 18, fontWeight: '800', marginBottom: 15, color: '#000' },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E0E0E0', 
    borderRadius: 25, 
    paddingLeft: 20, 
    paddingRight: 5, 
    height: 50,
  },
  textInput: { 
    flex: 1, 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#000',
    // FIX: Explicitly removes borders for a clean look
    borderWidth: 0,
    ...Platform.select({
      web: { outlineStyle: 'none' },
      default: {}
    }),
  },
  plusBtn: { backgroundColor: '#FFB300', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { backgroundColor: '#C0CA33', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  pillText: { color: '#ffffff', fontWeight: 'bold', marginRight: 5 },
  mainBtn: { backgroundColor: '#1B4D2E', height: 65, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  mainBtnText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' }
});