import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {FileService} from '../Api/FileServer';

interface PlayerInstance {
  video: HTMLVideoElement;
  sessionId: string;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  @Input() documentId!: number;
  private http = inject(HttpClient);
  private fileService = inject(FileService);

  private players: Record<string, PlayerInstance> = {};

  async initializeVideo(documentId: number, startTime?: number) {
    const playerId = `video-${documentId}`;
    const video = document.getElementById(playerId) as HTMLVideoElement;
    if (!video) return;

    try {
      const response = await firstValueFrom(
        this.fileService.getApiFileStreamDocument(documentId, startTime)
      );

      const sessionId = response?.headers.get('X-Session-Id');
      if (!sessionId) throw new Error('Keine Session-ID im Response-Header gefunden');

      const objectUrl = URL.createObjectURL(response.body!);
      video.src = objectUrl;
      await video.load();

      this.players[playerId] = { video, sessionId };

      if (startTime) {
        video.currentTime = startTime;
      }

      this.showStatus(playerId, `Video initialisiert, Session-ID: ${sessionId}`);
    } catch (err: any) {
      this.showStatus(playerId, `Fehler bei der Initialisierung: ${err.message}`, true);
    }
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
