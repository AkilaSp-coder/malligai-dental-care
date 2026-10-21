import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory store for appointment enquiries
interface AppointmentEnquiry {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  createdAt: string;
}

const enquiries: AppointmentEnquiry[] = [];

// Gemini AI Client setup
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_PROMPT = `You are the friendly, professional website enquiry assistant for Malligai Dental Care located in Sengottai, Tenkasi district, Tamil Nadu.

CLINIC INFORMATION:
- Clinic: Malligai Dental Care
- Address: No. 71-1/27A, Jawaharlal Nehru Road, Opposite Muthusamy Park, Sengottai – 627 809, Tamil Nadu.
- Phone & WhatsApp: 97900 60801
- Working Hours:
  * Morning: 10:00 AM – 2:00 PM
  * Evening: 5:00 PM – 8:30 PM
  * Sunday: Appointment only

DOCTORS:
1. Dr. R. Patrajan — BDS (S.A. Rajas Dental College) with 16 Years Clinical Experience.
2. Dr. T. Sankari Patrajan — BDS (Saveetha Dental College, Chennai) with 14 Years Clinical Experience.
(Note: Do not invent graduation years, award titles, or specialist degrees beyond BDS).

SPECIALISED TREATMENTS:
1. BPS Dentures: High precision, comfortable, biofunctional prosthetic dentures providing natural suction, superior chewing efficiency, and durable aesthetics.
2. Painless Wisdom Tooth Removal: Gentle surgical removal of impacted or painful third molars with modern anaesthesia techniques and quick recovery protocols.
3. Full Mouth Rehabilitation: Comprehensive restoration of oral function, bite alignment, and aesthetics for patients with worn, missing, or compromised teeth.

MODERN ADVANCED TECHNOLOGY:
- Intraoral 3D Scanner: Digital intraoral optical scanning for comfortable, highly accurate digital impressions without sticky or uncomfortable paste trays.
- Digital X-ray: High-resolution digital radiography for immediate, safe diagnosis with significantly reduced radiation exposure.

STRICT MEDICAL & ETHICAL GUIDELINES:
1. Language: Answer fluently in Tamil (தமிழ்) or English, matching the visitor's language or mixed Tamil-English (Tanglish) if they use it.
2. An enquiry is NOT a confirmed appointment. Always explain that appointments are subject to clinic confirmation.
3. NEVER diagnose medical or dental conditions from text.
4. NEVER prescribe medications or suggest dosages.
5. NEVER invent exact prices or give fee guarantees (advise clinical consultation for a personalized estimate).
6. NEVER promise guaranteed medical outcomes.
7. If visitors ask about booking, politely guide them to the booking form on the page or offer to connect them via phone or WhatsApp at 97900 60801.
8. Keep answers concise, warm, professional, respectful, and easy to read on mobile.`;

