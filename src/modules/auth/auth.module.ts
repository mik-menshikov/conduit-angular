import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  authFeatureKey,
  initialState,
  reducer,
} from 'src/modules/auth/+state/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from 'src/modules/auth/+state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { TokenPersistenceService } from 'src/modules/auth/token-persistence.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/modules/auth/token.interceptor';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]),
    StoreModule.forFeature(authFeatureKey, reducer, {
      initialState: initialState,
    }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    TokenInterceptor,
    TokenPersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
