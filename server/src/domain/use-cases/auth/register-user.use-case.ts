import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";

interface UserToken {
    data:{
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        token: string;
    }
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRespository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRespository.register(registerUserDto);

        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: token,
            }
        }
    }

}
