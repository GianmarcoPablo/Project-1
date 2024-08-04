import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";
import { CurriculumRepository } from "../../domain/repositories";
import { CreateCurriculun } from "../../domain/use-cases";
import { CreateCurriculumDto } from "../../domain/dtos";
import { createCurriculumRepository } from "../../infrastructure/factory";

export class CurriculumController {
    constructor(
        private curriculumRepository: CurriculumRepository = createCurriculumRepository()
    ) { }

    createCurriculum = (req: Request, res: Response) => {
        const file = req.file;
        const [error, dto] = CreateCurriculumDto.create({ file });
        if (error) return res.status(400).json({ error: error });

        new CreateCurriculun(this.curriculumRepository)
            .execute(dto!)
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