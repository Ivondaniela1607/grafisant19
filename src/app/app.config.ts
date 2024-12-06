import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FilesUtils } from './utils/files';
import { MessageSwal } from './utils/message';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './core/guard/auth.guard';
import { LoggedInGuard } from './core/guard/logged-in.guard';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { HeadersInterceptor } from './core/interceptors/headers.interceptor';
import { provideAuth } from './core/interceptors/auth.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient( withFetch()),
    AuthGuard,
    FilesUtils,
    LoggedInGuard,
    provideAuth(),
    MessageSwal, provideAnimationsAsync(),
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HeadersInterceptor, 
      multi: true 
    },
  ]
};
