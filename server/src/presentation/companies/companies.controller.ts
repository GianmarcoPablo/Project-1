import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";

export class CompaniesController {

    constructor(
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}