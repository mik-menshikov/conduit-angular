import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import * as HomeActions from './+state/home.actions';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';
import { ConfigService } from 'src/modules/config/config.service';
import {
  ArticlesFilter,
  selectArticles,
  selectFilter,
  selectLoading,
  selectTags,
  selectTotalPages,
} from 'src/modules/home/+state/home.reducer';
import { Article } from 'src/modules/api/interfaces';
import { auditTime, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tags$: Observable<string[]>;
  filter$: Observable<ArticlesFilter>;
  loggedIn$: Observable<boolean>;
  articles$: Observable<Article[]>;
  loading$: Observable<boolean>;
  totalPages$: Observable<number>;

  routeSubscription: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.tags$ = this.store.select(selectTags);
    this.filter$ = this.store.select(selectFilter);
    this.loggedIn$ = this.store.select(AuthSelectors.isLoggedIn);

    this.articles$ = this.store.select(selectArticles);
    this.filter$ = this.store.select(selectFilter);
    // show loading indicator only when the req lasts more than 500 ms
    // and show it for not less than 300 ms to avoid flickering effect
    this.loading$ = this.store.select(selectLoading).pipe(
      auditTime(500),
      switchMap((val) => (!val ? of(val).pipe(delay(300)) : of(val)))
    );
    this.totalPages$ = this.store.select(selectTotalPages);

    this.store.dispatch(
      HomeActions.loadArticleLists({ pageSize: this.config.pageSize })
    );
    this.store.dispatch(HomeActions.loadTags());

    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const { page, tag, feed } = params;
      this.store.dispatch(
        HomeActions.loadArticleLists({
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
