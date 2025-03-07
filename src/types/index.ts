export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  style?: string;
  description?: string;
  styles: Array<{
    name: string;
    image: string;
  }>;
  sizes?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  style: string;
  size: string;
  quantity: number;
} 