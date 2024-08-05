import { Router } from "express";
import { CurriculumController } from "./";
import { MulterAdapter } from "../../config";
import { AuthMiddleware } from "../auth/auth.middleware";

export class CurriculumRoutes {

    static get routes(): Router {

        const controller = new CurriculumController();
        const router = Router();

        router.post('/',
            [
                MulterAdapter.upload.single('file'),
                AuthMiddleware.validateJWT,
            ],
            controller.createCurriculum);

        router.delete("/private/delete/:id/:publicId(*)",
            [
                AuthMiddleware.validateJWT,
            ],
            controller.deleteCurriculum);

        router.get("/private/my/curriculum",
            [
                AuthMiddleware.validateJWT,
            ],
            controller.getMyCurriculum);

        return router;


    }
}