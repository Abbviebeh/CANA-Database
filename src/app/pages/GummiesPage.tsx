import { motion } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PsychedelicBg, FloatingParticles } from '../components/PsychedelicBg';

export const GummiesPage = () => {
  const gummies = products.filter(p => p.category === 'gummies');

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      <section className="relative py-20 overflow-hidden">
        <PsychedelicBg variant="hero" />
        <FloatingParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#2E8B57' }}>Premium Edibles</p>
          <h1 className="font-black mb-4" style={{ color: '#D8F3DC' }}>CANA Gummies</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CAF88' }}>
            Carefully dosed, single-origin Massachusetts cannabis gummies. Every piece is crafted to
            meet our exacting quality standards — clean, consistent, and delicious.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            {['🌿 100% Vegan', '🔬 Lab Tested', '📍 Locally Crafted', '⚡ Consistent Dosing'].map(b => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(46,139,87,0.15)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.25)' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gummies.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>
    </div>
  );
};
