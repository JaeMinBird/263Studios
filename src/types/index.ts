export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  styles: Style[];
  sizes: Size[];
}

export interface Style {
  id: number;
  name: string;
  image: string;
  productId: number;
}

export interface Size {
  id: number;
  name: string;
  productId: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  size: string;
  style: string;
} 