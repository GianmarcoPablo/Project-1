import { CloudinaryResponse } from "../../../infrastructure/services/cloud/cloud-storage-service.impl";

export abstract class CloudStorageService {
    abstract uploadFile(file: Express.Multer.File, folder?: string): Promise<CloudinaryResponse>;
}