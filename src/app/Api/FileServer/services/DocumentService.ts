/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { DocumentDto } from '../models/DocumentDto';
import type { IDocument } from '../models/IDocument';
import type { TransferDto } from '../models/TransferDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param isActive Filter für aktive Dokumente
     * @param isDeleted Filter für gelöschte Dokumente
     * @param version Filter für Version der Dokumente
     * @returns any OK
     * @throws ApiError
     */
    public getApiDocumentAll(
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/document/all',
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
    /**
     * @param id ID des Dokuments
     * @param isActive Filter für aktive Dokumente
     * @param isDeleted Filter für gelöschte Dokumente
     * @param version Filter für Version des Dokuments
     * @returns any OK
     * @throws ApiError
     */
    public getApiDocument(
        id: number,
        isActive?: boolean,
        isDeleted?: boolean,
        version?: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/document',
            query: {
                'id': id,
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
     * @param p0
     * @param p1
     * @param name
     * @param p2
     * @param p3
     * @param p4
     * @param p5
     * @param p6
     * @param p7
     * @param p8
     * @param p9
     * @param fileData
     * @param formData
     * @returns any OK
     * @returns IDocument Created
     * @throws ApiError
     */
    public postApiDocument(
      p0: number, p1: null, name: string, p2: number, p3: string, p4: string, p5: null, p6: null, p7: null, p8: null, p9: null, fileData: {
        data: File;
        fileName: string;
      }[], formData: TransferDto,
    ): Observable<any | IDocument> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/document',
            formData: formData,
            mediaType: 'multipart/form-data',
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
    public putApiDocument(
        requestBody: DocumentDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/document',
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
    public deleteApiDocument(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/document',
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
}
