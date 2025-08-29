import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  title?: string
  onBack?: () => void
}

export default function Header({ title = '', onBack }: Props) {
  // Add a default empty string for title
  const safeTitle = title || ''

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={onBack ? styles.backButton : styles.hiddenBackButton}
        disabled={!onBack}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={onBack ? 'black' : 'transparent'}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{safeTitle}</Text>
      <View style={{ width: 24 }} />
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  backButton: {
    // Style for active back button
  },
  hiddenBackButton: {
    opacity: 0,
    // Make it still take space but invisible
  },
})