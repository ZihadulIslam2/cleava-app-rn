// BuchungScreen.tsx
import Header from '@/components/Header'
import PackageOption from '@/components/PackageOption'
import RadioOption from '@/components/RadioOption'
import { createBooking } from '@/services/BookingApi'
import { BookingData } from '@/types/booking'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Define Address type to fix the TypeScript error
type Address = {
  houseNumber: string
  zipCode: string
  street: string
  city: string
}

type ErrorsMap = Record<string, string>

/* ----------------------
   Step components
   - Each step receives an `errors` prop and uses `onNext`/`onPrev`
   - Wrapped in KeyboardAvoidingView where inputs exist
   ---------------------- */

const Step1 = ({
  bookingData,
  updateField,
  onNext,
  errors,
}: {
  bookingData: BookingData
  updateField: (field: keyof BookingData, value: any) => void
  onNext: () => void
  errors: ErrorsMap
}) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={80}
  >
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Reinigung</Text>
        <Text style={styles.description}>
          Die benötigte Zeit zum Reinigen Ihres Appartements orientiert sich an
          Ihrer Wohnfläche. Geben Sie uns bitte zudem an, wie oft wir Ihr
          Appartement im Monat reinigen und welche Extras Sie dazubuchen
          möchten.
        </Text>
        <Text style={styles.inputLabel}>
          AppClean ist in folgenden Städten verfügbar:
        </Text>
        <Text>Berlin, Frankfurt, Hamburg, München, Nürnberg, Stuttgart</Text>

        <Text style={styles.sectionTitle}>
          Appartement und Reinigungsintervall
        </Text>

        <Text style={styles.inputLabel}>Appartement-Größe</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['apartmentSize'] ? styles.inputErrorBorder : null,
          ]}
          placeholder="Wohnungsgröße"
          value={bookingData.apartmentSize}
          onChangeText={(v) => updateField('apartmentSize', v)}
        />
        {errors['apartmentSize'] && (
          <Text style={styles.errorText}>{errors['apartmentSize']}</Text>
        )}

        <Text style={styles.inputLabel}>Reinigungsintervall</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['cleaningInterval'] ? styles.inputErrorBorder : null,
          ]}
          placeholder="z. B. 1x/Woche"
          value={bookingData.cleaningInterval}
          onChangeText={(v) => updateField('cleaningInterval', v)}
        />
        {errors['cleaningInterval'] && (
          <Text style={styles.errorText}>{errors['cleaningInterval']}</Text>
        )}

        <Text style={styles.inputLabel}>Anzahl Personen</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['householdSize'] ? styles.inputErrorBorder : null,
          ]}
          placeholder="Anzahl Personen"
          keyboardType="numeric"
          value={bookingData.householdSize}
          onChangeText={(v) => updateField('householdSize', v)}
        />
        {errors['householdSize'] && (
          <Text style={styles.errorText}>{errors['householdSize']}</Text>
        )}

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
        {errors['cleaningPackage'] && (
          <Text style={styles.errorText}>{errors['cleaningPackage']}</Text>
        )}

        <Text style={styles.inputLabel}>Besondere Wünsche</Text>
        <TextInput
          style={[styles.textInput, { height: 90 }]}
          placeholder="Schreiben Sie hier..."
          multiline
          value={bookingData.specialWish}
          onChangeText={(v) => updateField('specialWish', v)}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { marginBottom: 30 }]}
          onPress={onNext}
        >
          <Text style={styles.primaryButtonText}>Bestätigen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
)

