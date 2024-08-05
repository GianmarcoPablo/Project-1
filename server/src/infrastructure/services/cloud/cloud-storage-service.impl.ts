import cloudinary from 'cloudinary';
import { CloudStorageService } from '../../../domain/services/cloud/cloud-storage-service';
import { createReadStream } from "streamifier"
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export class CloudinaryService implements CloudStorageService {
    constructor() {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
            api_key: process.env.API_KEY_CLOUDINARY,
            api_secret: process.env.API_KEY_SECRET_CLOUDINARY,
        });
    }

    async uploadFile(file: Express.Multer.File, folder?: string): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { folder: folder },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result!);
                },
            );
            createReadStream(file.buffer).pipe(uploadStream);
        })
    }


    async deleteFile(publicId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result!);
            });
        })
    }
}