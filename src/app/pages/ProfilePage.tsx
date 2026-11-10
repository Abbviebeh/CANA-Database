import { products as allProductsData } from '../data/products';
import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Package, Heart, Settings, LogOut, Edit3, MapPin, Phone, Mail, Calendar, ChevronRight, Star, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { PsychedelicBg } from '../components/PsychedelicBg';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, signOut, orders, wishlist } = useApp();
  // use imported products data
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    navigate('/signin');
    return null;
  }

  const wishlistProducts = allProductsData.filter((p: any) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <PsychedelicBg variant="subtle" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2E8B57, #8B5CF6)', boxShadow: '0 0 30px rgba(46,139,87,0.4)', color: '#D8F3DC' }}
            >
              {user.fullName[0]}
            </div>
            <div>
              <h1 className="font-black" style={{ color: '#D8F3DC' }}>{user.fullName}</h1>
              <p className="text-sm" style={{ color: '#9CAF88' }}>{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(202,255,0,0.1)', color: '#CAFF00', border: '1px solid rgba(202,255,0,0.2)' }}>CANA Member</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.2)' }}>21+ Verified</span>
              </div>
            </div>
            <button
              onClick={() => { signOut(); navigate('/'); }}
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(255,77,109,0.1)', color: '#FF4D6D', border: '1px solid rgba(255,77,109,0.2)' }}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    color: activeTab === id ? '#CAFF00' : '#9CAF88',
                    background: activeTab === id ? 'rgba(202,255,0,0.08)' : 'transparent',
                    border: activeTab === id ? '1px solid rgba(202,255,0,0.2)' : '1px solid transparent',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: activeTab === id ? '#CAFF00' : '#2E8B57' }} />
                  {label}
                </button>
              ))}
            </div>
          </aside>

          {/* Mobile tabs */}
          <div className="md:hidden w-full mb-6 flex gap-2 overflow-x-auto pb-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0"
                style={{ color: activeTab === id ? '#CAFF00' : '#9CAF88', background: activeTab === id ? 'rgba(202,255,0,0.08)' : 'rgba(15,61,46,0.3)', border: `1px solid ${activeTab === id ? 'rgba(202,255,0,0.2)' : 'rgba(46,139,87,0.15)'}` }}>
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-lg" style={{ color: '#D8F3DC' }}>Personal Information</h3>
                    <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#2E8B57' }}><Edit3 className="w-4 h-4" /> Edit</button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { icon: User, label: 'Full Name', value: user.fullName },
                      { icon: Mail, label: 'Email', value: user.email },
                      { icon: Phone, label: 'Phone', value: user.phone || 'Not provided' },
                      { icon: MapPin, label: 'Address', value: user.address || 'Not provided' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(10,31,20,0.5)' }}>
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#2E8B57' }} />
                        <div>
                          <p className="text-xs font-bold tracking-wide uppercase mb-1" style={{ color: '#9CAF88' }}>{label}</p>
                          <p className="text-sm font-semibold" style={{ color: '#D8F3DC' }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Orders', value: orders.length, color: '#CAFF00' },
                    { label: 'Wishlist Items', value: wishlist.length, color: '#F472B6' },
                    { label: 'Loyalty Points', value: '320', color: '#A78BFA' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="p-5 rounded-2xl text-center" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)' }}>
                      <p className="font-black text-3xl mb-1" style={{ color }}>{value}</p>
                      <p className="text-xs font-semibold" style={{ color: '#9CAF88' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="font-black text-lg mb-6" style={{ color: '#D8F3DC' }}>Order History</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl" style={{ background: 'rgba(15,61,46,0.3)', border: '1px solid rgba(46,139,87,0.15)' }}>
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: '#2E8B57' }} />
                    <p className="font-bold" style={{ color: '#D8F3DC' }}>No orders yet</p>
                    <p className="text-sm mt-1 mb-6" style={{ color: '#9CAF88' }}>Your order history will appear here</p>
                    <button onClick={() => navigate('/shop')} className="px-6 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Shop Now</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="p-5 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-black text-sm" style={{ color: '#D8F3DC' }}>Order #{order.id.slice(-6)}</p>
                            <p className="text-xs" style={{ color: '#9CAF88' }}>{order.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(0,212,170,0.15)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)' }}>{order.status}</span>
                            <span className="font-black" style={{ color: '#CAFF00' }}>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {order.items?.slice(0, 3).map((item: any) => (
                            <img key={item.id} src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="font-black text-lg mb-6" style={{ color: '#D8F3DC' }}>Saved Products</h3>
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl" style={{ background: 'rgba(15,61,46,0.3)', border: '1px solid rgba(46,139,87,0.15)' }}>
                    <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: '#F472B6' }} />
                    <p className="font-bold" style={{ color: '#D8F3DC' }}>No saved products</p>
                    <p className="text-sm mt-1 mb-6" style={{ color: '#9CAF88' }}>Heart products you love to save them here</p>
                    <button onClick={() => navigate('/shop')} className="px-6 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Explore Products</button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((p: any) => (
                      <div key={p.id} className="flex gap-4 p-4 rounded-2xl cursor-pointer" onClick={() => navigate('/shop')}
                        style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)' }}>
                        <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm" style={{ color: '#D8F3DC' }}>{p.name}</p>
                          <p className="text-xs" style={{ color: '#9CAF88' }}>{p.type} · {p.effect}</p>
                          <p className="font-black mt-1" style={{ color: '#CAFF00' }}>${p.price}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 self-center flex-shrink-0" style={{ color: '#9CAF88' }} />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h3 className="font-black text-lg mb-6" style={{ color: '#D8F3DC' }}>Account Settings</h3>
                {[
                  { label: 'Edit Profile', desc: 'Update your personal information', color: '#2E8B57' },
                  { label: 'Change Password', desc: 'Update your account password', color: '#8B5CF6' },
                  { label: 'Notification Preferences', desc: 'Manage email and push notifications', color: '#00D4AA' },
                  { label: 'Privacy Settings', desc: 'Control your data and privacy', color: '#FB923C' },
                ].map(({ label, desc, color }) => (
                  <button key={label} className="w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all hover:opacity-90"
                    style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}22` }}>
                      <Settings className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm" style={{ color: '#D8F3DC' }}>{label}</p>
                      <p className="text-xs" style={{ color: '#9CAF88' }}>{desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: '#9CAF88' }} />
                  </button>
                ))}
                <button
                  onClick={() => { signOut(); navigate('/'); }}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm"
                  style={{ background: 'rgba(255,77,109,0.1)', color: '#FF4D6D', border: '1px solid rgba(255,77,109,0.2)' }}
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
