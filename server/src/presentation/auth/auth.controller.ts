import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";
import { AuthRepository } from "../../domain/repositories";
import { LoginUserDto, RegisterUserDto, ValidateEmailDto } from "../../domain/dtos";
import { LoginUser, RegisterUser } from "../../domain/use-cases";
import jwt from 'jsonwebtoken';
import { ValidateEmail } from "../../domain/use-cases/auth/validate-email.use-case";
import { GetMyUser } from "../../domain/use-cases/auth/get-my-user.use-case";

export class AuthController {

    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                error: error.message,
            });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, dto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error: error });
        new RegisterUser(this.authRepository)
            .execute(dto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, dto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error: error });
        new LoginUser(this.authRepository)
            .execute(dto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }

    getMyUser = (req: Request, res: Response) => {
        const { id } = req.body.user
        new GetMyUser(this.authRepository)
            .execute(id)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {
        const [error, dto] = ValidateEmailDto.create(req.body);
        if (error) return res.status(400).json({ error: error });
        new ValidateEmail(this.authRepository)
            .execute(dto!)
            .then(response => res.status(200).json({ message: "Codigo de verificación enviado" }))
            .catch(error => this.handleError(error, res));
    }

    decrypt = (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        jwt.verify(token, process.env.JWT_SEED!, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Unauthorized' });
            res.status(200).json(decoded);
        });
    }
}