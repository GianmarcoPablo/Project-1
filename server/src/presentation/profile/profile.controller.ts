import { Request, Response } from "express";
import { ProfileRepository } from "../../domain/repositories/profile/profile.repository";
import { CustomError } from "../../domain/errors";
import { CreateProfileDto } from "../../domain/dtos/profile/create-profile.dto";
import { CreateProfile } from "../../domain/use-cases/profile/create-profile.use-case";
export class ProfileController {
    constructor(
        private readonly profileRepository: ProfileRepository,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    createProfile = async (req: Request, res: Response) => {
        const { id } = req.body.user
        const [error, dto] = CreateProfileDto.create({ ...req.body, userId: id });
        if (error) return res.status(400).json({ error: error });
        new CreateProfile(this.profileRepository)
            .execute(dto!)
            .then(response => res.status(200).json(response))
            .catch(error => this.handleError(error, res));
    }
}