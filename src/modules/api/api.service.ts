import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ArticleResult,
  ArticlesResult,
  CommentResult,
  CommentsResult,
  LoginRequest,
  LoginResponse,
  ChangedArticle,
} from 'src/modules/api/interfaces';

const baseUrl = 'http://localhost:3000/api';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  login(creds: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${baseUrl}/users/login`,
      JSON.stringify(creds),
      { headers: jsonHeaders }
    );
  }

  getUser() {
    return this.http.get<LoginResponse>(`${baseUrl}/user`, {
      headers: jsonHeaders,
    });
  }

  loadArticles() {
    return this.http.get<ArticlesResult>(`${baseUrl}/articles`);
  }

  loadArticle(slug: string) {
    return this.http.get<ArticleResult>(`${baseUrl}/articles/${slug}`);
  }

  publishArticle(article: ChangedArticle) {
    return this.http.post<ArticleResult>(
      `${baseUrl}/articles`,
      JSON.stringify({ article }),
      { headers: jsonHeaders }
    );
  }

  updateArticle(slug: string, article: ChangedArticle) {
    return this.http.put<ArticleResult>(
      `${baseUrl}/articles/${slug}`,
      JSON.stringify({ article }),
      { headers: jsonHeaders }
    );
  }

  loadComments(slug: string) {
    return this.http.get<CommentsResult>(
      `${baseUrl}/articles/${slug}/comments`
    );
  }

  postComment(slug: string, body: string) {
    return this.http.post<CommentResult>(
      `${baseUrl}/articles/${slug}/comments`,
      JSON.stringify({ comment: { body } }),
      { headers: jsonHeaders }
    );
  }

  removeComment(slug: string, id: number) {
    return this.http.delete(`${baseUrl}/articles/${slug}/comments/${id}`);
  }
}
