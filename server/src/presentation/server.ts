import express, { Router } from 'express';
import cors from 'cors';
interface Options {
    port: number
    routes: Router
}


export class Server {

    private readonly app = express()
    private readonly port: number
    private readonly routes: Router

    constructor(props: Options) {
        const { port = 3000, routes } = props
        this.port = port
        this.routes = routes
    }

    async start() {

        // Middlewares
        this.app.use(cors());
        this.app.use((req, res, next) => {
            if (req.originalUrl === '/api/v1/subscriptions/webhook') {
                next();
            } else {
                express.json()(req, res, next);
            }
        });
        // Usar las rutas definidas
        this.app.use(this.routes);

        // Escuchar el puerto
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })

    }

}