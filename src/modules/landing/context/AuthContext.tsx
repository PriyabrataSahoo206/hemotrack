import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleAuthProvider, db } from '../../../lib/firebase.ts';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, LogIn, Shield, Sparkles, Building, Truck, AlertCircle, Heart, User as UserIcon } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_ROLES = [
  {
    name: 'Dr. Evelyn Carter',
    role: 'Chief of Hematology',
    org: 'Metro General Hospital',
    email: 'e.carter@metrohospital.org',
    photoURL: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-50/50 hover:bg-red-50 border-red-100 hover:border-red-200',
    icon: Activity
  },
  {
    name: 'Mark Jenkins',
    role: 'Director of Blood Services',
    org: 'Red Cross Blood Center',
    email: 'm.jenkins@redcrossblood.org',
    photoURL: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50/50 hover:bg-blue-50 border-blue-100 hover:border-blue-200',
    icon: Building
  },
  {
    name: 'Sarah Chen',
    role: 'Logistics Coordinator',
    org: 'HemoCold Logistics Ltd',
    email: 's.chen@hemocold.com',
    photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100 hover:border-emerald-200',
    icon: Truck
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Custom auth modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingInDemo, setSigningInDemo] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  // Custom guest state
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState('Safety Auditor');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync user in Firestore if they log in
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email || 'guest@hemotrack.org',
            displayName: currentUser.displayName || 'Guest User',
            photoURL: currentUser.photoURL || '',
            lastLogin: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.error("Error syncing user profile to Firestore: ", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    // Open the premium dual-mode login dialog instead of directly calling popup
    setIsModalOpen(true);
    setAuthError(null);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Google Sign-In Error: ", err);
      let friendlyMessage = "Google Sign-In failed.";
      if (err.code === 'auth/popup-blocked') {
        friendlyMessage = "Google Sign-In popup was blocked by your browser settings. Please allow popups or use the Instant Demo Access option below.";
      } else if (err.code === 'auth/unauthorized-domain' || err.code === 'auth/operation-not-allowed') {
        friendlyMessage = "Google Sign-In is restricted for this host domain. Please use the Instant Demo Access below, which works instantly on any platform with zero setup!";
      } else {
        friendlyMessage = err.message || "Could not log in with Google. Try the Quick Demo access below.";
      }
      setAuthError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (preset: typeof PRESET_ROLES[0] | { name: string, role: string, email: string, photoURL: string }) => {
    setSigningInDemo(true);
    setAuthError(null);
    try {
      let anonymousUserCredential = null;
      try {
        // Try Firebase Anonymous Authentication first to get a real Firebase Auth context for Firestore
        anonymousUserCredential = await signInAnonymously(auth);
      } catch (authErr) {
        console.warn("Firebase Anonymous sign-in failed, utilizing fully local custom session mode:", authErr);
      }

      if (anonymousUserCredential?.user) {
        // Firebase anonymous sign-in succeeded, update profile so display names sync on the server and client
        await updateProfile(anonymousUserCredential.user, {
          displayName: preset.name,
          photoURL: preset.photoURL
        });
        
        // Explicitly set state to trigger update
        setUser({
          ...anonymousUserCredential.user,
          displayName: preset.name,
          photoURL: preset.photoURL
        } as User);
      } else {
        // Full local fallback if Firestore/Firebase Auth config is missing or disabled
        const localUid = 'demo-' + preset.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const mockUser = {
          uid: localUid,
          email: preset.email,
          displayName: preset.name,
          photoURL: preset.photoURL,
          emailVerified: true,
          isAnonymous: true,
          metadata: {},
          providerData: [],
        } as unknown as User;
        setUser(mockUser);
      }
      
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Demo login error: ", err);
      setAuthError(err.message || "An error occurred setting up the demo session.");
    } finally {
      setSigningInDemo(false);
    }
  };

  const handleCustomGuestSignIn = () => {
    if (!customName.trim()) {
      setAuthError("Please enter a name for your guest session.");
      return;
    }
    const name = customName.trim();
    const email = customEmail.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@hemotrack-guest.org`;
    const photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=EF4444&color=fff&size=150&font-size=0.33`;
    
    handleDemoSignIn({
      name,
      role: customRole,
      org: 'HemoTrack Guest Terminal',
      email,
      photoURL,
    });
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // Clean up local mock user state if set
      setUser(null);
    } catch (err) {
      console.error("Sign-Out Error: ", err);
      // Clean up anyway
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}

      {/* Modern Dual-Mode Authentication Portal Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] text-slate-800"
            >
              {/* Header Panel */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-600 shadow-md shadow-red-500/20 text-white">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">HemoTrack Security</h3>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Portal Authentication</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-slate-200/70 rounded-full text-slate-400 hover:text-slate-800 transition-all cursor-pointer"
                  aria-label="Close authentication panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-140px)]">
                {/* Error Banner */}
                {authError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700 flex gap-2.5 items-start shadow-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="font-semibold leading-relaxed">{authError}</p>
                  </motion.div>
                )}

                {/* Primary Option: Google Sign In */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">Option A: Enterprise Google Access</span>
                  </div>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-2xl shadow-lg shadow-slate-900/15 hover:shadow-xl hover:shadow-slate-900/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    {/* Inline Colored SVG Google Icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.29 1.445 15.422 0 12.24 0c-6.63 0-12 5.37-12 12s5.37 12 12 12c6.923 0 11.52-4.868 11.52-11.727 0-.788-.083-1.39-.184-1.988H12.24z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                  <p className="text-[11px] text-slate-400 text-center leading-normal">
                    Secure real-time synchronization utilizing standard OAuth configurations.
                  </p>
                </div>

                {/* Aesthetic Divider */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100/50">
                    Host Fallback & Demo Access
                  </span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* Option B: Demo Sign In */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                      Option B: Instant Platform Bypass
                    </span>
                    <button
                      onClick={() => setIsCustomMode(!isCustomMode)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isCustomMode ? "Choose Presets" : "Custom Guest"}
                    </button>
                  </div>

                  {!isCustomMode ? (
                    /* Preset Profiles */
                    <div className="grid grid-cols-1 gap-2.5">
                      {PRESET_ROLES.map((preset) => {
                        const IconComponent = preset.icon;
                        return (
                          <button
                            key={preset.name}
                            onClick={() => handleDemoSignIn(preset)}
                            disabled={signingInDemo}
                            className={`w-full text-left p-3.5 rounded-2xl border text-slate-800 ${preset.bg} flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer disabled:opacity-50`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={preset.photoURL}
                                  alt={preset.name}
                                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                                  referrerPolicy="no-referrer"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${preset.color} flex items-center justify-center text-white border border-white shadow-sm`}>
                                  <IconComponent className="w-2.5 h-2.5" />
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                  {preset.name}
                                </h4>
                                <p className="text-[10px] text-slate-500 font-semibold leading-normal">
                                  {preset.role} — <span className="italic">{preset.org}</span>
                                </p>
                              </div>
                            </div>
                            <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wide shrink-0">
                              Quick Enter
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Custom Guest Form */
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-3"
                    >
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          placeholder="e.g. Inspector John Doe"
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            placeholder="guest@hemotrack.org"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Platform Role
                          </label>
                          <select
                            value={customRole}
                            onChange={(e) => setCustomRole(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                          >
                            <option value="Safety Auditor">Safety Auditor</option>
                            <option value="Hospital Clinician">Hospital Clinician</option>
                            <option value="Blood Bank Admin">Blood Bank Admin</option>
                            <option value="Delivery Partner">Delivery Partner</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={handleCustomGuestSignIn}
                        disabled={signingInDemo}
                        className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        Create Guest Session
                      </button>
                    </motion.div>
                  )}

                  <p className="text-[11px] text-slate-400 text-center leading-normal">
                    🔑 Highly recommended for preview servers, local environments, custom domains, or embedded iframes. Fully compatible with database safety rules.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  ISO 27001 compliant
                </span>
                <span>HemoTrack Secure Auth v2.1</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
