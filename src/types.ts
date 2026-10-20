export interface DentalService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  iconName: string;
  duration: string;
  recommendedFor: string[];
  benefits: string[];
  popular?: boolean;
}

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  bio: string;
  specialties: string[];
  schedule: string;
}

export interface ClinicTiming {
  day: string;
  morning: string;
  evening: string;
  status: 'regular' | 'appointment-only' | 'closed';
}

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  service: string;
  doctorPreference: string;
  preferredDate: string;
  preferredSlot: string;
  notes: string;
}
