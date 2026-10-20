import { DentalService, DoctorProfile, ClinicTiming, AppointmentFormData } from '../types';

export const CLINIC_INFO = {
  name: 'Malligai Dental Care',
  tagline: 'Recover Your Lovely Smile!',
  phone: '97900 60801',
  phoneFormatted: '+91 97900 60801',
  phoneHref: 'tel:9790060801',
  whatsappHref: 'https://wa.me/919790060801',
  address: 'No. 71-1/27A, Jawaharlal Nehru Road, opposite Muthusamy Park, Sengottai – 627 809',
  city: 'Sengottai',
  district: 'Tenkasi District',
  state: 'Tamil Nadu',
  pincode: '627 809',
  landmark: 'Opposite Muthusamy Park',
  googleMapsQuery: 'No. 71-1/27A, Jawaharlal Nehru Road, opposite Muthusamy Park, Sengottai, Tamil Nadu 627809',
  googleMapsEmbed: 'https://maps.google.com/maps?q=Jawaharlal+Nehru+Road+Muthusamy+Park+Sengottai+627809&t=&z=16&ie=UTF8&iwloc=&output=embed',
  timings: {
    morning: '10:00 AM to 2:00 PM',
    evening: '5:00 PM to 8:30 PM',
    sunday: 'Appointment only',
  },
};

