import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VideoUploadComponent],
  template: `
    <div style="padding: 2rem">
      <h1>🎥 Reha.Portal Video Upload</h1>
      <button (click)="logout()">🚪 Abmelden</button>
      <app-video-upload />
    </div>
  `
})
export class App {
  private keycloak = inject(KeycloakService);

  logout() {
    this.keycloak.logout();
  }
}
