import { CreateProfileDto } from "../../dtos/profile/create-profile.dto";
import { ProfileEntity } from "../../entities/profile/profile.entity";
import { ProfileRepository } from "../../repositories/profile/profile.repository";

interface CreateProfileUseCase {
    execute(dto: CreateProfileDto): Promise<ProfileEntity>;
}


export class CreateProfile implements CreateProfileUseCase {

    constructor(
        private readonly profileRepository: ProfileRepository
    ) { }

    async execute(dto: CreateProfileDto): Promise<ProfileEntity> {
        throw new Error("Method not implemented.");
    }
}