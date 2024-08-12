import { CreateProfileDto } from "../../dtos/profile/create-profile.dto";
import { ProfileEntity } from "../../entities/profile/profile.entity";

export abstract class ProfileRepository {
    abstract createProfile(dto: CreateProfileDto): Promise<ProfileEntity>;
}