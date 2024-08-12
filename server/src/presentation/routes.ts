import { Router } from 'express';
import { AuthRoutes } from './auth';
import { CurriculumRoutes } from './curriculum';
import { SeedRoutes } from './seed/seed.routes';
import { SubscriptionsRoutes } from './subscriptions';
import { AdminRoutes } from './admin/admin.routes';


export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        // Definir todas mis rutas principales
        router.use('/api/v1/seed', SeedRoutes.routes)
        router.use('/api/v1/auth', AuthRoutes.routes)
        router.use("/api/v1/admin", AdminRoutes.routes)
        router.use('/api/v1/subscriptions', SubscriptionsRoutes.routes)
        router.use('/api/v1/curriculum', CurriculumRoutes.routes)

        return router;
    }
}