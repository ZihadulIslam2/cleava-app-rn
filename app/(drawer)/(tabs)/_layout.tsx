import BuchungScreen from "@/app/(drawer)/(tabs)/Buchung";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./index";

export const COLORS = {
  primary: "#6EB5A8",
  text: "#333",
  inactive: "#666",
  background: "#f9f9f9",
  tabActive: "#e0e0e0",
};

type TabParamList = { Home: undefined; Buchung: undefined; Menu: undefined };

const Tab = createBottomTabNavigator<TabParamList>();

function MenuPlaceholder() {
  return null;
}

export default function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName: any = "ellipse-outline";
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Buchung")
            iconName = focused ? "add-circle" : "add-circle-outline";
          else if (route.name === "Menu")
            iconName = focused ? "menu" : "menu-outline";

          return (
            <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
              <Ionicons
                name={iconName}
                size={26}
                color={focused ? "#fff" : COLORS.inactive}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Buchung" component={BuchungScreen}  />
      <Tab.Screen
        name="Menu"
        component={MenuPlaceholder}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabActive,
    borderRadius: 30,
    borderTopWidth: 0,
    bottom: 60,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 8,
    height: 70,
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  tabIcon: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  tabIconFocused: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.text,
  },
  screenText: { fontSize: 16, textAlign: "center", color: COLORS.inactive },
});