export type ProductCategory = "food" | "beauty";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  origin: string;
  originFlag?: string;
  price: number;
  compareAtPrice?: number;
  currency: "MAD";
  images: string[];
  stock: number;
  sku: string;
  weight?: string;
  ingredients?: string[];
  allergens?: string[];
  storage?: string;
  preparation?: string;
  rating?: number;
  reviewsCount?: number;
  featured?: boolean;
  tags?: string[];
  has3DModel?: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description?: string;
  image?: string;
};

export type Story = {
  id: string;
  slug: string;
  title: string;
  category: "Food" | "Beauty" | "Culture" | "Recettes" | "Communauté" | "Origines";
  excerpt: string;
  image: string;
  date: string;
  readingTime: string;
  content: string[];
  relatedProductSlugs?: string[];
};

export type Testimonial = {
  id: string;
  author: string;
  quote: string;
  rating: number;
  image?: string;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight?: string;
};

export type DeliveryMethod = {
  id: string;
  name: string;
  price: number;
  estimatedTime?: string;
};

export type Order = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: "MAD";
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: string;
};

export interface PaymentProvider {
  id: string;
  name: string;
  createPayment(order: Order): Promise<{ success: boolean; reference?: string }>;
}
