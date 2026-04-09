import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Clock } from 'lucide-react-native';

const MOCK_DATA = [
    {
        id: 'mock-1',
        title: 'Dorm-Style Egg Fried Rice',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800',
        prep_time: '10 min',
        difficulty: 'Easy',
        match_score: '98%',
        ingredients_list: '1 cup cooked rice, 2 eggs, 1 tbsp soy sauce, 1 tsp oil.',
        instructions: '1. Heat oil in a pan. 2. Scramble eggs until mostly cooked. 3. Add rice and soy sauce. 4. Toss on high heat for 2 minutes and serve.'
    },
    {
        id: 'mock-2',
        title: 'Creamy Tuna Pasta',
        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800',
        prep_time: '12 min',
        difficulty: 'Medium',
        match_score: '85%',
        ingredients_list: 'Pasta, 1 can tuna, 2 tbsp mayo, black pepper.',
        instructions: '1. Boil pasta according to package instructions. 2. Drain and return to pot. 3. Mix in canned tuna, mayo, and pepper. 4. Warm through and serve.'
    }
];

export default function RecipesScreen() {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    const numColumns = width > 900 ? 2 : 1;
    const availableWidth = Math.min(width, 1000);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.responsiveWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}><ArrowLeft color="#1b5e20" size={24} /></TouchableOpacity>
                    <Text style={styles.headerTitle}>Curated Recipes</Text>
                </View>
                <FlatList
                    data={MOCK_DATA}
                    key={numColumns}
                    numColumns={numColumns}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[styles.card, numColumns > 1 && { width: (availableWidth / 2) - 34, marginHorizontal: 10 }]} 
                            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                        >
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <View style={styles.badge}><Text style={styles.badgeText}>{item.match_score} Match</Text></View>
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                                <View style={styles.metaRow}><Clock size={16} color="#708070" /><Text style={styles.metaText}>{item.prep_time} • {item.difficulty}</Text></View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfef0' },
    responsiveWrapper: { flex: 1, maxWidth: 1000, alignSelf: 'center', width: '100%' },
    header: { padding: 24, flexDirection: 'row', alignItems: 'center' },
    backCircle: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1b5e20', marginLeft: 15 },
    list: { paddingHorizontal: 24, paddingBottom: 40 },
    card: { backgroundColor: '#fff', borderRadius: 24, marginBottom: 20, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    image: { width: '100%', height: 200 },
    info: { padding: 20 },
    badge: { backgroundColor: '#FFD700', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
    badgeText: { fontSize: 12, fontWeight: '800', color: '#1b5e20' },
    recipeTitle: { fontSize: 18, fontWeight: 'bold', color: '#1b1b1b' },
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    metaText: { marginLeft: 5, color: '#708070', fontSize: 14 }
});