import express, { Router } from 'express';

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
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // x-www-


        // Usar las rutas definidas
        this.app.use(this.routes);

        // Escuchar el puerto
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })

    }

}