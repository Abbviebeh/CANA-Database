import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  address: string;
  age: number;
  birthday: string;
  contactNumber: string;
  country: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/auth.php';

async function authRequest(action: 'signup' | 'signin', data: Record<string, unknown>) {
  let response: Response;
  try {
    response = await fetch(`${API_URL}?action=${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(`Could not reach the CANA API at ${API_URL}. Start the PHP server and check VITE_API_URL.`);
  }
  const text = await response.text();
  let result: { message?: string; user?: User; token?: string };
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`The CANA API returned a non-JSON response (HTTP ${response.status}). Check that PHP is serving server/auth.php and inspect the PHP server terminal for errors.`);
  }
  if (!response.ok) throw new Error(result.message || 'Could not connect to the CANA server');
  return result;
}

export interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
  category: 'gummies' | 'beverages';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'to_ship' | 'shipped' | 'to_deliver' | 'received' | 'cancelled';
}

interface AppContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: number) => void;
  updateCartQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'> & { id?: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('cana_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cana_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const savedWishlist = localStorage.getItem('cana_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('cana_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cana_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cana_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cana_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cana_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cana_orders', JSON.stringify(orders));
  }, [orders]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const result = await authRequest('signin', { email, password });
    if (!result.user) return false;
    if (result.token) localStorage.setItem('cana_session_token', result.token);
    setUser(result.user as User);
    return true;
  };

  const signUp = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    const result = await authRequest('signup', userData);
    if (!result.user) return false;
    if (result.token) localStorage.setItem('cana_session_token', result.token);
    setUser(result.user as User);
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('cana_session_token');
    setCart([]);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      const users = JSON.parse(localStorage.getItem('cana_users') || '[]');
      const updatedUsers = users.map((u: any) =>
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem('cana_users', JSON.stringify(updatedUsers));
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addOrder = (order: Omit<Order, 'id'> & { id?: string }) => {
    const newOrder: Order = {
      ...order,
      id: order.id || Date.now().toString()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        updateUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        addOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
