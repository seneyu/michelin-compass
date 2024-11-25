export interface ApiResponse {
  user: User;
  token: string;
}

// structure of a User
export interface User {
  _id: string;
  username: string;
  password?: string;
}

// structure of a restaurant
export interface Restaurant {
  _id: number;
  name: string;
  address: string;
  cuisine: string;
  distinction: number;
  description: string;
  website: string;
  number: string;
}

// structure of a review
export interface Review {
  _id: number;
  restaurantId?: number;
  restaurant: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export type ReviewFormData = Omit<Review, '_id' | 'restaurantId' | 'createdAt'>;
