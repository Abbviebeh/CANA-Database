import { motion } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PsychedelicBg, FloatingParticles } from '../components/PsychedelicBg';

export const BeveragesPage = () => {
  const beverages = products.filter(p => p.category === 'beverages');

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      <section className="relative py-20 overflow-hidden">
        <PsychedelicBg variant="hero" />
        <FloatingParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#00D4AA' }}>Craft Drinks</p>
          <h1 className="font-black mb-4" style={{ color: '#D8F3DC' }}>CANA Beverages</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CAF88' }}>
            Refreshing cannabis-infused beverages crafted for every occasion. From energizing
            morning sips to relaxing evening rituals — every can is precisely dosed and delicious.
          </p>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beverages.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        </div>
      </section>
    </div>
  );
};
