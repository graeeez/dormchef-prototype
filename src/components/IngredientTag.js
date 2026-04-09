import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function IngredientTag({ name, onRemove }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{name}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.remove}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    backgroundColor: '#eaffee',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    margin: 4,
  },
  text: { color: '#21af5a', marginRight: 6 },
  remove: { color: '#777', fontWeight: 'bold', fontSize: 16 },
});