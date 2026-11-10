import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, CheckCircle, CreditCard, Package, Truck, MapPin, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { PsychedelicBg } from '../components/PsychedelicBg';

const steps = ['Cart', 'Shipping', 'Billing', 'Payment', 'Review'];
const inputStyle = {
  background: 'rgba(10,31,20,0.7)',
  border: '1px solid rgba(46,139,87,0.25)',
  color: '#D8F3DC',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  width: '100%',
  outline: 'none',
  fontSize: '0.875rem',
};
const labelStyle = { color: '#9CAF88', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, display: 'block', marginBottom: '6px' };

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}

const Field = ({ label, value, onChange, placeholder, type = 'text' }: FieldProps) => (
  <div>
    <label style={labelStyle}>{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={event => onChange(event.target.value)} style={inputStyle} />
  </div>
);

export const CartPage = () => {
  const navigate = useNavigate();
  const { user, cart, updateCartQuantity, removeFromCart, clearCart, addOrder } = useApp();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ fullName: '', address: '', city: '', state: '', zip: '', country: 'US', phone: '' });
  const [billing, setBilling] = useState({ sameAsShipping: true, address: '', city: '', state: '', zip: '' });
  const [payment, setPayment] = useState({ method: 'credit', cardNum: '', expiry: '', cvv: '', name: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.0875;
  const shippingFee = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shippingFee;

  if (!user) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#0A1F14' }}>
        <div className="text-center p-12 rounded-3xl max-w-md" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="font-black text-2xl mb-3" style={{ color: '#D8F3DC' }}>Sign In to Checkout</h2>
          <p className="mb-8" style={{ color: '#9CAF88' }}>You need an account to access the cart and place orders.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/signin')} className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(46,139,87,0.15)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.3)' }}>Sign In</button>
            <button onClick={() => navigate('/signup')} className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Create Account</button>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden" style={{ background: '#0A1F14' }}>
        <PsychedelicBg variant="hero" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center p-12 rounded-3xl max-w-md mx-4"
          style={{ background: 'rgba(15,61,46,0.5)', border: '1px solid rgba(46,139,87,0.3)', backdropFilter: 'blur(24px)' }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
            <CheckCircle className="w-20 h-20 mx-auto mb-6" style={{ color: '#CAFF00' }} />
          </motion.div>
          <h2 className="font-black text-3xl mb-3" style={{ color: '#D8F3DC' }}>Order Placed!</h2>
          <p className="mb-8 text-base" style={{ color: '#9CAF88' }}>
            Thank you for your purchase. Your CANA products are on their way to you soon.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/orders')} className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(46,139,87,0.15)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.3)' }}>View Orders</button>
            <button onClick={() => navigate('/shop')} className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Shop More</button>
          </div>
        </motion.div>
      </div>
    );
  }

  const placeOrder = async () => {
    if (placingOrder) return;
    setPlacingOrder(true);
    try {
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000/auth.php').replace(/auth\.php(?:\?.*)?$/, 'orders.php');
      const response = await fetch(apiUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('cana_session_token') || ''}` },
        body: JSON.stringify({ userId: user.id, customerName: user.fullName, items: cart.map(({ id, quantity }) => ({ id, quantity })) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not record this order');
      addOrder({ id: String(result.id), items: cart.map(i => ({ ...i })), total: Number(result.total), status: 'pending', date: result.date });
      clearCart(); setOrderPlaced(true); toast.success(`Order #${result.id} placed successfully!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not place your order');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: '#0A1F14' }}>
      {/* Progress */}
      <div className="sticky top-16 z-30 py-4 border-b" style={{ background: 'rgba(10,31,20,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(46,139,87,0.15)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${i <= step ? '' : ''}`}
                  style={{
                    background: i < step ? '#CAFF00' : i === step ? 'linear-gradient(135deg, #2E8B57, #CAFF00)' : 'rgba(46,139,87,0.15)',
                    color: i <= step ? '#0A1F14' : '#9CAF88',
                  }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block text-xs font-semibold" style={{ color: i === step ? '#CAFF00' : '#9CAF88' }}>{s}</span>
                {i < steps.length - 1 && <div className="flex-1 h-px mx-2" style={{ background: i < step ? '#CAFF00' : 'rgba(46,139,87,0.2)' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">

          {/* STEP 0: Cart */}
          {step === 0 && (
            <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-black text-2xl mb-8" style={{ color: '#D8F3DC' }}>Your Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4" style={{ color: '#2E8B57', opacity: 0.4 }} />
                  <p className="font-bold text-lg mb-2" style={{ color: '#D8F3DC' }}>Your cart is empty</p>
                  <p className="mb-6" style={{ color: '#9CAF88' }}>Discover our premium cannabis products</p>
                  <button onClick={() => navigate('/shop')} className="px-8 py-3 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>Shop Now</button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold" style={{ color: '#D8F3DC' }}>{item.name}</p>
                          <p className="text-sm" style={{ color: '#9CAF88' }}>{item.type}</p>
                          <p className="font-black mt-1" style={{ color: '#CAFF00' }}>${item.price}</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <button onClick={() => removeFromCart(item.id)}><Trash2 className="w-4 h-4" style={{ color: '#FF4D6D' }} /></button>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(46,139,87,0.2)', color: '#9CAF88' }}>
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold" style={{ color: '#D8F3DC' }}>{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(46,139,87,0.2)', color: '#9CAF88' }}>
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 rounded-2xl h-fit" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                    <h3 className="font-black mb-4" style={{ color: '#D8F3DC' }}>Order Summary</h3>
                    <div className="space-y-3 mb-6">
                      {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Shipping', shippingFee === 0 ? 'Free' : `$${shippingFee}`], ['Tax (8.75%)', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                        <div key={l} className="flex justify-between text-sm">
                          <span style={{ color: '#9CAF88' }}>{l}</span>
                          <span style={{ color: '#D8F3DC' }}>{v}</span>
                        </div>
                      ))}
                      <div className="border-t pt-3 flex justify-between font-black" style={{ borderColor: 'rgba(46,139,87,0.2)' }}>
                        <span style={{ color: '#D8F3DC' }}>Total</span>
                        <span style={{ color: '#CAFF00' }}>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <button onClick={() => setStep(1)} className="w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14', boxShadow: '0 0 24px rgba(202,255,0,0.25)' }}>
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: Shipping */}
          {step === 1 && (
            <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-8">
                <Truck className="w-6 h-6" style={{ color: '#CAFF00' }} />
                <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Shipping Information</h2>
              </div>
              <div className="p-6 rounded-2xl mb-6" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" value={shipping.fullName} onChange={(v: string) => setShipping({...shipping, fullName: v})} placeholder="Jane Smith" />
                  <Field label="Phone Number" value={shipping.phone} onChange={(v: string) => setShipping({...shipping, phone: v})} placeholder="+1 (555) 000-0000" />
                  <div className="sm:col-span-2">
                    <Field label="Address" value={shipping.address} onChange={(v: string) => setShipping({...shipping, address: v})} placeholder="123 Main Street" />
                  </div>
                  <Field label="City" value={shipping.city} onChange={(v: string) => setShipping({...shipping, city: v})} placeholder="Boston" />
                  <Field label="State" value={shipping.state} onChange={(v: string) => setShipping({...shipping, state: v})} placeholder="MA" />
                  <Field label="Postal Code" value={shipping.zip} onChange={(v: string) => setShipping({...shipping, zip: v})} placeholder="02101" />
                  <Field label="Country" value={shipping.country} onChange={(v: string) => setShipping({...shipping, country: v})} placeholder="US" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(46,139,87,0.1)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.25)' }}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(2)} className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm ml-auto"
                  style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Billing */}
          {step === 2 && (
            <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="w-6 h-6" style={{ color: '#CAFF00' }} />
                <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Billing Information</h2>
              </div>
              <div className="p-6 rounded-2xl mb-6" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                <label className="flex items-center gap-3 cursor-pointer mb-6">
                  <input type="checkbox" checked={billing.sameAsShipping} onChange={e => setBilling({...billing, sameAsShipping: e.target.checked})}
                    className="w-5 h-5 rounded accent-emerald-500" style={{ accentColor: '#2E8B57' }} />
                  <span className="font-semibold text-sm" style={{ color: '#D8F3DC' }}>Same as shipping address</span>
                </label>
                {!billing.sameAsShipping && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2"><Field label="Address" value={billing.address} onChange={(v: string) => setBilling({...billing, address: v})} placeholder="123 Main St" /></div>
                    <Field label="City" value={billing.city} onChange={(v: string) => setBilling({...billing, city: v})} placeholder="Boston" />
                    <Field label="State" value={billing.state} onChange={(v: string) => setBilling({...billing, state: v})} placeholder="MA" />
                    <Field label="ZIP" value={billing.zip} onChange={(v: string) => setBilling({...billing, zip: v})} placeholder="02101" />
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(46,139,87,0.1)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.25)' }}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm ml-auto"
                  style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="w-6 h-6" style={{ color: '#CAFF00' }} />
                <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Payment Method</h2>
              </div>
              <div className="space-y-4 mb-6">
                {[['credit', 'Credit Card', '💳'], ['debit', 'Debit Card', '🏦'], ['wallet', 'Digital Wallet', '📱']].map(([val, label, emoji]) => (
                  <label key={val} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all"
                    style={{
                      background: payment.method === val ? 'rgba(202,255,0,0.06)' : 'rgba(15,61,46,0.3)',
                      border: payment.method === val ? '1px solid rgba(202,255,0,0.25)' : '1px solid rgba(46,139,87,0.2)',
                    }}>
                    <input type="radio" name="payment" value={val} checked={payment.method === val}
                      onChange={() => setPayment({...payment, method: val})} style={{ accentColor: '#CAFF00' }} />
                    <span className="text-xl">{emoji}</span>
                    <span className="font-semibold" style={{ color: '#D8F3DC' }}>{label}</span>
                  </label>
                ))}
              </div>
              {(payment.method === 'credit' || payment.method === 'debit') && (
                <div className="p-6 rounded-2xl mb-6" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2"><Field label="Card Number" value={payment.cardNum} onChange={(v: string) => setPayment({...payment, cardNum: v})} placeholder="1234 5678 9012 3456" /></div>
                    <Field label="Cardholder Name" value={payment.name} onChange={(v: string) => setPayment({...payment, name: v})} placeholder="Jane Smith" />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Expiry" value={payment.expiry} onChange={(v: string) => setPayment({...payment, expiry: v})} placeholder="MM/YY" />
                      <Field label="CVV" value={payment.cvv} onChange={(v: string) => setPayment({...payment, cvv: v})} placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(46,139,87,0.1)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.25)' }}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(4)} className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm ml-auto"
                  style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
                  Review Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-3 mb-8">
                <Package className="w-6 h-6" style={{ color: '#CAFF00' }} />
                <h2 className="font-black text-2xl" style={{ color: '#D8F3DC' }}>Order Review</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                  <p className="font-bold mb-4" style={{ color: '#D8F3DC' }}>Items ({cart.length})</p>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold" style={{ color: '#D8F3DC' }}>{item.name}</p>
                          <p className="text-xs" style={{ color: '#9CAF88' }}>Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm" style={{ color: '#CAFF00' }}>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                    <p className="font-bold mb-3" style={{ color: '#D8F3DC' }}>Ship To</p>
                    <p className="text-sm" style={{ color: '#9CAF88' }}>{shipping.fullName}<br />{shipping.address}<br />{shipping.city}, {shipping.state} {shipping.zip}</p>
                  </div>
                  <div className="p-5 rounded-2xl" style={{ background: 'rgba(15,61,46,0.4)', border: '1px solid rgba(46,139,87,0.2)', backdropFilter: 'blur(20px)' }}>
                    <p className="font-bold mb-3" style={{ color: '#D8F3DC' }}>Order Total</p>
                    {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Shipping', shippingFee === 0 ? 'Free' : `$${shippingFee}`], ['Tax', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                      <div key={l} className="flex justify-between text-sm mb-2">
                        <span style={{ color: '#9CAF88' }}>{l}</span><span style={{ color: '#D8F3DC' }}>{v}</span>
                      </div>
                    ))}
                    <div className="border-t pt-3 flex justify-between font-black" style={{ borderColor: 'rgba(46,139,87,0.2)' }}>
                      <span style={{ color: '#D8F3DC' }}>Total</span>
                      <span style={{ color: '#CAFF00', fontSize: '1.2rem' }}>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm" style={{ background: 'rgba(46,139,87,0.1)', color: '#9CAF88', border: '1px solid rgba(46,139,87,0.25)' }}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(202,255,0,0.4)' }} whileTap={{ scale: 0.98 }}
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="flex items-center gap-2 px-10 py-3.5 rounded-xl font-black text-sm ml-auto"
                  style={{ background: 'linear-gradient(135deg, #2E8B57, #CAFF00)', color: '#0A1F14' }}>
                  <Lock className="w-4 h-4" /> {placingOrder ? 'Placing order…' : 'Place Order'}
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