export const SERVICES: DentalService[] = [
  {
    id: 'teeth-cleaning',
    title: 'Teeth Cleaning & Polishing',
    tagline: 'Professional scaling and ultrasonic plaque removal',
    description: 'Gentle ultrasonic scaling to eliminate hardened tartar, stains, and plaque buildup for healthier gums and fresher breath.',
    longDescription: 'Regular teeth cleaning removes calculus and bacterial biofilm that ordinary brushing cannot reach. Our gentle ultrasonic technology protects delicate enamel while polishing teeth to their natural smoothness.',
    iconName: 'Sparkles',
    duration: '30 - 45 mins',
    popular: true,
    recommendedFor: ['Gum bleeding or swelling', 'Tea, coffee, or tobacco stains', 'Routine 6-month preventive care', 'Persistent bad breath'],
    benefits: ['Prevents gingivitis and periodontitis', 'Removes surface discoloration safely', 'Smooths enamel to resist new plaque', 'Pain-free, comfortable procedure'],
  },
  {
    id: 'root-canal',
    title: 'Root Canal Treatment (RCT)',
    tagline: 'Pain-free preservation of infected teeth',
    description: 'Advanced rotary endodontics to alleviate toothache, remove infected pulp, and save your natural tooth without extraction.',
    longDescription: 'When decay reaches the tooth pulp, root canal therapy saves the natural root structure. Using computerized rotary instruments and digital apex locators, we perform precise, pain-free treatments often completed in single or few comfortable visits.',
    iconName: 'ShieldCheck',
    duration: '45 - 60 mins',
    popular: true,
    recommendedFor: ['Severe throbbing toothache', 'Sensitivity to hot and cold liquids', 'Swelling or tenderness in surrounding gums', 'Deep tooth cavities touching nerve'],
    benefits: ['Immediate relief from acute tooth pain', 'Saves natural tooth structure for chewing', 'Prevents infection spreading to jawbone', 'Modern anesthesia ensures a painless experience'],
  },
  {
    id: 'braces-aligners',
    title: 'Braces & Clear Aligners',
    tagline: 'Straighter teeth and balanced facial alignment',
    description: 'Custom orthodontic solutions including conventional metal braces, ceramic tooth-colored braces, and invisible clear aligners.',
    longDescription: 'Orthodontic therapy corrects misaligned, crowded, or spaced teeth for teenagers and adults. We provide detailed smile evaluations and gentle tooth movement programs for long-term bite function and aesthetics.',
    iconName: 'Smile',
    duration: 'Consultation & monthly checks',
    recommendedFor: ['Crowded or overlapping teeth', 'Gaps between front teeth', 'Overbite, underbite, or crossbite', 'Adults seeking discreet alignment'],
    benefits: ['Significantly improves bite balance and chewing', 'Discreet aesthetic ceramic & aligner options', 'Easier oral hygiene with aligned teeth', 'Lifelong confident, harmonious smile'],
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    tagline: 'Permanent, natural-looking tooth replacement',
    description: 'Biocompatible titanium fixtures surgically placed to anchor natural crowns, restoring chewing strength and complete smile aesthetics.',
    longDescription: 'Dental implants are the gold standard for missing teeth. Unlike removable dentures or bridges that require cutting adjacent teeth, implants preserve jawbone density and feel identical to natural teeth.',
    iconName: 'Activity',
    duration: 'Consultation + procedure stages',
    popular: true,
    recommendedFor: ['Single or multiple missing teeth', 'Loose, uncomfortable dentures', 'Preventing jaw bone shrinkage after extraction', 'Desire for fixed, permanent replacement'],
    benefits: ['Restores 100% natural chewing force', 'Preserves adjacent healthy teeth', 'Prevents facial sagging and bone loss', 'High durability designed to last decades'],
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening & Smile Makeover',
    tagline: 'Radiant, stain-free smile enhancement',
    description: 'In-clinic cosmetic enamel brightening and aesthetic bonding to correct discolorations, chips, and smile imperfections.',
    longDescription: 'Our medical-grade teeth whitening system lifts stubborn organic stains from enamel safely without eroding the tooth surface. We also offer composite veneers and aesthetic restorations for special occasions and weddings.',
    iconName: 'Sun',
    duration: '45 - 60 mins',
    recommendedFor: ['Yellowed or discolored teeth', 'Bridal & special event smile preparation', 'Chipped or worn incisal edges', 'Fluorosis or age-related staining'],
    benefits: ['Noticeably brighter smile in a single session', 'Enamel-safe, pH-balanced formulation', 'Minimal post-treatment sensitivity', 'Long-lasting natural luster'],
  },
  {
    id: 'pediatric-preventive',
    title: 'Pediatric & Family Dentistry',
    tagline: 'Gentle, fear-free care for children & seniors',
    description: 'Friendly, patient pediatric visits including fluoride protection, pit-and-fissure sealants, habit breaking, and geriatric dental care.',
    longDescription: 'We take special care of young patients and elderly family members with a gentle, reassuring environment. From child milk tooth preservation to complete dentures for seniors, the whole family is welcomed with warmth.',
    iconName: 'HeartHandshake',
    duration: '30 - 45 mins',
    recommendedFor: ['Children with first cavities or toothache', 'Preventive cavity sealing for molars', 'Elderly patients needing dentures', 'Routine whole-family dental checkups'],
    benefits: ['Zero-fear, friendly chairside demeanor', 'Strong foundation for child dental health', 'Specialized gentle handling for seniors', 'Personalized oral hygiene counseling'],
  },
];

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'dr-r-patrajan',
    name: 'Dr. R. Patrajan',
    role: 'Senior Dental Surgeon & Clinic Co-Founder',
    qualifications: 'B.D.S. — Dental Surgeon',
    experience: 'Over a decade of dedicated clinical practice in Sengottai',
    bio: 'Dr. R. Patrajan is dedicated to providing high-quality, ethical, and gentle dental care to the community of Sengottai and surrounding regions. His clinical focus includes complex root canal therapies, restorative dentistry, and painless tooth extractions with a calm, patient-first approach.',
    specialties: ['Endodontics & Root Canal Treatment', 'Restorative Dentistry', 'Painless Tooth Extraction', 'Oral Diagnosis & Treatment Planning'],
    schedule: 'Morning: 10:00 AM – 2:00 PM | Evening: 5:00 PM – 8:30 PM',
  },
  {
    id: 'dr-t-sankari-patrajan',
    name: 'Dr. T. Sankari Patrajan',
    role: 'Dental Surgeon & Cosmetic Dental Specialist',
    qualifications: 'B.D.S. — Dental Surgeon',
    experience: 'Expert in aesthetic smile restoration & preventive dental care',
    bio: 'Dr. T. Sankari Patrajan brings meticulous precision and artistic finesse to cosmetic dentistry, smile design, and pediatric dental care. Known for her gentle touch with nervous patients and children, she believes that comfortable visits create confident lifelong smiles.',
    specialties: ['Cosmetic Smile Designing', 'Teeth Whitening & Aesthetic Restorations', 'Pediatric & Preventive Dentistry', 'Gum Health & Periodontal Care'],
    schedule: 'Morning: 10:00 AM – 2:00 PM | Evening: 5:00 PM – 8:30 PM',
  },
];

