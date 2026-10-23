import { Doctor, ServiceItem, FacilityItem, ClinicPhoto, TransformationCase } from '../types';

export const CLINIC_INFO = {
  name: 'Malligai Dental Care',
  tagline: 'Multi-Speciality Dental Clinic & Advanced Implant Centre',
  phone: '97900 60801',
  formattedPhone: '+91 97900 60801',
  telLink: 'tel:+919790060801',
  whatsapp: '919790060801',
  whatsappLink: 'https://wa.me/919790060801',
  defaultWhatsappMessage: 'Hello Malligai Dental Care, I would like to enquire about a dental appointment.',
  whatsappEnquiryUrl: 'https://wa.me/919790060801?text=Hello%20Malligai%20Dental%20Care%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment.',
  address: 'No. 71-1/27A, Jawaharlal Nehru Road, Opposite Muthusamy Park, Sengottai – 627 809, Tamil Nadu, India',
  shortAddress: 'No. 71-1/27A, Jawaharlal Nehru Road, Opposite Muthusamy Park, Sengottai – 627 809',
  landmark: 'Opposite Muthusamy Park',
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=No.%2071-1%2F27A%2C%20Jawaharlal%20Nehru%20Road%2C%20Opposite%20Muthusamy%20Park%2C%20Sengottai%20627809%2C%20Tamil%20Nadu%2C%20India",
  mapsEmbedUrl: 'https://maps.google.com/maps?q=No.%2071-1%2F27A%2C%20Jawaharlal%20Nehru%20Road%2C%20Opposite%20Muthusamy%20Park%2C%20Sengottai%20627809%2C%20Tamil%20Nadu%2C%20India&z=17&output=embed',
  email: 'malligaidentalcare@gmail.com',
  workingHours: [
    { days: 'Monday – Saturday', morning: '9:30 AM – 1:30 PM', evening: '4:30 PM – 9:00 PM' },
    { days: 'Sunday', morning: '10:00 AM – 1:00 PM (By Appointment)', evening: 'Closed' }
  ],
  yearsOfExcellence: '16+',
  patientsTreated: '30K+'
};

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-patrajan',
    name: 'Dr. R. Patrajan',
    degree: 'BDS',
    college: 'S.A. Rajas Dental College',
    experience: '16 years of clinical experience',
    specialties: ['Implantology', 'Full Mouth Rehabilitation', 'Surgical Extractions', 'Cosmetic Dentistry'],
    bio: 'Dedicated dental surgeon with over 16 years of hands-on clinical experience delivering compassionate, precision oral healthcare with advanced surgical and restorative methodologies.',
    avatarColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'dr-sankari-patrajan',
    name: 'Dr. T. Sankari Patrajan',
    degree: 'BDS',
    college: 'Saveetha Dental College, Chennai',
    experience: '14 years of clinical experience',
    specialties: ['Smile Design', 'Endodontics & RCT', 'Preventive Dentistry', 'BPS Prosthetics'],
    bio: 'Experienced dental surgeon with 14 years of clinical expertise from Saveetha Dental College, Chennai, specializing in aesthetic smile design, restorative dentistry, and painless treatment protocols.',
    avatarColor: 'from-teal-600 to-cyan-700'
  }
];

