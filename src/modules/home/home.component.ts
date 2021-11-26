import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
<<<<<<< HEAD

    this.articles$ = this.store.select(selectArticles);
    this.filter$ = this.store.select(selectFilter);
    this.loading$ = this.store.select(selectLoading);
    this.totalPages$ = this.store.select(selectTotalPages);
=======
>>>>>>> main

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
