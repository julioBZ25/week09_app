export interface LikeResponse {
  data: {
    id: number;
    user_id: number;
    product_id: number;
    kind: number;
  };
}

export interface LikesResponse {
  data: LikeData[];
}

export interface LikeData {
  id: number;
  user_id: number;
  product_id: number;
  kind: number;
}
