import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star, Zap, Eye } from 'lucide-react';
import { Product } from '../../data/products';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const typeColors: Record<string, { bg: string; text: string; glow: string }> = {
  Sativa:  { bg: 'rgba(251,146,60,0.15)',  text: '#FB923C', glow: 'rgba(251,146,60,0.3)' },
  Indica:  { bg: 'rgba(139,92,246,0.15)',  text: '#A78BFA', glow: 'rgba(139,92,246,0.3)' },
  Hybrid:  { bg: 'rgba(0,212,170,0.15)',   text: '#00D4AA', glow: 'rgba(0,212,170,0.3)'  },
};

const effectColors: Record<string, string> = {
  Energy: '#CAFF00', Balance: '#00D4AA', Relaxation: '#A78BFA',
  Focus: '#FB923C', Sleep: '#8B5CF6',
};

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  const navigate = useNavigate();
  const { user, addToCart, wishlist, toggleWishlist } = useApp();
  const [hovered, setHovered] = useState(false);

  const type = typeColors[product.type] ?? typeColors.Hybrid;
  const effectColor = effectColors[product.effect] ?? '#9CAF88';

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { toast.error('Sign in to add items to cart'); navigate('/signin'); return; }
    addToCart({ id: product.id, name: product.name, type: product.type, price: product.price, image: product.image, category: product.category });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { toast.error('Sign in to save to wishlist'); navigate('/signin'); return; }
    toggleWishlist(product.id);
    toast.success(wishlist.includes(product.id) ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
      style={{
        background: 'rgba(15,61,46,0.4)',
        backdropFilter: 'blur(20px)',
        border: hovered ? '1px solid rgba(202,255,0,0.3)' : '1px solid rgba(46,139,87,0.2)',
        boxShadow: hovered ? '0 8px 40px rgba(202,255,0,0.12), 0 0 0 1px rgba(202,255,0,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Accent orb */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: type.glow, opacity: hovered ? 0.4 : 0.15, transition: 'opacity 0.3s' }} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'rgba(10,31,20,0.5)' }}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,31,20,0.8) 0%, transparent 60%)' }} />

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide"
          style={{ background: type.bg, color: type.text, border: `1px solid ${type.text}33` }}
        >
          {product.type}
        </div>

        {/* Wishlist button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{
            background: isWishlisted ? 'rgba(244,114,182,0.3)' : 'rgba(10,31,20,0.7)',
            border: `1px solid ${isWishlisted ? '#F472B6' : 'rgba(46,139,87,0.3)'}`,
          }}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? '#F472B6' : 'none'} style={{ color: isWishlisted ? '#F472B6' : '#9CAF88' }} />
        </motion.button>

        {/* Out of stock overlay */}
        {!product.availability.inStock && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(10,31,20,0.7)' }}>
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(255,77,109,0.2)', color: '#FF4D6D', border: '1px solid rgba(255,77,109,0.4)' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Effect + rating row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" style={{ color: effectColor }} />
            <span className="text-xs font-semibold" style={{ color: effectColor }}>{product.effect}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3" fill={i < 4 ? '#CAFF00' : 'none'} style={{ color: '#CAFF00' }} />
            ))}
          </div>
        </div>

        {/* Name + desc */}
        <div className="flex-1">
          <h3 className="font-bold mb-1" style={{ color: '#D8F3DC', fontSize: '1rem' }}>{product.name}</h3>
          <p className="text-xs leading-relaxed" style={{ color: '#9CAF88' }}>{product.description}</p>
        </div>

        {/* Ratio badge */}
        <div className="px-2.5 py-1 rounded-lg text-xs font-mono w-fit" style={{ background: 'rgba(46,139,87,0.15)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.2)' }}>
          {product.ratio}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="font-black text-xl" style={{ color: '#CAFF00' }}>${product.price}</span>
            <span className="text-xs ml-1" style={{ color: '#9CAF88' }}>/ pack</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCart}
            disabled={!product.availability.inStock}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: product.availability.inStock ? 'linear-gradient(135deg, #2E8B57, #CAFF00)' : 'rgba(46,139,87,0.2)',
              color: product.availability.inStock ? '#0A1F14' : '#9CAF88',
              boxShadow: product.availability.inStock && hovered ? '0 0 16px rgba(202,255,0,0.35)' : 'none',
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
