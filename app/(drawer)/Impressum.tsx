import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ImpressumScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Impressum</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Company Information */}
        <Text style={styles.sectionTitle}>Angaben gemäß § 5 TMG:</Text>
        <Text style={styles.bulletText}>• Weil Reinigungsservice GmbH & Co. KG</Text>
        <Text style={styles.bulletText}>• Schönberger Weg 22</Text>
        <Text style={styles.bulletTextLast}>• 60488 Frankfurt am Main</Text>

        {/* Represented by */}
        <Text style={styles.sectionTitle}>Vertreten durch:</Text>
        <Text style={styles.bulletText}>• Weil Reinigungsservice Verwaltungs GmbH</Text>
        <Text style={styles.bulletText}>• vertreten durch die Geschäftsführer Gunter Weil und</Text>
        <Text style={styles.bulletTextLast}> Christiane Weil</Text>

        {/* Contact */}
        <Text style={styles.sectionTitle}>Kontakt:</Text>
        <Text style={styles.bulletText}>• Telefon: 069 768005-0</Text>
        <Text style={styles.bulletText}>• Telefax: 069 768005-22</Text>
        <Text style={styles.bulletTextLast}>• E-Mail: info@weil-reinigungsservice.de</Text>

        {/* Registration */}
        <Text style={styles.sectionTitle}>Registereintrag:</Text>
        <Text style={styles.bulletText}>• Eintragung im Handelsregister</Text>
        <Text style={styles.bulletText}>• Registergericht Amtsgericht Frankfurt am Main</Text>
        <Text style={styles.bulletTextLast}>• Registernummer: HRA 47306</Text>

        {/* Tax ID */}
        <Text style={styles.sectionTitle}>Umsatzsteuer:</Text>
        <Text style={styles.bulletText}>• Umsatzsteuer-Identifikationsnummer gemäß §27 a</Text>
        <Text style={styles.bulletTextLast}> Umsatzsteuergesetz: DE294423504</Text>

        {/* Liability */}
        <Text style={styles.sectionTitle}>
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
        </Text>
        <Text style={styles.bulletText}>• Gunter Weil</Text>
        <Text style={styles.bulletText}> Weil Reinigungsservice GmbH & Co. KG</Text>
        <Text style={styles.bulletText}> Schönberger Weg 22</Text>
        <Text style={styles.bulletTextLast}> 60488 Frankfurt am Main</Text>

        {/* Dispute Resolution */}
        <Text style={styles.sectionTitle}>Streitschlichtung</Text>
        <Text style={styles.paragraphText}>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </Text>

        {/* Liability for Content */}
        <Text style={styles.sectionTitle}>Haftung für Inhalte</Text>
        <Text style={styles.paragraphText}>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
          hinweisen.
        </Text>

        <Text style={styles.paragraphText}>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
          allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
          erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
          entfernen.
        </Text>

        {/* Liability for Links */}
        <Text style={styles.sectionTitle}>Haftung für Links</Text>
        <Text style={styles.paragraphText}>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        </Text>

        <Text style={styles.paragraphText}>
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar.
        </Text>

        <Text style={styles.paragraphText}>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </Text>

        {/* Copyright */}
        <Text style={styles.sectionTitle}>Urheberrecht</Text>
        <Text style={styles.paragraphText}>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
          nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </Text>

        <Text style={[styles.paragraphText, styles.lastParagraph]}>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
          gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
          bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 30,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  statusTime: {
    color: '#000000',
    fontWeight: '500',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalBars: {
    flexDirection: 'row',
    gap: 4,
  },
  signalBar: {
    width: 4,
    height: 12,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  signalBarWeak: {
    width: 4,
    height: 8,
    backgroundColor: '#9CA3AF',
    borderRadius: 2,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryLevel: {
    width: 16,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 1,
    margin: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  bulletText: {
    color: '#374151',
    marginBottom: 4,
  },
  bulletTextLast: {
    color: '#374151',
    marginBottom: 24,
  },
  paragraphText: {
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  lastParagraph: {
    marginBottom: 32,
  },
});

export default ImpressumScreen;
