// components/Header.tsx
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  title: string
  onBack?: () => void
}

export default function Header({ title, onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack ?? (() => {})}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title ?? ''}</Text>
      <View style={{ width: 24 }} /> {/* placeholder to center title */}
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#000' },
})
