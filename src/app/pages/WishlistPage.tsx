import { motion } from 'motion/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PsychedelicBg } from '../components/PsychedelicBg';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { user, wishlist } = useApp();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#0A1F14' }}>
        <div className="text-center p-12 rounded-3xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
          <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: '#F472B6', opacity: 0.4 }} />
          <h2 className="font-black text-2xl mb-3" style={{ color: '#D8F3DC' }}>Sign In to View Wishlist</h2>
          <p className="mb-8" style={{ color: '#9CAF88' }}>Save your favorite products to your wishlist.</p>
          <button onClick={() => navigate('/signin')} className="px-8 py-3 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      <div className="relative py-16 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6" style={{ color: '#F472B6' }} />
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#F472B6' }}>Saved Products</p>
          </div>
          <h1 className="font-black" style={{ color: '#D8F3DC' }}>My Wishlist</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: '#F472B6', opacity: 0.3 }} />
            <p className="font-bold text-xl mb-2" style={{ color: '#D8F3DC' }}>Your wishlist is empty</p>
            <p className="mb-8" style={{ color: '#9CAF88' }}>Heart products you love to save them here</p>
            <button onClick={() => navigate('/shop')} className="px-8 py-3.5 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Explore Products</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
          </div>
        )}
      </div>
    </div>
  );
};
