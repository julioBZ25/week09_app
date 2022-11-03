export interface CategoriesResponse {
  data: CategoryData[];
}

export interface CategoryData {
  id: number;
  slug: string;
  name: string;
}