export const SERVICES: ServiceItem[] = [
  // Four specifically requested treatments highlighted
  {
    id: 'smile-design',
    title: 'Smile Design',
    badge: 'Speciality Treatment',
    isNewRequested: true,
    category: 'Cosmetic',
    shortDescription: 'Digital aesthetic smile analysis and customized cosmetic enhancements tailored to facial harmony, tooth proportion, and natural translucency.',
    features: [
      'Digital facial aesthetic proportion assessment',
      'Porcelain & composite laminate veneers',
      'Minimally invasive enamel contouring',
      'Comprehensive harmony between gums and teeth'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'bps-dentures',
    title: 'BPS Dentures',
    badge: 'Precision Prosthetics',
    isNewRequested: true,
    category: 'Restorative',
    shortDescription: 'Biofunctional Prosthetic System dentures engineered using precision impression techniques for superior suction stability, comfort, and effortless chewing.',
    features: [
      'High-precision continuous pressure injection molding',
      'Optimal retention without loose slippage',
      'Lifelike aesthetic tooth shades and gum shades',
      'Customized occlusal alignment for natural chewing'
    ],
    iconName: 'ShieldCheck'
  },
  {
    id: 'painless-wisdom-tooth-removal',
    title: 'Painless Wisdom Tooth Removal',
    badge: 'Gentle Oral Surgery',
    isNewRequested: true,
    category: 'Speciality',
    shortDescription: 'Modern surgical extraction techniques utilizing targeted local anesthesia and digital radiographic assessment to minimize surgical trauma and facilitate swift healing.',
    features: [
      'Pre-surgical digital radiographic nerve mapping',
      'Targeted, gentle local anesthetic delivery',
      'Minimally invasive flap and atraumatic extraction',
      'Comprehensive post-operative recovery guidance'
    ],
    iconName: 'Activity'
  },
  {
    id: 'full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation',
    badge: 'Comprehensive Restoration',
    isNewRequested: true,
    category: 'Restorative',
    shortDescription: 'Comprehensive reconstructive treatment plan designed to systematically restore severely worn, broken, or missing teeth for optimal bite balance and long-term oral health.',
    features: [
      'Digital occlusal analysis and vertical dimension restoration',
      'Combination of crowns, bridges, and dental implants',
      'Re-establishment of comfortable jaw joint (TMJ) position',
      'Durable ceramic materials for long-lasting function'
    ],
    iconName: 'Layers'
  },
  // Core established clinic treatments
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment (RCT)',
    badge: 'Tooth Preservation',
    category: 'Restorative',
    shortDescription: 'Single-sitting rotary endodontic treatments to save infected or deeply decayed teeth with minimal discomfort and high precision.',
    features: [
      'Apex locator precision canal measurement',
      'Rotary nickel-titanium instrumentation',
      'Hermetic root canal sealing',
      'Protective ceramic or zirconia crown placement'
    ],
    iconName: 'Zap'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    badge: 'Permanent Replacement',
    category: 'Restorative',
    shortDescription: 'Biocompatible titanium dental implants providing strong, natural-feeling tooth replacements that preserve healthy jawbone structure.',
    features: [
      'Direct root replacement in bone',
      'Single tooth, multiple teeth, or full arch solutions',
      'Restores 100% natural chewing strength',
      'Preserves adjacent natural teeth without grinding'
    ],
    iconName: 'Anchor'
  },
  {
    id: 'clear-aligners-ortho',
    title: 'Clear Aligners & Braces',
    badge: 'Orthodontics',
    category: 'Cosmetic',
    shortDescription: 'Discreet orthodontic correction for crooked teeth, gaps, and malocclusion using transparent aligners and modern aesthetic brackets.',
    features: [
      'Virtually invisible removable aligner trays',
      'Custom 3D scanned treatment roadmap',
      'Comfortable with no dietary restrictions',
      'Traditional ceramic & metal braces available'
    ],
    iconName: 'Smile'
  },
  {
    id: 'teeth-whitening-cleaning',
    title: 'Scaling & Advanced Whitening',
    badge: 'Preventive & Aesthetics',
    category: 'Preventive',
    shortDescription: 'Ultrasonic scaling for plaque and tartar removal combined with clinic-grade enamel-safe whitening for a refreshed, sparkling smile.',
    features: [
      'Gentle ultrasonic tartar and stain removal',
      'Enamel polish and deep fluoride protection',
      'Safe in-office shade lightening',
      'Periodontal gum pocket assessment'
    ],
    iconName: 'HeartPulse'
  }
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'intraoral-scanner',
    name: 'Intraoral Scanner',
    badge: 'Cutting-Edge 3D Technology',
    description: 'Our state-of-the-art 3D intraoral digital scanner eliminates unpleasant, messy silicone impression trays. By gently capturing thousands of optical frames per second, it renders an instantaneous, ultra-precise 3D digital model of your teeth and gums on our clinic workstation screen.',
    keyBenefits: [
      'Zero gag reflex — no gooey impression putty',
      'Sub-millimeter accuracy for crowns, bridges, and clear aligners',
      'Instant real-time 3D visualization on high-definition monitor',
      'Significantly faster laboratory turnaround times'
    ],
    imageSrc: '/assets/aistudio/Media__10__025fdfb0.jpg',
    imageCaption: 'Real photo: Our clinic intraoral scanner digital workstation and high-precision scanning wand'
  },
  {
    id: 'digital-x-ray',
    name: 'Digital X-ray (RVG)',
    badge: 'Low-Radiation Imaging',
    description: 'Equipped with modern wall-mounted digital radiovisiography (RVG) systems, our operatory provides instant, crystal-clear radiographic images on demand while reducing patient radiation exposure by up to 80% compared to traditional film X-rays.',
    keyBenefits: [
      'Up to 80% lower radiation exposure for patient safety',
      'Instant high-contrast diagnostic view within seconds',
      'High-zoom magnification for detecting hidden root infections',
      'Environmentally friendly with zero chemical film processing'
    ],
    imageSrc: '/assets/aistudio/Media__8__cfd46503.jpg',
    imageCaption: 'Real photo: Our clinic treatment operatory equipped with wall-mounted Digital X-ray unit'
  }
];

