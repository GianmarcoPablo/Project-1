import { Router } from "express";
import { CompaniesController } from "./companies.controller";

export class ComapaniesRoutes {
    static get routes(): Router {

        const controller = new CompaniesController();

        const router = Router();


        return router;
    }
}