import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Package, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { PsychedelicBg } from '../components/PsychedelicBg';

const statusColors: Record<string, { bg: string; text: string }> = {
  pending:    { bg: 'rgba(251,146,60,0.15)',  text: '#FB923C' },
  preparing:  { bg: 'rgba(0,212,170,0.15)',   text: '#00D4AA' },
  to_ship:    { bg: 'rgba(94,234,212,0.15)',  text: '#5EEAD4' },
  shipped:    { bg: 'rgba(139,92,246,0.15)',  text: '#A78BFA' },
  to_deliver: { bg: 'rgba(129,140,248,0.15)', text: '#A5B4FC' },
  received:   { bg: 'rgba(202,255,0,0.1)',    text: '#CAFF00' },
  cancelled:  { bg: 'rgba(248,113,113,0.15)', text: '#FCA5A5' },
};
const statusLabels: Record<string, string> = { pending: 'Pending', preparing: 'Preparing', to_ship: 'To ship', shipped: 'Shipped', to_deliver: 'To deliver', received: 'Received', cancelled: 'Cancelled' };

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { user, orders } = useApp();
  const [serverStatuses, setServerStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = localStorage.getItem('cana_session_token');
    if (!user || !token) return;
    const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000/auth.php').replace(/auth\.php(?:\?.*)?$/, 'orders.php');
    let active = true;
    fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Could not load order statuses');
        return result as { orders: { id: string; status: string }[] };
      })
      .then(result => {
        if (active) setServerStatuses(Object.fromEntries(result.orders.map(order => [String(order.id), order.status])));
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#0A1F14' }}>
        <div className="text-center p-12 rounded-3xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)' }}>
          <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#2E8B57', opacity: 0.4 }} />
          <h2 className="font-black text-2xl mb-3" style={{ color: '#D8F3DC' }}>Sign In to View Orders</h2>
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
            <ShoppingBag className="w-6 h-6" style={{ color: '#CAFF00' }} />
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#CAFF00' }}>Purchase History</p>
          </div>
          <h1 className="font-black" style={{ color: '#D8F3DC' }}>My Orders</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#2E8B57', opacity: 0.3 }} />
            <p className="font-bold text-xl mb-2" style={{ color: '#D8F3DC' }}>No orders yet</p>
            <p className="mb-8" style={{ color: '#9CAF88' }}>Your order history will appear here once you make a purchase.</p>
            <button onClick={() => navigate('/shop')} className="px-8 py-3.5 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Shop Now</button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const status = serverStatuses[order.id] || order.status;
              const sc = statusColors[status] || statusColors.pending;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-black text-base" style={{ color: '#D8F3DC' }}>Order #{order.id.slice(-8)}</p>
                      <p className="text-sm" style={{ color: '#9CAF88' }}>{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold capitalize" style={{ background: sc.bg, color: sc.text }}>
                        {statusLabels[status] || status}
                      </span>
                      <span className="font-black text-lg" style={{ color: '#CAFF00' }}>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="text-xs font-semibold" style={{ color: '#D8F3DC' }}>{item.name}</p>
                          <p className="text-xs" style={{ color: '#9CAF88' }}>×{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
