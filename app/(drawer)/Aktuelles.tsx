import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const AktuellesScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktuelles</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Date */}
        <Text style={styles.date}>13.05.2020</Text>

        {/* Article Title */}
        <Text style={styles.articleTitle}>AppClean Kooperation mit Helping Hand</Text>

        {/* Article Content */}
        <Text style={styles.paragraph}>
          In der aktuell stürmischen Zeit ist es wichtiger als je zuvor, Solidarität zu zeigen und unser Land im
          Beistand, insbesondere allen, die im systemrelevanten Sektor tätig sind.
        </Text>

        <Text style={styles.paragraph}>
          Ob Krankenpfleger, Polizist oder Postbote — sie arbeiten für uns noch mehr als sonst und geben jeden Tag ihr
          uns und unser Land ihr Bestes.
        </Text>

        <Text style={styles.paragraph}>
          Dank helping-hand.me haben wir die Möglichkeit diesen Menschen die Chance zu geben von unseren Vorteilen zu
          profitieren und eine bessere Work-Life-Balance zu ermöglichen.
        </Text>

        <Text style={styles.paragraph}>
          Auf diese Weise sagen wir DANKE für die unermüdliche Ausdauer und jede zurückgelegte Extrameile.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 40,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  statusTime: {
    color: "black",
    fontWeight: "500",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signalBars: {
    flexDirection: "row",
    gap: 4,
  },
  signalBar: {
    width: 4,
    height: 12,
    backgroundColor: "black",
    borderRadius: 2,
  },
  signalBarWeak: {
    width: 4,
    height: 8,
    backgroundColor: "#9CA3AF",
    borderRadius: 2,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  batteryLevel: {
    width: 16,
    height: 8,
    backgroundColor: "black",
    borderRadius: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  paragraph: {
    color: "#374151",
    lineHeight: 24,
    marginBottom: 16,
  },
})

export default AktuellesScreen
