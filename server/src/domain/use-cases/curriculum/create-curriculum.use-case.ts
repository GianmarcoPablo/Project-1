import { CreateCurriculumDto } from '../../dtos/curriculum/create-curriculum.dto';
import { CurriculumEntity } from '../../entities';
import { CustomError } from '../../errors';
import { CurriculumRepository } from '../../repositories';

interface CreateCurriculumUseCase {
    execute(createCurriculumDto: CreateCurriculumDto): Promise<CurriculumEntity>;
}

export class CreateCurriculun implements CreateCurriculumUseCase {

    constructor(
        private readonly curriculumRepository: CurriculumRepository,
    ) { }

    async execute(createCurriculumDto: CreateCurriculumDto): Promise<CurriculumEntity> {
        const curriculum = await this.curriculumRepository.createCurriculum(createCurriculumDto);
        return curriculum;
    }

}

