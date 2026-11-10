import { motion } from 'motion/react';
import { ShieldAlert, Leaf, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { PsychedelicBg } from './PsychedelicBg';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useApp();
  const navigate = useNavigate();

  if (user) return <>{children}</>;

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden" style={{ background: '#0A1F14' }}>
      <PsychedelicBg variant="hero" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4 text-center"
      >
        {/* Glow ring */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(46,139,87,0.1) 100%)',
            border: '1px solid rgba(139,92,246,0.4)',
            boxShadow: '0 0 40px rgba(139,92,246,0.25)',
          }}
        >
          <ShieldAlert className="w-10 h-10" style={{ color: '#A78BFA' }} />
        </div>

        <div
          className="p-8 rounded-3xl"
          style={{
            background: 'rgba(15,61,46,0.45)',
            border: '1px solid rgba(46,139,87,0.25)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)' }}>
              <Leaf className="w-4 h-4 text-black" />
            </div>
            <span className="font-black tracking-[0.12em]" style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#D8F3DC' }}>CANA</span>
          </div>

          <h2 className="font-black text-2xl mb-3" style={{ color: '#D8F3DC' }}>
            Members Only
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#9CAF88' }}>
            You must be signed in with a verified account to browse and purchase CANA products.
            Create your free account — it takes under a minute.
          </p>

          {/* Age badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold"
            style={{ background: 'rgba(202,255,0,0.08)', border: '1px solid rgba(202,255,0,0.2)', color: '#CAFF00' }}
          >
            🔞 Must be 21+ · ID verification required
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(202,255,0,0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/signup')}
              className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}
            >
              <UserPlus className="w-4 h-4" />
              Create Free Account
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/signin')}
              className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              style={{
                background: 'rgba(46,139,87,0.12)',
                color: '#9CAF88',
                border: '1px solid rgba(46,139,87,0.25)',
              }}
            >
              <LogIn className="w-4 h-4" />
              Sign In to Existing Account
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
