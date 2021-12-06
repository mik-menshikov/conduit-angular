import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { ApiService } from 'src/modules/api/api.service';
import { ArticleResult } from 'src/modules/api/interfaces';
import { ArticleEffects } from 'src/modules/article/+state/article.effects';

describe('ArticleEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: ArticleEffects;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['removeArticle']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ArticleEffects,
        { provide: ApiService, useValue: spy },
        { provide: Router, useValue: routerSpyObj },
        provideMockActions(() => actions$),
      ],
    });

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    effects = TestBed.inject(ArticleEffects);
  });

  describe('removeArticle', () => {
    it('should call the service', (done: DoneFn) => {
      actions$ = of({ type: '[Article] Remove Article', slug: 'slug' });
      apiServiceSpy.removeArticle.and.returnValue(of({} as ArticleResult));
      effects.removeArticle$.subscribe();
      expect(apiServiceSpy.removeArticle).toHaveBeenCalledWith('slug');
      done();
    });

    it('should navigate to root', (done: DoneFn) => {
      actions$ = of({ type: '[Article] Remove Article', slug: 'slug' });

      apiServiceSpy.removeArticle.and.returnValue(of({} as ArticleResult));

      effects.removeArticle$.subscribe();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
      done();
    });
  });
});
