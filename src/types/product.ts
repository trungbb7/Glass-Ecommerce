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

interface ProductSpecification {
  lensWidth: number;
  templeLength: number;
  brand: string;
  bridgeWidth: number;
  material: string;
  origin: string;
  suitableFor: string;
  warranty: string;
  style: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  stockPrice: number;
  finalPrice: number;
  specification: ProductSpecification;
  variants: ProductVariant[];
  categories: string[];
  images: string[];
  reviews?: ProductReview[];
}
interface CartProduct extends Product {
  quantity: number;
  selectedVariant: ProductVariant;
}

export type { Product, ProductVariant, ProductReview, ProductSpecification, CartProduct };
