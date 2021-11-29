import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './+state/settings.effects';
import { StoreModule } from '@ngrx/store';
import { settingsFeature } from 'src/modules/settings/+state/settings.reducer';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
      },
    ]),
    StoreModule.forFeature(settingsFeature),
    EffectsModule.forFeature([SettingsEffects]),
  ],
})
export class SettingsModule {}
