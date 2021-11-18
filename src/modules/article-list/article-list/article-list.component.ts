import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from 'src/modules/api/interfaces';
import { ArticlesState } from 'src/modules/article-list/+state/article-list.reducer';
import {
  getArticles,
  isLoading,
} from 'src/modules/article-list/+state/article-list.selectors';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> | undefined;
  loading$: Observable<boolean> | undefined;

  constructor(private store: Store<ArticlesState>) {}

  ngOnInit(): void {
    this.articles$ = this.store.select(getArticles).pipe(tap(console.log));
    this.loading$ = this.store.select(isLoading);
  }
}
