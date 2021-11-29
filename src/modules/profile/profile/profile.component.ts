import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Profile } from 'src/modules/api/interfaces';
import { ConfigService } from 'src/modules/config/config.service';
import {
  ArticleListState,
  selectCurrentProfile,
  selectFavoritedArticles,
  selectUserArticles,
} from 'src/modules/profile/+state/profile.reducer';
import * as ProfileActions from '../+state/profile.actions';

type ArticlesViewMode = 'user' | 'favorited';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile$: Observable<Profile | undefined>;
  userArticles$: Observable<ArticleListState | undefined>;
  favoritedArticles$: Observable<ArticleListState | undefined>;

  listViewMode: ArticlesViewMode = 'user';

  subscription = new Subscription();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.params.username;

    this.store.dispatch(ProfileActions.loadProfile({ username }));

    this.subscription.add(
      this.route.queryParams
        .pipe(withLatestFrom(this.route.url))
        .subscribe(([queryParams, url]) => {
          const [, pathSegment] = url;
          this.listViewMode =
            pathSegment && pathSegment.path === 'favorites'
              ? 'favorited'
              : 'user';

          let action;
          const actionPayload = {
            username,
            pageSize: this.config.pageSize,
            page: queryParams.page ? +queryParams.page : 1,
          };
          if (this.listViewMode === 'user') {
            action = ProfileActions.loadProfileArticles(actionPayload);
          } else {
            action = ProfileActions.loadFavoritedArticles(actionPayload);
          }
          this.store.dispatch(action);
        })
    );

    this.profile$ = this.store.select(selectCurrentProfile);
    this.userArticles$ = this.store.select(selectUserArticles);
    this.favoritedArticles$ = this.store.select(selectFavoritedArticles);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
