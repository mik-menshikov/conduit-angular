import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ArticleComponent } from 'src/modules/article/article/article.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { AuthState } from 'src/modules/auth/+state/auth.reducer';
import { Article, User, Comment } from 'src/modules/api/interfaces';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';
import { ArticleState } from 'src/modules/article/+state/article.reducer';
import { ArticleSelectors } from 'src/modules/article/+state/article.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';
import { addMatchers, initTestScheduler, hot } from 'jasmine-marbles';

@Component({
  selector: 'comment',
  template: '',
})
class CommentStub {}

@Component({
  selector: 'comment-editor',
  template: '',
})
class CommentEditorStub {}

@Component({
  selector: 'app-article-actions',
  template: '',
})
class ArticleActionsStub {}

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let activatedRoute: ActivatedRouteStub;
  let mockStore: MockStore;
  let mockUserSelector: MemoizedSelector<AuthState, User | null>;
  let mockArticleSelector: MemoizedSelector<ArticleState, Article | null>;
  let mockCommentsSelector: MemoizedSelector<ArticleState, Comment[]>;
  let routerSpy: jasmine.SpyObj<Router>;
  const initialState = {};

  beforeEach(async () => {
    initTestScheduler();
    addMatchers();

    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRoute = new ActivatedRouteStub({ slug: 'slug' });

    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState,
        }),
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: routerSpyObj },
      ],
      declarations: [
        ArticleComponent,
        CommentStub,
        CommentEditorStub,
        ArticleActionsStub,
      ],
    }).compileComponents();

    TestBed.inject(ActivatedRoute);
    mockStore = TestBed.inject(MockStore);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    mockUserSelector = mockStore.overrideSelector(AuthSelectors.getUser, {
      username: 'user',
      email: 'user@server.com',
      bio: '',
      image: '',
      token: '',
    });

    mockArticleSelector = mockStore.overrideSelector(
      ArticleSelectors.getArticle,
      {
        title: 'Title',
        author: {
          username: 'user',
        },
      } as Article
    );

    mockCommentsSelector = mockStore.overrideSelector(
      ArticleSelectors.getComments,
      [] as Comment[]
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to editor', () => {
    component.navigateToEditor('slug');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/editor/slug');
  });

  it('should dispatch remove article action', () => {
    component.removeArticle('slug');

    const expected = hot('a', {
      a: {
        type: '[Article] Remove Article',
        slug: 'slug',
      },
    });

    expect(mockStore.scannedActions$).toBeObservable(expected);
  });
});