const Step2 = ({
  bookingData,
  updateNested,
  onPrev,
  onNext,
  errors,
}: {
  bookingData: BookingData
  updateNested: (parent: keyof BookingData, field: string, value: any) => void
  onPrev: () => void
  onNext: () => void
  errors: ErrorsMap
}) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={80}
  >
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
        {/* no field errors here usually */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onPrev}>
            <Text style={styles.secondaryButtonText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
            <Text style={styles.primaryButtonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
)

const Step3_DateTime = ({
  bookingData,
  updateNested,
  onPrev,
  onNext,
  errors,
}: {
  bookingData: BookingData
  updateNested: (parent: keyof BookingData, field: string, value: any) => void
  onPrev: () => void
  onNext: () => void
  errors: ErrorsMap
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Bevorzugter Termin</Text>

          {/* Date Picker */}
          <Text style={styles.inputLabel}>Bevorzugtes Datum</Text>
          <TouchableOpacity
            style={[
              styles.textInput,
              errors['appointment.preferredDate']
                ? styles.inputErrorBorder
                : null,
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>
              {bookingData.appointment.preferredDate || 'YYYY-MM-DD auswählen'}
            </Text>
          </TouchableOpacity>
          {errors['appointment.preferredDate'] && (
            <Text style={styles.errorText}>
              {errors['appointment.preferredDate']}
            </Text>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={
                bookingData.appointment.preferredDate
                  ? new Date(bookingData.appointment.preferredDate as string)
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
            style={[
              styles.textInput,
              errors['appointment.preferredTime']
                ? styles.inputErrorBorder
                : null,
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>
              {bookingData.appointment.preferredTime || 'HH:mm auswählen'}
            </Text>
          </TouchableOpacity>
          {errors['appointment.preferredTime'] && (
            <Text style={styles.errorText}>
              {errors['appointment.preferredTime']}
            </Text>
          )}
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
            <TouchableOpacity style={styles.secondaryButton} onPress={onPrev}>
              <Text style={styles.secondaryButtonText}>Zurück</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
              <Text style={styles.primaryButtonText}>Weiter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const Step4_Personal = ({
  bookingData,
  updateNested,
  updateAddressField,
  onPrev,
  onNext,
  errors,
}: {
  bookingData: BookingData
  updateNested: (parent: keyof BookingData, field: string, value: any) => void
  updateAddressField: (field: keyof Address, value: string) => void
  onPrev: () => void
  onNext: () => void
  errors: ErrorsMap
}) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={80}
  >
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ paddingBottom: 70 }}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Persönliches</Text>
        <Text style={styles.description}>
          Teilen Sie uns bitte Ihre persönlichen Daten mit und wann wir Sie am
          Besten erreichen können.
        </Text>

        <Text style={styles.sectionTitle}>Persönliche Daten</Text>
        <Text style={styles.inputLabel}>Anrede</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={bookingData.personalInfo.salutation || 'select'}
            onValueChange={(value) =>
              updateNested('personalInfo', 'salutation', value)
            }
            style={styles.pickerInner}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Select..." value="select" color="#888" />
            <Picker.Item label="Mr" value="Mr" color="#000" />
            <Picker.Item label="Ms" value="Ms" color="#000" />
          </Picker>
        </View>

        <Text style={styles.inputLabel}>Vorname</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.firstName'] ? styles.inputErrorBorder : null,
          ]}
          value={bookingData.personalInfo.firstName}
          onChangeText={(v) => updateNested('personalInfo', 'firstName', v)}
        />
        {errors['personalInfo.firstName'] && (
          <Text style={styles.errorText}>
            {errors['personalInfo.firstName']}
          </Text>
        )}

        <Text style={styles.inputLabel}>Nachname</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.lastName'] ? styles.inputErrorBorder : null,
          ]}
          value={bookingData.personalInfo.lastName}
          onChangeText={(v) => updateNested('personalInfo', 'lastName', v)}
        />
        {errors['personalInfo.lastName'] && (
          <Text style={styles.errorText}>
            {errors['personalInfo.lastName']}
          </Text>
        )}

        <Text style={styles.inputLabel}>Telefon</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.phone'] ? styles.inputErrorBorder : null,
          ]}
          value={bookingData.personalInfo.phone}
          keyboardType="phone-pad"
          onChangeText={(v) => updateNested('personalInfo', 'phone', v)}
        />
        {errors['personalInfo.phone'] && (
          <Text style={styles.errorText}>{errors['personalInfo.phone']}</Text>
        )}

        <Text style={styles.inputLabel}>E-Mail</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.email'] ? styles.inputErrorBorder : null,
          ]}
          value={bookingData.personalInfo.email}
          keyboardType="email-address"
          onChangeText={(v) => updateNested('personalInfo', 'email', v)}
        />
        {errors['personalInfo.email'] && (
          <Text style={styles.errorText}>{errors['personalInfo.email']}</Text>
        )}

        <Text style={styles.sectionTitle}>Adresse</Text>
        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.address.houseNumber']
              ? styles.inputErrorBorder
              : null,
          ]}
          placeholder="Nr."
          value={bookingData.personalInfo.address.houseNumber}
          onChangeText={(v) => updateAddressField('houseNumber', v)}
        />
        {errors['personalInfo.address.houseNumber'] && (
          <Text style={styles.errorText}>
            {errors['personalInfo.address.houseNumber']}
          </Text>
        )}

        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.address.zipCode']
              ? styles.inputErrorBorder
              : null,
          ]}
          placeholder="PLZ"
          value={bookingData.personalInfo.address.zipCode}
          onChangeText={(v) => updateAddressField('zipCode', v)}
        />
        {errors['personalInfo.address.zipCode'] && (
          <Text style={styles.errorText}>
            {errors['personalInfo.address.zipCode']}
          </Text>
        )}

        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.address.street']
              ? styles.inputErrorBorder
              : null,
          ]}
          placeholder="Straße"
          value={bookingData.personalInfo.address.street}
          onChangeText={(v) => updateAddressField('street', v)}
        />
        {errors['personalInfo.address.street'] && (
          <Text style={styles.errorText}>
            {errors['personalInfo.address.street']}
          </Text>
        )}

        <TextInput
          style={[
            styles.textInput,
            errors['personalInfo.address.city']
              ? styles.inputErrorBorder
              : null,
          ]}
          placeholder="Ort"
          value={bookingData.personalInfo.address.city}
          onChangeText={(v) => updateAddressField('city', v)}
        />
        {errors['personalInfo.address.city'] && (
          <Text style={styles.errorText}>
            {errors['personalInfo.address.city']}
          </Text>
        )}

        <Text style={styles.sectionTitle}>
          Wie wurden Sie auf uns aufmerksam?
        </Text>
        <Text>
          Wurden Sie durch Ihren Arbeitgeber auf Appclean aufmerksam, haben Sie
          uns in einer Werbung wahrgenommen oder wurden wir empfohlen? Wir
          freuen uns über eine Info hierzu!
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onPrev}>
            <Text style={styles.secondaryButtonText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onNext}>
            <Text style={styles.primaryButtonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
)

