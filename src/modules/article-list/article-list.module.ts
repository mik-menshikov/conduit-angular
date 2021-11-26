import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { StoreModule } from '@ngrx/store';
import {
  articleListFeatureKey,
  initialState,
  reducer,
} from 'src/modules/article-list/+state/article-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleListEffects } from 'src/modules/article-list/+state/article-list.effects';
import { ApiModule } from 'src/modules/api/api.module';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { RouterModule } from '@angular/router';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleListItemComponent,
    PagerComponent,
  ],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature(articleListFeatureKey, reducer, {
      initialState: initialState,
    }),
    EffectsModule.forFeature([ArticleListEffects]),
    RouterModule,
  ],
  exports: [ArticleListComponent],
})
export class ArticleListModule {}
