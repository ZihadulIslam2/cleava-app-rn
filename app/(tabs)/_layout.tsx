import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#E3F2EF', // greenish background
          borderRadius: 40,
          height: 70,
          elevation: 5, // Android shadow
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#6EB5A8' : 'transparent',
                borderRadius: 50,
                padding: 12,
              }}
            >
              <IconSymbol
                size={24}
                name="house.fill"
                color={focused ? 'white' : 'black'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#6EB5A8' : 'transparent',
                borderRadius: 50,
                padding: 12,
              }}
            >
              <IconSymbol
                size={24}
                name="plus"
                color={focused ? 'white' : 'black'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#6EB5A8' : 'transparent',
                borderRadius: 50,
                padding: 12,
              }}
            >
              <IconSymbol
                size={24}
                name="line.3.horizontal"
                color={focused ? 'white' : 'black'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}
