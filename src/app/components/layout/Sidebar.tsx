import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Package, Coffee, Info, User, Heart, ShoppingBag, Phone, Leaf, ShoppingCart, LogIn, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const mainItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Package, label: 'Shop All', path: '/shop' },
    { icon: Package, label: 'Gummies', path: '/gummies' },
    { icon: Coffee, label: 'Beverages', path: '/beverages' },
    { icon: Info, label: 'About Us', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' },
    { icon: ShieldCheck, label: 'Admin Portal', path: '/admin' },
  ];

  const userItems = user
    ? [
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist' },
        { icon: ShoppingBag, label: 'My Orders', path: '/orders' },
        { icon: ShoppingCart, label: 'Cart', path: '/cart' },
      ]
    : [
        { icon: LogIn, label: 'Sign In', path: '/signin' },
        { icon: User, label: 'Create Account', path: '/signup' },
      ];

  const go = (path: string) => { navigate(path); onClose(); };
  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed left-0 top-0 h-full w-80 z-50 overflow-y-auto flex flex-col"
            style={{
              background: 'linear-gradient(180deg, #0A1F14 0%, #0F3D2E 100%)',
              borderRight: '1px solid rgba(46,139,87,0.2)',
            }}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(46,139,87,0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)' }}>
                  <Leaf className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="font-black tracking-[0.12em]" style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#D8F3DC', fontSize: '1rem' }}>CANA</div>
                  <div className="tracking-[0.2em]" style={{ fontSize: '0.42rem', color: '#9CAF88' }}>CRAFT CANNABIS</div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 transition-colors" style={{ color: '#9CAF88' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 flex-1">
              <p className="px-3 mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>Navigate</p>
              <div className="space-y-1">
                {mainItems.map(({ icon: Icon, label, path }) => (
                  <button
                    key={path}
                    onClick={() => go(path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      color: isActive(path) ? '#CAFF00' : '#9CAF88',
                      background: isActive(path) ? 'rgba(202,255,0,0.08)' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" style={{ color: isActive(path) ? '#CAFF00' : '#2E8B57' }} />
                    {label}
                  </button>
                ))}
              </div>
              <div className="my-6 border-t" style={{ borderColor: 'rgba(46,139,87,0.15)' }} />
              <p className="px-3 mb-3 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#9CAF88' }}>{user ? 'My Account' : 'Account'}</p>
              <div className="space-y-1">
                {userItems.map(({ icon: Icon, label, path }) => (
                  <button
                    key={path}
                    onClick={() => go(path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ color: isActive(path) ? '#CAFF00' : '#9CAF88', background: isActive(path) ? 'rgba(202,255,0,0.08)' : 'transparent' }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" style={{ color: isActive(path) ? '#CAFF00' : '#2E8B57' }} />
                    {label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-6 border-t" style={{ borderColor: 'rgba(46,139,87,0.15)' }}>
              <div className="w-full h-16 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: 'rgba(46,139,87,0.08)', border: '1px solid rgba(46,139,87,0.2)' }}>
                <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl" style={{ background: '#8B5CF6', opacity: 0.25 }} />
                <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full blur-2xl" style={{ background: '#00D4AA', opacity: 0.2 }} />
                <p className="text-xs text-center relative z-10" style={{ color: '#9CAF88' }}>
                  © 2026 CANA Craft Cannabis<br />
                  <span style={{ color: '#2E8B57' }}>Massachusetts</span>
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
