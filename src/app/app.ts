import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload/video-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    VideoUploadComponent
  ],
  template: `
    <div style="padding: 2rem">
      <h1>🎥 Reha.Portal Video Upload</h1>
      <app-video-upload />
    </div>
  `
})
export class App {}
