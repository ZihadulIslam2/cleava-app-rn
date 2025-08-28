import Header from '@/components/Header'
import PackageOption from '@/components/PackageOption'
import RadioOption from '@/components/RadioOption'
import { createBooking } from '@/services/BookingApi'
import { BookingData } from '@/types/booking'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

// Define Address type to fix the TypeScript error
type Address = {
  houseNumber: string
  zipCode: string
  street: string
  city: string
}

// Define step components outside the main component to prevent re-renders
const Step1 = ({
  bookingData,
  updateField,
  nextStep,
}: {
  bookingData: BookingData
  updateField: (field: keyof BookingData, value: any) => void
  nextStep: () => void
}) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={{ paddingBottom: 40 }}
  >
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reinigung</Text>
      <Text style={styles.description}>
        Die benötigte Zeit zum Reinigen Ihres Appartements orientiert sich an
        Ihrer Wohnfläche.
      </Text>

      <Text style={styles.inputLabel}>Appartement-Größe</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Wohnungsgröße"
        value={bookingData.apartmentSize}
        onChangeText={(v) => updateField('apartmentSize', v)}
      />

      <Text style={styles.inputLabel}>Reinigungsintervall</Text>
      <TextInput
        style={styles.textInput}
        placeholder="z. B. 1x/Woche"
        value={bookingData.cleaningInterval}
        onChangeText={(v) => updateField('cleaningInterval', v)}
      />

      <Text style={styles.inputLabel}>Anzahl Personen</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Anzahl Personen"
        keyboardType="numeric"
        value={bookingData.householdSize}
        onChangeText={(v) => updateField('householdSize', v)}
      />

      <Text style={styles.sectionTitle}>Cleaning Service Paket</Text>
      <PackageOption
        title="Executive Cleaning Service"
        items={[
          'Reinigung Schlafzimmer',
          'Betten aufbereiten',
          'Reinigung Wohnbereich',
          'Reinigung Küche',
          'Reinigung Bad (desinfizierend)',
          'Bereitstellung Reinigungsmittel',
        ]}
        selected={bookingData.cleaningPackage === 'executive'}
        onPress={() => updateField('cleaningPackage', 'executive')}
      />
      <PackageOption
        title="CEO Cleaning Service"
        items={[
          'Reinigung Schlafzimmer',
          'Betten aufbereiten',
          'Reinigung Wohnbereich',
          'Reinigung Küche',
          'Reinigung Bad (desinfizierend)',
          'Bereitstellung Reinigungsmittel',
          'Bereitstellung Verbrauchsartikel',
          'Geschirr spülen',
          'Bügelservice',
        ]}
        selected={bookingData.cleaningPackage === 'ceo'}
        onPress={() => updateField('cleaningPackage', 'ceo')}
      />

      <Text style={styles.inputLabel}>Besondere Wünsche</Text>
      <TextInput
        style={[styles.textInput, { height: 90 }]}
        placeholder="Schreiben Sie hier..."
        multiline
        value={bookingData.specialWish}
        onChangeText={(v) => updateField('specialWish', v)}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
        <Text style={styles.primaryButtonText}>Bestätigen</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
)

const Step2 = ({
  bookingData,
  updateNested,
  prevStep,
  nextStep,
}: {
  bookingData: BookingData
  updateNested: (parent: keyof BookingData, field: string, value: any) => void
  prevStep: () => void
  nextStep: () => void
}) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={{ paddingBottom: 40 }}
  >
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Termin</Text>
      <Text style={styles.description}>Haben Sie einen Wunschtermin?</Text>

      <RadioOption
        label="Ja, ich habe einen Wunschtermin."
        selected={bookingData.appointment.hasPreferredDate}
        onPress={() => updateNested('appointment', 'hasPreferredDate', true)}
      />
      <RadioOption
        label="Nein, bitte Termin vorschlagen"
        selected={!bookingData.appointment.hasPreferredDate}
        onPress={() => updateNested('appointment', 'hasPreferredDate', false)}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
          <Text style={styles.secondaryButtonText}>Zurück</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
          <Text style={styles.primaryButtonText}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
)

