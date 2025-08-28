// components/PackageOption.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  items: string[];
  selected?: boolean;
  onPress?: () => void;
};

export default function PackageOption({ title, items, selected, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        <View style={styles.radio}>
          {selected && <View style={styles.dot} />}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {items.map((it, i) => (
            <View key={i} style={styles.itemRow}>
              <Ionicons name="checkmark" size={16} />
              <Text style={styles.itemText}>{it}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, padding: 12, borderRadius: 10, backgroundColor: "#F3F4F6" },
  row: { flexDirection: "row", alignItems: "flex-start" },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EF4444",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444" },
  title: { fontWeight: "600", marginBottom: 8 },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  itemText: { marginLeft: 8, color: "#374151" },
});
