import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors';
import { AuthRepository } from '../../repositories';


interface UserToken {
    data: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        token: string;
    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


interface LoginUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}


export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authResository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }


    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

        const user = await this.authResository.login(loginUserDto);

        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            data: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                token: token,
            }
        };

    }

}

