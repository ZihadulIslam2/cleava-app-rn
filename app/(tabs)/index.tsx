import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header Banner */}
      <View style={styles.banner}>
        <ImageBackground
          source={require('@/assets/images/cleaning.png')}
          style={styles.bannerBackground}
          imageStyle={{ borderRadius: 12 }} // round corners for the background image
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Apartment cleaning service</Text>
            <Text style={styles.bannerText}>
              Let us clean. We take care of cleaning your apartment
              professionally, so you&apos;ll have more time.
            </Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Make a request</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      

      {/* Pricing Cards */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Executive</Text>
          <Text style={styles.cardPrice}>49.20€</Text>
        </View>
        <Text style={styles.cardSubtitle}>Cleaning Service</Text>
        {[
          'Reinigung Schlafzimmer',
          'Betten aufbereiten',
          'Reinigung Wohnbereich',
          'Reinigung Küche',
          'Reinigung Bad (desinfizierend)',
          'Bereitstellung Reinigungsmittel',
        ].map((item, index) => (
          <Text key={index} style={styles.cardItem}>
            ✓ {item}
          </Text>
        ))}
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Make a request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>CEO</Text>
          <Text style={styles.cardPrice}>75.80€</Text>
        </View>
        <Text style={styles.cardSubtitle}>Cleaning Service</Text>
        {[
          'Reinigung Schlafzimmer',
          'Betten aufbereiten',
          'Reinigung Wohnbereich',
          'Reinigung Küche',
          'Reinigung Bad (desinfizierend)',
          'Bereitstellung Reinigungsmittel',
          'Bereitstellung Verbrauchsartikel',
          'Geschirr spülen',
          'Bügelservice',
        ].map((item, index) => (
          <Text key={index} style={styles.cardItem}>
            ✓ {item}
          </Text>
        ))}
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Make a request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    height: 180,
  },
  bannerBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  // bannerOverlay: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(227, 242, 239, 0.8)', // semi-transparent overlay
  //   width: '200%',
  //   height: '200%',
  // },
  bannerContent: {
    borderRadius: 12,
    // padding: 12,
    paddingRight: 40,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 60,
    marginTop: 20,
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  bannerImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#E3F2EF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#444',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardButton: {
    marginTop: 12,
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
})

// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
