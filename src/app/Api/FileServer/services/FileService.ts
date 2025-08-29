/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Void } from '../models/Void';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param id ID des Dokuments
     * @param position Filter für die Position des Dokuments
     * @param isActive Filter für aktive Dokumente
     * @param isDeleted Filter für gelöschte Dokumente
     * @param version Filter für Version des Dokuments
     * @returns any OK
     * @throws ApiError
     */
    public getApiFileId(
        id: number,
        position: number,
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/file/id',
            query: {
                'id': id,
                'position': position,
                'isActive': isActive,
                'isDeleted': isDeleted,
                'version': version,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param customId customId des Dokuments
     * @param position Filter für die Position des Dokuments
     * @param isActive Filter für aktive Dokumente
     * @param isDeleted Filter für gelöschte Dokumente
     * @param version Filter für Version des Dokuments
     * @returns any OK
     * @throws ApiError
     */
    public getApiFileCustomid(
        customId: string,
        position: number,
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/file/customid',
            query: {
                'customId': customId,
                'position': position,
                'isActive': isActive,
                'isDeleted': isDeleted,
                'version': version,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param id ID des Dokuments
     * @param startSecond Startposition in Sekunden
     * @param sessionId Eindeutige Session-ID
     * @returns any OK
     * @throws ApiError
     */
    public getApiFileStreamDocument(
        id: number,
        startSecond?: number,
        sessionId?: string,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/file/stream/document/{id}',
            path: {
                'id': id,
            },
            query: {
                'startSecond': startSecond,
                'sessionId': sessionId,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param customId CustomId des Dokuments
     * @param startSecond Startposition in Sekunden
     * @param sessionId Eindeutige Session-ID
     * @returns any OK
     * @throws ApiError
     */
    public getApiFileStreamCustom(
        customId: string,
        startSecond?: number,
        sessionId?: string,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/file/stream/custom/{customId}',
            path: {
                'customId': customId,
            },
            query: {
                'startSecond': startSecond,
                'sessionId': sessionId,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param sessionId
     * @returns Void OK
     * @throws ApiError
     */
    public postApiFileStreamPause(
        sessionId: string,
    ): Observable<Void> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/file/stream/{sessionId}/pause',
            path: {
                'sessionId': sessionId,
            },
        });
    }
    /**
     * @param sessionId
     * @returns Void OK
     * @throws ApiError
     */
    public postApiFileStreamResume(
        sessionId: string,
    ): Observable<Void> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/file/stream/{sessionId}/resume',
            path: {
                'sessionId': sessionId,
            },
        });
    }
    /**
     * @param sessionId
     * @returns Void OK
     * @throws ApiError
     */
    public deleteApiFileStream(
        sessionId: string,
    ): Observable<Void> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/file/stream/{sessionId}',
            path: {
                'sessionId': sessionId,
            },
        });
    }

  /**
   * Custom: Stream document as binary Blob and expose raw headers.
   * Uses HttpClient with observe:'response' and responseType:'blob' to avoid JSON parsing.
   * @param id Document ID
   * @param startSecond Optional start position in seconds
   * @param sessionId Optional existing session to resume
   */
  public streamDocumentBinary(
    id: number,
    startSecond?: number,
    sessionId?: string,
  ): Observable<HttpResponse<Blob>> {
    const params: any = {};
    if (startSecond !== undefined && startSecond !== null) params.startSecond = startSecond;
    if (sessionId) params.sessionId = sessionId;

    return this.http.get(`https://app-test.rehaneo.synios.local/rehaportal/api/file/stream/document/${id}`, {
      params,
      observe: 'response',
      responseType: 'blob' as const,
    });
  }
}
