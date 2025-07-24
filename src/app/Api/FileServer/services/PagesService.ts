/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { IPage } from '../models/IPage';
import type { PageDto } from '../models/PageDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class PagesService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param id ID des Pages
     * @returns any OK
     * @throws ApiError
     */
    public getApiPage(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/page',
            query: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @returns IPage Created
     * @throws ApiError
     */
    public postApiPage(
        requestBody: PageDto,
    ): Observable<any | IPage> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/page',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public putApiPage(
        requestBody: PageDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/page',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public deleteApiPage(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/page',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param documentId ID des Dokuments
     * @param isActive Filter für aktive Dokumente
     * @param isDeleted Filter für gelöschte Dokumente
     * @param version Filter für Version des Dokuments
     * @param position Filter für die Position des Dokuments
     * @returns any OK
     * @throws ApiError
     */
    public getApiPageDocumentId(
        documentId: number,
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
        position?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/page/documentId',
            query: {
                'DocumentId': documentId,
                'isActive': isActive,
                'isDeleted': isDeleted,
                'version': version,
                'position': position,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param customId CustomId des Dokuments
     * @param isActive Filter für aktive Dokumente
     * @param isDeleted Filter für gelöschte Dokumente
     * @param version Filter für die Version des Dokuments
     * @param position Filter für die Position des Dokuments
     * @returns any OK
     * @throws ApiError
     */
    public getApiPageCustomId(
        customId: string,
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
        position?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/page/customId',
            query: {
                'CustomId': customId,
                'isActive': isActive,
                'isDeleted': isDeleted,
                'version': version,
                'position': position,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param isActive
     * @param isDeleted
     * @param version
     * @returns any OK
     * @throws ApiError
     */
    public getApiPageAll(
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/page/all',
            query: {
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
}
