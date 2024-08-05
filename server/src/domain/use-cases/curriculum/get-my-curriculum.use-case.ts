import { CurriculumEntity } from '../../entities';
import { CustomError } from '../../errors';
import { CurriculumRepository } from '../../repositories';

interface GetMyCurriculumUseCase {
    execute(userId: string): Promise<CurriculumEntity[]>;
}

export class GetMyCurriculum implements GetMyCurriculumUseCase {

    constructor(
        private readonly curriculumRepository: CurriculumRepository,
    ) { }

    async execute(userId: string): Promise<CurriculumEntity[]> {
        const curriculum = await this.curriculumRepository.getMyCurriculum(userId);
        return curriculum;
    }


}