export interface Doctor {
  id: string;
  name: string;
  degree: string;
  college: string;
  experience: string;
  specialties: string[];
  bio: string;
  avatarColor: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge?: string;
  isNewRequested?: boolean;
  shortDescription: string;
  features: string[];
  iconName: string;
  category: 'Speciality' | 'Preventive' | 'Restorative' | 'Cosmetic';
}

export interface FacilityItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  keyBenefits: string[];
  imageSrc: string;
  imageCaption: string;
}

export interface ClinicPhoto {
  id: string;
  title: string;
  category: 'Exterior' | 'Operatory' | 'Technology';
  imageSrc: string;
  description: string;
  highlight: string;
}

export interface TransformationCase {
  id: string;
  title: string;
  category: 'Fracture Repair' | 'Space Closure' | 'Tooth Replacement' | 'Enamel & Occlusion';
  imageSrc: string;
  isPair: boolean;
  pairType?: 'side-by-side' | 'top-bottom' | 'multi-panel';
  beforeLabel?: string;
  afterLabel?: string;
  description: string;
  clinicalNote: string;
}
