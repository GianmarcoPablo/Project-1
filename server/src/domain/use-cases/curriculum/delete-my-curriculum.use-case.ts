import { CurriculumRepository } from "../../repositories";

interface DeleteCurriculumUseCase {
    execute(id: string, publicId: string): Promise<void>;
}

export class DeleteCurriculum implements DeleteCurriculumUseCase {
    constructor(private curriculumRepository: CurriculumRepository) { }
    async execute(id: string, publicId: string): Promise<void> {
        await this.curriculumRepository.deleteCurriculum(id, publicId);
    }
}