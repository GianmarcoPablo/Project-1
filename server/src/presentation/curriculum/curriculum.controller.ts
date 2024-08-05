import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";
import { CurriculumRepository } from "../../domain/repositories";
import { CreateCurriculun } from "../../domain/use-cases";
import { CreateCurriculumDto } from "../../domain/dtos";
import { createCurriculumRepository } from "../../infrastructure/factory";
import { GetMyCurriculum } from "../../domain/use-cases/curriculum/get-my-curriculum.use-case";
import { DeleteCurriculum } from "../../domain/use-cases/curriculum/delete-my-curriculum.use-case";

export class CurriculumController {
    constructor(
        private curriculumRepository: CurriculumRepository = createCurriculumRepository()
    ) { }

    createCurriculum = (req: Request, res: Response) => {
        const file = req.file;
        const { id } = req.body.user
        console.log(id)
        const [error, dto] = CreateCurriculumDto.create({ file, userId: id });
        if (error) return res.status(400).json({ error: error });

        new CreateCurriculun(this.curriculumRepository)
            .execute(dto!)
            .then(curriculum => res.status(200).json(curriculum))
            .catch(error => this.handleError(error, res));
    }

    getMyCurriculum = (req: Request, res: Response) => {
        const { id } = req.body.user
        new GetMyCurriculum(this.curriculumRepository)
            .execute(id)
            .then(curriculum => res.status(200).json(curriculum))
            .catch(error => this.handleError(error, res));
    }

    deleteCurriculum = (req: Request, res: Response) => {
        const { id, publicId } = req.params;
        new DeleteCurriculum(this.curriculumRepository)
            .execute(id, publicId)
            .then(curriculum => res.status(200).json(curriculum))
            .catch(error => this.handleError(error, res));
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}