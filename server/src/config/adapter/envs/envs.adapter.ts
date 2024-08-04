import 'dotenv/config';
import { get } from 'env-var';




export const envs = {


    PORT: get('PORT').required().asPortNumber(),

    JWT_SEED: get('JWT_SEED').required().asString(),

    API_KEY_CLOUDINARY: get('API_KEY_CLOUDINARY').required().asString(),
    API_KEY_SECRET_CLOUDINARY: get('API_KEY_SECRET_CLOUDINARY').required().asString(),
    CLOUD_NAME_CLOUDINARY: get('CLOUD_NAME_CLOUDINARY').required().asString(),


}