import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Article, Comment, User } from 'src/modules/api/interfaces';
import {
  loadArticle,
  postComment,
  postCommentSuccess,
  removeComment,
  toggleFollowUser,
} from 'src/modules/article/+state/article.actions';
import { ArticleSelectors } from 'src/modules/article/+state/article.selectors';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';
import { CommentEditorComponent } from 'src/modules/comment/comment-editor/comment-editor.component';
import * as ProfileActions from 'src/modules/profile/+state/profile.actions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$: Observable<Article | null>;
  comments$: Observable<Comment[]>;
  user$: Observable<User | null>;

  @ViewChild(CommentEditorComponent)
  private editorComponent: CommentEditorComponent;

  actionsSubscription: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private actionsSubj: ActionsSubject
  ) {}

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

    this.actionsSubscription = this.actionsSubj
      .pipe(ofType(postCommentSuccess))
      .subscribe(() => {
        this.editorComponent.reset();
      });
  }

  submitComment(slug: string, body: string) {
    this.store.dispatch(postComment({ slug, body }));
  }

  removeComment(slug: string, id: number) {
    this.store.dispatch(removeComment({ slug, id }));
  }

  toggleFollow(username: string) {
    this.store.dispatch(toggleFollowUser({ username }));
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
