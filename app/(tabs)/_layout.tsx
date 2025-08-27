import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Pressable, View } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#E3F2EF',
          borderRadius: 40,
          height: 70,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
        },
        tabBarItemStyle: { height: 70 },
        tabBarButton: (props) => (
          <Pressable
            {...(props as any)}
            style={[
              (props as any).style,
              {
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          />
        ),
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
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('@/assets/images/home_icon.png')}
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Buchung"
        options={{
          title: 'Buchung',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#6EB5A8' : 'transparent',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('@/assets/images/add_icon.png')}
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#6EB5A8' : 'transparent',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('@/assets/images/menu_Icon.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}
