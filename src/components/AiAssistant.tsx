import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Phone, MessageCircle, Sparkles, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isAi?: boolean;
}

interface AiAssistantProps {
  onOpenBooking: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAiPowered, setIsAiPowered] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello and Vanakkam! Welcome to Malligai Dental Care, Sengottai. 

I can answer your questions about our clinic hours, doctors, specialised treatments (BPS Dentures, Painless Wisdom Tooth Removal, Full Mouth Rehabilitation), and our Intraoral 3D Scanner. 

You can ask in English or Tamil (தமிழ்)! How can I help you today?`,
      isAi: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What are your clinic timings?',
    'மருத்துவர்கள் விபரம் என்ன?',
    'Tell me about BPS Dentures',
    'How does the 3D Intraoral Scanner work?',
    'Where is the clinic located in Sengottai?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationHistory: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to get response');
      }

      setIsAiPowered(data.isAi ?? false);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Thank you for reaching out. Please call our clinic at 97900 60801 for direct support.',
        isAi: data.isAi,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: 'Sorry, I had trouble reaching the assistant service. You can call our clinic directly at 97900 60801 or reach out on WhatsApp.',
        isAi: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative px-4 py-3 rounded-full bg-gradient-to-r from-[#008F87] to-[#00BFA5] text-white shadow-xl shadow-[#008F87]/30 hover:shadow-[#008F87]/50 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-semibold text-xs border border-white/20"
          aria-label="Open AI Dental Assistant"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
          <MessageSquare className="w-4 h-4" />
          <span>Ask AI Assistant (தமிழ் / EN)</span>
        </button>
      </div>

      {/* Assistant Modal / Slide-out Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[420px] sm:h-[600px] z-50 flex flex-col bg-[#10182D] sm:rounded-3xl border border-[#00BFA5]/30 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-[#16213E] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#008F87] to-[#00BFA5] p-0.5 shadow-sm">
                <div className="w-full h-full bg-[#10182D] rounded-[10px] flex items-center justify-center text-[#00BFA5]">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Malligai Dental Assistant</span>
                </h3>
                <span className="text-[11px] text-[#00BFA5]">
                  {isAiPowered ? 'Powered by Gemini AI · Bilingual' : 'Enquiry Assistant (Tamil / English)'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Safety Disclaimer Banner */}
          <div className="px-4 py-2 bg-[#008F87]/15 border-b border-[#008F87]/30 text-[11px] text-[#EAF7FA] flex items-start gap-2 text-left">
            <AlertCircle className="w-3.5 h-3.5 text-[#00BFA5] shrink-0 mt-0.5" />
            <span>
              For general enquiries only. Online assistance does not diagnose dental conditions or confirm appointments. Call 97900 60801 for emergencies.
            </span>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[88%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user'
                      ? 'bg-slate-700 text-white'
                      : 'bg-[#008F87]/30 text-[#00BFA5] border border-[#00BFA5]/30'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#008F87] text-white rounded-tr-none'
                      : 'bg-[#16213E] text-slate-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-[#008F87]/30 text-[#00BFA5] flex items-center justify-center shrink-0 border border-[#00BFA5]/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-[#16213E] border border-white/10 text-slate-400">
                  <span>Assistant is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-[#16213E]/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#008F87]/30 text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Quick Action Strip (Book Form / WhatsApp) */}
          <div className="px-4 py-2 bg-[#10182D] border-t border-white/5 flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-[#00BFA5] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>📅 Open Booking Form</span>
            </button>
            <a
              href="https://wa.me/919790060801"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span>WhatsApp Clinic</span>
            </a>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#16213E] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about treatments, doctors, hours..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#00BFA5] transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-[#008F87] hover:bg-[#00BFA5] text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
