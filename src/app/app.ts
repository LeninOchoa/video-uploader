import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { KeycloakService } from './services/keycloak.service';
import {VideoPlayerComponent} from './video-player/video-player.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VideoUploadComponent, VideoPlayerComponent, FormsModule],
  template: `
    <div style="padding: 2rem">
      <h1>🎥 Reha.Portal Video Upload</h1>
      <button (click)="logout()">🚪 Abmelden</button>
      <app-video-upload />
      <div style="height: 2rem;"></div> <!-- Abstand -->
      <h1>🎬 Video laden</h1>
      <label>
        Dokument-ID:
        <input type="number" [(ngModel)]="docId" />
      </label>
      <label>
        StartTime:
        <input type="startTime" [(ngModel)]="start" />
      </label>

      <button (click)="showPlayer = true">Video anzeigen</button>

      <div style="margin-top: 2rem;" *ngIf="showPlayer">
        <app-video-player [documentId]="docId" [startTime]="start"></app-video-player>
      </div>
    </div>
  `
})
export class App {
  private keycloak = inject(KeycloakService);
  docId = 0;
  start = 0;
  showPlayer = false;
  logout() {
    this.keycloak.logout();
  }
}
