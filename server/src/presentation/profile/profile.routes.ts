import { Router } from "express";
import { ProfileController } from "./";
import { ProfileRepositoryImpl } from "../../infrastructure/repositories/profile/profile.repository.impl";
import { ProfileDatasourceImpl } from "../../infrastructure/datasources/profile/profile.datasource.impl";
import { AuthMiddleware } from "../auth/auth.middleware";

export class ProfileRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new ProfileDatasourceImpl();
        const repository = new ProfileRepositoryImpl(datasource)
        const controller = new ProfileController(repository);

        router.post('/', [AuthMiddleware.validateJWT,], controller.createProfile);

        return router;
    }
}