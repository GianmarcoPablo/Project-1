import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../databases";


export class AdminMiddeware {

    static async isAdmin(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ message: 'Unauthorized' });
        if (!authorization.startsWith('Bearer')) return res.status(401).json({ message: 'Unauthorized' });

        const token = authorization.split(' ')[1]; // Bearer token

        try {
            const payload = await JwtAdapter.validateToken(token);
            if (!payload) return res.status(401).json({ message: 'Unauthorized' });
            const { id } = payload as { id: string };
            const user = await prisma.user.findFirst({ where: { id } });
            if (!user?.roles.includes("admin")) return res.status(401).json({ message: 'Unauthorized' });
            req.body.user = user;
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}