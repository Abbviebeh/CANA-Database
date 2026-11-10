import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, Heart, Search, Menu, Leaf, LogOut, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, wishlist, signOut } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Gummies', path: '/gummies' },
    { label: 'Beverages', path: '/beverages' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <div
          className="backdrop-blur-2xl border-b"
          style={{
            background: 'rgba(10, 31, 20, 0.82)',
            borderColor: 'rgba(46, 139, 87, 0.2)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={onMenuClick}
                  className="lg:hidden p-2 rounded-xl transition-all hover:bg-white/5"
                  style={{ color: '#9CAF88' }}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #2E8B57, #CAFF00)',
                      boxShadow: '0 0 16px rgba(46,139,87,0.5)',
                    }}
                  >
                    <Leaf className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span
                      className="font-black tracking-[0.12em]"
                      style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.1rem', color: '#D8F3DC' }}
                    >
                      CANA
                    </span>
                    <span className="tracking-[0.25em] hidden sm:block" style={{ fontSize: '0.45rem', color: '#9CAF88' }}>
                      CRAFT CANNABIS
                    </span>
                  </div>
                </button>
              </div>

              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{ color: isActive(link.path) ? '#CAFF00' : '#9CAF88' }}
                  >
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(202,255,0,0.08)' }}
                      />
                    )}
                    <span className="relative z-10 hover:text-white transition-colors">{link.label}</span>
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-xl transition-all hover:bg-white/5"
                  style={{ color: '#9CAF88' }}
                >
                  {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
                {user && (
                  <button
                    onClick={() => navigate('/wishlist')}
                    className="relative p-2 rounded-xl transition-all hover:bg-white/5"
                    style={{ color: '#9CAF88' }}
                  >
                    <Heart className="w-5 h-5" />
                    {wishlist.length > 0 && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-black font-bold" style={{ fontSize: '0.5rem', background: '#F472B6' }}>
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                )}
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2 rounded-xl transition-all hover:bg-white/5"
                  style={{ color: '#9CAF88' }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-black font-bold" style={{ fontSize: '0.55rem', background: '#CAFF00' }}>
                      {cartCount}
                    </span>
                  )}
                </button>
                {user ? (
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => navigate('/profile')}
                      className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: 'rgba(46,139,87,0.15)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.3)' }}
                    >
                      <User className="w-4 h-4" style={{ color: '#2E8B57' }} />
                      <span>{user.fullName.split(' ')[0]}</span>
                    </button>
                    <button
                      onClick={() => { signOut(); navigate('/'); }}
                      className="p-2 rounded-xl transition-all hover:bg-red-500/10"
                      style={{ color: '#9CAF88' }}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => navigate('/signin')}
                      className="hidden sm:block px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{ color: '#9CAF88', background: 'rgba(46,139,87,0.1)', border: '1px solid rgba(46,139,87,0.2)' }}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="px-4 py-2 rounded-xl text-sm font-black transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14', boxShadow: '0 0 16px rgba(202,255,0,0.25)' }}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-b px-6 py-3"
              style={{ background: 'rgba(10, 31, 20, 0.95)', borderColor: 'rgba(46, 139, 87, 0.2)' }}
            >
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                <Search className="w-4 h-4 flex-shrink-0" style={{ color: '#9CAF88' }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                      setSearchOpen(false);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: '#D8F3DC', caretColor: '#CAFF00' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
