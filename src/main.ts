// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { KeycloakService } from './app/services/keycloak.service';
import {InjectionToken} from '@angular/core';

// Define API_BASE_URL token
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


// Keycloak vorbereiten
const keycloak = new KeycloakService();

keycloak.init({
  url: 'https://identity.rehaneo.synios.local',
  realm: 'Rehaportal',
  clientId: 'reha' // ← Aus Keycloak-Admin-UI bestätigen
}).then(() => {
  bootstrapApplication(App, {
    ...appConfig,
    providers: [
      ...(appConfig.providers || []),
      { provide: KeycloakService, useValue: keycloak },
      { provide: API_BASE_URL, useValue: 'https://app-test.rehaneo.synios.local' }
    ]
  }).catch(err => console.error(err));
});
