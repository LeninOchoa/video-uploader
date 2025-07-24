import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.text = this.playerScript();
    document.body.appendChild(script);
  }

  playerScript(): string {
    return `const players = {
        instances: {},
        baseApiUrl: 'http://192.168.10.235:5210/api/file/stream',

        async initializeVideo(playerId) {
            const video = document.getElementById(playerId);
            const startTime = video.dataset.startTime;

            try {
                // Hole die Session-ID bevor wir die Instanz initialisieren
                const sessionId = await this.getSessionIdFromHeaders(video);

                this.instances[playerId] = {
                    video: video,
                    sessionId: sessionId
                };

                if (startTime) {
                    video.currentTime = parseInt(startTime);
                }

                this.showStatus(playerId, 'Video initialisiert, Session-ID: ' + sessionId);
            } catch (error) {
                this.showStatus(playerId, 'Fehler bei der Initialisierung: ' + error.message, true);
            }
        },

        async getSessionIdFromHeaders(video) {
            try {
                const response = await fetch(video.src, {
                    method: 'GET',
                    headers: {
                        'Range': 'bytes=0-0' // Nur den Header anfordern
                    }
                });
                console.log("getSessionIdFromHeaders: ", response);
                const sessionId = response.headers.get('X-Session-Id');
                if (sessionId) {
                    video.dataset.sessionId = sessionId;
                    return sessionId;
                }
                throw new Error('Keine Session-ID im Response-Header gefunden');
            } catch (error) {
                console.error('Fehler beim Abrufen der Session-ID:', error);
                throw error;
            }
        },

        async togglePlayPause(playerId) {
            const instance = this.instances[playerId];
            if (!instance) {
                this.showStatus(playerId, 'Video noch nicht initialisiert', true);
                return;
            }

            const btn = document.getElementById(\`playPauseBtn${playerId.slice(-1)}\`);

            try {
                if (instance.video.paused) {
                    await this.resumePlayback(playerId);
                    btn.querySelector('.btn-text').textContent = 'Pause';
                } else {
                    await this.pausePlayback(playerId);
                    btn.querySelector('.btn-text').textContent = 'Fortsetzen';
                }
            } catch (error) {
                this.showStatus(playerId, 'Fehler bei der Wiedergabesteuerung: ' + error.message, true);
            }
        },

        async pausePlayback(playerId) {
            const instance = this.instances[playerId];
            if (!instance || !instance.sessionId) {
                throw new Error('Keine gültige Session gefunden');
            }

            try {
                const response = await fetch(\`${this.baseApiUrl}/${instance.sessionId}/pause\`, {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error(\`Server returned ${response.status}\`);
                }

                instance.video.pause();
                this.showStatus(playerId, 'Video pausiert');
            } catch (error) {
                throw new Error('Fehler beim Pausieren: ' + error.message);
            }
        },

        async resumePlayback(playerId) {
            const instance = this.instances[playerId];
            if (!instance || !instance.sessionId) {
                throw new Error('Keine gültige Session gefunden');
            }

            try {
                const response = await fetch(\`${this.baseApiUrl}/${instance.sessionId}/resume\`, {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error(\`Server returned ${response.status}\`);
                }

                await instance.video.play();
                this.showStatus(playerId, 'Wiedergabe fortgesetzt');
            } catch (error) {
                throw new Error('Fehler beim Fortsetzen: ' + error.message);
            }
        },

        async stopVideo(playerId) {
            const instance = this.instances[playerId];
            if (!instance || !instance.sessionId) {
                this.showStatus(playerId, 'Keine gültige Session gefunden', true);
                return;
            }

            try {
                const response = await fetch(\`${this.baseApiUrl}/${instance.sessionId}\`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(\`Server returned ${response.status}\`);
                }

                instance.video.pause();
                instance.video.currentTime = instance.video.dataset.startTime || 0;
                this.showStatus(playerId, 'Video gestoppt');
            } catch (error) {
                this.showStatus(playerId, 'Fehler beim Stoppen: ' + error.message, true);
            }
        },

        showStats(playerId) {
            const instance = this.instances[playerId];
            if (!instance) {
                this.showStatus(playerId, 'Video noch nicht initialisiert', true);
                return;
            }

            const statsPanel = document.getElementById(\`statsPanel${playerId.slice(-1)}\`);

            const stats = {
                sessionId: instance.sessionId,
                duration: instance.video.duration.toFixed(2),
                currentTime: instance.video.currentTime.toFixed(2),
                playbackRate: instance.video.playbackRate,
                volume: Math.round(instance.video.volume * 100),
                buffered: instance.video.buffered.length ?
                    instance.video.buffered.end(instance.video.buffered.length - 1).toFixed(2) : 0
            };

            statsPanel.innerHTML = \`
                <p>Session-ID: ${stats.sessionId}</p>
                <p>Gesamtlänge: ${stats.duration}s</p>
                <p>Aktuelle Position: ${stats.currentTime}s</p>
                <p>Wiedergabegeschwindigkeit: ${stats.playbackRate}x</p>
                <p>Lautstärke: ${stats.volume}%</p>
                <p>Gepuffert: ${stats.buffered}s</p>
            \`;

            statsPanel.style.display = statsPanel.style.display === 'none' ? 'block' : 'none';
        },

        async deleteVideo(playerId) {
            const instance = this.instances[playerId];
            if (!instance || !instance.sessionId) {
                this.showStatus(playerId, 'Keine gültige Session gefunden', true);
                return;
            }

            if (!confirm('Möchten Sie dieses Video wirklich löschen?')) {
                return;
            }

            try {
                const response = await fetch(\`${this.baseApiUrl}/${instance.sessionId}\`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(\`Server returned ${response.status}\`);
                }

                instance.video.pause();
                instance.video.src = '';
                instance.video.load();

                const buttons = document.querySelectorAll(\`#${playerId}-controls button\`);
                buttons.forEach(btn => btn.disabled = true);

                delete this.instances[playerId];
                this.showStatus(playerId, 'Stream wurde beendet und Video gelöscht');
            } catch (error) {
                this.showStatus(playerId, 'Fehler beim Löschen: ' + error.message, true);
            }
        },

        showStatus(playerId, message, isError = false) {
            const statusElement = document.getElementById(\`statusMessage${playerId.slice(-1)}\`);
            statusElement.textContent = message;
            statusElement.className = \`status-message ${isError ? 'error' : 'success'}\`;
        },

        handleError(playerId) {
            this.showStatus(playerId, 'Fehler bei der Videowiedergabe', true);
        }
    };`;
  }
}

