import { ProfileDatasource } from "../../../domain/datasources/profile/profile.datasource";
import { CreateProfileDto } from "../../../domain/dtos/profile/create-profile.dto";
import { ProfileEntity } from "../../../domain/entities/profile/profile.entity";
import { ProfileRepository } from "../../../domain/repositories/profile/profile.repository";

export class ProfileRepositoryImpl implements ProfileRepository {

    constructor(
        private readonly profileDatasource: ProfileDatasource,
    ){}


    createProfile(dto: CreateProfileDto): Promise<ProfileEntity> {
        throw new Error("Method not implemented.");
    }
}