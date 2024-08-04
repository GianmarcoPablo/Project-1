
import multer from 'multer';

export type MulterFile = Express.Multer.File;

export class MulterAdapter {

    static upload = multer();
}