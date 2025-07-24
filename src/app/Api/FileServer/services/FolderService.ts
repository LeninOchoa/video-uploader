/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { FolderDto } from '../models/FolderDto';
import type { IFolder } from '../models/IFolder';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class FolderService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param id ID des Folders
     * @returns any OK
     * @throws ApiError
     */
    public getApiFolder(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/folder',
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
     * @returns IFolder Created
     * @throws ApiError
     */
    public postApiFolder(
        requestBody: FolderDto,
    ): Observable<any | IFolder> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/folder',
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
    public putApiFolder(
        requestBody: FolderDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/folder',
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
    public deleteApiFolder(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/folder',
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
    public getApiFolderActive(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/folder/active',
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getApiFolderAll(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/folder/all',
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