// const Step3_DateTime = ({
//   bookingData,
//   updateNested,
//   prevStep,
//   nextStep,
// }: {
//   bookingData: BookingData;
//   updateNested: (parent: keyof BookingData, field: string, value: any) => void;
//   prevStep: () => void;
//   nextStep: () => void;
// }) => (

//   <ScrollView
//     style={styles.scrollView}
//     contentContainerStyle={{ paddingBottom: 40 }}
//   >
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Bevorzugter Termin</Text>
//       <Text style={styles.inputLabel}>
//         Bevorzugtes Datum (z. B. 2025-12-10)
//       </Text>
//       <TextInput
//         style={styles.textInput}
//         placeholder="YYYY-MM-DD"
//         value={bookingData.appointment.preferredDate || ""}
//         onChangeText={(v) => updateNested("appointment", "preferredDate", v)}
//       />
//       <Text style={styles.inputLabel}>Bevorzugte Uhrzeit (z. B. 11:00)</Text>
//       <TextInput
//         style={styles.textInput}
//         placeholder="HH:mm"
//         value={bookingData.appointment.preferredTime || ""}
//         onChangeText={(v) => updateNested("appointment", "preferredTime", v)}
//       />

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
//           <Text style={styles.secondaryButtonText}>Zurück</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
//           <Text style={styles.primaryButtonText}>Weiter</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </ScrollView>
// );

