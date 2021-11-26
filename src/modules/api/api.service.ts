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
  TagsResult,
  NewUser,
} from 'src/modules/api/interfaces';
import { Feed } from 'src/modules/article-list/+state/article-list.reducer';

const BASE_URL = 'http://localhost:3000/api';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  login(creds: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${BASE_URL}/users/login`,
      JSON.stringify(creds),
      { headers: jsonHeaders }
    );
  }

  register(creds: NewUser) {
    return this.http.post<LoginResponse>(
      `${BASE_URL}/users`,
      JSON.stringify({ user: creds }),
      { headers: jsonHeaders }
    );
  }

  getUser() {
    return this.http.get<LoginResponse>(`${BASE_URL}/user`, {
      headers: jsonHeaders,
    });
  }

  loadArticles(
    pageSize: number,
    page?: number,
    tag?: string,
    feed: Feed = 'all'
  ) {
    const params = [['limit', `${pageSize}`]];
    params.push(['offset', `${page ? (page - 1) * pageSize : 0}`]);

    if (tag) {
      params.push(['tag', tag]);
    }

    const searchParams = new URLSearchParams(params);
    if (feed === 'all') {
      return this.http.get<ArticlesResult>(
        `${BASE_URL}/articles?${searchParams}`
      );
    } else {
      return this.http.get<ArticlesResult>(
        `${BASE_URL}/articles/feed?${searchParams}`
      );
    }
  }

  loadArticle(slug: string) {
    return this.http.get<ArticleResult>(`${BASE_URL}/articles/${slug}`);
  }

  loadTags() {
    return this.http.get<TagsResult>(`${BASE_URL}/tags`);
  }

  publishArticle(article: ChangedArticle) {
    return this.http.post<ArticleResult>(
      `${BASE_URL}/articles`,
      JSON.stringify({ article }),
      { headers: jsonHeaders }
    );
  }

  updateArticle(slug: string, article: ChangedArticle) {
    return this.http.put<ArticleResult>(
      `${BASE_URL}/articles/${slug}`,
      JSON.stringify({ article }),
      { headers: jsonHeaders }
    );
  }

  loadComments(slug: string) {
    return this.http.get<CommentsResult>(
      `${BASE_URL}/articles/${slug}/comments`
    );
  }

  postComment(slug: string, body: string) {
    return this.http.post<CommentResult>(
      `${BASE_URL}/articles/${slug}/comments`,
      JSON.stringify({ comment: { body } }),
      { headers: jsonHeaders }
    );
  }

  removeComment(slug: string, id: number) {
    return this.http.delete(`${BASE_URL}/articles/${slug}/comments/${id}`);
  }
}
