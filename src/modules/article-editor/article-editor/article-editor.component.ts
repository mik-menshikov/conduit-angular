import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  debounce,
  debounceTime,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { UpdatableArticle } from 'src/modules/api/interfaces';
import {
  changeArticle,
  loadArticle,
  loadArticleSuccess,
  publishArticle,
  updateArticle,
} from 'src/modules/article-editor/+state/article-editor.actions';
import { selectArticle } from 'src/modules/article-editor/+state/article-editor.reducer';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  articleForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tags: [''],
  });

  unsubscribe$ = new Subject();
  actionsSubscription: Subscription;
  mode: 'new' | 'update' = 'new';
  slug: string;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private actionsSubj: ActionsSubject
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.params.slug;
    if (slug) {
      this.slug = slug;
      this.mode = 'update';
      this.store.dispatch(loadArticle({ slug }));
    }

    // set initial values for fields
    this.actionsSubj
      .pipe(ofType(loadArticleSuccess), takeUntil(this.unsubscribe$))
      .subscribe((action) => {
        const { title, description, body, tagList } = action.article;
        this.articleForm.setValue({
          title,
          description,
          body,
          tags: tagList.join(' '),
        });
      });

    // sync the store with the form
    this.articleForm.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        const { title, description, body } = this.articleForm.value;
        const tags: string = this.articleForm.value.tags ?? '';
        const tagList = tags.trim() ? tags.split(' ') : [];
        this.store.dispatch(
          changeArticle({
            article: {
              title,
              description,
              body,
              slug: this.slug,
              tagList,
            },
          })
        );
      });
  }

  onSubmit() {
    const action = this.mode === 'new' ? publishArticle() : updateArticle();
    this.store.dispatch(action);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
