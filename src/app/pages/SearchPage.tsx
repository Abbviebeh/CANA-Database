import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PsychedelicBg } from '../components/PsychedelicBg';

export const SearchPage = () => {
  const [query, setQuery] = useState('');

  const results = useMemo(() =>
    query.trim().length < 2 ? [] : products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.type.toLowerCase().includes(query.toLowerCase()) ||
      p.effect.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      <div className="relative py-16 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-black mb-6" style={{ color: '#D8F3DC' }}>Search Products</h1>
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: 'rgba(15,61,46,0.5)', border: '1px solid rgba(46,139,87,0.3)', backdropFilter: 'blur(20px)' }}>
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#9CAF88' }} />
            <input
              type="text"
              autoFocus
              placeholder="Search by name, type, or effect..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-base outline-none"
              style={{ color: '#D8F3DC', caretColor: '#CAFF00' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {query.trim().length >= 2 && (
          <p className="text-sm mb-6" style={{ color: '#9CAF88' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "<span style={{ color: '#CAFF00' }}>{query}</span>"
          </p>
        )}
        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.06} />)}
          </div>
        ) : query.trim().length >= 2 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🌿</p>
            <p className="font-bold text-lg mb-2" style={{ color: '#D8F3DC' }}>No products found</p>
            <p style={{ color: '#9CAF88' }}>Try a different search term</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
