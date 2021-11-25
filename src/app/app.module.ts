import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NavComponent } from './components/nav/nav.component';
import { EffectsModule } from '@ngrx/effects';
import { HomeModule } from 'src/modules/home/home.module';
import { ApiModule } from 'src/modules/api/api.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigModule } from 'src/modules/config/config.module';

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    HttpClientModule,
    ApiModule,
    ConfigModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
