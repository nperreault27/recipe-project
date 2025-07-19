export interface Recipe {
  id: string;
  created_at: string; // ISO date string
  created_by: string;
  ingredients: string[];
  steps: string[];
  rating: number;
  time: string | null;
  user_id: string | null;
  image_link: string;
  recipe_name: string;
};