import { Product } from "@shared/schema";

export const productData: Omit<Product, "id">[] = [
  // Electronics
  {
    name: "MacBook Pro 16-inch",
    description: "Latest model with M2 chip, 16GB RAM, 512GB SSD",
    price: "299999.99",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4",
    category: "Electronics",
    discount: "0.10"
  },
  {
    name: "iPhone 15 Pro",
    description: "256GB, Space Gray, 5G Enabled",
    price: "159999.99",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
    category: "Electronics",
    discount: "0.05"
  },
  {
    name: "Sony WH-1000XM4",
    description: "Wireless Noise Cancelling Headphones",
    price: "34999.99",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    category: "Electronics",
    discount: "0.20"
  },

  // Fashion & Sports
  {
    name: "Nike Air Max",
    description: "Premium running shoes, breathable mesh, multiple sizes",
    price: "12999.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Sports",
    discount: "0.15"
  },
  {
    name: "Adidas Soccer Ball",
    description: "Professional match ball, FIFA approved",
    price: "4999.99",
    image: "https://images.unsplash.com/photo-1614632537227-cde872664d6b",
    category: "Sports",
    discount: "0"
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip, eco-friendly material, perfect for yoga",
    price: "2999.99",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
    category: "Sports",
    discount: "0.05"
  },

  // Kitchen & Home
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional 5Qt mixer, multiple attachments",
    price: "54999.99",
    image: "https://images.unsplash.com/photo-1594385208974-2c00821288fe",
    category: "Kitchen",
    discount: "0.10"
  },
  {
    name: "Nespresso Coffee Maker",
    description: "Automatic coffee machine with milk frother",
    price: "29999.99",
    image: "https://images.unsplash.com/photo-1525088553748-01d6e210e00b",
    category: "Kitchen",
    discount: "0.15"
  },
  {
    name: "Smart Garden Indoor Kit",
    description: "Automated plant growing system with LED lights",
    price: "24999.99",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
    category: "Home & Garden",
    discount: "0"
  },

  // Groceries
  {
    name: "Organic Green Tea Set",
    description: "Premium Japanese green tea collection",
    price: "4999.99",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
    category: "Groceries",
    discount: "0"
  },
  {
    name: "Gourmet Coffee Beans",
    description: "1kg premium roasted coffee beans",
    price: "2999.99",
    image: "https://images.unsplash.com/photo-1587734361993-0497cfef0e2d",
    category: "Groceries",
    discount: "0.05"
  },
  {
    name: "Organic Honey Set",
    description: "Set of 3 different flower honey varieties",
    price: "1999.99",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    category: "Groceries",
    discount: "0"
  },

  // Books & Stationery
  {
    name: "Kindle Paperwhite",
    description: "Latest e-reader with backlight, 32GB",
    price: "19999.99",
    image: "https://images.unsplash.com/photo-1594497579223-1ff345887c48",
    category: "Books",
    discount: "0.10"
  },
  {
    name: "Premium Notebook Set",
    description: "Set of 3 leather-bound notebooks",
    price: "3999.99",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
    category: "Books",
    discount: "0"
  },

  // Beauty & Health
  {
    name: "Dyson Hair Dryer",
    description: "Professional-grade hair dryer with attachments",
    price: "44999.99",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
    category: "Beauty",
    discount: "0.08"
  },
  {
    name: "Skincare Gift Set",
    description: "Premium Korean skincare collection",
    price: "8999.99",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a",
    category: "Beauty",
    discount: "0.15"
  }
];

export const CATEGORIES = [
  "Electronics",
  "Sports",
  "Kitchen",
  "Home & Garden",
  "Groceries",
  "Books",
  "Beauty",
  "Fashion"
] as const;