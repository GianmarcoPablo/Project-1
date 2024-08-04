import { CreateCurriculumDto } from "../../dtos/curriculum/create-curriculum.dto";
import { CurriculumEntity } from "../../entities";

export abstract class CurriculumDataSource {
    abstract createCurriculum(data: CreateCurriculumDto): Promise<CurriculumEntity>
}