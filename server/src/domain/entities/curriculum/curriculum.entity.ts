


export class CurriculumEntity {

    constructor(
        public readonly id: string,
        public readonly url: string,
        public readonly publicId: string,
        public readonly format: string,
        public readonly bytes: number,
        public readonly userId: string,
    ) { }


}