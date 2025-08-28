import { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, LayoutAnimation, UIManager, Platform, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Enable animation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

type Question = {
  id: string
  question: string
  answer?: string
}

type Section = {
  title: string
  questions: Question[]
}

// 👉 FAQ Data with placeholder answers
const FAQ_DATA: Section[] = [
  {
    title: "Reinigung",
    questions: [
      {
        id: "1",
        question: "Was beinhaltet eine Reinigung?",
        answer: "Eine Reinigung umfasst Staubsaugen, Wischen, Bad- und Küchenreinigung sowie Müllentsorgung.",
      },
      {
        id: "2",
        question: "Was ist das 4-Farb-System?",
        answer:
          "Das 4-Farb-System nutzt farbige Tücher, um Kreuzkontamination zu vermeiden (z.B. rot für Badezimmer, blau für Küche).",
      },
      {
        id: "3",
        question: "Was sollte ich vor einem Reinigungstag beachten?",
        answer: "Bitte räumen Sie Wertsachen weg und teilen Sie spezielle Wünsche im Voraus mit.",
      },
      {
        id: "4",
        question: "Muss ich Reinigungsmaterial bereitstellen?",
        answer: "Nein, AppClean stellt alle notwendigen Materialien und Reinigungsmittel bereit.",
      },
      {
        id: "5",
        question: "Was ist wenn bei der Reinigung etwas übersehen wurde?",
        answer: "Bitte melden Sie dies innerhalb von 24 Stunden, wir kümmern uns umgehend darum.",
      },
      {
        id: "6",
        question: "Was passiert wenn während einer Reinigung etwas kaputt geht?",
        answer: "Schäden werden von AppClean geprüft und gegebenenfalls ersetzt, bitte melden Sie es sofort.",
      },
    ],
  },
  {
    title: "Preis & Kosten",
    questions: [
      {
        id: "7",
        question: "Wie setzt sich der Preis zusammen?",
        answer: "Der Preis basiert auf der Wohnungsgröße, Reinigungsart und Häufigkeit.",
      },
      {
        id: "8",
        question: "Kann ich die Kosten von der Steuer absetzen?",
        answer:
          "Ja, unter bestimmten Bedingungen als Haushaltsnahe Dienstleistungen, konsultieren Sie Ihren Steuerberater.",
      },
      {
        id: "9",
        question: "Ist die Mehrwertsteuer bereits im Preis enthalten?",
        answer: "Ja, alle Preise sind inklusive Mehrwertsteuer.",
      },
      {
        id: "10",
        question: "Wie bezahle ich für meine Appartementreinigung?",
        answer: "Zahlung erfolgt per Kreditkarte oder App nach Abschluss der Reinigung.",
      },
      {
        id: "11",
        question: "Bin ich verantwortlich für Steuern & Sozialabgaben?",
        answer: "Nein, AppClean übernimmt alle rechtlichen Verpflichtungen.",
      },
      {
        id: "12",
        question: "Darf ich der Reinigungskraft Trinkgeld geben?",
        answer: "Ja, Trinkgeld ist willkommen, aber nicht verpflichtend.",
      },
    ],
  },
  {
    title: "Buchung",
    questions: [
      {
        id: "13",
        question: "Muss ich während einer Reinigung zuhause sein?",
        answer: "Nein, aber Zugang muss gewährleistet sein, z.B. durch einen Schlüssel.",
      },
      {
        id: "14",
        question: "Um wieviel Uhr kommt die Reinigungskraft?",
        answer: "Zwischen 8:00 und 16:00, Sie erhalten einen Zeitfenster-Vorschlag.",
      },
      {
        id: "15",
        question: "Who comes from AppClean to clean my apartment?",
        answer:
          "AppClean assigns a trained and vetted cleaning professional, though the specific person may vary unless a consistent cleaner is requested.",
      },
      {
        id: "16",
        question: "Kommt immer wieder die gleiche Reinigungskraft?",
        answer: "Auf Wunsch ja, sofern verfügbar.",
      },
      {
        id: "17",
        question: "Was geschieht, wenn ich meinen Termin ändern muss?",
        answer: "Änderungen sind bis 24 Stunden vorher kostenfrei möglich.",
      },
      {
        id: "18",
        question: "Wie kann ich meinen Auftrag stornieren?",
        answer: "Stornierung ist über die App bis 24 Stunden vorher möglich.",
      },
      {
        id: "19",
        question: "Was passiert an Feiertagen?",
        answer: "Reinigungen an Feiertagen sind auf Anfrage möglich, mit Aufpreis.",
      },
      {
        id: "20",
        question: "Wer kommt für die Fahrtkosten auf?",
        answer: "Fahrtkosten sind im Preis enthalten, bei Ausnahmefällen wird das separat kommuniziert.",
      },
    ],
  },
  {
    title: "Appclean",
    questions: [
      {
        id: "21",
        question: "Woher weiß ich, dass ich AppClean vertrauen kann?",
        answer: "AppClean ist zertifiziert und alle Mitarbeiter werden überprüft.",
      },
      {
        id: "22",
        question: "Wie unterscheidet sich AppClean von anderen Diensten?",
        answer: "Mit dem 4-Farb-System und flexiblen Buchungsoptionen bieten wir höchste Standards.",
      },
      {
        id: "23",
        question: "Was reinigt AppClean noch?",
        answer: "Zusätzlich zu Wohnungen auch Büros und Fenster auf Anfrage.",
      },
      {
        id: "24",
        question: "Kann ich den Reinigungskräften von AppClean vertrauen?",
        answer: "Ja, alle Kräfte sind geschult, überprüft und versichert.",
      },
    ],
  },
]

const FAQScreen = () => {
  const navigation = useNavigation()
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    LayoutAnimation.easeInEaseOut()
    setExpanded(expanded === id ? null : id)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQS</Text>
      </View>

      {/* FAQ List */}
      <FlatList
        data={FAQ_DATA}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{item.title}</Text>

            {/* Questions */}
            {item.questions.map((q) => (
              <View key={q.id}>
                <TouchableOpacity onPress={() => toggleExpand(q.id)} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{q.question}</Text>
                  <Ionicons name={expanded === q.id ? "chevron-up" : "chevron-down"} size={20} color="#666" />
                </TouchableOpacity>

                {expanded === q.id && <Text style={styles.answerText}>{q.answer ?? "Antwort folgt bald..."}</Text>}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    paddingBottom: 30
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  statusTime: {
    fontSize: 16,
    fontWeight: "600",
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
    borderRadius: 1,
  },
  signalBarWeak: {
    width: 4,
    height: 8,
    backgroundColor: "#9CA3AF",
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  batteryLevel: {
    width: 16,
    height: 8,
    backgroundColor: "black",
    borderRadius: 1,
    margin: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "600",
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 12,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
  },
  questionText: {
    fontSize: 16,
    color: "#1F2937",
    flex: 1,
    paddingRight: 16,
  },
  answerText: {
    fontSize: 14,
    color: "#6B7280",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
})

export default FAQScreen
