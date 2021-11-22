export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  loading: boolean;
}

export interface User extends Pick<Profile, 'username' | 'bio' | 'image'> {
  email: string;
  token: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface ArticlesResult {
  articles: Article[];
  articlesCount: number;
}

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface LoginResponse {
  user: User;
}
