import { Router } from "express";
import { SubscriptionsController } from "./subscriptions.controller";
import { SubscriptionsRepositoryImpl } from "../../infrastructure/repositories/subscriptions/subscriptions.repositories";
import { SubscriptionsDatasourceImpl } from "../../infrastructure/datasources/subscriptions/subscriptions.datasource.impl";

export class SubscriptionsRoutes {
    public static get routes(): Router {
        const router: Router = Router();

        const datasource = new SubscriptionsDatasourceImpl();
        const repository = new SubscriptionsRepositoryImpl(datasource);
        const controller = new SubscriptionsController(repository);

        router.post("/create-checkout-session", controller.createCheckoutSession);

        return router;
    }
}