export const CLINIC_TIMINGS_LIST: ClinicTiming[] = [
  { day: 'Monday', morning: '10:00 AM – 2:00 PM', evening: '5:00 PM – 8:30 PM', status: 'regular' },
  { day: 'Tuesday', morning: '10:00 AM – 2:00 PM', evening: '5:00 PM – 8:30 PM', status: 'regular' },
  { day: 'Wednesday', morning: '10:00 AM – 2:00 PM', evening: '5:00 PM – 8:30 PM', status: 'regular' },
  { day: 'Thursday', morning: '10:00 AM – 2:00 PM', evening: '5:00 PM – 8:30 PM', status: 'regular' },
  { day: 'Friday', morning: '10:00 AM – 2:00 PM', evening: '5:00 PM – 8:30 PM', status: 'regular' },
  { day: 'Saturday', morning: '10:00 AM – 2:00 PM', evening: '5:00 PM – 8:30 PM', status: 'regular' },
  { day: 'Sunday', morning: 'Appointment Only', evening: 'Appointment Only', status: 'appointment-only' },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Hospital-Grade Sterilization',
    description: 'Every reusable instrument undergoes multi-stage ultrasonic cleaning and medical autoclaving, with single-use consumables for 100% patient hygiene.',
    icon: 'Shield',
  },
  {
    title: 'Gentle & Painless Dentistry',
    description: 'We prioritize patient comfort with gentle techniques, modern topical numbing, and empathetic explanations before each procedure.',
    icon: 'SmilePlus',
  },
  {
    title: 'Experienced Resident Dentists',
    description: 'Personalized care directly by Dr. R. Patrajan and Dr. T. Sankari Patrajan, ensuring continuity of treatment without rotation.',
    icon: 'UserCheck',
  },
  {
    title: 'Transparent & Ethical Advice',
    description: 'Clear diagnostic explanations with no unnecessary procedures. We explain every option so you make informed choices for your smile.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Accessible Sengottai Location',
    description: 'Conveniently situated on Jawaharlal Nehru Road directly opposite Muthusamy Park, with easy access and patient parking.',
    icon: 'MapPin',
  },
  {
    title: 'Morning & Evening Sessions',
    description: 'Flexible operating hours (10 AM - 2 PM and 5 PM - 8:30 PM) designed around school, office, and agricultural schedules.',
    icon: 'Clock',
  },
];

export function createWhatsAppAppointmentUrl(data: Partial<AppointmentFormData>): string {
  const parts: string[] = [
    `*Appointment Enquiry - Malligai Dental Care*`,
    `Patient Name: ${data.fullName || 'Not specified'}`,
    `Contact Phone: ${data.phoneNumber || 'Not specified'}`,
    `Treatment / Service: ${data.service || 'General Dental Consultation'}`,
  ];

  if (data.doctorPreference) {
    parts.push(`Preferred Doctor: ${data.doctorPreference}`);
  }
  if (data.preferredDate) {
    parts.push(`Preferred Date: ${data.preferredDate}`);
  }
  if (data.preferredSlot) {
    parts.push(`Preferred Time Slot: ${data.preferredSlot}`);
  }
  if (data.notes) {
    parts.push(`Brief Dental Concern: ${data.notes}`);
  }

  parts.push(`\nHello Doctor, I would like to confirm availability for this appointment slot. Thank you!`);

  const encodedText = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/919790060801?text=${encodedText}`;
}
