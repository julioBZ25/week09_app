import { Datum } from './products.interfaces';

export interface CartData {
  data: {
    items: ProductData[];
  };
}

export interface ProductData {
  product_variant_id: number;
  quantity: number;
}

export interface CartData extends Datum {
  quantity: number;
}

export interface CartRequest {
  product_variant_id: number;
  quantity: number;
}
