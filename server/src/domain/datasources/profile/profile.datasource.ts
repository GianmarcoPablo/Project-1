import { CreateProfileDto } from "../../dtos/profile/create-profile.dto";
import { ProfileEntity } from "../../entities/profile/profile.entity";

export abstract class ProfileDatasource {
    abstract createProfile(dto: CreateProfileDto): Promise<ProfileEntity>;
}