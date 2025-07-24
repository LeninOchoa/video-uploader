/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { DocumentTypeDto } from '../models/DocumentTypeDto';
import type { IDocumentType } from '../models/IDocumentType';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class DocumentTypesService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param id ID des DocumentTypes
     * @returns any OK
     * @throws ApiError
     */
    public getApiDocumentType(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/documentType',
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
     * @returns IDocumentType Created
     * @throws ApiError
     */
    public postApiDocumentType(
        requestBody: DocumentTypeDto,
    ): Observable<any | IDocumentType> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/documentType',
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
    public putApiDocumentType(
        requestBody: DocumentTypeDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/documentType',
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
    public deleteApiDocumentType(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/documentType',
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
     * @returns any OK
     * @throws ApiError
     */
    public getApiDocumentTypeAll(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/documentType/all',
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
