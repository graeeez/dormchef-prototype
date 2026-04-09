import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar, useWindowDimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Clock, Flame, Users, Star } from 'lucide-react-native';

export default function RecipeDetailScreen() {
    const { recipe } = useRoute().params;
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={[styles.imageContainer, width > 768 && { height: 500 }]}>
                    <Image source={{ uri: recipe.image }} style={styles.heroImage} />
                    <TouchableOpacity style={styles.glassBack} onPress={() => navigation.goBack()}><ArrowLeft color="#fff" size={24} /></TouchableOpacity>
                </View>
                <View style={[styles.sheet, { maxWidth: 850, alignSelf: 'center', width: '100%' }]}>
                    <View style={styles.topRow}><Text style={styles.category}>DORM FAVORITE</Text><Star color="#FFD700" fill="#FFD700" size={18} /></View>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.stat}><Clock size={18} color="#FFD700" /><Text style={styles.statText}>{recipe.prep_time}</Text></View>
                        <View style={styles.stat}><Flame size={18} color="#FFD700" /><Text style={styles.statText}>{recipe.difficulty}</Text></View>
                        <View style={styles.stat}><Users size={18} color="#FFD700" /><Text style={styles.statText}>Serves 1</Text></View>
                    </View>
                    
                    <Text style={styles.sectionTitle}>Ingredients Needed</Text>
                    <View style={styles.instructionBox}><Text style={styles.instructionText}>{recipe.ingredients_list}</Text></View>

                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Instructions</Text>
                    <View style={[styles.instructionBox, { borderLeftColor: '#1b5e20' }]}><Text style={styles.instructionText}>{recipe.instructions}</Text></View>
                    
                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1b5e20' },
    imageContainer: { height: 350, width: '100%' },
    heroImage: { width: '100%', height: '100%' },
    glassBack: { position: 'absolute', top: 50, left: 20, width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    sheet: { backgroundColor: '#fdfef0', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -40, padding: 30, minHeight: 600 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    category: { color: '#1b5e20', fontWeight: '800', fontSize: 10, letterSpacing: 2 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1b1b1b', marginBottom: 20 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 20, borderRadius: 24, marginBottom: 30, elevation: 1 },
    stat: { flexDirection: 'row', alignItems: 'center' },
    statText: { marginLeft: 8, fontWeight: '700', color: '#1b5e20' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1b5e20', marginBottom: 15 },
    instructionBox: { backgroundColor: '#fff', padding: 25, borderRadius: 24, borderLeftWidth: 4, borderLeftColor: '#FFD700' },
    instructionText: { fontSize: 16, color: '#444', lineHeight: 26 }
});