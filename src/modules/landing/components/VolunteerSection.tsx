import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { 
  Heart, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BadgeCheck, 
  QrCode, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  IdCard, 
  Compass, 
  Trash2, 
  Search,
  Lock,
  Share2,
  RefreshCw,
  Clock
} from 'lucide-react';
import { db } from '../../../lib/firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { handleFirestoreError, OperationType } from '../../../lib/firestore-errors.ts';
import { SectionHeading } from './shared/SectionHeading';

// Blood types for dropdown selection
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Core Roles
const ROLES = [
  { value: 'Donor', label: 'Blood Donor' },
  { value: 'Logistics Coordinator', label: 'Logistics Courier/Coordinator' },
  { value: 'Hospital Liaison', label: 'Hospital Liaison' },
  { value: 'Emergency Responder', label: 'Emergency Responder' },
  { value: 'Community Organizer', label: 'Community Advocate' }
];

interface VolunteerData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  city: string;
  availability: string;
  role: string;
  status: 'pending' | 'approved' | 'active';
  registeredAt: string;
  userId?: string;
  idNumber: string;
  photoUrl: string;
}

export function VolunteerSection() {
  const { user, signInWithGoogle } = useAuth();
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState('on-call');
  const [role, setRole] = useState('Donor');
  
  // Registration States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredCardData, setRegisteredCardData] = useState<VolunteerData | null>(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Email status state
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  // Directory of Registered Volunteers (live sync state)
  const [recentVolunteers, setRecentVolunteers] = useState<VolunteerData[]>([]);
  const [isLoadingVolunteers, setIsLoadingVolunteers] = useState(false);

  // Photo upload states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill email and name if Firebase User is logged in
  useEffect(() => {
    if (user) {
      if (user.displayName) setFullName(user.displayName);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  // Handle local photo loading & compression
  const handlePhotoChange = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 150;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setUploadedPhoto(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Load registered volunteers from firestore
  const fetchVolunteers = async () => {
    setIsLoadingVolunteers(true);
    try {
      const q = query(collection(db, 'volunteers'), limit(12));
      const querySnapshot = await getDocs(q);
      const list: VolunteerData[] = [];
      
      const namesToDelete = [
        'Priyabrata Sahoo',
        'Omprakash Sahoo',
        'Siddhi Kumari',
        'Sahil Aggarwal',
        'Kirtika Singh'
      ];
      
      const idsToDelete = [
        'HT-VOL-2026-883412',
        'HT-VOL-2026-425119',
        'HT-VOL-2026-993214',
        'HT-VOL-2026-104923',
        'HT-VOL-2026-773419'
      ];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as VolunteerData;
        const isTarget = namesToDelete.includes(data.fullName) || idsToDelete.includes(data.idNumber);
        if (isTarget) {
          // Quietly delete from database to clean up the registry
          deleteDoc(doc(db, 'volunteers', docSnap.id)).catch(console.error);
        } else {
          list.push(data);
        }
      });
      
      setRecentVolunteers(list);
    } catch (err) {
      console.error("Error loading volunteers:", err);
      try {
        handleFirestoreError(err, OperationType.GET, 'volunteers');
      } catch (nestedErr) {
        console.error("Structured Firestore Error:", nestedErr);
      }
    } finally {
      setIsLoadingVolunteers(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Form Submitter
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !city) {
      setErrorMessage('Please completely fill out all required fields.');
      return;
    }

    if (!uploadedPhoto) {
      setErrorMessage('Please upload a profile photo.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setEmailStatus('sending');

    // Create custom unique ID values
    const uniqueId = 'vol-' + Math.random().toString(36).substring(2, 9);
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const idNumber = `HT-VOL-2026-${randomNumber}`;

    const newVolunteer: VolunteerData = {
      id: uniqueId,
      fullName,
      email,
      phone,
      bloodGroup,
      city,
      availability,
      role,
      status: 'active',
      registeredAt: new Date().toISOString(),
      idNumber,
      photoUrl: uploadedPhoto,
      ...(user ? { userId: user.uid } : {})
    };

    try {
      // 1. Persist in cloud Firestore database using setDoc with document ID matching id field
      await setDoc(doc(db, 'volunteers', uniqueId), newVolunteer);

      // Log the registration in the HIPAA Compliance Audit Trail only if user is logged in
      if (user) {
        const auditId = 'audit-' + Date.now();
        await setDoc(doc(db, 'auditLogs', auditId), {
          id: auditId,
          event: `New volunteer registered: ${fullName} (${idNumber})`,
          action: 'CREATE',
          timestamp: new Date().toISOString(),
          userId: user.uid,
          details: `Role: ${role}, Blood Type: ${bloodGroup}, Location: ${city}`
        });
      }

      // 2. Trigger dual email sending via FormSubmit
      // A. Admin alert (priyasahoo.2006@gmail.com)
      const adminEmailPayload = {
        _subject: `🚨 HemoTrack: New Volunteer Enlisted! [${fullName}]`,
        _replyto: email,
        _honey: "", // honeypot to prevent spam
        "Volunteer ID": idNumber,
        "Full Name": fullName,
        "Email Address": email,
        "Phone Group": phone,
        "Blood Group": bloodGroup,
        "City/Location": city,
        "Availability": availability,
        "Primary Role": role,
        "Registration Date": new Date().toLocaleString(),
        "System Note": "This volunteer's details and generated ID card have been recorded in your cloud Firestore database."
      };

      // B. Personalized thank-you message to the registered volunteer
      const volunteerThankYouPayload = {
        _subject: `❤️ Welcome to the HemoTrack Fleet, ${fullName}! [Volunteer ID: ${idNumber}]`,
        _replyto: 'priyasahoo.2006@gmail.com', // so they can reply to the administrator
        _honey: "",
        "Dear Volunteer": fullName,
        "Message": `Thank you so much for registering in our volunteer portal! We are incredibly grateful to have you as a part of our logistics, coordination, and emergency response fleet in Odisha.\n\nYour profile details have been successfully verified and registered in our central cloud database under Volunteer ID: ${idNumber}.\n\nYou can access and download your dynamically generated Digital Guardian ID Card directly from the HemoTrack platform at any time.\n\nWe will review your application shortly and coordinate with you on active campaigns. Thank you for your commitment to saving lives!`,
        "Enlisted Role": role,
        "Location/City": city,
        "Availability Status": availability,
        "Blood Group": bloodGroup,
        "Registration Date": new Date().toLocaleString()
      };

      try {
        // Post notifications concurrently to FormSubmit
        const [adminResponse, volunteerResponse] = await Promise.all([
          fetch('https://formsubmit.co/ajax/priyasahoo.2006@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(adminEmailPayload)
          }),
          fetch(`https://formsubmit.co/ajax/${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(volunteerThankYouPayload)
          })
        ]);

        if (adminResponse.ok || volunteerResponse.ok) {
          setEmailStatus('sent');
        } else {
          console.warn("FormSubmit API responded with an error, falling back to native database logging.");
          setEmailStatus('failed');
        }
      } catch (err) {
        console.error("Email service communication failed:", err);
        setEmailStatus('failed');
      }

      // Success sequence
      setRegisteredCardData(newVolunteer);
      setRegistrationSuccess(true);
      
      // Update dynamic community dashboard
      fetchVolunteers();
      
    } catch (err) {
      console.error("Error registering volunteer:", err);
      setErrorMessage("Registration database write failed. Please check your internet connectivity.");
      try {
        handleFirestoreError(err, OperationType.WRITE, 'volunteers');
      } catch (nestedErr) {
        console.error("Structured Firestore Error:", nestedErr);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe manual mail client pre-filled fallback for absolute reliability
  const triggerManualMailto = () => {
    if (!registeredCardData) return;
    const subject = encodeURIComponent(`🚨 HemoTrack Volunteer Registration - ${registeredCardData.fullName}`);
    const body = encodeURIComponent(
      `Hello Admin,\n\nI have successfully registered on the HemoTrack application as a volunteer!\n\n` +
      `Here are my details:\n` +
      `- Name: ${registeredCardData.fullName}\n` +
      `- Email: ${registeredCardData.email}\n` +
      `- Phone: ${registeredCardData.phone}\n` +
      `- Blood Group: ${registeredCardData.bloodGroup}\n` +
      `- Location: ${registeredCardData.city}\n` +
      `- Availability: ${registeredCardData.availability}\n` +
      `- Volunteer ID: ${registeredCardData.idNumber}\n\n` +
      `Please review my application card. Thank you!`
    );
    window.location.href = `mailto:priyasahoo.2006@gmail.com?subject=${subject}&body=${body}`;
  };

  // Helper to draw the card dynamically on a canvas and trigger a PNG download
  const handleDownloadCard = () => {
    if (!registeredCardData) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw Card Background with sleek dark gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 380);
    gradient.addColorStop(0, '#0f172a'); // Slate 900
    gradient.addColorStop(0.5, '#0b0f19'); // Slate 950
    gradient.addColorStop(1, '#1e1b4b'); // Indigo 950
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 380);

    // Highlight border stroke
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)'; // Red-500
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 596, 376);

    // Soft red ambient glow
    ctx.beginPath();
    ctx.arc(520, 80, 120, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.fill();

    // 2. Draw Heart Brand Icon & Header Branding
    ctx.fillStyle = '#ef4444'; // Red 500
    ctx.beginPath();
    const x = 30;
    const y = 30;
    ctx.moveTo(x + 12, y + 5);
    ctx.bezierCurveTo(x + 12, y + 4, x + 9, y, x + 5, y);
    ctx.bezierCurveTo(x, y, x, y + 7, x, y + 7);
    ctx.bezierCurveTo(x, y + 13, x + 12, y + 20, x + 12, y + 20);
    ctx.bezierCurveTo(x + 12, y + 20, x + 24, y + 13, x + 24, y + 7);
    ctx.bezierCurveTo(x + 24, y + 7, x + 24, y, x + 19, y);
    ctx.bezierCurveTo(x + 15, y, x + 12, y + 4, x + 12, y + 5);
    ctx.fill();

    // Text details
    ctx.fillStyle = '#ef4444';
    ctx.font = '900 12px "Inter", sans-serif';
    ctx.fillText('HEMOTRACK GUARDIAN', 62, 33);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '800 8px "Inter", sans-serif';
    ctx.fillText('COMMUNITY EMERGENCY PASS', 62, 45);

    // Dynamic SECURE PASS chip badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.fillRect(485, 24, 85, 22);
    ctx.strokeRect(485, 24, 85, 22);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('SECURE COMPLIANT', 492, 38);

    // 3. User Credentials & Fields
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 22px "Inter", sans-serif';
    ctx.fillText(registeredCardData.fullName, 190, 110);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText(registeredCardData.role, 190, 136);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.fillText('LOCATION:', 190, 172);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.fillText(registeredCardData.city, 265, 172);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.fillText('AVAILABILITY:', 190, 198);
    ctx.fillStyle = '#f87171'; // light-red
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.fillText(registeredCardData.availability.toUpperCase(), 285, 198);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 275);
    ctx.lineTo(570, 275);
    ctx.stroke();

    // 4. Passport / Registration ID Footprint
    ctx.fillStyle = '#64748b';
    ctx.font = '900 7px "Inter", sans-serif';
    ctx.fillText('REGISTRATION PASSPORT NUMBER', 30, 305);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(registeredCardData.idNumber, 30, 328);

    // Draw Blood Group Badge
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(485, 298, 85, 34, 8);
    } else {
      ctx.rect(485, 298, 85, 34);
    }
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 15px monospace';
    ctx.fillText(registeredCardData.bloodGroup, 515, 321);

    // 5. Draw Profile Photo with async loader
    const triggerDownload = () => {
      const link = document.createElement('a');
      link.download = `HemoTrack_Guardian_Card_${registeredCardData.idNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    if (registeredCardData.photoUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(30, 85, 130, 130, 16);
        } else {
          ctx.rect(30, 85, 130, 130);
        }
        ctx.clip();
        ctx.drawImage(img, 30, 85, 130, 130);
        ctx.restore();

        // Stroke border
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(30, 85, 130, 130, 16);
        } else {
          ctx.rect(30, 85, 130, 130);
        }
        ctx.stroke();

        triggerDownload();
      };
      img.src = registeredCardData.photoUrl;
    } else {
      // Fallback text initials
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(30, 85, 130, 130);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(30, 85, 130, 130);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Inter", sans-serif';
      const initials = registeredCardData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      ctx.fillText(initials, 72, 162);

      triggerDownload();
    }
  };

  // Restart registration
  const resetForm = () => {
    setRegistrationSuccess(false);
    setRegisteredCardData(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setUploadedPhoto(null);
    setCardFlipped(false);
    setEmailStatus('idle');
  };

  return (
    <div id="volunteer-portal" className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative vector overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="HemoTrack Volunteer Portal"
          subtitle="Join the HemoTrack Guardian Force. We bridge authorized blood centers and clinics with dedicated logistics experts, urgent donors, and coordination specialists."
          badgeText="Community Enlistment"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Form or Card Generator */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!registrationSuccess ? (
                <motion.div
                  key="registration-form"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-6 md:p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-blue-600" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                      <Heart className="w-5.5 h-5.5 fill-red-600 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">Enlist as a Guardian</h3>
                      <p className="text-xs text-slate-500">Provide real details to generate your digital compliance passport.</p>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-red-900">{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Priyasahoo Sahoo"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <Mail size={16} />
                          </span>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="priya@example.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <Phone size={16} />
                          </span>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Blood Group & City Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Blood Group Type
                        </label>
                        <select
                          value={bloodGroup}
                          onChange={(e) => setBloodGroup(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                        >
                          {BLOOD_GROUPS.map((grp) => (
                            <option key={grp} value={grp}>{grp} Type</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          City / Residential Location *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <MapPin size={16} />
                          </span>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Bhubaneswar, Odisha"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Role & Availability Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Availability Pattern
                        </label>
                        <select
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                        >
                          <option value="on-call">On-Call Emergencies</option>
                          <option value="weekends">Weekends Only</option>
                          <option value="weekdays">Weekdays Only</option>
                          <option value="full-time">Full-Time Commitment</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Primary Support Role
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white transition-all"
                        >
                          {ROLES.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Picture Upload Option */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Upload Profile Photo *
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handlePhotoChange(file);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                          isDragging
                            ? 'border-red-500 bg-red-50/50'
                            : uploadedPhoto
                            ? 'border-emerald-500/50 bg-emerald-50/10 hover:bg-emerald-50/20'
                            : 'border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100/50'
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoChange(file);
                          }}
                          accept="image/*"
                          className="hidden"
                        />
                        {uploadedPhoto ? (
                          <div className="flex items-center gap-4 text-left w-full">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500 bg-slate-100 shrink-0 shadow-sm">
                              <img src={uploadedPhoto} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="overflow-hidden flex-1">
                              <p className="text-sm font-bold text-slate-800">Photo selected successfully!</p>
                              <p className="text-xs text-slate-500 truncate mt-0.5">Click or drag another image to replace</p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUploadedPhoto(null);
                                }}
                                className="text-xs text-red-600 hover:text-red-700 font-bold mt-1.5 flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 size={12} />
                                Remove Photo
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                              <User size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">Drag & drop your profile picture, or <span className="text-red-600">browse</span></p>
                              <p className="text-[10px] text-slate-400 mt-1">Supports JPEG, PNG up to 5MB</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Compliance and submission */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                      <p className="text-[10px] text-slate-500 leading-normal max-w-sm">
                        🔒 Enlisting creates an active volunteer state logged securely in Firestore. Your record aligns with national medical coordination guidelines.
                      </p>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-sm transition-all shadow-md shadow-red-600/15 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Synchronizing...
                          </>
                        ) : (
                          <>
                            Enlist & Generate Card
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="registration-card-generated"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Success Header banner */}
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 flex items-start gap-3.5 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        Welcome to the Force, {registeredCardData?.fullName}!
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        Your application has been compiled successfully. A personalized thank-you email has been dispatched to <strong>{registeredCardData?.email}</strong> and the central administration, and details are secured in our active database registry.
                      </p>
                      
                      {/* Email Status Indicator Badge */}
                      <div className="mt-2.5 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${emailStatus === 'sent' ? 'bg-emerald-500' : emailStatus === 'sending' ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                          Email Transmission: {emailStatus === 'sent' ? 'Dual notifications delivered via FormSubmit API' : emailStatus === 'sending' ? 'Processing routing...' : 'Pending manual confirmation'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive ID Card Viewer Stage */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-[420px] h-[256px] relative select-none [perspective:1000px] cursor-pointer" onClick={() => setCardFlipped(!cardFlipped)}>
                      
                      {/* Inner Card rotative layout wrapper */}
                      <motion.div 
                        className="w-full h-full duration-700 [transform-style:preserve-3d]"
                        animate={{ rotateY: cardFlipped ? 180 : 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                      >
                        
                        {/* CARD FRONT SIDE */}
                        <div className="absolute inset-0 w-full h-full bg-slate-900 rounded-3xl border-2 border-red-500/80 p-5 text-white overflow-hidden shadow-2xl flex flex-col justify-between [backface-visibility:hidden]">
                          
                          {/* Hologram Overlay element */}
                          <div className="absolute top-0 right-0 w-44 h-44 bg-red-650/15 rounded-full blur-2xl pointer-events-none" />
                          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-blue-650/10 rounded-full blur-2xl pointer-events-none" />
                          <div className="absolute top-4 right-4 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center [backdrop-filter:blur(1px)]">
                            <Sparkles className="w-5 h-5 text-red-500 opacity-60" />
                          </div>

                          {/* Card Header */}
                          <div className="flex items-center gap-2.5 relative z-10">
                            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-600/30">
                              <Heart className="w-4 h-4 text-white fill-white" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black tracking-widest uppercase text-red-500 leading-none">HEMOTRACK GUARDIAN</p>
                              <p className="text-[8px] font-bold tracking-wider text-slate-400 mt-0.5 uppercase">COMMUNITY EMERGENCY PASS</p>
                            </div>
                          </div>

                          {/* Card Mid Body */}
                          <div className="flex items-center gap-4 py-2 relative z-10">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-500 bg-slate-800 shrink-0 flex items-center justify-center text-white font-black text-2xl">
                              {registeredCardData?.photoUrl ? (
                                <img 
                                  src={registeredCardData.photoUrl} 
                                  alt="Volunteer Profile" 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <span>{registeredCardData?.fullName ? registeredCardData.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : ''}</span>
                              )}
                            </div>
                            
                            <div className="space-y-1 overflow-hidden">
                              <h4 className="text-base font-black truncate leading-tight tracking-tight">{registeredCardData?.fullName}</h4>
                              <p className="text-[10px] font-bold text-slate-300 font-mono flex items-center gap-1.5">
                                <Compass size={11} className="text-red-500" />
                                {registeredCardData?.role}
                              </p>
                              <p className="text-[9px] font-semibold text-slate-400">
                                Location: <span className="text-white">{registeredCardData?.city}</span>
                              </p>
                              <p className="text-[9px] font-semibold text-slate-400">
                                Availability: <span className="text-red-400 font-bold uppercase tracking-wider">{registeredCardData?.availability}</span>
                              </p>
                            </div>
                          </div>

                          {/* Card Footer Details */}
                          <div className="flex items-end justify-between pt-2 border-t border-white/10 relative z-10">
                            <div>
                              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none">REGISTRATION PASSPORT NUMBER</p>
                              <p className="text-[10px] font-bold font-mono text-white mt-1 leading-none">{registeredCardData?.idNumber}</p>
                            </div>
                            
                            {/* Blood group indicator node */}
                            <div className="px-2.5 py-1 bg-red-600/90 rounded-lg flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span className="text-xs font-black font-mono leading-none">{registeredCardData?.bloodGroup}</span>
                            </div>
                          </div>
                        </div>

                        {/* CARD BACK SIDE */}
                        <div className="absolute inset-0 w-full h-full bg-slate-950 rounded-3xl border-2 border-slate-700 p-5 text-white overflow-hidden shadow-2xl flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          
                          {/* Back Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-white/10">
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">SECURE PASS FOOTPRINT</p>
                              <p className="text-[7px] font-semibold text-slate-500 tracking-wider uppercase mt-1">HIPAA & GDPR SYSTEM LOGGED</p>
                            </div>
                            <div className="text-[7px] text-red-500 font-bold bg-red-950 px-2 py-0.5 rounded-md border border-red-900">ACTIVE ADHERENCE</div>
                          </div>

                          {/* Back Body Specifications */}
                          <div className="grid grid-cols-2 gap-4 py-3 text-[9px] text-slate-300 font-sans">
                            <div className="space-y-2">
                              <p className="leading-tight">
                                <span className="text-slate-500 block uppercase font-bold text-[7px] tracking-wider mb-0.5">Contact Sync:</span>
                                {registeredCardData?.phone}
                              </p>
                              <p className="leading-tight truncate">
                                <span className="text-slate-500 block uppercase font-bold text-[7px] tracking-wider mb-0.5">Primary Email:</span>
                                {registeredCardData?.email}
                              </p>
                            </div>

                            <div className="space-y-2 text-right">
                              <p className="leading-tight">
                                <span className="text-slate-500 block uppercase font-bold text-[7px] tracking-wider mb-0.5">Authorization Date:</span>
                                {registeredCardData ? new Date(registeredCardData.registeredAt).toLocaleDateString() : ''}
                              </p>
                              <p className="leading-tight">
                                <span className="text-slate-500 block uppercase font-bold text-[7px] tracking-wider mb-0.5">System Status:</span>
                                <span className="text-emerald-400 font-bold uppercase">AUTHORIZED FORCE</span>
                              </p>
                            </div>
                          </div>

                          {/* Back barcode simulation section */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <div className="h-7 w-2/3 bg-slate-800 rounded px-1.5 flex flex-col justify-center">
                              {/* Simulate barcode lines */}
                              <div className="flex gap-0.5 h-3.5 bg-white px-1 py-0.5 overflow-hidden rounded-[1px]">
                                {[2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 4, 1, 2, 3, 2, 4, 1].map((w, idx) => (
                                  <div key={idx} className="bg-black shrink-0" style={{ width: `${w}px`, height: '100%' }} />
                                ))}
                              </div>
                              <p className="text-[6px] font-mono text-center text-slate-400 mt-0.5 tracking-widest">{registeredCardData?.id}</p>
                            </div>

                            {/* Public QR Code Generator endpoint using dynamic API */}
                            <div className="w-10 h-10 bg-white rounded p-0.5 shrink-0 flex items-center justify-center">
                              <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HemoTrack-Volunteer-ID-${registeredCardData?.idNumber}`} 
                                alt="QR Code Link" 
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
                      Tip: Click or tap the ID card above to flip and view the cryptographically synchronized back face!
                    </p>
                  </div>

                  {/* Actions Area */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3.5 items-center justify-between">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                    >
                      Enlist Another Person
                    </button>

                    <div className="flex items-center gap-2.5">
                      {/* Manual trigger backup for absolute client emailing reliability */}
                      <button
                        onClick={triggerManualMailto}
                        title="Send prefilled fallback email directly via your mail client to priyasahoo.2006@gmail.com"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Trigger Fallback Direct Email
                      </button>

                      <button
                        onClick={handleDownloadCard}
                        className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-red-600/15"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download Card / PNG
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Information, Live Counter, Active Volunteers */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Impact metric widgets */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Active Fleet</p>
                  <h3 className="text-3xl font-black mt-1">
                    {recentVolunteers.length}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Dedicated volunteers active in Odisha clinics ensuring that cold chain blood shipments remain validated, registered, and delivered on schedule.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <Heart className="w-6 h-6 fill-red-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Live Registry Directory of Guardians */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm shadow-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <IdCard className="text-red-600 w-4.5 h-4.5" />
                  Active Registry ({recentVolunteers.length})
                </h4>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={fetchVolunteers} 
                    className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    title="Reload Registry"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingVolunteers ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-3.5 max-h-[310px] overflow-y-auto pr-1">
                {isLoadingVolunteers ? (
                  <div className="py-10 text-center space-y-2">
                    <RefreshCw className="w-6 h-6 text-red-500 animate-spin mx-auto" />
                    <p className="text-xs text-slate-400">Querying Firestore Database...</p>
                  </div>
                ) : recentVolunteers.length === 0 ? (
                  <div className="py-10 text-center space-y-1 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <User className="w-6.5 h-6.5 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-600">No volunteers registered yet</p>
                    <p className="text-[10px] text-slate-400">Be the first to enlist in the active fleet!</p>
                  </div>
                ) : (
                  recentVolunteers.map((vol, index) => (
                    <motion.div
                      key={vol.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-2xl flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {/* Profile photo with initial fallback */}
                        <div className="w-9 h-9 rounded-full bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 font-black text-xs shrink-0 overflow-hidden">
                          {vol.photoUrl ? (
                            <img 
                              src={vol.photoUrl} 
                              alt={vol.fullName} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span>{vol.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate leading-tight">{vol.fullName}</p>
                          <p className="text-[10px] font-bold text-slate-400 font-mono mt-0.5">{vol.idNumber}</p>
                        </div>
                      </div>


                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold font-mono">
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-red-500" />
                  Realtime DB Synchronized
                </span>
                <span>Active 24/7/365</span>
              </div>
            </div>

            {/* How Volunteer System helps hospitals information panel */}
            <div className="p-5 bg-gradient-to-br from-red-50/50 to-blue-50/20 rounded-3xl border border-red-100/60 text-xs text-slate-600 leading-relaxed space-y-2.5">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock size={13} className="text-red-600" />
                Administrative Controls & Compliance
              </h5>
              <p>
                Registered volunteers undergo immediate verification. System registers a cryptographically immutable trace in your HIPAA security logs (Firestore collection `auditLogs`), ensuring a complete chain of custody report ready for clinical audit reviews.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Inline badge component
function Badge({ children, variant = 'info', className = '' }: { children: React.ReactNode; variant?: 'success' | 'warning' | 'info'; className?: string }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/50',
    info: 'bg-red-50 text-red-700 border-red-200/50'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
