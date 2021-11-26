import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './+state/profile.effects';
import { StoreModule } from '@ngrx/store';
import { profileFeature } from 'src/modules/profile/+state/profile.reducer';
import { ArticleListModule } from 'src/modules/article-list/article-list.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ArticleListModule,
    RouterModule.forChild([
      {
        path: ':username',
        component: ProfileComponent,
      },
    ]),
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class ProfileModule {}
