import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/modules/article/+state/article.effects';
import { StoreModule } from '@ngrx/store';
import {
  articleFeatureKey,
  initialState,
} from 'src/modules/article/+state/article.reducer';
import { reducer } from 'src/modules/article/+state/article.reducer';
import { ArticleActionsComponent } from './article-actions/article-actions.component';
import { CommentModule } from 'src/modules/comment/comment.module';
import { SharedModule } from 'src/modules/shared/shared.module';

@NgModule({
  declarations: [ArticleComponent, ArticleActionsComponent],
  imports: [
    CommonModule,
    CommentModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticleComponent,
      },
    ]),
    StoreModule.forFeature(articleFeatureKey, reducer, { initialState }),
    EffectsModule.forFeature([ArticleEffects]),
    SharedModule,
  ],
})
export class ArticleModule {}
