// types/booking.ts
export interface Address {
  houseNumber: string;
  zipCode: string;
  street: string;
  city: string;
}

export interface PersonalInfo {
  salutation?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: Address;
  howDidYouFindUs?: string;
}

export interface Appointment {
  hasPreferredDate: boolean;
  preferredDate?: string | null; // ISO or plain string
  preferredTime?: string | null;
}

export interface BookingData {
  apartmentSize: string;
  cleaningInterval: string;
  householdSize: string;
  cleaningPackage: string;
  specialWish: string;
  appointment: Appointment;
  personalInfo: PersonalInfo;
}
