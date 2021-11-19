import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticlesResult } from 'src/modules/api/interfaces';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  loadArticles() {
    return this.http.get<ArticlesResult>('/assets/articles.json');
  }
}
