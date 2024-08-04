import { CurriculumDataSource } from "../../../domain/datasources/curriculum/curriculum.datasource";
import { CreateCurriculumDto } from "../../../domain/dtos/curriculum/create-curriculum.dto";
import { CurriculumEntity } from "../../../domain/entities";
import { CloudStorageService } from "../../../domain/services/cloud/cloud-storage-service";
import { prisma } from "../../../databases/prisma/db";

export class CurriculumDataSourceImpl implements CurriculumDataSource {

    constructor(private cloudStorage: CloudStorageService) { }


    async createCurriculum(data: CreateCurriculumDto): Promise<CurriculumEntity> {
        const file = await this.cloudStorage.uploadFile(data.file, "curriculum");
        const curriculum = await prisma.curriculum.create({
            data: {
                url: file.url,
                publicId: file.public_id,
                format: file.format,
                bytes: file.bytes,
                userId: "0430feb7-c126-4695-b8aa-a4fb72dae1fd",
            }
        })

        console.log(curriculum)
        return curriculum;
    }
}