import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
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
  imports: [CommonModule, ApiModule, RouterModule],
  exports: [ArticleListComponent],
})
export class ArticleListModule {}
