import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DocumentService, TransferDto} from '../Api/FileServer'
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

  private documentService = inject(DocumentService);

  constructor() {}

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

    const now = new Date();

    const formData: TransferDto = {
      classificationId: 1,
      guid: null,
      originalName: this.selectedFile.name,
      mediaType: 2, // 2 = Document laut enum "MediaType"
      createdDate: now.toISOString(),
      updatedDate: now.toISOString(),
      createdBy: 'Lenin',
      language: null,
      version: null,
      metaData: null,
      pageNumbers: null,
      fileData: [this.selectedFile]
    };

    this.uploadStatus = '📤 Hochladen...';

    this.uploadSubscription = this.documentService.postApiDocument(formData).subscribe({
      next: () => this.uploadStatus = '✅ Upload erfolgreich!',
      error: (err: any) => {
        console.error('Upload error:', err);
        this.uploadStatus = `❌ Fehler: ${err.error?.message || 'Unbekannter Fehler'}`;
      }
    });
  }


}
