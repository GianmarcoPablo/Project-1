import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";
import { SubscriptionsRepository } from "../../domain/repositories";
import { CreateCheckoutSessionDto } from "../../domain/dtos";
import { CreateCheckoutSession } from "../../domain/use-cases/subscriptions/create-checkout-session.use-case";

export class SubscriptionsController {

    constructor(
        private readonly subscriptionsRepository: SubscriptionsRepository
    ) { }


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    createCheckoutSession = (req: Request, res: Response) => {
        const [error, dto] = CreateCheckoutSessionDto.create(req.body);
        if (error) return res.status(400).json({ error: error });
        new CreateCheckoutSession(this.subscriptionsRepository)
            .execute(dto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }
}