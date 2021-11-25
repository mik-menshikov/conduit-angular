import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ArticleListActions from 'src/modules/article-list/+state/article-list.actions';
import { ArticlesFilter } from 'src/modules/article-list/+state/article-list.reducer';
import { selectFilter } from 'src/modules/article-list/+state/article-list.selectors';
import { ConfigService } from 'src/modules/config/config.service';
import { loadTags } from 'src/modules/home/+state/home.actions';
import { selectTags } from 'src/modules/home/+state/home.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tags$: Observable<string[]>;
  filter$: Observable<ArticlesFilter>;

  routeSubscription: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.tags$ = this.store.select(selectTags);
    this.filter$ = this.store.select(selectFilter);

    this.store.dispatch(
      ArticleListActions.loadArticleLists({ pageSize: this.config.pageSize })
    );
    this.store.dispatch(loadTags());

    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const { page, tag, feed } = params;
      this.store.dispatch(
        ArticleListActions.loadArticleLists({
          pageSize: this.config.pageSize,
          page: page ? +page : 1,
          tag,
          feed,
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
