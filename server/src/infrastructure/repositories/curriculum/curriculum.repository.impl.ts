import { CurriculumRepository } from "../../../domain/repositories";
import { CreateCurriculumDto } from "../../../domain/dtos/curriculum/create-curriculum.dto";
import { CurriculumEntity } from "../../../domain/entities";
import { CurriculumDataSource } from "../../../domain/datasources/curriculum/curriculum.datasource";

export class CurriculumRepositoryImpl implements CurriculumRepository {

    constructor(
        private readonly curriculumDatasource: CurriculumDataSource,
    ) { }

    createCurriculum(data: CreateCurriculumDto): Promise<CurriculumEntity> {
        return this.curriculumDatasource.createCurriculum(data);
    }

}