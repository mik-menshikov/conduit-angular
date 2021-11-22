import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Article } from 'src/modules/api/interfaces';
import { loadArticle } from 'src/modules/article/+state/article.actions';
import { ArticleSelectors } from 'src/modules/article/+state/article.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const slug = params['slug'];
          return of(slug);
        })
      )
      .subscribe((slug) => {
        if (slug) {
          this.store.dispatch(loadArticle({ slug }));
        }
      });

    this.article$ = this.store.select(ArticleSelectors.getArticle);
  }
}
