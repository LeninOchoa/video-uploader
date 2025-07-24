// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { KeycloakService } from './app/services/keycloak.service';
import {OpenAPI} from './app/Api/FileServer';


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
    ]
  }).then(() => {
    OpenAPI.BASE = 'https://app-test.rehaneo.synios.local/rehaportal';
  }).catch(err => console.error(err));
});
