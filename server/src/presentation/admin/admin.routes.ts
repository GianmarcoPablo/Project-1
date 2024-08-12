import { Router } from "express";
import { AdminController } from "./admin.controller";
import { AdminMiddeware } from "./admin.middeware";
import { AdminRepositoryImpl } from "../../infrastructure/repositories/admin/admin.repository.impl";
import { AdminDatasourceImpl } from "../../infrastructure/datasources/admin/admin.datasource.impl";

export class AdminRoutes {
    static get routes(): Router {
        const router: Router = Router();

        const datasource = new AdminDatasourceImpl();
        const repository = new AdminRepositoryImpl(datasource);
        const controller = new AdminController(repository);
        router.use(AdminMiddeware.isAdmin);

        router.get("/dashboard/users", controller.getUsers);

        return router;
    }
}