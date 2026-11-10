import { motion } from 'motion/react';

interface PsychedelicBgProps {
  variant?: 'hero' | 'subtle' | 'card';
  className?: string;
}

export const PsychedelicBg = ({ variant = 'subtle', className = '' }: PsychedelicBgProps) => {
  if (variant === 'card') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full blur-2xl opacity-15"
          style={{ background: 'radial-gradient(circle, #00D4AA, transparent)' }} />
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Large primary orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #2E8B57 0%, #0F3D2E 60%, transparent 100%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-10%] right-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, #4C1D95 50%, transparent 100%)' }}
        />
        {/* Accent orbs */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[20%] right-[15%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-[20%] left-[20%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #CAFF00 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
          className="absolute top-[50%] left-[40%] w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #F472B6 0%, transparent 70%)' }}
        />
        {/* Smoke texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
          }}
        />
      </div>
    );
  }

  // subtle variant
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #2E8B57, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] max-w-[400px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #00D4AA, transparent 70%)' }}
      />
    </div>
  );
};

export const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 8,
    color: ['#2E8B57', '#8B5CF6', '#00D4AA', '#CAFF00', '#F472B6'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
