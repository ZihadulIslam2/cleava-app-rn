import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BuchungScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Reinigung</Text>
          <Text style={styles.description}>
            Die benötigte Zeit zum Reinigen Ihres Appartements orientiert sich an
            Ihrer Wohnfläche. Geben Sie uns bitte zudem an, wie oft wir Ihr
            Appartement im Monat reinigen und welche Extras Sie dazubuchen
            möchten.
          </Text>

          <Text style={styles.description}>
            AppClean ist in folgenden Städten verfügbar:{"\n\n"}
            Berlin, Frankfurt, Hamburg, München, Nürnberg, Stuttgart
          </Text>

          <Text style={styles.sectionTitle}>
            Appartement und Reinigungsintervall
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuchungScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30, // Adds padding at the bottom for better scrolling
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, // Adds horizontal padding for better spacing
    paddingVertical: 30,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 20, // Slightly larger for prominence
    fontWeight: "700", // Bolder for emphasis
    marginBottom: 20,
    color: "#1F2937", // Darker neutral color for better contrast
    lineHeight: 28, // Improved readability
  },
  description: {
    fontSize: 16, // Standard size for body text
    color: "#4B5563", // Softer gray for secondary text
    marginBottom: 20,
    lineHeight: 24, // Better spacing for multi-line text
  },
});