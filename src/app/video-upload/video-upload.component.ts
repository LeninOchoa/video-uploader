import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileServerApi } from '../services/file.service';
import { HttpResponse } from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>📁 Datei hochladen</h2>
      <input type="file" (change)="onFileSelected($event)" />
      <button (click)="upload()" [disabled]="!selectedFile">⬆️ Hochladen</button>

      <p *ngIf="uploadStatus" style="margin-top:1rem;">{{ uploadStatus }}</p>
    </div>
  `
})
export class VideoUploadComponent {
  selectedFile: File | null = null;
  uploadStatus = '';
  private uploadSubscription: Subscription | null = null;

  constructor(private fileClient: FileServerApi.FileServerClient) {}

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
    this.uploadStatus = '';
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    const now = new Date();

    // Add required parameters
    formData.append('classificationId', '1'); // Add appropriate classification ID
    formData.append('mediaType', 'Document'); // Add appropriate media type
    formData.append('createdDate', now.toJSON());
    formData.append('updatedDate', now.toJSON());
    formData.append('fileData', this.selectedFile, this.selectedFile.name);

    this.uploadStatus = '📤 Hochladen...';

    // Store subscription for cleanup
    this.uploadSubscription = this.fileClient.documentPOST(
      1, // classificationId
      null, // guid
      this.selectedFile.name, // originalName
      1, // mediaType
      now, // createdDate
      now, // updatedDate
      null, // createdBy
      null, // language
      null, // version
      null, // metaData
      null, // pageNumbers
      [{ data: this.selectedFile, fileName: this.selectedFile.name }] // fileData
    ).subscribe({
      next: () => this.uploadStatus = '✅ Upload erfolgreich!',
      error: (err: any) => {
        console.error('Upload error:', err);
        this.uploadStatus = `❌ Fehler: ${err.error?.message || 'Unbekannter Fehler'}`;
      }
    });
  }
}
