import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const servicePackages = [
  {
    title: 'Executive',
    subtitle: 'Cleaning Service',
    price: '49.20€',
    services: [
      'Reinigung Schlafzimmer',
      'Betten aufbereiten',
      'Reinigung Wohnbereich',
      'Reinigung Küche',
      'Reinigung Bad (desinfizierend)',
      'Bereitstellung Reinigungsmittel',
    ],
  },
  {
    title: 'CEO',
    subtitle: 'Cleaning Service',
    price: '75.80€',
    services: [
      'Reinigung Schlafzimmer',
      'Betten aufbereiten',
      'Reinigung Wohnbereich',
      'Reinigung Küche',
      'Reinigung Bad (desinfizierend)',
      'Bereitstellung Reinigungsmittel',
      'Bereitstellung Verbrauchsartikel',
      'Geschirr spülen',
      'Bügelservice',
    ],
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 27, height: 23, marginRight: 10 }}
            source={require('@/assets/images/Vector.png')}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Cleava</Text>
        </View>
        <MaterialCommunityIcons name="bell-ring-outline" size={24} color="black" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Hero Banner */}
        <View style={styles.banner}>
          <ImageBackground
            source={require('@/assets/images/cleaning.png')}
            style={styles.bannerBackground}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.bannerTitle}>Apartment cleaning service</Text>
            <Text style={styles.bannerText}>
              Let us clean! We take care of cleaning your apartment professionally, 
              so you&apos;ll have more time.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Buchung' as never)}
              style={styles.bannerButton}
            >
              <Text style={styles.bannerButtonText}>Make a request</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Service Packages */}
        <View style={styles.packagesSection}>
          {servicePackages.map((pkg, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{pkg.title}</Text>
                  <Text style={styles.cardSubtitle}>{pkg.subtitle}</Text>
                </View>
                <Text style={styles.cardPrice}>{pkg.price}</Text>
              </View>

              {pkg.services.map((service, idx) => (
                <View key={idx} style={styles.serviceItem}>
                  <Ionicons name="checkmark" size={20} color="#10B981" />
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}

              <TouchableOpacity
                onPress={() => navigation.navigate('Buchung' as never)}
                style={styles.cardButton}
              >
                <Text style={styles.cardButtonText}>Make a request</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  banner: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 20,
    height: 200,
  },
  bannerBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  bannerText: { fontSize: 14, color: '#333', marginBottom: 12 },
  bannerButton: {
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: { color: '#fff', fontWeight: '600' },
  packagesSection: { paddingHorizontal: 16 },
  card: {
    backgroundColor: '#E3F2EF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 13, color: '#444' },
  cardPrice: { fontSize: 18, fontWeight: 'bold' },
  serviceItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  serviceText: { marginLeft: 8, fontSize: 14 },
  cardButton: {
    marginTop: 12,
    backgroundColor: '#111',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: { color: '#fff', fontWeight: '600' },
});
