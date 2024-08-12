import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";
import { UserQueryDto } from "../../domain/dtos/admin/user-query.dto";
import { AdminRepository } from "../../domain/repositories/admin/admin.repository";
import { GetUsers } from "../../domain/use-cases/admin/get-users.use-case";

export class AdminController {

    constructor(
        private readonly adminRepository: AdminRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    getUsers = (req: Request, res: Response) => {
        const [error, dto] = UserQueryDto.create(req.query);
        if (error) return res.status(400).json({ error: error });
        new GetUsers(this.adminRepository)
            .execute(dto!)
            .then(response => res.status(200).json(response))
            .catch(error => this.handleError(error, res));
    }
}