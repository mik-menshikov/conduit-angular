import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ArticleListModule } from 'src/modules/article-list/article-list.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { homeFeature } from 'src/modules/home/+state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from 'src/modules/home/+state/home.effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ArticleListModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
