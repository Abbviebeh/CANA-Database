import { motion } from 'motion/react';
import { ArrowRight, Leaf, Shield, Zap, Star, ChevronRight, Sparkles, Flame, Wind } from 'lucide-react';
import { useNavigate } from 'react-router';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PsychedelicBg, FloatingParticles } from '../components/PsychedelicBg';

const reviews = [
  { name: 'Sarah M.', rating: 5, text: 'Berry Bliss is absolutely incredible. The energy boost is clean and the flavor is perfect. CANA has become my go-to brand.', product: 'Berry Bliss Gummies' },
  { name: 'James T.', rating: 5, text: 'Citrus Calm changed my relationship with cannabis. Perfect balance, no anxiety, just pure relaxation. Highly recommend.', product: 'Citrus Calm Gummies' },
  { name: 'Maya R.', rating: 5, text: 'The Mint Chill beverage is my nightly ritual now. Incredible quality, consistent dosing, and the taste is refreshing.', product: 'Mint Chill Beverage' },
  { name: 'Daniel K.', rating: 4, text: 'Lavender Night is the best sleep product I have tried. Woke up feeling rested and clear-headed. Will buy again.', product: 'Lavender Night Gummies' },
];

const guideItems = [
  { icon: '🍃', title: 'Sativa', color: '#FB923C', desc: 'Energizing and uplifting. Great for daytime use, creativity, and socializing.' },
  { icon: '🌙', title: 'Indica', color: '#A78BFA', desc: 'Relaxing and calming. Ideal for evenings, sleep support, and stress relief.' },
  { icon: '⚖️', title: 'Hybrid', color: '#00D4AA', desc: 'Balanced effects from both worlds. Flexible for any time of day.' },
  { icon: '💊', title: 'CBD', color: '#CAFF00', desc: 'Non-intoxicating wellness. Supports anxiety, inflammation, and recovery.' },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const featured = products.filter(p => p.availability.inStock).slice(0, 6);
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.filter(p => p.availability.inStock).slice(2, 6);

  return (
    <div className="min-h-screen" style={{ background: '#0A1F14' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <PsychedelicBg variant="hero" />
        <FloatingParticles />

        {/* Mesh grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(46,139,87,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,139,87,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
              style={{ background: 'rgba(202,255,0,0.08)', border: '1px solid rgba(202,255,0,0.2)', color: '#CAFF00' }}
            >
              <Sparkles className="w-4 h-4" />
              Single-Origin Massachusetts Cannabis
            </motion.div>

            <h1 className="font-black mb-6 leading-[1.05]" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              <span style={{ color: '#D8F3DC' }}>Elevate</span><br />
              <span style={{
                background: 'linear-gradient(135deg, #2E8B57 0%, #9CAF88 40%, #CAFF00 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Your Experience
              </span>
            </h1>

            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#9CAF88', maxWidth: '500px' }}>
              Premium craft cannabis gummies and beverages, thoughtfully dosed and carefully crafted
              to meet the highest quality standards. Clean, consistent, and made for everyday life.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(202,255,0,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(202,255,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/about')}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all"
                style={{ border: '1px solid rgba(46,139,87,0.4)', color: '#9CAF88', background: 'rgba(46,139,87,0.08)' }}
              >
                Explore Collection
              </motion.button>
            </div>

            <div className="flex items-center gap-8 mt-10">
              {[['500+', 'Products'], ['50K+', 'Happy Customers'], ['3', 'MA Locations']].map(([val, lab]) => (
                <div key={lab}>
                  <div className="font-black text-2xl" style={{ color: '#CAFF00', fontFamily: "'Josefin Sans', sans-serif" }}>{val}</div>
                  <div className="text-xs" style={{ color: '#9CAF88' }}>{lab}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product showcase cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(15,61,46,0.5)',
                  border: '1px solid rgba(46,139,87,0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.5), 0 0 40px rgba(46,139,87,0.15)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1771718779459-84ce97f06d95?w=600&h=400&fit=crop&auto=format"
                  alt="Premium cannabis gummies"
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black" style={{ color: '#D8F3DC' }}>Berry Bliss Gummies</h3>
                    <span className="font-black text-xl" style={{ color: '#CAFF00' }}>$24.99</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(251,146,60,0.15)', color: '#FB923C' }}>Sativa</span>
                    <span className="text-xs font-mono" style={{ color: '#9CAF88' }}>10mg THC</span>
                    <div className="flex ml-auto">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5" fill="#CAFF00" style={{ color: '#CAFF00' }} />)}</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating mini cards */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-8 p-3 rounded-2xl flex items-center gap-3"
                style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', backdropFilter: 'blur(16px)' }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.3)' }}>
                  <span className="text-lg">🍇</span>
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: '#D8F3DC' }}>Lavender Night</div>
                  <div className="text-xs" style={{ color: '#A78BFA' }}>Indica · Sleep</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-6 -right-6 px-4 py-3 rounded-2xl"
                style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.3)', backdropFilter: 'blur(16px)' }}
              >
                <div className="text-xs font-bold" style={{ color: '#00D4AA' }}>✓ Lab Tested</div>
                <div className="text-xs" style={{ color: '#9CAF88' }}>Single-Origin MA</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: '#9CAF88' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #2E8B57, transparent)' }} />
        </motion.div>
      </section>

      {/* ── BENEFITS BAR ──────────────────────────────── */}
      <section className="py-8 border-y" style={{ background: 'rgba(15,61,46,0.3)', borderColor: 'rgba(46,139,87,0.15)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌿', label: '100% Vegan', sub: 'Plant-based' },
              { icon: '🔬', label: 'Lab Tested', sub: 'Third-party verified' },
              { icon: '📍', label: '3 MA Locations', sub: 'Norton · Fairhaven · New Bedford' },
              { icon: '⚡', label: 'Consistent Dosing', sub: 'No surprises' },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{b.icon}</span>
                <div className="text-sm font-bold" style={{ color: '#D8F3DC' }}>{b.label}</div>
                <div className="text-xs" style={{ color: '#9CAF88' }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#2E8B57' }}>Our Selection</p>
              <h2 className="font-black" style={{ color: '#D8F3DC' }}>Featured Products</h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: '#CAFF00' }}
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────── */}
      <section className="py-24" style={{ background: 'rgba(15,61,46,0.2)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#FB923C' }}>🔥 Most Popular</p>
              <h2 className="font-black" style={{ color: '#D8F3DC' }}>Best Sellers</h2>
            </div>
            <button onClick={() => navigate('/shop')} className="hidden sm:flex items-center gap-2 text-sm font-semibold" style={{ color: '#CAFF00' }}>
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#00D4AA' }}>✨ Just Dropped</p>
              <h2 className="font-black" style={{ color: '#D8F3DC' }}>New Arrivals</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────── */}
      <section className="py-24" style={{ background: 'rgba(15,61,46,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#F472B6' }}>Customer Love</p>
            <h2 className="font-black" style={{ color: '#D8F3DC' }}>What People Are Saying</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}
              >
                <div className="flex">{[...Array(r.rating)].map((_, j) => <Star key={j} className="w-4 h-4" fill="#CAFF00" style={{ color: '#CAFF00' }} />)}</div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#9CAF88' }}>"{r.text}"</p>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#D8F3DC' }}>{r.name}</div>
                  <div className="text-xs" style={{ color: '#2E8B57' }}>{r.product}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANNABIS GUIDE ─────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#8B5CF6' }}>Education</p>
            <h2 className="font-black" style={{ color: '#D8F3DC' }}>Cannabis Guide</h2>
            <p className="mt-3 text-base" style={{ color: '#9CAF88' }}>Understand your product before you shop</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideItems.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center group hover:scale-105 transition-transform"
                style={{ background: 'rgba(15,61,46,0.4)', border: `1px solid ${g.color}22`, backdropFilter: 'blur(20px)' }}
              >
                <div className="text-4xl mb-4">{g.icon}</div>
                <h3 className="font-black mb-2" style={{ color: g.color }}>{g.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9CAF88' }}>{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-10 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(46,139,87,0.3) 0%, rgba(139,92,246,0.2) 100%)', border: '1px solid rgba(46,139,87,0.3)', backdropFilter: 'blur(20px)' }}
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)', opacity: 0.3 }} />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #2E8B57, transparent)', opacity: 0.3 }} />
            <Leaf className="w-10 h-10 mx-auto mb-4" style={{ color: '#CAFF00' }} />
            <h2 className="font-black mb-3" style={{ color: '#D8F3DC' }}>Stay in the Loop</h2>
            <p className="mb-8 text-base" style={{ color: '#9CAF88' }}>Get exclusive deals, new product drops, and cannabis education straight to your inbox.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-xl outline-none text-sm"
                style={{ background: 'rgba(10,31,20,0.7)', border: '1px solid rgba(46,139,87,0.3)', color: '#D8F3DC' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className="border-t py-12" style={{ borderColor: 'rgba(46,139,87,0.15)', background: 'rgba(10,31,20,0.8)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)' }}>
                  <Leaf className="w-4 h-4 text-black" />
                </div>
                <span className="font-black tracking-[0.12em]" style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#D8F3DC' }}>CANA</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#9CAF88' }}>Single-origin Massachusetts craft cannabis. Clean, consistent, and made for everyday life.</p>
            </div>
            <div>
              <p className="font-bold mb-4 text-sm tracking-wide" style={{ color: '#D8F3DC' }}>Locations</p>
              {[['Norton', '242 Mansfield Ave · 9am–11pm'], ['Fairhaven', '240 Bridge St · 9am–9pm'], ['New Bedford', '2121 Phillips Rd · 8am–10pm']].map(([city, info]) => (
                <div key={city} className="mb-2">
                  <span className="text-sm font-semibold" style={{ color: '#2E8B57' }}>{city}</span>
                  <span className="text-xs ml-2" style={{ color: '#9CAF88' }}>{info}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold mb-4 text-sm tracking-wide" style={{ color: '#D8F3DC' }}>Links</p>
              {[['Shop', '/shop'], ['Gummies', '/gummies'], ['Beverages', '/beverages'], ['About', '/about'], ['Contact', '/contact']].map(([label, path]) => (
                <div key={label}>
                  <a href={path} className="text-sm transition-colors hover:text-white block mb-2" style={{ color: '#9CAF88' }}>{label}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t pt-6 text-center text-xs" style={{ borderColor: 'rgba(46,139,87,0.1)', color: '#9CAF88' }}>
            © 2026 CANA Craft Cannabis · Massachusetts · Must be 21+ to purchase
          </div>
        </div>
      </footer>
    </div>
  );
};
