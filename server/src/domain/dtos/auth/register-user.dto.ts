import { ExpEmail } from "../../../config";

export class RegisterUserDto {

    private constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any; }): [string?, RegisterUserDto?] {

        const { firstname, lastname, email, password } = object;

        if (!firstname) return ['Missing firstname'];
        if (!lastname) return ['Missing lastname'];
        if (!email) return ['Missing email'];
        if (!ExpEmail.validator.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];


        return [
            undefined,
            new RegisterUserDto(firstname, lastname, email, password)
        ];
    }


}