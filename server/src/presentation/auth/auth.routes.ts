import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDatasourceImpl } from "../../infrastructure/datasources";
import { AuthRepositoryImpl } from "../../infrastructure/repositories";
import { EmailService } from "../../infrastructure/services/mails/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "./auth.middleware";

export class AuthRoutes {
    static get routes(): Router {

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
        )
        const authDatasource = new AuthDatasourceImpl(emailService);
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const controller = new AuthController(authRepository);

        const router = Router();

        router.post('/register', controller.registerUser);
        router.post('/login', controller.loginUser);
        router.get("/my-user", [AuthMiddleware.validateJWT], controller.getMyUser);
        router.post("/validate-email", controller.validateEmail);
        router.get('/decrypt', controller.decrypt);

        return router;
    }
}