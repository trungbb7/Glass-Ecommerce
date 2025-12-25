interface ProductVariant {
  color: string;
  quantity: number;
}

interface ProductReview {
  id: string;
  userid: string;
  username: string;
  datetime: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  stockPrice: number;
  finalPrice: number;
  variants: ProductVariant[];
  categories: string[];
  images: string[];
}

export type { Product, ProductVariant, ProductReview };
