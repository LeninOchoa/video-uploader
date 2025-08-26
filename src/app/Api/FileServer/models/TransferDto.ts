/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaType } from './MediaType';
export type TransferDto = {
    classificationId?: number;
    customId?: string | null;
    originalName?: string | null;
    mediaType?: MediaType;
    createdBy?: string | null;
    language?: string | null;
    version?: number | null;
    metaData?: string | null;
    fileData?: Array<Blob> | null;
    pageNumbers?: Array<number> | null;
};

