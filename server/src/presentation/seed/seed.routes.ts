import { Router } from "express";
import { prisma } from "../../databases";

export class SeedRoutes {

    static get routes(): Router {

        const router = Router();

        router.post('/delete', async (req, res) => {

            await prisma.curriculum.deleteMany()
            await prisma.session.deleteMany()
            await prisma.user.deleteMany()

            res.status(200).json({ message: 'Seed deleted' })
        })
        return router;
    }
}