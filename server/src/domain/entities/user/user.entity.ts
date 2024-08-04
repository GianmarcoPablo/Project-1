


export class UserEntity {

    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public role: string[],
        public img?: string,
    ) { }


}