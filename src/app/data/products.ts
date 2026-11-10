export interface Product {
  id: number;
  name: string;
  type: string;
  effect: string;
  ratio: string;
  price: number;
  image: string;
  gradientBg: string;
  description: string;
  category: 'gummies' | 'beverages';
  availability: {
    inStock: boolean;
    stores: number;
  };
}

export const products: Product[] = [
  // Gummies
  {
    id: 1,
    name: 'Berry Bliss',
    type: 'Sativa',
    effect: 'Energy',
    ratio: '10mg THC',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1778085070083-9f9622e3b603?w=400',
    gradientBg: 'from-pink-500 via-purple-500 to-indigo-600',
    description: 'Energizing berry blend',
    category: 'gummies',
    availability: {
      inStock: true,
      stores: 234
    }
  },
  {
    id: 2,
    name: 'Citrus Calm',
    type: 'Hybrid',
    effect: 'Balance',
    ratio: '5mg THC : 5mg CBD',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1778085070104-87f4a46cfbf0?w=400',
    gradientBg: 'from-orange-400 via-amber-500 to-yellow-500',
    description: 'Balanced relaxation',
    category: 'gummies',
    availability: {
      inStock: true,
      stores: 187
    }
  },
  {
    id: 3,
    name: 'Tropical Dream',
    type: 'Indica',
    effect: 'Relaxation',
    ratio: '10mg THC',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1778085070096-563ec41d8ddd?w=400',
    gradientBg: 'from-teal-400 via-cyan-500 to-blue-600',
    description: 'Deep relaxation',
    category: 'gummies',
    availability: {
      inStock: true,
      stores: 312
    }
  },
  {
    id: 4,
    name: 'Mango Zen',
    type: 'Hybrid',
    effect: 'Focus',
    ratio: '5mg THC',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1778085070083-9f9622e3b603?w=400',
    gradientBg: 'from-rose-400 via-pink-500 to-fuchsia-600',
    description: 'Enhanced focus',
    category: 'gummies',
    availability: {
      inStock: false,
      stores: 0
    }
  },
  {
    id: 5,
    name: 'Watermelon Wave',
    type: 'Sativa',
    effect: 'Energy',
    ratio: '10mg THC',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1778085070104-87f4a46cfbf0?w=400',
    gradientBg: 'from-green-400 via-emerald-500 to-teal-600',
    description: 'Uplifting energy',
    category: 'gummies',
    availability: {
      inStock: true,
      stores: 156
    }
  },
  {
    id: 6,
    name: 'Lavender Night',
    type: 'Indica',
    effect: 'Sleep',
    ratio: '10mg THC',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1778085070096-563ec41d8ddd?w=400',
    gradientBg: 'from-purple-500 via-violet-600 to-indigo-700',
    description: 'Restful sleep',
    category: 'gummies',
    availability: {
      inStock: true,
      stores: 278
    }
  },
  // Beverages
  {
    id: 101,
    name: 'Lemon Lift',
    type: 'Sativa',
    effect: 'Energy',
    ratio: '10mg THC',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631280455942-304d7f01e632?w=400',
    gradientBg: 'from-yellow-400 via-amber-400 to-orange-500',
    description: 'Refreshing citrus energy drink',
    category: 'beverages',
    availability: {
      inStock: true,
      stores: 198
    }
  },
  {
    id: 102,
    name: 'Berry Breeze',
    type: 'Hybrid',
    effect: 'Balance',
    ratio: '5mg THC : 5mg CBD',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1631280455942-304d7f01e632?w=400',
    gradientBg: 'from-pink-400 via-rose-500 to-red-500',
    description: 'Balanced berry beverage',
    category: 'beverages',
    availability: {
      inStock: true,
      stores: 245
    }
  },
  {
    id: 103,
    name: 'Mint Chill',
    type: 'Indica',
    effect: 'Relaxation',
    ratio: '10mg THC',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631280455942-304d7f01e632?w=400',
    gradientBg: 'from-emerald-400 via-green-500 to-teal-600',
    description: 'Cool mint relaxation drink',
    category: 'beverages',
    availability: {
      inStock: true,
      stores: 167
    }
  },
  {
    id: 104,
    name: 'Peach Paradise',
    type: 'Sativa',
    effect: 'Energy',
    ratio: '5mg THC',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1631280455942-304d7f01e632?w=400',
    gradientBg: 'from-orange-300 via-peach-400 to-pink-400',
    description: 'Sweet peachy energy boost',
    category: 'beverages',
    availability: {
      inStock: true,
      stores: 203
    }
  },
  {
    id: 105,
    name: 'Coconut Dream',
    type: 'Indica',
    effect: 'Sleep',
    ratio: '10mg THC',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1631280455942-304d7f01e632?w=400',
    gradientBg: 'from-blue-300 via-indigo-400 to-purple-500',
    description: 'Tropical sleep aid beverage',
    category: 'beverages',
    availability: {
      inStock: false,
      stores: 0
    }
  },
  {
    id: 106,
    name: 'Ginger Zest',
    type: 'Hybrid',
    effect: 'Focus',
    ratio: '5mg THC : 5mg CBD',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631280455942-304d7f01e632?w=400',
    gradientBg: 'from-amber-400 via-orange-500 to-red-600',
    description: 'Spicy ginger focus drink',
    category: 'beverages',
    availability: {
      inStock: true,
      stores: 189
    }
  }
];
