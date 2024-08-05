export class CreateCurriculumDto {

    constructor(
        public readonly file: Express.Multer.File,
        public readonly userId: string
    ) { }

    static create(object: { [key: string]: any; }): [string?, CreateCurriculumDto?] {

        const { file, userId } = object as {
            file: Express.Multer.File,
            userId: string
        }


        if (!file) return ['Missing file'];


        if (file.size > 1024 * 1024 * 6) return ['Max file size is 6mb'];


        if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword') return ['File must be of type pdf or word'];

        return [
            undefined,
            new CreateCurriculumDto(file, userId)
        ];
    }
}