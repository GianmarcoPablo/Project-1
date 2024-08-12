export class UserQueryDto {
    constructor(
        public page: number,
        public limit: number,
        public isVerified?: boolean,
        public isPremiun?: boolean,
        public orderBy?: string,
    ) { }

    static create(object: { [key: string]: any; }): [string?, UserQueryDto?] {
        const {
            page = 1,
            limit = 10,
            isVerified,
            isPremiun,
            orderBy
        } = object;

        // Convertir page y limit a number
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            return ["Page and limit must be valid numbers", undefined];
        }

        // Convertir isPremiun y isVerified a boolean
        let isPremiunBoolean: boolean | undefined = undefined;
        let isVerifiedBoolean: boolean | undefined = undefined;

        if (isPremiun !== undefined) {
            isPremiunBoolean = isPremiun === 'true' ? true : isPremiun === 'false' ? false : undefined;
            if (isPremiunBoolean === undefined) {
                return ["isPremiun must be 'true' or 'false'", undefined];
            }
        }

        if (isVerified !== undefined) {
            isVerifiedBoolean = isVerified === 'true' ? true : isVerified === 'false' ? false : undefined;
            if (isVerifiedBoolean === undefined) {
                return ["isVerified must be 'true' or 'false'", undefined];
            }
        }

        // Validar orderBy si está presente
        if (orderBy !== undefined && typeof orderBy !== 'string') {
            return ["orderBy must be a string", undefined];
        }

        return [
            undefined,
            new UserQueryDto(pageNumber, limitNumber, isVerifiedBoolean, isPremiunBoolean, orderBy)
        ];
    }
}