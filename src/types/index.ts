export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Shirts" | "T-Shirts" | "Hoodies" | "Jackets" | "Sets" | "Pants" | "Trousers" | string;
  price: number;
  description: string;
  material: string;
  fit: string;
  care: string;
  sizes: string[];
  colors: string[];
  stock: number;
  frontImage: string;
  backImage: string;
  cutoutImage?: string;
  gallery: string[];
  isNew: boolean;
  isFeatured: boolean;
  isActive: boolean;
  soldCount: number;
  viewCount: number;
  addToCartCount: number;
  createdAt: string;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "UPI" | "Card" | "Cash on Delivery" | string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Pending" | "Confirmed" | "Packed" | "Shipped" | "Delivered" | "Cancelled" | string;
  createdAt: string;
};
