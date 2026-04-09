import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

export default function IngredientsScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fbe7' }}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><ArrowLeft color="#1b5e20" size={24} /></TouchableOpacity>
                <Text style={styles.title}>Manage Ingredients</Text>
                <Text style={styles.subtitle}>Select your dietary preferences or manage your pantry list in detail here.</Text>
                
                <View style={styles.placeholderCard}>
                    <Text style={styles.cardText}>Filter by: Vegan, Keto, or High-Protein</Text>
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.primaryBtnText}>Save Preferences</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 24, alignItems: 'center' },
    backBtn: { alignSelf: 'flex-start', padding: 10, backgroundColor: '#fff', borderRadius: 12, marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1b5e20', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
    placeholderCard: { width: '100%', padding: 40, backgroundColor: '#fff', borderRadius: 24, borderStyle: 'dashed', borderWidth: 2, borderColor: '#1b5e20', alignItems: 'center' },
    cardText: { color: '#1b5e20', fontWeight: '600', textAlign: 'center' },
    primaryBtn: { marginTop: 'auto', width: '100%', height: 60, backgroundColor: '#1b5e20', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    primaryBtnText: { color: '#FFD700', fontSize: 18, fontWeight: 'bold' }
});