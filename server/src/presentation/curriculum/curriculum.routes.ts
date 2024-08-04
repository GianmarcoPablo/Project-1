import { Router } from "express";
import { CurriculumController } from "./";
import { MulterAdapter } from "../../config";

export class CurriculumRoutes {

    static get routes(): Router {

        const controller = new CurriculumController();
        const router = Router();

        router.post('/', MulterAdapter.upload.single('file'), controller.createCurriculum);
        return router;
    }
}