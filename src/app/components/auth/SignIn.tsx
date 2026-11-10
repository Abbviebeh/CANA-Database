import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Leaf, ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { PsychedelicBg, FloatingParticles } from '../PsychedelicBg';

export const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await signIn(email, password);
      if (ok) { toast.success('Welcome back!'); navigate('/'); }
      else toast.error('Invalid email or password');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not sign in');
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', background: 'rgba(10,31,20,0.8)', border: '1px solid rgba(46,139,87,0.3)',
    borderRadius: '0.875rem', padding: '0.875rem 1rem', color: '#D8F3DC', outline: 'none', fontSize: '0.875rem',
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden" style={{ background: '#0A1F14' }}>
      <PsychedelicBg variant="hero" />
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="p-8 rounded-3xl"
          style={{ background: 'rgba(15,61,46,0.45)', border: '1px solid rgba(46,139,87,0.3)', backdropFilter: 'blur(24px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', boxShadow: '0 0 20px rgba(46,139,87,0.4)' }}>
              <Leaf className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="font-black tracking-[0.12em]" style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#D8F3DC', fontSize: '1.1rem' }}>CANA</div>
              <div className="tracking-[0.2em]" style={{ fontSize: '0.42rem', color: '#9CAF88' }}>CRAFT CANNABIS</div>
            </div>
          </div>

          <h2 className="font-black text-2xl mb-2" style={{ color: '#D8F3DC' }}>Welcome Back</h2>
          <p className="text-sm mb-8" style={{ color: '#9CAF88' }}>Sign in to your CANA account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-[0.12em] uppercase mb-2" style={{ color: '#9CAF88' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} required />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-[0.12em] uppercase mb-2" style={{ color: '#9CAF88' }}>Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle, paddingRight: '3rem' }} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#9CAF88' }}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: '#2E8B57' }} />
                <span className="text-sm" style={{ color: '#9CAF88' }}>Remember me</span>
              </label>
              <button type="button" className="text-sm font-semibold" style={{ color: '#2E8B57' }}>Forgot password?</button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(202,255,0,0.35)' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
              style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}
            >
              {loading ? 'Signing in...' : <><Lock className="w-4 h-4" /> Sign In <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#9CAF88' }}>
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="font-bold transition-colors hover:opacity-80" style={{ color: '#CAFF00' }}>Create one →</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
