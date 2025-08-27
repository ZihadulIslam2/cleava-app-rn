import { useRouter } from 'expo-router'
import React from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const MENU_ITEMS = [
  { title: 'Ablauf', path: '/page1' },
  { title: 'FAQ', path: '/page2' },
  { title: 'Impressum', path: '/page3' },
  { title: 'Datenschutz', path: '/page3' },
  { title: 'Aktuelles', path: '/page3' },
  { title: 'Buchung', path: '/page3' },
]

const Menu = () => {
  const router = useRouter()

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const renderItem = ({ item }: { item: (typeof MENU_ITEMS)[0] }) => (
    <Pressable onPress={() => navigateTo(item.path)} style={styles.menuItem}>
      <Text style={styles.menuTitle}>{item.title}</Text>
    </Pressable>
  )

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.drawer, { left: SCREEN_WIDTH / 2 }]}>
        <FlatList
          data={MENU_ITEMS}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
        />
      </Animated.View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH / 2,
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 10,
    elevation: 10,
  },
  menuTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 10,
  },
})

// import type React from 'react'
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'

// interface ServiceFeature {
//   text: string
//   included: boolean
// }

// interface ServicePackage {
//   title: string
//   subtitle: string
//   price: string
//   features: ServiceFeature[]
//   backgroundColor: string
// }

// const App: React.FC = () => {
//   const servicePackages: ServicePackage[] = [
//     {
//       title: 'Executive',
//       subtitle: 'Cleaning Service',
//       price: '49.20€',
//       backgroundColor: '#E8F5E8',
//       features: [
//         { text: 'Reinigung Schlafzimmer', included: true },
//         { text: 'Betten aufbereiten', included: true },
//         { text: 'Reinigung Wohnbereich', included: true },
//         { text: 'Reinigung Küche', included: true },
//         { text: 'Reinigung Bad (desinfizierend)', included: true },
//         { text: 'Bereitstellung Reinigungsmittel', included: true },
//       ],
//     },
//     {
//       title: 'CEO',
//       subtitle: 'Cleaning Service',
//       price: '75.80€',
//       backgroundColor: '#E8F5E8',
//       features: [
//         { text: 'Reinigung Schlafzimmer', included: true },
//         { text: 'Betten aufbereiten', included: true },
//         { text: 'Reinigung Wohnbereich', included: true },
//         { text: 'Reinigung Küche', included: true },
//         { text: 'Reinigung Bad (desinfizierend)', included: true },
//         { text: 'Bereitstellung Reinigungsmittel', included: true },
//         { text: 'Bereitstellung Verbrauchsmittel', included: true },
//         { text: 'Geschirr spülen', included: true },
//         { text: 'Bügelservice', included: true },
//       ],
//     },
//   ]

//   const renderServicePackage = (pkg: ServicePackage, index: number) => (
//     <View
//       key={index}
//       style={[styles.servicePackage, { backgroundColor: pkg.backgroundColor }]}
//     >
//       <Image
//         source={{ uri: '/professional-cleaning-person-in-uniform.png' }}
//         style={styles.serviceImage}
//       />
//       <Text style={styles.serviceTitle}>{pkg.title}</Text>
//       <Text style={styles.serviceSubtitle}>{pkg.subtitle}</Text>

//       <View style={styles.featuresContainer}>
//         {pkg.features.map((feature, idx) => (
//           <View key={idx} style={styles.featureRow}>
//             <Ionicons
//               name="checkmark"
//               size={16}
//               color="#4CAF50"
//               style={styles.checkIcon}
//             />
//             <Text style={styles.featureText}>{feature.text}</Text>
//           </View>
//         ))}
//       </View>

//       <Text style={styles.price}>{pkg.price}</Text>
//       <TouchableOpacity style={styles.requestButton}>
//         <Text style={styles.requestButtonText}>Make a request</Text>
//       </TouchableOpacity>
//     </View>
//   )

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>CLEAVA</Text>
//         <Ionicons name="notifications-outline" size={24} color="#000" />
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Hero Section */}
//         <View style={styles.heroSection}>
//           <Text style={styles.tagline}>
//             "Cleava Reset Your Space,{'\n'}Reboot Your Day."
//           </Text>

//           <Image
//             source={{ uri: '/person-cleaning-apartment-interior.png' }}
//             style={styles.heroImage}
//           />

