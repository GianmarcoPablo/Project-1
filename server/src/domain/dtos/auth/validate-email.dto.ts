export class ValidateEmailDto {
    private constructor(
        public email: string,
        public code: string,
    ) { }

    static create(object: { [key: string]: any; }): [string?, ValidateEmailDto?] {
        const { email, code } = object;
        if (!email) return ['Missing email'];
        if (!code) return ['Missing code'];
        return [
            undefined,
            new ValidateEmailDto(email, code)
        ];
    }
}