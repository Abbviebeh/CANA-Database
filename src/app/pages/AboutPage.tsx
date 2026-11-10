import { motion } from 'motion/react';
import { Leaf, Award, Shield, Heart, MapPin, Phone, Clock, Flame, Wind, Flower } from 'lucide-react';
import { PsychedelicBg, FloatingParticles } from '../components/PsychedelicBg';

const storeLocations = [
  { name: 'CANA Norton', address: '242 Mansfield Ave., Norton, MA 02766', phone: '(508) 622-7077', hours: 'Open 9am–11pm Daily', color: '#CAFF00' },
  { name: 'CANA Fairhaven', address: '240 Bridge St., Fairhaven, MA 02719', phone: '(508) 974-9555', hours: 'Open 9am–9pm Daily', color: '#00D4AA' },
  { name: 'CANA New Bedford', address: '2121 Phillips Rd., New Bedford, MA 02745', phone: '(508) 817-1818', hours: 'Open 8am–10pm Daily', color: '#A78BFA' },
];

const craftLineup = [
  { label: 'Pre-Rolls', icon: Flame, color: '#FB923C' },
  { label: 'Edibles', icon: Leaf, color: '#CAFF00' },
  { label: 'Vapes & Disposables', icon: Wind, color: '#00D4AA' },
  { label: 'Flower', icon: Flower, color: '#F472B6' },
];

const reasons = [
  { emoji: '😌', title: 'Calm & Happy', description: 'A balanced experience that takes the edge off and lifts your mood — without overdoing it.', color: '#00D4AA' },
  { emoji: '⚡', title: 'Relaxed & Energetic', description: "Whether you're winding down or staying in motion, Essentials fits wherever your day takes you.", color: '#CAFF00' },
  { emoji: '🎯', title: 'Consistent Dosing', description: "Every piece is dosed the same so you always know what you're getting — no surprises.", color: '#A78BFA' },
  { emoji: '✨', title: 'Accessible Quality', description: 'The same CANA standards at a price that makes sense for everyday use.', color: '#F472B6' },
];

export const AboutPage = () => (
  <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
    {/* Hero */}
    <section className="relative py-20 overflow-hidden">
      <PsychedelicBg variant="hero" />
      <FloatingParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#2E8B57' }}>Our Story</p>
        <h1 className="font-black mb-4" style={{ color: '#D8F3DC' }}>About CANA</h1>
        <p className="text-xl" style={{ color: '#9CAF88' }}>CANA Craft Cannabis</p>
      </div>
    </section>

    <div className="max-w-6xl mx-auto px-6 pb-24 space-y-12">
      {/* Brand story */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="p-8 rounded-3xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
        <h2 className="font-black text-2xl mb-5" style={{ color: '#D8F3DC' }}>Our Story</h2>
        <div className="space-y-4 text-base leading-relaxed" style={{ color: '#9CAF88' }}>
          <p><strong style={{ color: '#CAFF00' }}>CANA Brand</strong> is our in-house line of single-origin Massachusetts cannabis held to the same standard as every craft producer on our menu.</p>
          <p>Part of the <strong style={{ color: '#CAFF00' }}>CANA Essentials</strong> lineup, these gummies are thoughtfully crafted and carefully dosed to meet our quality standards while staying accessible. Clean, consistent, and made for everyday life — because everyone deserves the good stuff.</p>
        </div>

        <div className="mt-8">
          <h3 className="font-black text-lg mb-5" style={{ color: '#D8F3DC' }}>CANA Craft Lineup</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {craftLineup.map(({ label, icon: Icon, color }) => (
              <div key={label} className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all hover:scale-105"
                style={{ background: 'rgba(10,31,20,0.6)', border: `1px solid ${color}33` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <span className="font-bold text-sm text-center" style={{ color: '#D8F3DC' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why You'll Love */}
      <div>
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#F472B6' }}>Benefits</p>
          <h2 className="font-black" style={{ color: '#D8F3DC' }}>Why You'll <span style={{ color: '#CAFF00' }}>Love</span> Our CANA Gummies!</h2>
          <p className="mt-2" style={{ color: '#9CAF88' }}>Four reasons that make every piece worth it.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: `1px solid ${r.color}22`, backdropFilter: 'blur(20px)' }}>
              <div className="text-4xl mb-4">{r.emoji}</div>
              <h3 className="font-black text-xl mb-3" style={{ color: r.color }}>{r.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9CAF88' }}>{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { icon: Shield, title: 'Lab Tested', desc: 'Rigorously tested for safety, potency, and purity', color: '#00D4AA' },
          { icon: Heart, title: 'Customer First', desc: 'Dedicated to providing exceptional products and service', color: '#F472B6' },
          { icon: Leaf, title: 'Premium Quality', desc: '100% vegan, organic ingredients from trusted sources', color: '#CAFF00' },
          { icon: Award, title: 'Single-Origin MA', desc: 'Grown and crafted right here in Massachusetts', color: '#A78BFA' },
        ].map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: `1px solid ${color}22`, backdropFilter: 'blur(20px)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}22` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <h3 className="font-black text-lg mb-2" style={{ color: '#D8F3DC' }}>{title}</h3>
            <p className="text-sm" style={{ color: '#9CAF88' }}>{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stores */}
      <div>
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#2E8B57' }}>Visit Us</p>
          <h2 className="font-black" style={{ color: '#D8F3DC' }}>Find Us Near You</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {storeLocations.map((store, i) => (
            <motion.div key={store.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', borderTop: `3px solid ${store.color}`, border: `1px solid ${store.color}22`, backdropFilter: 'blur(20px)' }}>
              <h3 className="font-black mb-4" style={{ color: store.color }}>{store.name}</h3>
              <div className="space-y-3">
                {[[MapPin, store.address], [Phone, store.phone], [Clock, store.hours]].map(([Icon, value]: any, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: store.color }} />
                    <span className="text-sm" style={{ color: j === 2 ? store.color : '#9CAF88', fontWeight: j === 2 ? 600 : 400 }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="relative rounded-3xl p-12 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(46,139,87,0.3), rgba(139,92,246,0.2))', border: '1px solid rgba(46,139,87,0.3)', backdropFilter: 'blur(20px)' }}>
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)', opacity: 0.3 }} />
        <Leaf className="w-10 h-10 mx-auto mb-4" style={{ color: '#CAFF00' }} />
        <h2 className="font-black text-3xl mb-3" style={{ color: '#D8F3DC' }}>Join the CANA Family</h2>
        <p className="mb-8 text-base" style={{ color: '#9CAF88' }}>Discover why Massachusetts trusts CANA for their everyday cannabis needs.</p>
        <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(202,255,0,0.4)' }} whileTap={{ scale: 0.97 }}
          onClick={() => window.location.href = '/shop'}
          className="px-10 py-4 rounded-full font-black text-sm"
          style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  </div>
);