export const CLINIC_PHOTOS: ClinicPhoto[] = [
  {
    id: 'photo-exterior',
    title: 'Clinic Exterior & Entrance',
    category: 'Exterior',
    imageSrc: '/assets/aistudio/Media__9__c31e93b0.jpg',
    description: 'Modern two-story clinic facade with illuminated Malligai Dental sign, welcoming entrance arch, and easy patient accessibility.',
    highlight: 'Real Exterior Photo'
  },
  {
    id: 'photo-chair-suite',
    title: 'Modern Dental Chair & Treatment Suite',
    category: 'Operatory',
    imageSrc: '/assets/aistudio/Media__11__8fff19b4.jpg',
    description: 'Spacious operatory featuring premium wood fluted paneling, motorized ergonomic dental chair, medical-grade lighting, and hygienic storage.',
    highlight: 'Main Treatment Operatory'
  },
  {
    id: 'photo-intraoral-scanner',
    title: 'Intraoral 3D Scanner Workstation',
    category: 'Technology',
    imageSrc: '/assets/aistudio/Media__10__025fdfb0.jpg',
    description: 'Advanced mobile digital dental cart with ergonomic handheld 3D scanning wand, laptop interface, and real-time CAD/CAM workflow.',
    highlight: 'Advanced Dental Facility'
  },
  {
    id: 'photo-digital-xray-room',
    title: 'Operatory with Digital X-Ray System',
    category: 'Technology',
    imageSrc: '/assets/aistudio/Media__8__cfd46503.jpg',
    description: 'Equipped treatment room with articulated wall-mounted digital radiographic arm, patient treatment chair, and infection-control surfaces.',
    highlight: 'Low-Radiation Digital RVG'
  }
];

export const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: 'case-fracture-repair',
    title: 'Fractured Incisor Restoration & Smile Rejuvenation',
    category: 'Fracture Repair',
    imageSrc: '/assets/aistudio/Media__16__000dce62.jpg',
    isPair: true,
    pairType: 'side-by-side',
    beforeLabel: 'Before Treatment (Left)',
    afterLabel: 'After Treatment (Right)',
    description: 'Restoration of chipped maxillary central incisors and enamel wear to natural dental contour and shade.',
    clinicalNote: 'Confirmed comparison: Left panel shows fractured incisal edges; Right panel shows restored anterior anatomy.'
  },
  {
    id: 'case-cervical-filling',
    title: 'Cervical Enamel & Aesthetic Composite Restoration',
    category: 'Enamel & Occlusion',
    imageSrc: '/assets/aistudio/Media__18__e791e38a.jpg',
    isPair: true,
    pairType: 'top-bottom',
    beforeLabel: 'Before Treatment (Top)',
    afterLabel: 'After Treatment (Bottom)',
    description: 'Aesthetic restoration of cervical defect and deep enamel staining on anterior tooth.',
    clinicalNote: 'Confirmed comparison: Upper panel shows cervical defect; Lower panel shows seamless tooth-colored restoration.'
  },
  {
    id: 'case-bridge-restoration',
    title: 'Anterior Teeth Replacement & Fixed Bridge Restoration',
    category: 'Tooth Replacement',
    imageSrc: '/assets/aistudio/Media__15__2eb493fb.jpg',
    isPair: true,
    pairType: 'multi-panel',
    beforeLabel: 'Before Treatment (Top Left)',
    afterLabel: 'After Treatment (Bottom Right)',
    description: 'Rehabilitation of missing upper front teeth restoring smile aesthetics and chewing stability.',
    clinicalNote: 'Confirmed comparison: Upper hexagon shows edentulous anterior space; Lower hexagon shows fixed aesthetic replacement.'
  },
  {
    id: 'case-diastema-closure',
    title: 'Anterior Diastema Closure & Aesthetic Alignment',
    category: 'Space Closure',
    imageSrc: '/assets/aistudio/Media__13__48f64675.jpg',
    isPair: true,
    pairType: 'multi-panel',
    beforeLabel: 'Before Treatment (Top Left)',
    afterLabel: 'After Treatment (Bottom Right)',
    description: 'Closure of mid-line anterior spaces achieving balanced tooth proportions and smile harmony.',
    clinicalNote: 'Confirmed comparison: Upper hexagon shows interdental spacing; Lower hexagon shows closed space and smile line.'
  },
  {
    id: 'case-traumatic-rebuild',
    title: 'Traumatic Fracture Rebuilding & Smile Restoration',
    category: 'Fracture Repair',
    imageSrc: '/assets/aistudio/Media__12__fd4303d1.jpg',
    isPair: true,
    pairType: 'multi-panel',
    beforeLabel: 'Before Treatment (Top Right)',
    afterLabel: 'After Treatment (Bottom Right)',
    description: 'Comprehensive restorative treatment for fractured anterior incisors restoring patient confidence.',
    clinicalNote: 'Confirmed comparison: Upper right shows fractured enamel; Lower right shows aesthetic smile reconstruction.'
  },
  {
    id: 'case-smile-transformation',
    title: 'Anterior Space Closure & Smile Transformation',
    category: 'Space Closure',
    imageSrc: '/assets/aistudio/Media__17__d8e40b80.jpg',
    isPair: false,
    description: 'Clinical progression documenting anterior tooth alignment, space closure, and final smile profile.',
    clinicalNote: 'Multi-view clinical documentation demonstrating treatment progression.'
  },
  {
    id: 'case-occlusal-alignment',
    title: 'Incisal Edge Alignment & Bite Correction',
    category: 'Enamel & Occlusion',
    imageSrc: '/assets/aistudio/Media__14__306f9986.jpg',
    isPair: false,
    description: 'Multi-angle clinical assessment of anterior alignment, incisal edge symmetry, and occlusal harmony.',
    clinicalNote: 'Three-angle clinical documentation of occlusal and incisal alignment.'
  }
];
