import { CreateCurriculumDto } from "../../dtos/curriculum/create-curriculum.dto";
import { CurriculumEntity } from "../../entities";

export abstract class CurriculumDataSource {
    abstract createCurriculum(data: CreateCurriculumDto): Promise<CurriculumEntity>

    abstract getMyCurriculum(userId: string): Promise<CurriculumEntity[]>

    abstract deleteCurriculum(id: string, publicId: string): Promise<void>
}