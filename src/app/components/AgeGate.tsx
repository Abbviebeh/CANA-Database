import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

interface AgeGateProps {
  onVerified: () => void;
  onUnder21: () => void;
}

export const AgeGate = ({ onVerified, onUnder21 }: AgeGateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a2e1a 0%, #0f3d22 30%, #1a5c35 60%, #0d3320 100%)',
      }}
    >
      {/* Layered radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full"
          style={{ background: 'radial-gradient(circle, #22c55e33 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[65%] rounded-full"
          style={{ background: 'radial-gradient(circle, #16a34a44 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full"
          style={{ background: 'radial-gradient(circle, #4ade8022 0%, transparent 70%)' }}
        />
      </div>

      {/* Subtle leaf pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C15 5 5 20 5 30 C5 45 20 55 30 55 C25 45 22 35 30 20 C38 35 35 45 30 55 C40 55 55 45 55 30 C55 20 45 5 30 5Z' fill='%2322c55e'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full"
      >
        {/* Leaf icon accent */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 14 }}
          className="mb-5"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 32px #22c55e55' }}
          >
            <Leaf className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.15em' }}
          transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
          className="text-white font-black mb-2"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 6rem)', lineHeight: 1 }}
        >
          CANA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-300/80 tracking-[0.35em] text-xs mb-8"
          style={{ fontWeight: 500 }}
        >
          CRAFT CANNABIS
        </motion.p>

        {/* Divider with leaf */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-3 mb-8 w-full justify-center"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400/40" />
          <Leaf className="w-3 h-3 text-green-400/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400/40" />
        </motion.div>

        {/* Age message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-green-100/80 text-base mb-7 tracking-wide"
        >
          you must be 21 or older to enter
        </motion.p>

        {/* Yes button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 28px #22c55e66' }}
          whileTap={{ scale: 0.97 }}
          onClick={onVerified}
          className="w-full py-4 rounded-full text-white font-bold text-lg tracking-wide mb-4 transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
            boxShadow: '0 4px 20px #22c55e44',
          }}
        >
          Yes, I'm Over 21
        </motion.button>

        {/* Under-21 link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          whileHover={{ color: '#86efac' }}
          onClick={onUnder21}
          className="text-green-400/60 underline underline-offset-4 text-sm tracking-wide transition-colors cursor-pointer bg-transparent border-none"
        >
          I need to verify my age — Sign Up
        </motion.button>

        {/* Legal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="mt-10 text-green-300/30 text-xs leading-relaxed max-w-xs"
        >
          By continuing, you are personally requesting to receive information about our latest
          prices, specials, and promotions.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
