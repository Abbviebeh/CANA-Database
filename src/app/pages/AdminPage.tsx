import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BarChart3, Boxes, LogOut, PackageCheck, RefreshCw, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const API = (import.meta.env.VITE_API_URL || 'http://localhost:8000/auth.php').replace(/auth\.php(?:\?.*)?$/, 'admin.php');
type InventoryRow = { id: number; name: string; category: string; price: string; stock: number; updated_at: string };
type OrderRow = { id: number; customer_name: string; total: string; status: string; created_at: string };
type Dashboard = { metrics: { order_count: number; revenue: number; customers: number }; sales: { day: string; revenue: number; orders: number }[]; orders: OrderRow[]; inventory: InventoryRow[] };
const orderStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'to_ship', label: 'To ship' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'to_deliver', label: 'To deliver' },
  { value: 'received', label: 'Received' },
  { value: 'cancelled', label: 'Cancelled' },
];
const panel: React.CSSProperties = { background: 'rgba(15,61,46,.55)', border: '1px solid rgba(46,139,87,.25)', borderRadius: 18 };
const field: React.CSSProperties = { background: '#0A1F14', border: '1px solid rgba(46,139,87,.35)', color: '#D8F3DC', borderRadius: 9, padding: '9px 11px' };

export function AdminPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorage.getItem('cana_admin_token') || '');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [salesGraphHovered, setSalesGraphHovered] = useState(false);
  const [salesGraphPinned, setSalesGraphPinned] = useState(false);
  const [growthGraphHovered, setGrowthGraphHovered] = useState(false);
  const [growthGraphPinned, setGrowthGraphPinned] = useState(false);
  const [data, setData] = useState<Dashboard | null>(null); const [loading, setLoading] = useState(false);
  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API}?action=dashboard`, { headers: { Authorization: `Bearer ${token}` } });
      const body = await response.json(); if (!response.ok) throw new Error(body.message || 'Could not load dashboard');
      setData(body);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not load dashboard');
      if (error instanceof Error && /sign-in required|session expired/i.test(error.message)) { sessionStorage.removeItem('cana_admin_token'); setToken(''); }
    }
    finally { setLoading(false); }
  }, [token]);
  useEffect(() => { void load(); }, [load]);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true);
    try {
      const response = await fetch(`${API}?action=${isCreating ? 'register' : 'login'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const body = await response.json(); if (!response.ok) throw new Error(body.message || 'Admin sign-in failed');
      sessionStorage.setItem('cana_admin_token', body.token); setToken(body.token); setPassword('');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Admin sign-in failed'); }
    finally { setLoading(false); }
  };
  const apiPost = async (action: string, body: object) => {
    const response = await fetch(`${API}?action=${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
    const result = await response.json(); if (!response.ok) throw new Error(result.message || 'Could not save change'); return result;
  };
  const saveStock = async (productId: number, stock: number) => {
    try { await apiPost('stock', { productId, stock }); toast.success('Inventory updated'); await load(); }
    catch (error) { toast.error(error instanceof Error ? error.message : 'Could not update inventory'); }
  };
  const saveStatus = async (orderId: number, status: string) => {
    try { await apiPost('status', { orderId, status }); toast.success('Order tracking updated'); await load(); }
    catch (error) { toast.error(error instanceof Error ? error.message : 'Could not update order'); }
  };
  const logout = () => { sessionStorage.removeItem('cana_admin_token'); setToken(''); setData(null); setIsCreating(false); navigate('/admin'); };

  if (!token) return <main style={{ minHeight: '100vh', background: '#0A1F14', color: '#D8F3DC', display: 'grid', placeItems: 'center', padding: 20 }}>
    <form onSubmit={login} style={{ ...panel, padding: 32, width: 'min(100%,420px)' }}>
      <div style={{ color: '#CAFF00', fontSize: 12, letterSpacing: 3, fontWeight: 800 }}>CANA ADMIN</div><h1 style={{ margin: '10px 0 4px', fontSize: 30 }}>{isCreating ? 'Create admin account' : 'Admin sign in'}</h1><p style={{ color: '#9CAF88', marginBottom: 24 }}>{isCreating ? 'Create the first admin account to open the dashboard.' : 'Access sales, stock, and order tracking.'}</p>
      <label style={{ display: 'block', color: '#9CAF88', fontSize: 12, marginBottom: 7 }}>EMAIL</label><input style={{ ...field, width: '100%', marginBottom: 16 }} type="email" required value={email} onChange={e => setEmail(e.target.value)} />
      <label style={{ display: 'block', color: '#9CAF88', fontSize: 12, marginBottom: 7 }}>PASSWORD</label><input style={{ ...field, width: '100%', marginBottom: 8 }} type="password" minLength={isCreating ? 12 : 1} required value={password} onChange={e => setPassword(e.target.value)} />
      {isCreating && <p style={{ color: '#9CAF88', fontSize: 12, margin: '0 0 18px' }}>Use at least 12 characters. Public admin sign-up closes after the first account is created.</p>}
      <button disabled={loading} style={{ width: '100%', border: 0, padding: 13, borderRadius: 10, fontWeight: 800, background: 'linear-gradient(120deg,#2E8B57,#CAFF00)', cursor: 'pointer' }}>{loading ? 'Please wait…' : isCreating ? 'Create first admin' : 'Sign in securely'}</button>
      <button type="button" onClick={() => setIsCreating(!isCreating)} style={{ width: '100%', border: 0, background: 'transparent', color: '#CAFF00', padding: '16px 0 0', cursor: 'pointer' }}>{isCreating ? 'Already have an admin account? Sign in' : 'First time here? Create the first admin account'}</button>
    </form>
  </main>;

  const series = data?.sales || []; const maxRevenue = Math.max(...series.map(item => Number(item.revenue)), 1);
  const midpoint = Math.floor(series.length / 2); const firstHalf = series.slice(0, midpoint).reduce((n, row) => n + Number(row.revenue), 0); const secondHalf = series.slice(midpoint).reduce((n, row) => n + Number(row.revenue), 0);
  const growth = firstHalf ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;
  const cards = [
    { icon: <BarChart3 size={18} />, label: 'Lifetime sales', value: `$${Number(data?.metrics.revenue || 0).toFixed(2)}`, hint: 'all recorded time' },
    { icon: <PackageCheck size={18} />, label: 'Orders', value: data?.metrics.order_count || 0, hint: 'all recorded time' },
    { icon: <Boxes size={18} />, label: 'Customers', value: data?.metrics.customers || 0, hint: 'all recorded time' },
    { icon: <TrendingUp size={18} />, label: 'Sales growth', value: `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`, hint: 'second 15 days vs first 15 days' },
  ];
  const miniSeries = series.slice(-14);
  const showSalesGraph = salesGraphHovered || salesGraphPinned;
  const showGrowthGraph = growthGraphHovered || growthGraphPinned;
  return <main style={{ minHeight: '100vh', background: '#0A1F14', color: '#D8F3DC', padding: '28px clamp(16px,4vw,56px)' }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}><div><div style={{ color: '#CAFF00', letterSpacing: 3, fontSize: 12, fontWeight: 800 }}>CANA CONTROL ROOM</div><h1 style={{ fontSize: 32, margin: '5px 0' }}>Sales & inventory</h1><span style={{ color: '#9CAF88' }}>Live records from your store database</span></div><div style={{ display: 'flex', gap: 10 }}><button onClick={() => void load()} style={field}><RefreshCw size={16} /></button><button onClick={logout} style={{ ...field, display: 'flex', gap: 8, alignItems: 'center' }}><LogOut size={16} /> Sign out</button></div></header>
    {!data && loading ? <p style={{ color: '#9CAF88' }}>Loading dashboard…</p> : <>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 16 }}>
        {cards.map(card => {
          const isLifetimeSales = card.label === 'Lifetime sales';
          const isSalesGrowth = card.label === 'Sales growth';
          const isInteractive = isLifetimeSales || isSalesGrowth;
          const graphVisible = isLifetimeSales ? showSalesGraph : showGrowthGraph;
          const hoverGraph = (visible: boolean) => {
            if (isLifetimeSales) setSalesGraphHovered(visible);
            if (isSalesGrowth) setGrowthGraphHovered(visible);
          };
          const toggleGraph = () => {
            if (isLifetimeSales) setSalesGraphPinned(value => !value);
            if (isSalesGrowth) setGrowthGraphPinned(value => !value);
          };
          const graphRows = isLifetimeSales ? miniSeries : series;
          return <div
            key={card.label}
            style={{ ...panel, padding: 20, cursor: isInteractive ? 'pointer' : 'default', transition: 'border-color 180ms ease, box-shadow 180ms ease' }}
            onMouseEnter={isInteractive ? () => hoverGraph(true) : undefined}
            onMouseLeave={isInteractive ? () => hoverGraph(false) : undefined}
            onFocus={isInteractive ? () => hoverGraph(true) : undefined}
            onBlur={isInteractive ? () => hoverGraph(false) : undefined}
            onClick={isInteractive ? toggleGraph : undefined}
            onKeyDown={isInteractive ? event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleGraph(); } } : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-expanded={isInteractive ? graphVisible : undefined}
            aria-label={isLifetimeSales ? 'Lifetime sales. Hover or click to view recent daily sales graph.' : isSalesGrowth ? 'Sales growth. Hover or click to compare daily sales for the last 30 days.' : undefined}
          >
            <div style={{ color: '#CAFF00', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>{card.icon}{card.label}</div>
            <strong style={{ display: 'block', fontSize: 27, marginTop: 12 }}>{card.value}</strong>
            <small style={{ color: '#9CAF88' }}>{isInteractive && !graphVisible ? 'hover or click to view sales graph' : card.hint}</small>
            {isInteractive && <div aria-hidden={!graphVisible} style={{ maxHeight: graphVisible ? 92 : 0, opacity: graphVisible ? 1 : 0, overflow: 'hidden', transition: 'max-height 220ms ease, opacity 180ms ease' }}>
              <div style={{ display: 'flex', alignItems: 'end', gap: 3, height: 58, marginTop: 12 }} aria-label={isLifetimeSales ? 'Daily sales for the last 14 days' : 'Daily sales comparison for the last 30 days'}>
                {graphRows.map((row, index) => <div key={row.day} title={`${row.day}: $${Number(row.revenue).toFixed(2)} · ${row.orders} orders`} style={{ flex: 1, minWidth: 3, height: `${Math.max(5, Number(row.revenue) / maxRevenue * 100)}%`, background: Number(row.revenue) === 0 ? 'rgba(46,139,87,.3)' : isSalesGrowth ? (index < midpoint ? 'linear-gradient(#CAFF00,#2E8B57)' : 'linear-gradient(#5EEAD4,#0F766E)') : 'linear-gradient(#CAFF00,#2E8B57)', borderRadius: '3px 3px 0 0' }} />)}
              </div>
              <small style={{ color: '#9CAF88', display: 'block', marginTop: 5 }}>{isLifetimeSales ? 'Daily sales · last 14 days' : 'First 15 days · Second 15 days'}</small>
            </div>}
          </div>;
        })}
      </section>
      <section style={{ ...panel, padding: 20, marginBottom: 16 }}><h2 style={{ marginTop: 0, fontSize: 18 }}>Daily sales · last 30 days</h2><div style={{ height: 190, display: 'flex', alignItems: 'end', gap: 4, overflowX: 'auto', paddingTop: 10 }}>{series.map(row => <div key={row.day} title={`${row.day}: $${Number(row.revenue).toFixed(2)} · ${row.orders} orders`} style={{ minWidth: 12, flex: 1, height: `${Math.max(3, Number(row.revenue) / maxRevenue * 100)}%`, background: 'linear-gradient(#CAFF00,#2E8B57)', borderRadius: '4px 4px 0 0' }} />)}</div><div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CAF88', fontSize: 11, marginTop: 8 }}><span>{series[0]?.day || 'No sales yet'}</span><span>{series.at(-1)?.day || ''}</span></div></section>
      <section style={{ ...panel, padding: 20, marginBottom: 16, overflowX: 'auto' }}><h2 style={{ marginTop: 0, fontSize: 18 }}>Inventory tracking</h2><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 570 }}><thead><tr>{['Product','Category','Price','Stock on hand',''].map(label => <th key={label} style={{ textAlign: 'left', padding: 10, color: '#9CAF88', fontSize: 11 }}>{label}</th>)}</tr></thead><tbody>{data?.inventory.map(row => <tr key={row.id} style={{ borderTop: '1px solid rgba(46,139,87,.2)' }}><td style={{ padding: 10 }}>{row.name}</td><td style={{ padding: 10, color: '#9CAF88' }}>{row.category}</td><td style={{ padding: 10 }}>${Number(row.price).toFixed(2)}</td><td style={{ padding: 10 }}><input aria-label={`${row.name} stock`} type="number" min="0" defaultValue={row.stock} id={`stock-${row.id}`} style={{ ...field, width: 90 }} />{row.stock < 20 && <span style={{ color: '#FBBF24', marginLeft: 8, fontSize: 12 }}>Low stock</span>}</td><td style={{ padding: 10 }}><button onClick={() => { const value = Number((document.getElementById(`stock-${row.id}`) as HTMLInputElement).value); if (Number.isInteger(value) && value >= 0) void saveStock(row.id, value); }} style={{ ...field, cursor: 'pointer' }}>Save</button></td></tr>)}</tbody></table></section>
      <section style={{ ...panel, padding: 20, overflowX: 'auto' }}><h2 style={{ marginTop: 0, fontSize: 18 }}>Order & fulfillment tracking</h2><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}><thead><tr>{['Order','Customer','Date','Total','Status'].map(label => <th key={label} style={{ textAlign: 'left', padding: 10, color: '#9CAF88', fontSize: 11 }}>{label}</th>)}</tr></thead><tbody>{data?.orders.map(row => <tr key={row.id} style={{ borderTop: '1px solid rgba(46,139,87,.2)' }}><td style={{ padding: 10 }}>#{row.id}</td><td style={{ padding: 10 }}>{row.customer_name}</td><td style={{ padding: 10, color: '#9CAF88' }}>{new Date(row.created_at).toLocaleDateString()}</td><td style={{ padding: 10 }}>${Number(row.total).toFixed(2)}</td><td style={{ padding: 10 }}><select aria-label={`Order ${row.id} status`} value={row.status} onChange={e => void saveStatus(row.id,e.target.value)} style={field}>{orderStatuses.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}</select></td></tr>)}</tbody></table>{data?.orders.length===0 && <p style={{ color: '#9CAF88' }}>Orders will appear here after checkout.</p>}</section>
    </>}
  </main>;
}
