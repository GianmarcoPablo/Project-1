import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors';
import { AuthRepository } from '../../repositories';


interface UserToken {
    token: string;
    user: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
    };
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
            token: token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            }
        };

    }

}

