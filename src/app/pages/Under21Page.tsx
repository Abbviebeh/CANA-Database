import { motion } from 'motion/react';
import { ShieldAlert, Clock, BookOpen, Heart, ArrowLeft } from 'lucide-react';

const reasons = [
  {
    icon: ShieldAlert,
    title: 'Brain Development',
    description:
      'The human brain continues developing until around age 25. Cannabis use before 21 can interfere with memory, learning, and cognitive development in ways that may be long-lasting.',
  },
  {
    icon: Clock,
    title: 'Mental Health Risks',
    description:
      'Young people are more vulnerable to cannabis-related mental health effects, including increased risk of anxiety, depression, and in rare cases, psychosis.',
  },
  {
    icon: BookOpen,
    title: 'Legal Requirement',
    description:
      'Massachusetts law requires you to be 21 or older to purchase or possess cannabis products. We take this responsibility seriously and strictly enforce age compliance.',
  },
  {
    icon: Heart,
    title: 'Your Future Self',
    description:
      "Waiting until 21 protects your long-term wellbeing. There's no rush — CANA will be here when the time is right, and you'll enjoy it more responsibly.",
  },
];

export const Under21Page = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-16">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-900/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-emerald-600/40 bg-emerald-900/20 mb-8"
        >
          <ShieldAlert className="w-12 h-12 text-emerald-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
        >
          Come Back When
          <br />
          <span className="text-emerald-400">You're 21</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-lg mb-14 leading-relaxed max-w-md mx-auto"
        >
          We appreciate your honesty. CANA is committed to responsible cannabis — here's why the
          age minimum matters.
        </motion.p>

        {/* Reason cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14 text-left">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-600/40 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-600/30 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-lg">{title}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-white/10 mx-auto mb-10" />

        {/* CANA branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-1">CANA</p>
          <p className="text-white/15 text-xs tracking-[0.2em] uppercase">Craft Cannabis</p>
        </motion.div>

        {/* Back hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white/20 text-xs"
        >
          Please close this tab or return when you meet the age requirement.
        </motion.p>
      </div>
    </div>
  );
};