// Local fallback assistant logic if Gemini API key is absent or throws an error
function generateLocalResponse(message: string): { reply: string; isAi: boolean } {
  const lower = message.toLowerCase();
  const isTamil = /[\u0B80-\u0BFF]/.test(message) || lower.includes('vanakkam') || lower.includes('eppadi') || lower.includes('neram');

  if (lower.includes('timing') || lower.includes('time') || lower.includes('hours') || lower.includes('open') || lower.includes('நேரம்')) {
    if (isTamil) {
      return {
        reply: `மல்லிகை டென்டல் கேர் (Malligai Dental Care) கிளினிக் வேலை நேரங்கள்:
• காலை: 10:00 AM – 2:00 PM
• மாலை: 5:00 PM – 8:30 PM
• ஞாயிறு: முன் பதிவு (Appointment) அடிப்படையில் மட்டும் இயங்கும்.

நேரடியாக தொடர்பு கொள்ள: 97900 60801 என்ற எண்ணை அழைக்கவும் அல்லது வாட்ஸ்அப் செய்யவும்.`,
        isAi: false,
      };
    }
    return {
      reply: `Malligai Dental Care Clinic Hours:
• Morning: 10:00 AM – 2:00 PM
• Evening: 5:00 PM – 8:30 PM
• Sunday: By Appointment Only

For instant assistance, you can call or WhatsApp our clinic at 97900 60801.`,
      isAi: false,
    };
  }

  if (lower.includes('doctor') || lower.includes('dentist') || lower.includes('patrajan') || lower.includes('sankari') || lower.includes('டாக்டர்')) {
    if (isTamil) {
      return {
        reply: `எங்கள் அனுபவம் வாய்ந்த மருத்துவர்கள்:
1. Dr. R. பத்ராஜன், BDS (S.A. Rajas Dental College) – 16 வருட மருத்துவ அனுபவம்.
2. Dr. T. சங்கரி பத்ராஜன், BDS (Saveetha Dental College, Chennai) – 14 வருட மருத்துவ அனுபவம்.

முன்பதிவு செய்ய: 97900 60801 என்ற எண்ணை தொடர்பு கொள்ளவும்.`,
        isAi: false,
      };
    }
    return {
      reply: `Meet Our Experienced Doctors:
• Dr. R. Patrajan, BDS (S.A. Rajas Dental College) — 16 Years Clinical Experience
• Dr. T. Sankari Patrajan, BDS (Saveetha Dental College, Chennai) — 14 Years Clinical Experience

Both doctors bring extensive clinical expertise in restorative and painless dental care. Call 97900 60801 to schedule a consultation.`,
      isAi: false,
    };
  }

  if (lower.includes('address') || lower.includes('location') || lower.includes('where') || lower.includes('reach') || lower.includes('முகவரி') || lower.includes('இடம்')) {
    if (isTamil) {
      return {
        reply: `கிளினிக் முகவரி:
எண். 71-1/27A, ஜவஹர்லால் நேரு ரோடு,
முத்துசாமி பார்க் எதிரில்,
செங்கோட்டை – 627 809.

கூகுள் மேப் வழிகாட்டல் மற்றும் விபரங்களுக்கு 97900 60801 எண்ணை அழைக்கலாம்.`,
        isAi: false,
      };
    }
    return {
      reply: `Clinic Address:
No. 71-1/27A, Jawaharlal Nehru Road,
Opposite Muthusamy Park,
Sengottai – 627 809, Tamil Nadu.

You can view the interactive map in the Location section below or call 97900 60801 for directions.`,
      isAi: false,
    };
  }

  if (lower.includes('treatment') || lower.includes('service') || lower.includes('wisdom') || lower.includes('bps') || lower.includes('denture') || lower.includes('சிகிச்சை')) {
    if (isTamil) {
      return {
        reply: `மல்லிகை டென்டல் கேர் சிறப்பு சிகிச்சைகள்:
1. BPS டென்சர்கள் (BPS Dentures - நவீன செயற்கை பற்கள்)
2. வலியற்ற ஞானப்பல் அகற்றுதல் (Painless Wisdom Tooth Removal)
3. முழு வாய் மறுசீரமைப்பு (Full Mouth Rehabilitation)

நவீன இன்ட்ரா-ஓரல் ஸ்கேனர் (Intraoral Scanner) மற்றும் டிஜிட்டல் எக்ஸ்-ரே வசதிகளுடன் பரிசோதிக்கப்படுகிறது. முன்பதிவு செய்ய: 97900 60801.`,
        isAi: false,
      };
    }
    return {
      reply: `Specialised Dental Treatments at Malligai Dental Care:
1. BPS Dentures: Precision-fit biofunctional prosthetics for natural smile & comfortable chewing.
2. Painless Wisdom Tooth Removal: Gentle surgical extraction with advanced local anaesthesia.
3. Full Mouth Rehabilitation: Comprehensive functional and cosmetic oral restoration.

Equipped with cutting-edge Intraoral 3D Scanner and low-dose Digital X-ray. Call 97900 60801 for appointments.`,
      isAi: false,
    };
  }

  if (isTamil) {
    return {
      reply: `வணக்கம்! மல்லிகை டென்டல் கேர் செங்கோட்டைக்கு தங்களை வரவேற்கிறோம். 

நாங்கள் உங்களுக்கு கிளினிக் நேரம், சிகிச்சைகள், மருத்துவர்கள் மற்றும் முன்பதிவு குறித்த தகவல்களை வழங்க தயாராக உள்ளோம். 

நேரடி ஆலோசனைக்கு 97900 60801 என்ற எண்ணில் எங்களை அழைக்கலாம் அல்லது கீழே உள்ள படிவத்தில் உங்கள் முன்பதிவை சமர்ப்பிக்கலாம்.`,
      isAi: false,
    };
  }

  return {
    reply: `Hello! Welcome to Malligai Dental Care, Sengottai. 

We can help you with clinic hours, treatments (BPS Dentures, Painless Wisdom Tooth Removal, Full Mouth Rehabilitation), doctor profiles, and appointment enquiries.

Please note: An enquiry is not a confirmed appointment. You can also directly call or WhatsApp our clinic at 97900 60801.`,
    isAi: false,
  };
}

// API: Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (aiClient) {
      try {
        const contents: any[] = [];
        // Add limited history if provided
        for (const msg of conversationHistory.slice(-6)) {
          if (msg.role === 'user' || msg.role === 'model') {
            contents.push({
              role: msg.role,
              parts: [{ text: msg.text }],
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const replyText = response.text?.trim() || '';
        if (replyText) {
          res.json({ reply: replyText, isAi: true });
          return;
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to local assistant:', geminiError?.message || geminiError);
      }
    }

    // Fallback response
    const fallback = generateLocalResponse(message);
    res.json(fallback);
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Unable to process chat request' });
  }
});

// API: Appointment Enquiry Endpoint
app.post('/api/enquiry', (req, res) => {
  try {
    const { name, phone, treatment, preferredDate, preferredTimeSlot, notes } = req.body;

    if (!name || !phone || !preferredDate || !preferredTimeSlot) {
      res.status(400).json({ error: 'Please fill in all required fields (Name, Phone, Date, Time Slot).' });
      return;
    }

    // Clean phone number
    const cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    const id = `MDC-${Math.floor(10000 + Math.random() * 90000)}`;
    const enquiry: AppointmentEnquiry = {
      id,
      name: String(name).trim(),
      phone: cleanPhone,
      treatment: treatment || 'General Consultation',
      preferredDate,
      preferredTimeSlot,
      notes: notes ? String(notes).trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    enquiries.push(enquiry);

    // Format WhatsApp message text
    const waText = encodeURIComponent(
      `Hello Malligai Dental Care,\n\nI would like to enquire for an appointment.\n• Ref ID: ${id}\n• Patient Name: ${enquiry.name}\n• Phone: ${enquiry.phone}\n• Treatment: ${enquiry.treatment}\n• Preferred Date: ${enquiry.preferredDate}\n• Preferred Time: ${enquiry.preferredTimeSlot}${enquiry.notes ? `\n• Notes: ${enquiry.notes}` : ''}\n\nPlease confirm availability. Thank you!`
    );

    const whatsappUrl = `https://wa.me/919790060801?text=${waText}`;

    res.json({
      success: true,
      referenceId: id,
      message: 'Your appointment enquiry has been recorded! Our clinic team will call to confirm.',
      whatsappUrl,
      enquiry,
    });
  } catch (err: any) {
    console.error('Enquiry error:', err);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    clinic: 'Malligai Dental Care',
    phone: '9790060801',
    geminiConfigured: !!aiClient,
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Malligai Dental Care server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
