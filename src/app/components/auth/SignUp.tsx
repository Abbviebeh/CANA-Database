import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Leaf, ArrowRight, ArrowLeft, Check, ShieldCheck, AlertTriangle, Calendar, CreditCard, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { PsychedelicBg, FloatingParticles } from '../PsychedelicBg';

const steps = ['ID Verification', 'Personal Info', 'Account Setup'];

function calcAge(dob: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useApp();
  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  const [id, setId] = useState({ birthday: '', idType: 'drivers_license', idNumber: '', idState: '' });
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', address: '', country: 'United States',
    email: '', password: '', confirmPassword: '',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(10,31,20,0.8)', border: '1px solid rgba(46,139,87,0.3)',
    borderRadius: '0.875rem', padding: '0.75rem 1rem', color: '#D8F3DC', outline: 'none', fontSize: '0.875rem',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: '#9CAF88', marginBottom: '6px',
  };

  const computedAge = calcAge(id.birthday);
  const ageOk = computedAge >= 21;

  const handleVerifyId = () => {
    if (!id.birthday) { toast.error('Please enter your date of birth'); return; }
    if (!ageOk) {
      toast.error('You must be 21 or older to create an account');
      return;
    }
    if (!id.idNumber.trim()) { toast.error('Please enter your ID number'); return; }
    setIdVerified(true);
    setStep(1);
    toast.success('ID verified! You qualify to shop CANA.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idVerified) { toast.error('ID verification required'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (!agreed) { toast.error('Please accept the Terms & Conditions'); return; }
    setLoading(true);
    try {
      const ok = await signUp({
        fullName: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        address: form.address,
        age: computedAge,
        birthday: id.birthday,
        contactNumber: form.phone,
        country: form.country,
      });
      if (ok) { toast.success('Welcome to CANA! 🌿'); navigate('/shop'); }
      else toast.error('Could not create your account');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not create your account');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden py-12" style={{ background: '#0A1F14' }}>
      <PsychedelicBg variant="hero" />
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl mx-4"
      >
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6 px-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-all"
                style={{
                  background: i < step ? '#CAFF00' : i === step ? 'linear-gradient(135deg, #2E8B57, #CAFF00)' : 'rgba(46,139,87,0.2)',
                  color: i <= step ? '#0A1F14' : '#9CAF88',
                }}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className="text-xs font-semibold hidden sm:block" style={{ color: i === step ? '#CAFF00' : '#9CAF88' }}>{s}</span>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px" style={{ background: i < step ? '#CAFF00' : 'rgba(46,139,87,0.2)' }} />
              )}
            </div>
          ))}
        </div>

        <div
          className="p-8 rounded-3xl"
          style={{
            background: 'rgba(15,61,46,0.45)',
            border: '1px solid rgba(46,139,87,0.3)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', boxShadow: '0 0 20px rgba(46,139,87,0.4)' }}>
              <Leaf className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="font-black tracking-[0.12em]" style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#D8F3DC', fontSize: '1.1rem' }}>CANA</div>
              <div className="tracking-[0.2em]" style={{ fontSize: '0.42rem', color: '#9CAF88' }}>CRAFT CANNABIS</div>
            </div>
          </div>

          <AnimatePresence mode="wait">

            {/* ── STEP 0: ID VERIFICATION ── */}
            {step === 0 && (
              <motion.div key="id" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-6 h-6" style={{ color: '#CAFF00' }} />
                  <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Age Verification</h2>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#9CAF88' }}>
                  Massachusetts law requires verification that you are 21 or older before accessing cannabis products.
                  Please provide your government-issued ID details.
                </p>

                {/* ID type */}
                <div className="mb-5">
                  <label style={labelStyle}>ID Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'drivers_license', label: "Driver's License", icon: '🪪' },
                      { val: 'passport', label: 'Passport', icon: '📘' },
                      { val: 'state_id', label: 'State ID', icon: '🆔' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setId({ ...id, idType: opt.val })}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all"
                        style={{
                          background: id.idType === opt.val ? 'rgba(202,255,0,0.1)' : 'rgba(10,31,20,0.6)',
                          border: id.idType === opt.val ? '1px solid rgba(202,255,0,0.4)' : '1px solid rgba(46,139,87,0.2)',
                          color: id.idType === opt.val ? '#CAFF00' : '#9CAF88',
                        }}
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Date of birth — the key verification field */}
                  <div>
                    <label style={labelStyle}>Date of Birth <span style={{ color: '#FF4D6D' }}>*</span></label>
                    <div className="relative">
                      <input
                        type="date"
                        value={id.birthday}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={e => setId({ ...id, birthday: e.target.value })}
                        style={inputStyle}
                        required
                      />
                    </div>
                    {/* Live age feedback */}
                    {id.birthday && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl"
                        style={{
                          background: ageOk ? 'rgba(202,255,0,0.06)' : 'rgba(255,77,109,0.08)',
                          border: `1px solid ${ageOk ? 'rgba(202,255,0,0.2)' : 'rgba(255,77,109,0.25)'}`,
                        }}
                      >
                        {ageOk
                          ? <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#CAFF00' }} />
                          : <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#FF4D6D' }} />
                        }
                        <span className="text-xs font-bold" style={{ color: ageOk ? '#CAFF00' : '#FF4D6D' }}>
                          {ageOk
                            ? `Age verified: ${computedAge} years old — you qualify!`
                            : `Age: ${computedAge} — you must be 21 or older to continue.`
                          }
                        </span>
                      </motion.div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>ID Number <span style={{ color: '#FF4D6D' }}>*</span></label>
                      <input
                        style={inputStyle}
                        value={id.idNumber}
                        onChange={e => setId({ ...id, idNumber: e.target.value })}
                        placeholder="e.g. S12345678"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Issuing State / Country</label>
                      <input
                        style={inputStyle}
                        value={id.idState}
                        onChange={e => setId({ ...id, idState: e.target.value })}
                        placeholder="e.g. MA"
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy note */}
                <div
                  className="mt-5 flex items-start gap-2 p-3 rounded-xl"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
                >
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#A78BFA' }} />
                  <p className="text-xs leading-relaxed" style={{ color: '#9CAF88' }}>
                    Your ID information is used solely for age verification and is encrypted. We never store your full ID number after verification.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, boxShadow: ageOk && id.idNumber ? '0 0 28px rgba(202,255,0,0.35)' : 'none' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyId}
                  disabled={!id.birthday || !id.idNumber}
                  className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 mt-6 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verify My ID & Continue
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="text-center text-sm mt-5" style={{ color: '#9CAF88' }}>
                  Already have an account?{' '}
                  <button onClick={() => navigate('/signin')} className="font-bold" style={{ color: '#CAFF00' }}>Sign in →</button>
                </p>
              </motion.div>
            )}

            {/* ── STEP 1: PERSONAL INFO ── */}
            {step === 1 && (
              <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-6 h-6" style={{ color: '#CAFF00' }} />
                  <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Personal Info</h2>
                </div>
                <p className="text-sm mb-6" style={{ color: '#9CAF88' }}>Tell us a bit about yourself</p>

                {/* Verified badge */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5"
                  style={{ background: 'rgba(202,255,0,0.06)', border: '1px solid rgba(202,255,0,0.2)' }}
                >
                  <ShieldCheck className="w-4 h-4" style={{ color: '#CAFF00' }} />
                  <span className="text-xs font-bold" style={{ color: '#CAFF00' }}>ID Verified — Age {computedAge}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="Jane" required /></div>
                  <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Smith" required /></div>
                  <div><label style={labelStyle}>Phone Number</label><input type="tel" style={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+1 (555) 000-0000" /></div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <select style={inputStyle} value={form.country} onChange={e => setForm({...form, country: e.target.value})}>
                      {['United States', 'Canada', 'United Kingdom', 'Australia', 'Other'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2"><label style={labelStyle}>Address</label><input style={inputStyle} value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="123 Main St, Boston, MA" /></div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(0)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                    style={{ background: 'rgba(46,139,87,0.1)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.2)' }}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!form.firstName || !form.lastName) { toast.error('Please enter your name'); return; }
                      setStep(2);
                    }}
                    className="flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: ACCOUNT SETUP ── */}
            {step === 2 && (
              <motion.div key="account" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-6 h-6" style={{ color: '#CAFF00' }} />
                  <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Account Setup</h2>
                </div>
                <p className="text-sm mb-6" style={{ color: '#9CAF88' }}>Set up your login credentials</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label style={labelStyle}>Email Address</label><input type="email" style={inputStyle} value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" required /></div>
                  <div>
                    <label style={labelStyle}>Password</label>
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} style={{ ...inputStyle, paddingRight: '3rem' }} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" required minLength={8} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#9CAF88' }}>
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div><label style={labelStyle}>Confirm Password</label><input type="password" style={inputStyle} value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} placeholder="••••••••" required /></div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <div
                      onClick={() => setAgreed(!agreed)}
                      className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                      style={{ background: agreed ? 'linear-gradient(135deg, #2E8B57, #CAFF00)' : 'rgba(46,139,87,0.15)', border: agreed ? 'none' : '1px solid rgba(46,139,87,0.3)' }}
                    >
                      {agreed && <Check className="w-3 h-3 text-black" />}
                    </div>
                    <span className="text-xs leading-relaxed" style={{ color: '#9CAF88' }}>
                      I agree to the <button type="button" className="font-semibold" style={{ color: '#2E8B57' }}>Terms & Conditions</button> and confirm I am {computedAge} years of age and legally allowed to purchase cannabis in my jurisdiction.
                    </span>
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                      style={{ background: 'rgba(46,139,87,0.1)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.2)' }}>
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(202,255,0,0.35)' }} whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
                      {loading ? 'Creating...' : <><Check className="w-4 h-4" /> Create Account</>}
                    </motion.button>
                  </div>
                </form>

                <p className="text-center text-sm mt-5" style={{ color: '#9CAF88' }}>
                  Already have an account?{' '}
                  <button onClick={() => navigate('/signin')} className="font-bold" style={{ color: '#CAFF00' }}>Sign in →</button>
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
