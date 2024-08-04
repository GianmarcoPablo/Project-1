import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../envs/envs.adapter';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';


const CLOUD_NAME_CLOUDINARY = envs.CLOUD_NAME_CLOUDINARY;
const API_KEY_CLOUDINARY = envs.API_KEY_CLOUDINARY;
const API_KEY_SECRET_CLOUDINARY = envs.API_KEY_SECRET_CLOUDINARY;

cloudinary.config({
    cloud_name: CLOUD_NAME_CLOUDINARY,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_KEY_SECRET_CLOUDINARY,
})


export type UploadApiErrorResponseAdapter = UploadApiErrorResponse;
export type UploadApiResponseAdapter = UploadApiResponse;
export type CloudinaryResponseAdapter = UploadApiResponse | UploadApiErrorResponse;

export default cloudinary;