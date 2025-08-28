import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const AblaufScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ablauf</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Step 1 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIconContainer}>
            <View style={styles.stepBackground}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>01</Text>
              </View>
            </View>
          </View>
          <Text style={styles.stepTitle}>Buchung</Text>
          <Text style={styles.stepDescription}>
            In unserem Buchungstool können Sie einfach und bequem Ihre individuelle Appartementreinigung berechnen und
            eine Terminanfrage an uns richten.
          </Text>
        </View>

        {/* Step 2 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIconContainer}>
            <View style={styles.stepBackground}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>02</Text>
              </View>
            </View>
          </View>
          <Text style={styles.stepTitle}>Terminbestätigung</Text>
          <Text style={styles.stepDescription}>
            Sobald wir Ihre Anfrage erhalten haben, prüfen wir Ihren Terminwunsch und setzen uns bis zum darauffolgenden
            Werktag, zur Vereinbarung eines Ersttermins, mit Ihnen in Verbindung.
          </Text>
        </View>

        {/* Step 3 */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIconContainer}>
            <View style={styles.stepBackground}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>03</Text>
              </View>
            </View>
          </View>
          <Text style={styles.stepTitle}>Ersttermin</Text>
          <Text style={styles.stepDescription}>
            Bei einem ersten Termin in Ihrem Appartement besprechen wir gerne Ihre Vorstellungen und beantworten alle
            Ihre Fragen. Wenn dann alles so ist wie Sie es gerne haben möchten, kann gerne gleich die erste Reinigung
            Ihres Appartements durchgeführt werden.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  stepContainer: {
    alignItems: "center",
    marginBottom: 92,
  },
  stepIconContainer: {
    position: "relative",
  },
  stepBackground: {
    width: 128,
    height: 128,
    backgroundColor: "#B2DFDB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  stepCircle: {
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#26A69A",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  stepDescription: {
    color: "#374151",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },
})

export default AblaufScreen
