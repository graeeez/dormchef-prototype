import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Image, 
  ScrollView 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

const allTools = [
  { id: 'microwave', name: "Microwave", image: require('../../assets/microwave.png') },
  { id: 'ricecooker', name: "Rice Cooker", image: require('../../assets/RiceCooker.png') },
  { id: 'kettle', name: "Electric Kettle", image: require('../../assets/kettle.png') },
  { id: 'stove', name: "Stove", image: require('../../assets/stove.png') },
  { id: 'toaster', name: "Toaster", image: require('../../assets/toaster.png') },
  { id: 'blender', name: "Blender", image: require('../../assets/blender.png') },
];

export default function ToolsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // 1. Get ingredients from Home. Fallback to dummy data so the app doesn't break during testing.
  const selectedIngredients = route.params?.ingredients || ['rice', 'egg'];

  // 2. State for selected tools
  const [selectedTools, setSelectedTools] = useState([]);

  const toggleTool = (id) => {
    setSelectedTools(prev => 
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const handleFindRecipes = () => {
    // 3. Pass BOTH ingredients and tools to the next screen
    navigation.navigate('Recipes', { 
      ingredients: selectedIngredients, 
      tools: selectedTools 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={35} strokeWidth={3} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Select Tools</Text>
          <Text style={styles.headerSubtitle}>What can you cook with?</Text>
        </View>
      </View>

      <View style={styles.yellowBody}>
        {/* Main White Card */}
        <View style={styles.mainCard}>
          <Text style={styles.instructionText}>
            Select all the cooking tools you have access to. This helps us find recipes you can actually make!
          </Text>

          <View style={styles.toolsGrid}>
            {allTools.map((item) => {
              const isSelected = selectedTools.includes(item.id);
              return (
                <TouchableOpacity 
                  key={item.id} 
                  onPress={() => toggleTool(item.id)} 
                  style={[styles.toolCard, isSelected && styles.toolCardActive]}
                  activeOpacity={0.8}
                >
                  <View style={[styles.imageCircle, isSelected && styles.imageCircleActive]}>
                    <Image source={item.image} style={styles.toolImage} resizeMode="contain" />
                  </View>
                  <Text style={styles.toolName}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Footer Area */}
        <View style={styles.footer}>
          {/* 4. DYNAMIC COUNTER */}
          <Text style={styles.counterText}>
            {selectedTools.length} {selectedTools.length === 1 ? 'tool is' : 'tools are'} selected
          </Text>
          
          <TouchableOpacity 
            style={[styles.findBtn, selectedTools.length === 0 && styles.disabledBtn]} 
            onPress={handleFindRecipes}
            disabled={selectedTools.length === 0}
          >
            <Text style={styles.findBtnText}>Find Recipes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 15,
    backgroundColor: '#fff' 
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#000' },
  headerSubtitle: { fontSize: 14, fontWeight: '700', color: '#666', marginTop: -4 },
  
  yellowBody: { 
    flex: 1, 
    backgroundColor: '#FFB300', 
    paddingHorizontal: 20, 
    paddingTop: 25 
  },
  mainCard: { 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    padding: 20, 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  instructionText: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 20,
    lineHeight: 18,
    fontWeight: '600'
  },
  toolsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  toolCard: { 
    width: '48%', 
    height: 125, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  toolCardActive: {
    borderColor: '#2E5A00',
    borderWidth: 2,
  },
  imageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  imageCircleActive: {
    backgroundColor: '#C0CA33', // Olive green circle when selected
  },
  toolImage: { width: 40, height: 40 },
  toolName: { fontSize: 13, fontWeight: '900', color: '#000' },
  
  footer: { 
    marginTop: 20, 
    alignItems: 'center' 
  },
  counterText: { 
    color: '#2E5A00', 
    fontWeight: '800', 
    marginBottom: 15,
    fontSize: 15
  },
  findBtn: { 
    backgroundColor: '#2E5A00', 
    width: '100%',
    height: 65, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5
  },
  disabledBtn: {
    backgroundColor: '#4A5D3B', // Muted green when nothing selected
    opacity: 0.7
  },
  findBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 22 }
});