const Step3_DateTime = ({
  bookingData,
  updateNested,
  prevStep,
  nextStep,
}: {
  bookingData: BookingData
  updateNested: (parent: keyof BookingData, field: string, value: any) => void
  prevStep: () => void
  nextStep: () => void
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0] // YYYY-MM-DD
      updateNested('appointment', 'preferredDate', formatted)
    }
  }

  const onTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false)
    if (selectedTime) {
      const hh = String(selectedTime.getHours()).padStart(2, '0')
      const mm = String(selectedTime.getMinutes()).padStart(2, '0')
      updateNested('appointment', 'preferredTime', `${hh}:${mm}`)
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Bevorzugter Termin</Text>

        {/* Date Picker */}
        <Text style={styles.inputLabel}>Bevorzugtes Datum</Text>
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {bookingData.appointment.preferredDate || 'YYYY-MM-DD auswählen'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={
              bookingData.appointment.preferredDate
                ? new Date(bookingData.appointment.preferredDate)
                : new Date()
            }
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}

        {/* Time Picker */}
        <Text style={styles.inputLabel}>Bevorzugte Uhrzeit</Text>
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>
            {bookingData.appointment.preferredTime || 'HH:mm auswählen'}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
            <Text style={styles.secondaryButtonText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
            <Text style={styles.primaryButtonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const Step4_Personal = ({
  bookingData,
  updateNested,
  updateAddressField,
  prevStep,
  nextStep,
}: {
  bookingData: BookingData
  updateNested: (parent: keyof BookingData, field: string, value: any) => void
  updateAddressField: (field: keyof Address, value: string) => void
  prevStep: () => void
  nextStep: () => void
}) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={{ paddingBottom: 40 }}
  >
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Persönliches</Text>
      <Text style={styles.description}>
        Teilen Sie uns bitte Ihre persönlichen Daten mit und wann wir Sie am
        Besten erreichen können.
      </Text>

      <Text style={styles.inputLabel}>Vorname</Text>
      <TextInput
        style={styles.textInput}
        value={bookingData.personalInfo.firstName}
        onChangeText={(v) => updateNested('personalInfo', 'firstName', v)}
      />

      <Text style={styles.inputLabel}>Nachname</Text>
      <TextInput
        style={styles.textInput}
        value={bookingData.personalInfo.lastName}
        onChangeText={(v) => updateNested('personalInfo', 'lastName', v)}
      />

      <Text style={styles.inputLabel}>Telefon</Text>
      <TextInput
        style={styles.textInput}
        value={bookingData.personalInfo.phone}
        keyboardType="phone-pad"
        onChangeText={(v) => updateNested('personalInfo', 'phone', v)}
      />

      <Text style={styles.inputLabel}>E-Mail</Text>
      <TextInput
        style={styles.textInput}
        value={bookingData.personalInfo.email}
        keyboardType="email-address"
        onChangeText={(v) => updateNested('personalInfo', 'email', v)}
      />

      <Text style={styles.sectionTitle}>Adresse</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nr."
        value={bookingData.personalInfo.address.houseNumber}
        onChangeText={(v) => updateAddressField('houseNumber', v)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="PLZ"
        value={bookingData.personalInfo.address.zipCode}
        onChangeText={(v) => updateAddressField('zipCode', v)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Straße"
        value={bookingData.personalInfo.address.street}
        onChangeText={(v) => updateAddressField('street', v)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Ort"
        value={bookingData.personalInfo.address.city}
        onChangeText={(v) => updateAddressField('city', v)}
      />
      <Text style={styles.sectionTitle}>
        Wie wurden Sie auf uns aufmerksam?
      </Text>
      <Text>
        Wurden Sie durch Ihren Arbeitgeber auf Appclean aufmerksam, haben Sie
        uns in einer Werbung wahrgenommen oder wurden wir empfohlen? Wir freuen
        uns über eine Info hierzu!
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
          <Text style={styles.secondaryButtonText}>Zurück</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={nextStep}>
          <Text style={styles.primaryButtonText}>Weiter</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
)

const Step5_Review = ({
  bookingData,
  prevStep,
  submitBooking,
  isLoading,
}: {
  bookingData: BookingData
  prevStep: () => void
  submitBooking: () => void
  isLoading: boolean
}) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={{ paddingBottom: 40 }}
  >
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Bestätigung</Text>
      <Text style={styles.description}>
        Bitte prüfen Sie Ihre Daten und senden Sie die Anfrage ab.
      </Text>

      <Text style={styles.sectionTitle}>Reinigung</Text>
      <Text>Apartment Size: {bookingData.apartmentSize}</Text>
      <Text>Interval: {bookingData.cleaningInterval}</Text>
      <Text>Persons: {bookingData.householdSize}</Text>
      <Text>Package: {bookingData.cleaningPackage}</Text>

      <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Termin</Text>
      <Text>
        Has preferred date:{' '}
        {bookingData.appointment.hasPreferredDate ? 'Yes' : 'No'}
      </Text>
      {bookingData.appointment.hasPreferredDate && (
        <>
          <Text>Preferred Date: {bookingData.appointment.preferredDate}</Text>
          <Text>Preferred Time: {bookingData.appointment.preferredTime}</Text>
        </>
      )}

      <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Persönliches</Text>

      <Text>
        {bookingData.personalInfo.firstName} {bookingData.personalInfo.lastName}
      </Text>
      <Text>{bookingData.personalInfo.phone}</Text>
      <Text>{bookingData.personalInfo.email}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
          <Text style={styles.secondaryButtonText}>Bearbeiten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={submitBooking}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>
            {isLoading ? 'Wird gesendet...' : 'Einreichen'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
)

const Step6_Success = ({ navigation }: { navigation: any }) => (
  <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
    <Text style={styles.sectionTitle}>
      Vielen Dank — Buchungsanfrage gesendet!
    </Text>
    <Text style={styles.description}>Wir melden uns in Kürze.</Text>
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={() => navigation.navigate('Home')}
    >
      <Text style={styles.primaryButtonText}>Zurück zur Startseite</Text>
    </TouchableOpacity>
  </View>
)

export default function BuchungScreen() {
  const navigation = useNavigation<any>()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  const [bookingData, setBookingData] = useState<BookingData>({
    apartmentSize: '',
    cleaningInterval: '',
    householdSize: '',
    cleaningPackage: '',
    specialWish: '',
    appointment: {
      hasPreferredDate: false,
      preferredDate: null,
      preferredTime: null,
    },
    personalInfo: {
      salutation: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: { houseNumber: '', zipCode: '', street: '', city: '' },
      howDidYouFindUs: '',
    },
  })

  // Use useCallback to memoize the update functions
  const updateField = useCallback(
    <K extends keyof BookingData>(field: K, value: BookingData[K]) => {
      setBookingData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const updateNested = useCallback(
    (parent: keyof BookingData, field: string, value: any) => {
      setBookingData((prev) => ({
        ...prev,
        [parent]: { ...(prev as any)[parent], [field]: value },
      }))
    },
    []
  )

  const updateAddressField = useCallback(
    (field: keyof Address, value: string) => {
      setBookingData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          address: {
            ...prev.personalInfo.address,
            [field]: value,
          },
        },
      }))
    },
    []
  )

  const nextStep = () => setCurrentStep((s) => Math.min(6, s + 1))
  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1))

  const submitBooking = async () => {
    setIsLoading(true)
    try {
      const payload = {
        apartmentSize: bookingData.apartmentSize,
        cleaningInterval: bookingData.cleaningInterval,
        householdSize: Number.parseInt(bookingData.householdSize || '0'),
        cleaningPackage: { type: bookingData.cleaningPackage },
        specialWish: bookingData.specialWish,
        appointment: {
          hasPreferredDate: bookingData.appointment.hasPreferredDate,
          preferredDate: bookingData.appointment.preferredDate,
          preferredTime: bookingData.appointment.preferredTime,
        },
        personalInfo: bookingData.personalInfo,
        price: {
          perCleaning:
            bookingData.cleaningPackage === 'executive' ? 49.2 : 75.8,
          total:
            (bookingData.cleaningPackage === 'executive' ? 49.2 : 75.8) * 4,
        },
      }

      const res = await createBooking(payload)
      if (res?.data?.success) {
        setCurrentStep(6)
      } else {
        Alert.alert('Fehler', 'Server hat die Buchung nicht bestätigt.')
      }
    } catch (e) {
      console.error(e)
      Alert.alert(
        'Fehler',
        'Buchung konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            bookingData={bookingData}
            updateField={updateField}
            nextStep={nextStep}
          />
        )
      case 2:
        return (
          <Step2
            bookingData={bookingData}
            updateNested={updateNested}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )
      case 3:
        return bookingData.appointment.hasPreferredDate ? (
          <Step3_DateTime
            bookingData={bookingData}
            updateNested={updateNested}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ) : (
          <Step4_Personal
            bookingData={bookingData}
            updateNested={updateNested}
            updateAddressField={updateAddressField}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )
      case 4:
        return bookingData.appointment.hasPreferredDate ? (
          <Step4_Personal
            bookingData={bookingData}
            updateNested={updateNested}
            updateAddressField={updateAddressField}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ) : (
          <Step5_Review
            bookingData={bookingData}
            prevStep={prevStep}
            submitBooking={submitBooking}
            isLoading={isLoading}
          />
        )
      case 5:
        return (
          <Step5_Review
            bookingData={bookingData}
            prevStep={prevStep}
            submitBooking={submitBooking}
            isLoading={isLoading}
          />
        )
      case 6:
        return <Step6_Success navigation={navigation} />
      default:
        return (
          <Step1
            bookingData={bookingData}
            updateField={updateField}
            nextStep={nextStep}
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* {currentStep < 6 && (
        <Header
          title="Buchungsanfrage"
          // onBack={() => (currentStep === 1 ? navigation.goBack() : prevStep())}

          onBack={() => {
            if (currentStep === 1) {
              navigation.goBack()
            } else {
              prevStep()
            }
          }}
        />
      )} */}

      {currentStep < 6 && (
        <Header
          title="Buchungsanfrage"
          onBack={() => {
            if (currentStep === 1) {
              navigation.goBack()
            } else {
              prevStep()
            }
          }}
        />
      )}

      {renderStep()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: 18 },
  scrollView: { flex: 1 },
  container: { paddingHorizontal: 24, paddingTop: 12 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 20,
  },
  description: { color: '#374151', marginBottom: 12 },
  inputLabel: { color: '#374151', marginBottom: 8 },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  primaryButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#000', fontWeight: '600' },
})
