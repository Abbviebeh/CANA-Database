import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { AgeGate } from './components/AgeGate';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { GummiesPage } from './pages/GummiesPage';
import { BeveragesPage } from './pages/BeveragesPage';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ProfilePage } from './pages/ProfilePage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Under21Page } from './pages/Under21Page';
import { RequireAuth } from './components/RequireAuth';
import { AdminPage } from './pages/AdminPage';

function AppInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ageVerified, setAgeVerified] = useState(() =>
    sessionStorage.getItem('cana_age_verified') === 'true'
  );

  const location = useLocation();
  const navigate = useNavigate();
  const isUnder21 = location.pathname === '/under-21';
  const isAdmin = location.pathname.startsWith('/admin');

  if (isUnder21) return <Under21Page />;

  if (isAdmin) return <><Toaster position="top-right" /><Routes><Route path="/admin/*" element={<AdminPage />} /></Routes></>;

  if (!ageVerified) {
    return (
      <AnimatePresence>
        <AgeGate
          key="age-gate"
          onVerified={() => {
            sessionStorage.setItem('cana_age_verified', 'true');
            setAgeVerified(true);
          }}
          onUnder21={() => navigate('/signup')}
        />
      </AnimatePresence>
    );
  }

  return (
    <div style={{ background: '#0A1F14', minHeight: '100vh' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#0F3D2E', color: '#D8F3DC', border: '1px solid rgba(46,139,87,0.4)' },
          className: 'font-semibold',
        }}
      />
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<RequireAuth><ShopPage /></RequireAuth>} />
        <Route path="/gummies" element={<RequireAuth><GummiesPage /></RequireAuth>} />
        <Route path="/beverages" element={<RequireAuth><BeveragesPage /></RequireAuth>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/under-21" element={<Under21Page />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </BrowserRouter>
  );
}
