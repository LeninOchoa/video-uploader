/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { IMedium } from '../models/IMedium';
import type { MediumDto } from '../models/MediumDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class MediumService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param id ID des Mediums
     * @returns any OK
     * @throws ApiError
     */
    public getApiMedium(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/medium',
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
     * @returns IMedium Created
     * @throws ApiError
     */
    public postApiMedium(
        requestBody: MediumDto,
    ): Observable<any | IMedium> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/medium',
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
    public putApiMedium(
        requestBody: MediumDto,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/api/medium',
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
    public deleteApiMedium(
        id: number,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/api/medium',
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
    public getApiMediumAll(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/medium/all',
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
    public getApiMediumActive(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/medium/active',
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
