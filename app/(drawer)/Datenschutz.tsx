import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const DatenschutzScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Datenschutz</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Datenschutz auf einen Blick</Text>

        <Text style={styles.subTitle}>Allgemeine Hinweise</Text>
        <Text style={styles.paragraph}>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
          passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
          identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter
          diesem Text aufgeführten Datenschutzerklärung.
        </Text>

        <Text style={styles.subTitle}>Datenerfassung auf unserer Website</Text>
        <Text style={styles.paragraph}>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</Text>
        <Text style={styles.paragraph}>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie
          dem Impressum dieser Website entnehmen.
        </Text>

        <Text style={styles.paragraph}>Wie erfassen wir Ihre Daten?</Text>
        <Text style={styles.paragraph}>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten
          handeln, die Sie in ein Kontaktformular eingeben.
        </Text>

        <Text style={styles.paragraph}>
          Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem
          technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser
          Daten erfolgt automatisch, sobald Sie unsere Website betreten.
        </Text>

        <Text style={styles.paragraph}>Wofür nutzen wir Ihre Daten?</Text>
        <Text style={styles.paragraph}>
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten
          können zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </Text>

        <Text style={styles.paragraph}>Welche Rechte haben Sie bezüglich Ihrer Daten?</Text>
        <Text style={styles.paragraphLast}>
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten
          personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung
          dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit
          unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der
          zuständigen Aufsichtsbehörde zu.
        </Text>

        <Text style={styles.sectionTitle}>Analyse-Tools und Tools von Drittanbietern</Text>
        <Text style={styles.paragraphLast}>
          Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem
          mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel
          anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden. Sie können dieser Analyse widersprechen
          oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen dazu finden Sie in
          der folgenden Datenschutzerklärung.
        </Text>

        <Text style={styles.sectionTitle}>2. Allgemeine Hinweise und Pflichtinformationen</Text>

        <Text style={styles.subTitle}>Datenschutz</Text>
        <Text style={styles.paragraph}>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzbestimmungen sowie dieser
          Datenschutzerklärung.
        </Text>

        <Text style={styles.paragraph}>
          Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten
          sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung
          erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das
          geschieht.
        </Text>

        <Text style={styles.paragraphLast}>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
          Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
          möglich.
        </Text>

        <Text style={styles.subTitle}>Hinweis zur verantwortlichen Stelle</Text>
        <Text style={styles.paragraph}>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </Text>
        <Text style={styles.paragraph}>
          Weil Reinigungsservice GmbH & Co. KG{"\n"}
          Gunter Weil{"\n"}
          Schönberger Weg 22{"\n"}
          60488 Frankfurt am Main
        </Text>
        <Text style={styles.paragraph}>
          Telefon: 069 768005-0{"\n"}
          E-Mail: info@weil-reinigungsservice.de
        </Text>

        <Text style={styles.paragraphLast}>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über
          die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.)
          entscheidet.
        </Text>

        <Text style={styles.subTitle}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</Text>
        <Text style={styles.paragraphLast}>
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
          bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </Text>

        <Text style={styles.subTitle}>
          Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
        </Text>
        <Text style={styles.paragraphFinal}>
          Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit
          das Recht, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein
          auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung
          beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen
          personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die
          Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
     paddingVertical: 40,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  statusTime: {
    color: "#000000",
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
    backgroundColor: "#000000",
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
    borderColor: "#000000",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  batteryLevel: {
    width: 16,
    height: 8,
    backgroundColor: "#000000",
    borderRadius: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    color: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000000",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000000",
  },
  paragraph: {
    color: "#374151",
    marginBottom: 16,
    lineHeight: 24,
    fontSize: 14,
  },
  paragraphLast: {
    color: "#374151",
    marginBottom: 24,
    lineHeight: 24,
    fontSize: 14,
  },
  paragraphFinal: {
    color: "#374151",
    marginBottom: 32,
    lineHeight: 24,
    fontSize: 14,
  },
})

export default DatenschutzScreen
