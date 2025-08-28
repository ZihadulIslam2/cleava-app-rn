import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // Hide headers globally if desired
      }}
    >
      {/* Main Tabs (nested tab navigator) */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          // title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          drawerItemStyle: { display: 'none' }, // Hide from drawer menu if needed
        }}
      />

      {/* Other drawer screens */}
      <Drawer.Screen
        name="Ablauf"
        options={{ title: "Ablauf" }}
      />
      <Drawer.Screen
        name="FAQ"
        options={{ title: "FAQ" }}
      />
      <Drawer.Screen
        name="Impressum"
        options={{ title: "Impressum" }}
      />
      <Drawer.Screen
        name="Datenschutz"
        options={{ title: "Datenschutz" }}
      />
      <Drawer.Screen
        name="Aktuelles"
        options={{ title: "Aktuelles" }}
      />
      <Drawer.Screen
        name="BuchungDrawer"
        options={{ title: "Buchung" }}
      />
    </Drawer>
  );
}
