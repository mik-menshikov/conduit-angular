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

export interface NewUser {
  username: string;
  email: string;
  password: string;
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

export type ChangedArticle = Pick<
  Article,
  'title' | 'body' | 'tagList' | 'description'
>;

export type UpdatableArticle = ChangedArticle & Pick<Article, 'slug'>;

export interface ArticlesResult {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleResult {
  article: Article;
}

export interface TagsResult {
  tags: string[];
}
export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}

export interface CommentsResult {
  comments: Comment[];
}

export interface CommentResult {
  comment: Comment;
}

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface RegisterRequest {
  user: NewUser;
}

export interface LoginResponse {
  user: User;
}
