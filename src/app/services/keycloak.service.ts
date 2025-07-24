import Keycloak, { KeycloakConfig } from 'keycloak-js';

export class KeycloakService {
  private keycloak!: Keycloak;

  init(config: KeycloakConfig): Promise<boolean> {
    this.keycloak = new Keycloak(config);

    return this.keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      if (!authenticated) {
        console.warn('Nicht authentifiziert');
      }
      return authenticated;
    });
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getKeycloakInstance() {
    return this.keycloak;
  }
}
