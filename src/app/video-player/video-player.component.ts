import { Component, inject, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FileService } from '../Api/FileServer';

interface PlayerInstance {
  video: HTMLVideoElement;
  sessionId: string;
  retryCount: number;
  maxRetries: number;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges, OnDestroy {
  @Input() documentId!: number;
  @Input() startTime?: number;

  private http = inject(HttpClient);
  private fileService = inject(FileService);
  private players: Record<string, PlayerInstance> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentId'] && this.documentId) {
      setTimeout(() => this.initializeVideo(this.documentId, this.startTime), 0);
    }
  }

  ngOnDestroy(): void {
    // Clean up all active streams when component is destroyed
    Object.keys(this.players).forEach(playerId => {
      this.stopVideo(playerId).catch(console.error);
    });
  }

  async initializeVideo(documentId: number, startTime?: number) {
    const playerId = `video-${documentId}`;
    const video = document.getElementById(playerId) as HTMLVideoElement;
    if (!video) return;

    try {
      // Initialize player instance with retry logic
      this.players[playerId] = {
        video,
        sessionId: '',
        retryCount: 0,
        maxRetries: 3
      };

      await this.startStream(playerId, documentId, startTime);

      // Add error event listener for handling stream errors
      video.addEventListener('error', () => this.handleVideoError(playerId));

      // Add ended event listener
      video.addEventListener('ended', () => this.handleVideoEnded(playerId));

    } catch (err: any) {
      this.showStatus(playerId, `Fehler bei der Initialisierung: ${err.message}`, true);
    }
  }

  private async startStream(playerId: string, documentId: number, startTime?: number) {
    const instance = this.players[playerId];
    if (!instance) return;

    try {
      const response = await firstValueFrom(
        this.fileService.getApiFileStreamDocument(documentId, startTime)
      );

      const sessionId = response?.headers.get('X-Session-Id');
      if (!sessionId) throw new Error('Keine Session-ID im Response-Header gefunden');

      const objectUrl = URL.createObjectURL(response.body!);
      instance.video.src = objectUrl;
      instance.sessionId = sessionId;
      await instance.video.load();

      if (startTime) {
        instance.video.currentTime = startTime;
      }

      this.showStatus(playerId, `Video initialisiert, Session-ID: ${sessionId}`);
    } catch (err) {
      await this.handleStreamError(playerId, err);
    }
  }

  private async handleStreamError(playerId: string, error: any) {
    const instance = this.players[playerId];
    if (!instance) return;

    if (instance.retryCount < instance.maxRetries) {
      instance.retryCount++;
      this.showStatus(playerId, `Verbindung wird wiederhergestellt... Versuch ${instance.retryCount}`, true);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Retry stream
      await this.startStream(playerId, Number(playerId.split('-')[1]), instance.video.currentTime);
    } else {
      this.showStatus(playerId, `Stream konnte nicht wiederhergestellt werden: ${error.message}`, true);
    }
  }

  private async handleVideoError(playerId: string) {
    const instance = this.players[playerId];
    if (!instance) return;

    const error = instance.video.error;
    console.error('Video error:', error);

    if (error?.code === MediaError.MEDIA_ERR_NETWORK) {
      await this.handleStreamError(playerId, new Error('Netzwerkfehler'));
    } else {
      this.showStatus(playerId, `Videofehler: ${error?.message || 'Unbekannter Fehler'}`, true);
    }
  }

  protected handleVideoEnded(playerId: string) {
    const instance = this.players[playerId];
    if (!instance) return;

    this.showStatus(playerId, 'Video beendet');
    this.stopVideo(playerId).catch(console.error);
  }

  async togglePlayPause(playerId: string) {
    const instance = this.players[playerId];
    if (!instance) return this.showStatus(playerId, 'Nicht initialisiert', true);

    const btn = document.getElementById(`playPauseBtn${playerId.slice(-1)}`);
    const btnTextEl = btn?.querySelector('.btn-text') as HTMLElement | null;

    if (instance.video.paused) {
      await this.resumePlayback(playerId);
      if (btnTextEl) btnTextEl.textContent = 'Pause';
    } else {
      await this.pausePlayback(playerId);
      if (btnTextEl) btnTextEl.textContent = 'Fortsetzen';
    }
  }

  async pausePlayback(playerId: string) {
    const { sessionId, video } = this.players[playerId];
    await firstValueFrom(this.http.post(`/api/file/stream/${sessionId}/pause`, {}));
    video.pause();
    this.showStatus(playerId, 'Video pausiert');
  }

  async resumePlayback(playerId: string) {
    const { sessionId, video } = this.players[playerId];
    await firstValueFrom(this.http.post(`/api/file/stream/${sessionId}/resume`, {}));
    await video.play();
    this.showStatus(playerId, 'Wiedergabe fortgesetzt');
  }

  async stopVideo(playerId: string) {
    const instance = this.players[playerId];
    if (!instance) return;

    await firstValueFrom(this.http.delete(`/api/file/stream/${instance.sessionId}`));
    instance.video.pause();
    instance.video.currentTime = 0;
    this.showStatus(playerId, 'Video gestoppt');
  }

  showStats(playerId: string) {
    const instance = this.players[playerId];
    if (!instance) return;

    const statsPanel = document.getElementById(`statsPanel${playerId.slice(-1)}`);
    const video = instance.video;

    const stats = {
      sessionId: instance.sessionId,
      duration: video.duration.toFixed(2),
      currentTime: video.currentTime.toFixed(2),
      playbackRate: video.playbackRate,
      volume: Math.round(video.volume * 100),
      buffered: video.buffered.length
        ? video.buffered.end(video.buffered.length - 1).toFixed(2)
        : '0'
    };

    statsPanel!.innerHTML = `
      <p>Session-ID: ${stats.sessionId}</p>
      <p>Gesamtlänge: ${stats.duration}s</p>
      <p>Aktuelle Position: ${stats.currentTime}s</p>
      <p>Wiedergabegeschwindigkeit: ${stats.playbackRate}x</p>
      <p>Lautstärke: ${stats.volume}%</p>
      <p>Gepuffert: ${stats.buffered}s</p>
    `;
    statsPanel!.style.display = statsPanel!.style.display === 'none' ? 'block' : 'none';
  }

  async deleteVideo(playerId: string) {
    const instance = this.players[playerId];
    if (!instance) return;

    if (!confirm('Möchten Sie dieses Video wirklich löschen?')) return;

    await firstValueFrom(this.http.delete(`/api/file/stream/${instance.sessionId}`));
    instance.video.pause();
    instance.video.src = '';
    instance.video.load();
    delete this.players[playerId];
    this.showStatus(playerId, 'Video gelöscht');
  }

  showStatus(playerId: string, message: string, isError = false) {
    const statusEl = document.getElementById(`statusMessage${playerId.slice(-1)}`);
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `status-message ${isError ? 'error' : 'success'}`;
  }

  handleError(playerId: string) {
    this.showStatus(playerId, 'Fehler bei der Videowiedergabe', true);
  }
}
