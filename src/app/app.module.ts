import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './features/auth/auth.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LayoutModule } from './shared/modules/layouts/layout.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './features/auth/interceptor/auth.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { LoadingSpinnerComponent } from './shared/modules/loading-spinner/component/loading-spinner/loading-spinner.component';
import { appReducer } from './store/app.state';
import { AuthGuard } from './features/auth/guard/auth.guard';
import { ErrorPageComponent } from './features/error/error-page/error-page.component';

@NgModule({
  declarations: [AppComponent, LoadingSpinnerComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
