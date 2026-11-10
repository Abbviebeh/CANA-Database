import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Mail, Send, Leaf } from 'lucide-react';
import { PsychedelicBg, FloatingParticles } from '../components/PsychedelicBg';

const locations = [
  { name: 'CANA Norton', address: '242 Mansfield Ave., Norton, MA 02766', phone: '(508) 622-7077', hours: 'Open 9am–11pm Daily', color: '#CAFF00' },
  { name: 'CANA Fairhaven', address: '240 Bridge St., Fairhaven, MA 02719', phone: '(508) 974-9555', hours: 'Open 9am–9pm Daily', color: '#00D4AA' },
  { name: 'CANA New Bedford', address: '2121 Phillips Rd., New Bedford, MA 02745', phone: '(508) 817-1818', hours: 'Open 8am–10pm Daily', color: '#A78BFA' },
];

export const ContactPage = () => {
  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(10,31,20,0.8)', border: '1px solid rgba(46,139,87,0.3)',
    borderRadius: '0.875rem', padding: '0.875rem 1rem', color: '#D8F3DC', outline: 'none', fontSize: '0.875rem',
  };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CAF88', marginBottom: '6px' };

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <PsychedelicBg variant="hero" />
        <FloatingParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#2E8B57' }}>Reach Out</p>
          <h1 className="font-black mb-4" style={{ color: '#D8F3DC' }}>Contact Us</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#9CAF88' }}>
            Have a question? We're here to help. Visit one of our Massachusetts locations or drop us a message.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Location cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(15,61,46,0.4)', border: `1px solid ${loc.color}22`, backdropFilter: 'blur(20px)', borderTopColor: loc.color, borderTopWidth: '3px' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${loc.color}22` }}>
                  <Leaf className="w-4 h-4" style={{ color: loc.color }} />
                </div>
                <h3 className="font-black" style={{ color: loc.color }}>{loc.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: loc.color }} />
                  <p className="text-sm" style={{ color: '#9CAF88' }}>{loc.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: loc.color }} />
                  <p className="text-sm" style={{ color: '#9CAF88' }}>{loc.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: loc.color }} />
                  <p className="text-sm font-semibold" style={{ color: loc.color }}>{loc.hours}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl"
            style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.25)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6" style={{ color: '#CAFF00' }} />
              <h2 className="font-black text-xl" style={{ color: '#D8F3DC' }}>Send a Message</h2>
            </div>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} placeholder="Jane" /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} placeholder="Smith" /></div>
              </div>
              <div><label style={labelStyle}>Email Address</label><input type="email" style={inputStyle} placeholder="you@example.com" /></div>
              <div><label style={labelStyle}>Subject</label><input style={inputStyle} placeholder="Product question, store info..." /></div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="Tell us how we can help..." />
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(202,255,0,0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}
              >
                <Send className="w-4 h-4" /> Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
