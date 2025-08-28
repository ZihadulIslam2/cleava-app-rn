// components/RadioOption.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function RadioOption({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.dot} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EF4444",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: "#EF4444" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  label: { color: "#374151" },
});
