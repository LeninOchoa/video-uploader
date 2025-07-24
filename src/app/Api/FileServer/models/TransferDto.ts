/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaType } from './MediaType';
export type TransferDto = {
    classificationId?: number;
    guid?: string | null;
    originalName?: string | null;
    mediaType?: MediaType;
    createdDate?: string;
    updatedDate?: string;
    createdBy?: string | null;
    language?: string | null;
    version?: number | null;
    metaData?: string | null;
    pageNumbers?: Array<number> | null;
    fileData?: Array<Blob> | null;
};

