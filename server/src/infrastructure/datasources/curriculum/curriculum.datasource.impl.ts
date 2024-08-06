import { CurriculumDataSource } from "../../../domain/datasources/curriculum/curriculum.datasource";
import { CreateCurriculumDto } from "../../../domain/dtos/curriculum/create-curriculum.dto";
import { CurriculumEntity } from "../../../domain/entities";
import { CloudStorageService } from "../../../domain/services/cloud/cloud-storage-service";
import { prisma } from "../../../databases/prisma/db";
import { CustomError } from "../../../domain/errors";

export class CurriculumDataSourceImpl implements CurriculumDataSource {

    constructor(private cloudStorage: CloudStorageService) { }


    async createCurriculum(data: CreateCurriculumDto): Promise<CurriculumEntity> {

        const exists = await prisma.curriculum.findUnique({ where: { userId: data.userId } });
        if (exists) throw CustomError.badRequest("User already has a curriculum");

        const file = await this.cloudStorage.uploadFile(data.file, "curriculum");
        const curriculum = await prisma.curriculum.create({
            data: {
                url: file.url,
                publicId: file.public_id,
                format: file.format,
                bytes: file.bytes,
                userId: data.userId,
            }
        })
        return new CurriculumEntity(
            curriculum.id,
            curriculum.url,
            curriculum.publicId,
            curriculum.format,
            curriculum.bytes,
            curriculum.userId
        );
    }

    async getMyCurriculum(userId: string): Promise<CurriculumEntity[]> {
        try {
            const curriculum = await prisma.curriculum.findMany({
                where: {
                    userId: userId,
                }
            })
            return curriculum;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async deleteCurriculum(id: string, publicId: string): Promise<void> {
        try {
            await this.cloudStorage.deleteFile(publicId);
            const curriculum = await prisma.curriculum.findUnique({ where: { id } })
            if (!curriculum) throw CustomError.notFound("Curriculum not found");
            await prisma.curriculum.delete({ where: { id } })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}