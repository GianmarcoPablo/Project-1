import { Router } from "express";
import { prisma } from "../../databases";
import { HashPasswordAdapter } from "../../config";

export class SeedRoutes {

    static get routes(): Router {

        const router = Router();

        router.post('/delete', async (req, res) => {

            await prisma.invoice.deleteMany()
            await prisma.subscription.deleteMany()
            await prisma.curriculum.deleteMany()
            await prisma.session.deleteMany()
            await prisma.user.deleteMany()

            await prisma.user.create({
                data: {
                    email: 'admin@admin.com',
                    password: HashPasswordAdapter.hash('adminpassword123$'),
                    firstname: 'Super',
                    lastname: 'Admin',
                    roles: ["admin"],
                    isPremiun: true,
                    emailVerified: true,
                }
            })

            res.status(200).json({ message: 'Seed deleted' })
        })
        return router;
    }
}