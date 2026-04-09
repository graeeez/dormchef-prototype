import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ToolButton({ label, icon, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.icon, selected && styles.selectedText]}>
        {icon}
      </Text>
      <Text style={[styles.label, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 8,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#f2f2f2",
    width: '45%',
  },
  selected: {
    backgroundColor: "#21af5a22",
    borderColor: "#21af5a",
  },
  icon: { fontSize: 32, marginBottom: 4, color: "#777" },
  label: { fontWeight: "bold", color: "#21af5a", fontSize: 16 },
  selectedText: { color: "#21af5a" },
});