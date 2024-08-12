import { AuthRepository } from "../../repositories";
import { ValidateEmailDto } from "../../dtos";


interface ValidateEmailUseCase {
    execute(dto: ValidateEmailDto): Promise<string>;
}

export class ValidateEmail implements ValidateEmailUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
    ) { }

    async execute(dto: ValidateEmailDto): Promise<string> {
        const response = await this.authRepository.validateEmail(dto);
        return response;
    }
}