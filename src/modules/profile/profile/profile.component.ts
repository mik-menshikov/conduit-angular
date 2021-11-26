import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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

  viewMode: ArticlesViewMode = 'user';

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
      this.route.queryParams.subscribe((params) => {
        let action;
        const actionPayload = {
          username,
          pageSize: this.config.pageSize,
          page: params.page ? +params.page : 1,
        };
        if (!params.feed || params.feed === 'user') {
          this.viewMode = 'user';
          action = ProfileActions.loadProfileArticles(actionPayload);
        } else {
          this.viewMode = 'favorited';
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
