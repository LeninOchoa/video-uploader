/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPage } from './IPage';
export type DocumentDto = {
    id?: number;
    documentTypeId?: number;
    classificationId?: number;
    mediumId?: number;
    customId?: string | null;
    originalName?: string | null;
    cdName?: string | null;
    filePath?: string | null;
    createdDate?: string;
    updatedDate?: string;
    createdBy?: string | null;
    isActive?: boolean;
    isDeleted?: boolean;
    language?: string | null;
    version?: number | null;
    metaData?: string | null;
    pages?: Array<IPage> | null;
};

