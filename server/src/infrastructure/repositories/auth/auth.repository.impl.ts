import { AuthDataSource } from "../../../domain/datasources";
import { LoginUserDto, RegisterUserDto } from "../../../domain/dtos";
import { UserEntity } from "../../../domain/entities";
import { AuthRepository } from "../../../domain/repositories";



export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDataSource,
    ) { }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }


}