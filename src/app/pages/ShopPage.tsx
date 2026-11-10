import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PsychedelicBg } from '../components/PsychedelicBg';

const categories = ['All', 'Gummies', 'Beverages'];
const effects = ['All', 'Energy', 'Balance', 'Relaxation', 'Focus', 'Sleep'];
const types = ['All', 'Sativa', 'Indica', 'Hybrid'];

export const ShopPage = () => {
  const [category, setCategory] = useState('All');
  const [effect, setEffect] = useState('All');
  const [type, setType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(30);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState('Featured');

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (category !== 'All' && p.category !== category.toLowerCase()) return false;
      if (effect !== 'All' && p.effect !== effect) return false;
      if (type !== 'All' && p.type !== type) return false;
      if (p.price > maxPrice) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sort === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, effect, type, maxPrice, search, sort]);

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <label className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>Search</label>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(10,31,20,0.7)', border: '1px solid rgba(46,139,87,0.2)' }}>
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#9CAF88' }} />
          <input
            type="text"
            placeholder="Product name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#D8F3DC' }}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>Category</label>
        <div className="space-y-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                color: category === c ? '#CAFF00' : '#9CAF88',
                background: category === c ? 'rgba(202,255,0,0.08)' : 'transparent',
                border: category === c ? '1px solid rgba(202,255,0,0.2)' : '1px solid transparent',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>Type</label>
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button key={t} onClick={() => setType(t)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: type === t ? 'rgba(139,92,246,0.2)' : 'rgba(46,139,87,0.08)',
                color: type === t ? '#A78BFA' : '#9CAF88',
                border: type === t ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(46,139,87,0.15)',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Effect */}
      <div>
        <label className="block mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>Effect</label>
        <div className="flex flex-wrap gap-2">
          {effects.map(e => (
            <button key={e} onClick={() => setEffect(e)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: effect === e ? 'rgba(0,212,170,0.15)' : 'rgba(46,139,87,0.08)',
                color: effect === e ? '#00D4AA' : '#9CAF88',
                border: effect === e ? '1px solid rgba(0,212,170,0.3)' : '1px solid rgba(46,139,87,0.15)',
              }}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="flex items-center justify-between mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>
          <span>Max Price</span>
          <span style={{ color: '#CAFF00' }}>${maxPrice}</span>
        </label>
        <input
          type="range" min={5} max={30} step={1} value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-emerald-500"
          style={{ accentColor: '#2E8B57' }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: '#9CAF88' }}>
          <span>$5</span><span>$30</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setCategory('All'); setEffect('All'); setType('All'); setMaxPrice(30); setSearch(''); }}
        className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
        style={{ border: '1px solid rgba(46,139,87,0.3)', color: '#9CAF88' }}
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      <div className="relative overflow-hidden py-16">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#2E8B57' }}>Our Collection</p>
          <h1 className="font-black mb-4" style={{ color: '#D8F3DC' }}>Shop All Products</h1>
          <p style={{ color: '#9CAF88' }}>Premium craft cannabis for every lifestyle and preference</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 p-6 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
              <h3 className="font-black mb-6" style={{ color: '#D8F3DC', fontSize: '1rem' }}>Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(46,139,87,0.15)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.25)' }}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-sm" style={{ color: '#9CAF88' }}>{filtered.length} products</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm outline-none cursor-pointer"
                  style={{ background: 'rgba(15,61,46,0.6)', border: '1px solid rgba(46,139,87,0.25)', color: '#D8F3DC' }}
                >
                  {['Featured', 'Price: Low to High', 'Price: High to Low'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-4xl mb-4">🌿</p>
                <p className="font-bold text-lg mb-2" style={{ color: '#D8F3DC' }}>No products found</p>
                <p style={{ color: '#9CAF88' }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.05} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-80 z-50 overflow-y-auto p-6"
            style={{ background: '#0F3D2E', borderRight: '1px solid rgba(46,139,87,0.2)' }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black" style={{ color: '#D8F3DC' }}>Filters</h3>
              <button onClick={() => setSidebarOpen(false)} style={{ color: '#9CAF88' }}><X className="w-5 h-5" /></button>
            </div>
            <FilterContent />
          </motion.div>
        </>
      )}
    </div>
  );
};
