import { prisma } from "../../../databases";
import { ProfileDatasource } from "../../../domain/datasources/profile/profile.datasource";
import { CreateProfileDto } from "../../../domain/dtos/profile/create-profile.dto";
import { ProfileEntity } from "../../../domain/entities/profile/profile.entity";
import { CustomError } from "../../../domain/errors";


export class ProfileDatasourceImpl implements ProfileDatasource {
    async createProfile(dto: CreateProfileDto): Promise<ProfileEntity> {
        try {
            const profile = await prisma.profile.create({
                data: { ...dto }
            })
            
            return profile
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}