import { Router } from 'express';
import { AuthRoutes } from './auth';
import { CurriculumRoutes } from './curriculum';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        // Definir todas mis rutas principales
        router.use('/api/v1/auth', AuthRoutes.routes)
        router.use('/api/v1/curriculum', CurriculumRoutes.routes)

        return router;
    }
}