const Step5_Review = ({
  bookingData,
  onPrev,
  submitBooking,
  isLoading,
}: {
  bookingData: BookingData
  onPrev: () => void
  submitBooking: () => void
  isLoading: boolean
}) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={80}
  >
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

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>
          Persönliches
        </Text>

        <Text>
          {bookingData.personalInfo.firstName}{' '}
          {bookingData.personalInfo.lastName}
        </Text>
        <Text>{bookingData.personalInfo.phone}</Text>
        <Text>{bookingData.personalInfo.email}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onPrev}>
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
  </KeyboardAvoidingView>
)

const Step6_Success = ({ navigation }: { navigation: any }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      backgroundColor: '#F9FAFB',
    }}
  >
    <Text
      style={{
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 16,
      }}
    >
      Vielen Dank für Ihre Buchungsanfrage!
    </Text>

    <Text
      style={{
        fontSize: 16,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
      }}
    >
      Ihre Daten wurden an uns übermittelt und werden jetzt bearbeitet. Eine
      Bestätigung Ihrer Buchung, sowie weitere Informationen werden Ihnen in
      Kürze zugeschickt.
    </Text>

    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={{
        backgroundColor: '#111827',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        Zurück zur Startseite
      </Text>
    </TouchableOpacity>
  </View>
)

/* ----------------------
   Main screen
   ---------------------- */

export default function BuchungScreen() {
  const navigation = useNavigation<any>()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState<ErrorsMap>({})

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

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  // update functions also clear related field errors
  const updateField = useCallback(
    <K extends keyof BookingData>(field: K, value: BookingData[K]) => {
      setBookingData((prev) => ({ ...prev, [field]: value }))
      clearError(String(field))
    },
    [clearError]
  )

  const updateNested = useCallback(
    (parent: keyof BookingData, field: string, value: any) => {
      setBookingData((prev) => ({
        ...prev,
        [parent]: { ...(prev as any)[parent], [field]: value },
      }))
      clearError(`${String(parent)}.${field}`)
    },
    [clearError]
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
      clearError(`personalInfo.address.${String(field)}`)
    },
    [clearError]
  )

  const nextStep = () => setCurrentStep((s) => Math.min(6, s + 1))
  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1))

  /* ----------------------
     Validation helpers
     - validation messages in German
     ---------------------- */

  const isValidEmail = (email?: string) =>
    !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())

  const validateStep = (step: number): ErrorsMap => {
    const e: ErrorsMap = {}

    if (step === 1) {
      if (
        !bookingData.apartmentSize ||
        bookingData.apartmentSize.trim() === ''
      ) {
        e['apartmentSize'] = 'Bitte Wohnungsgröße angeben.'
      }
      if (
        !bookingData.cleaningInterval ||
        bookingData.cleaningInterval.trim() === ''
      ) {
        e['cleaningInterval'] = 'Bitte Reinigungsintervall angeben.'
      }
      if (
        !bookingData.householdSize ||
        bookingData.householdSize.trim() === ''
      ) {
        e['householdSize'] = 'Bitte Anzahl Personen angeben.'
      } else if (!/^\d+$/.test(bookingData.householdSize.trim())) {
        e['householdSize'] = 'Bitte eine gültige Zahl eingeben.'
      } else if (parseInt(bookingData.householdSize, 10) <= 0) {
        e['householdSize'] = 'Anzahl Personen muss größer als 0 sein.'
      }
      if (!bookingData.cleaningPackage) {
        e['cleaningPackage'] = 'Bitte ein Paket auswählen.'
      }
    }

    if (step === 3) {
      if (bookingData.appointment.hasPreferredDate) {
        if (!bookingData.appointment.preferredDate) {
          e['appointment.preferredDate'] = 'Bitte Datum auswählen.'
        }
        if (!bookingData.appointment.preferredTime) {
          e['appointment.preferredTime'] = 'Bitte Uhrzeit auswählen.'
        }
      }
    }

    if (step === 4) {
      if (
        !bookingData.personalInfo.firstName ||
        bookingData.personalInfo.firstName.trim() === ''
      ) {
        e['personalInfo.firstName'] = 'Bitte Vorname angeben.'
      }
      if (
        !bookingData.personalInfo.lastName ||
        bookingData.personalInfo.lastName.trim() === ''
      ) {
        e['personalInfo.lastName'] = 'Bitte Nachname angeben.'
      }
      if (
        !bookingData.personalInfo.phone ||
        bookingData.personalInfo.phone.trim() === ''
      ) {
        e['personalInfo.phone'] = 'Bitte Telefonnummer angeben.'
      }
      if (!isValidEmail(bookingData.personalInfo.email)) {
        e['personalInfo.email'] = 'Bitte gültige E-Mail-Adresse angeben.'
      }
      // address
      if (
        !bookingData.personalInfo.address.houseNumber ||
        bookingData.personalInfo.address.houseNumber.trim() === ''
      ) {
        e['personalInfo.address.houseNumber'] = 'Bitte Hausnummer angeben.'
      }
      if (
        !bookingData.personalInfo.address.zipCode ||
        bookingData.personalInfo.address.zipCode.trim() === ''
      ) {
        e['personalInfo.address.zipCode'] = 'Bitte PLZ angeben.'
      }
      if (
        !bookingData.personalInfo.address.street ||
        bookingData.personalInfo.address.street.trim() === ''
      ) {
        e['personalInfo.address.street'] = 'Bitte Straße angeben.'
      }
      if (
        !bookingData.personalInfo.address.city ||
        bookingData.personalInfo.address.city.trim() === ''
      ) {
        e['personalInfo.address.city'] = 'Bitte Ort angeben.'
      }
    }

    // You can add more validations for other steps if needed.

    return e
  }

  // Validates current step and moves forward only if ok
  const handleNext = () => {
    const errs = validateStep(
      currentStep === 3 && !bookingData.appointment.hasPreferredDate
        ? 4
        : currentStep
    )
    // Note: your original flow sometimes jumps step 3 -> 4 depending on hasPreferredDate.
    // In case the current step is 3 but user chose "no preferred date", Step3 UI is skipped and Step4 is shown.
    // We handle validation by mapping accordingly above.
    if (Object.keys(errs).length > 0) {
      setErrors((prev) => ({ ...prev, ...errs }))
      // scroll to top would be nice — left out for simplicity
      return
    }
    // clear step-related errors
    setErrors((prev) => {
      const copy = { ...prev }
      Object.keys(errs).forEach((k) => delete copy[k])
      return copy
    })
    nextStep()
  }

  // Validate everything before final submit
  const validateAll = (): ErrorsMap => {
    const allErrors: ErrorsMap = {}
    // run through steps 1 and 4 and 3 (if hasPreferredDate)
    Object.assign(allErrors, validateStep(1))
    if (bookingData.appointment.hasPreferredDate) {
      Object.assign(allErrors, validateStep(3))
    }
    Object.assign(allErrors, validateStep(4))
    return allErrors
  }

  const submitBooking = async () => {
    // validate everything before sending
    const allErrs = validateAll()
    if (Object.keys(allErrs).length > 0) {
      setErrors((prev) => ({ ...prev, ...allErrs }))
      Alert.alert('Fehler', 'Bitte korrigieren Sie die markierten Felder.')
      return
    }

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
            onNext={handleNext}
            errors={errors}
          />
        )
      case 2:
        return (
          <Step2
            bookingData={bookingData}
            updateNested={updateNested}
            onPrev={() => {
              setErrors({})
              prevStep()
            }}
            onNext={() => {
              // Step 2 has no required inputs (it's a radio); simply move forward
              setErrors({})
              nextStep()
            }}
            errors={errors}
          />
        )
      case 3:
        return bookingData.appointment.hasPreferredDate ? (
          <Step3_DateTime
            bookingData={bookingData}
            updateNested={updateNested}
            onPrev={() => {
              setErrors({})
              prevStep()
            }}
            onNext={() => {
              // validate step 3
              const errs = validateStep(3)
              if (Object.keys(errs).length > 0) {
                setErrors((prev) => ({ ...prev, ...errs }))
                return
              }
              setErrors({})
              nextStep()
            }}
            errors={errors}
          />
        ) : (
          <Step4_Personal
            bookingData={bookingData}
            updateNested={updateNested}
            updateAddressField={updateAddressField}
            onPrev={() => {
              setErrors({})
              prevStep()
            }}
            onNext={() => {
              const errs = validateStep(4)
              if (Object.keys(errs).length > 0) {
                setErrors((prev) => ({ ...prev, ...errs }))
                return
              }
              setErrors({})
              nextStep()
            }}
            errors={errors}
          />
        )
      case 4:
        return bookingData.appointment.hasPreferredDate ? (
          <Step4_Personal
            bookingData={bookingData}
            updateNested={updateNested}
            updateAddressField={updateAddressField}
            onPrev={() => {
              setErrors({})
              prevStep()
            }}
            onNext={() => {
              const errs = validateStep(4)
              if (Object.keys(errs).length > 0) {
                setErrors((prev) => ({ ...prev, ...errs }))
                return
              }
              setErrors({})
              nextStep()
            }}
            errors={errors}
          />
        ) : (
          <Step5_Review
            bookingData={bookingData}
            onPrev={() => {
              setErrors({})
              prevStep()
            }}
            submitBooking={submitBooking}
            isLoading={isLoading}
          />
        )
      case 5:
        return (
          <Step5_Review
            bookingData={bookingData}
            onPrev={() => {
              setErrors({})
              prevStep()
            }}
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
            onNext={handleNext}
            errors={errors}
          />
        )
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        // style={styles.scrollView}
        contentContainerStyle={styles.containerforKeyboard}
        extraScrollHeight={0} // ⬅️ pushes input a bit more above keyboard
        enableOnAndroid={true} // ⬅️ important for Android
        keyboardShouldPersistTaps="handled"
      >
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden', // keep rounded corners
  },
  pickerInner: {
    height: 50,
    width: '100%',
    color: '#000',
    paddingHorizontal: 12, // move padding here
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  containerforKeyboard: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
    marginBottom: 8,
  },
  inputErrorBorder: {
    borderColor: '#dc2626', // red border when error
  },
  errorText: { color: '#dc2626', marginBottom: 8 }, // red text
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  primaryButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonSuccesspage: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24, // optional, makes button wider
    alignItems: 'center',
    alignSelf: 'center', // center the button horizontally
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
