
interface ImageUser {
    id: string,
    publicId: string,
    url: string,
    format: string,
    width: number,
    height: number,
    bytes: number,
    userId: string
}

export class UserEntity {

    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public roles: string[],
        public customerId?: string,
        public imageUser?: ImageUser,
    ) { }


}