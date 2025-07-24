// src/app/app.config.ts
import { ApplicationConfig, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          return inject(TokenInterceptor).intercept(req,  {
              handle: next
            }
          );
        }
      ])
    )
  ]
};