//           <TouchableOpacity style={styles.makeRequestButton}>
//             <Text style={styles.makeRequestButtonText}>Make a request</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Service Info */}
//         <View style={styles.serviceInfo}>
//           <Text style={styles.serviceMainTitle}>
//             Apartment cleaning service
//           </Text>
//           <Text style={styles.serviceLocation}>Werningen Settisee</Text>

//           <Text style={styles.serviceDescription}>
//             Unser Haushaltshilfe-Service für anspruchsvolle Kunden
//           </Text>

//           <Image
//             source={{
//               uri: '/team-of-cleaning-professionals-in-blue-uniforms.png',
//             }}
//             style={styles.teamImage}
//           />
//         </View>

//         {/* Features Sections */}
//         <View style={styles.featuresSection}>
//           <View style={styles.featureBlock}>
//             <Text style={styles.featureBlockTitle}>Kompetenz</Text>
//             <Text style={styles.featureBlockText}>
//               • Bestens ausgebildetes Fachpersonal
//             </Text>
//             <Text style={styles.featureBlockText}>
//               • Erfahrung in der Hotelreinigung
//             </Text>
//             <Text style={styles.featureBlockText}>
//               • Einsatz geprüfter Reinigungsmittel
//             </Text>
//           </View>

//           <View style={styles.featureBlock}>
//             <Text style={styles.featureBlockTitle}>Qualität</Text>
//             <Text style={styles.featureBlockText}>
//               • Regelmäßige Qualitätskontrollen
//             </Text>
//             <Text style={styles.featureBlockText}>
//               • Zertifiziertes Qualitätsmanagement
//             </Text>
//             <Text style={styles.featureBlockText}>
//               • Zertifiziertes Umweltmanagement
//             </Text>
//           </View>

//           <View style={styles.featureBlock}>
//             <Text style={styles.featureBlockTitle}>Sicherheit</Text>
//             <Text style={styles.featureBlockText}>
//               • Vertrauensvolle Mitarbeiter mit polizeilichem
//             </Text>
//             <Text style={styles.featureBlockText}>
//               Führungszeugnis und Gesundheitspass
//             </Text>
//             <Text style={styles.featureBlockText}>
//               • Volle Versicherungsschutz
//             </Text>
//             <Text style={styles.featureBlockText}>• Keine Vertragsbindung</Text>
//           </View>
//         </View>

//         {/* Service Packages */}
//         <View style={styles.packagesContainer}>
//           {servicePackages.map((pkg, index) =>
//             renderServicePackage(pkg, index)
//           )}
//         </View>

//         {/* Customer Testimonial */}
//         <View style={styles.testimonialSection}>
//           <Text style={styles.testimonialTitle}>
//             Das sagen unsere zufriedenen Kunden
//           </Text>
//           <Text style={styles.testimonialText}>
//             🏠 Wir wollten uns bei Ihnen und Ihrer Mitarbeiterin sehr herzlich
//             für die Reinigungsarbeit bedanken. Ihre Mitarbeiterin hat eine
//             exzellente Arbeit geleistet und wir sind sehr zufrieden mit dem
//             Ergebnis und dem ausgezeichneten Personal. 🏠
//           </Text>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="home" size={24} color="#4CAF50" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="calendar-outline" size={24} color="#666" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="menu" size={24} color="#666" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//   },
//   logo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   heroSection: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   tagline: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 20,
//     lineHeight: 22,
//   },
//   heroImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   makeRequestButton: {
//     backgroundColor: '#333',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   makeRequestButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   serviceInfo: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   serviceMainTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   serviceLocation: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 15,
//   },
//   serviceDescription: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 20,
//     fontWeight: '500',
//   },
//   teamImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 12,
//   },
//   featuresSection: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   featureBlock: {
//     marginBottom: 20,
//   },
//   featureBlockTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//   },
//   featureBlockText: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 20,
//     marginBottom: 2,
//   },
//   packagesContainer: {
//     paddingHorizontal: 20,
//   },
//   servicePackage: {
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   serviceImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 15,
//   },
//   serviceTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 5,
//   },
//   serviceSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   featuresContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   featureRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   checkIcon: {
//     marginRight: 10,
//   },
//   featureText: {
//     fontSize: 14,
//     color: '#333',
//     flex: 1,
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 20,
//   },
//   requestButton: {
//     backgroundColor: '#333',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     width: '100%',
//     alignItems: 'center',
//   },
//   requestButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   testimonialSection: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   testimonialTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 15,
//   },
//   testimonialText: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 20,
//     fontStyle: 'italic',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//   },
//   navItem: {
//     padding: 10,
//   },
// })

// export default App
