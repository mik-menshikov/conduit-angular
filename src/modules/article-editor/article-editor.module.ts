import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { editorFeature } from 'src/modules/article-editor/+state/article-editor.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEditorEffects } from 'src/modules/article-editor/+state/article-editor.effects';

@NgModule({
  declarations: [ArticleEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditorComponent,
      },
      {
        path: ':slug',
        component: ArticleEditorComponent,
      },
    ]),
    ReactiveFormsModule,
    StoreModule.forFeature(editorFeature),
    EffectsModule.forFeature([ArticleEditorEffects]),
  ],
})
export class ArticleEditorModule {}
