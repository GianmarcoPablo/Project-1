import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDatasourceImpl } from "../../infrastructure/datasources";
import { AuthRepositoryImpl } from "../../infrastructure/repositories";


export class AuthRoutes {
    static get routes(): Router {

        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const controller = new AuthController(authRepository);

        const router = Router();

        router.post('/register', controller.registerUser);
        router.post('/login', controller.loginUser);
        router.get('/decrypt', controller.decrypt);

        return router;
    }
}