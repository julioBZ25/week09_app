export interface ProductsResponse {
  data: Datum[];
  meta: Meta;
}

export interface ProductResponse {
  data: Datum;
  meta: Meta;
}

export interface Image {
  id: number;
  url: string;
}

export interface Meta {
  current_page: number;
  from: null;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  slug: string;
  name: string;
  description: string;
  active: number;
  likes_count: number;
  likes_up_count: number;
  likes_down_count: number;
  published_at: Date;
  master: Master;
  image: Image;
  category: Category;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface Master {
  id: number;
  sku: string;
  price: string;
  promotional_price: string;
  stock: number;
  weight: null;
  height: null;
  width: null;
  depth: null;
  is_master: number;
  position: number;
}
