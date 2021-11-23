import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  combineLatest,
  Observable,
  of,
  Subject,
  Subscriber,
  Subscription,
} from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Article, Comment, User } from 'src/modules/api/interfaces';
import {
  loadArticle,
  postComment,
  postCommentSuccess,
} from 'src/modules/article/+state/article.actions';
import { ArticleSelectors } from 'src/modules/article/+state/article.selectors';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$: Observable<Article | null>;
  comments$: Observable<Comment[]>;
  user$: Observable<User | null>;

  resetComment$: Subject<boolean> = new Subject();

  actionsSubscription: ActionsSubject;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private actionsSubj: ActionsSubject
  ) {
    this.actionsSubscription = actionsSubj;
  }

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
    this.comments$ = this.store.select(ArticleSelectors.getComments);
    this.user$ = this.store.select(AuthSelectors.getUser);

    this.actionsSubscription.pipe(ofType(postCommentSuccess)).subscribe(() => {
      this.resetComment$.next();
    });
  }

  submitComment(slug: string, body: string) {
    this.store.dispatch(postComment({ slug, body }));
  }

  ngOnDestroy(): void {
    this.actionsSubj.unsubscribe();
    this.resetComment$.complete();
  }
}
