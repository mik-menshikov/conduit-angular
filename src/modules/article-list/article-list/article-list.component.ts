import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from 'src/modules/api/interfaces';
import { loadArticleLists } from 'src/modules/article-list/+state/article-list.actions';
import {
  ArticlesFilter,
  ArticlesState,
} from 'src/modules/article-list/+state/article-list.reducer';
import {
  selectArticles,
  isLoading,
  selectFilter,
  selectTotalPages,
} from 'src/modules/article-list/+state/article-list.selectors';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> | undefined;
  loading$: Observable<boolean> | undefined;
  filter$: Observable<ArticlesFilter>;
  totalPages$: Observable<number>;

  constructor(private store: Store<ArticlesState>) {}

  ngOnInit(): void {
    this.articles$ = this.store.select(selectArticles);
    this.filter$ = this.store.select(selectFilter);
    this.loading$ = this.store.select(isLoading);
    this.totalPages$ = this.store.select(selectTotalPages);
  }
}
