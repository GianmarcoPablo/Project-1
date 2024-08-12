import 'dotenv/config';
import { get } from 'env-var';




export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    API_KEY_CLOUDINARY: get('API_KEY_CLOUDINARY').required().asString(),
    API_KEY_SECRET_CLOUDINARY: get('API_KEY_SECRET_CLOUDINARY').required().asString(),
    CLOUD_NAME_CLOUDINARY: get('CLOUD_NAME_CLOUDINARY').required().asString(),
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
}