import { RegisterUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export abstract class AuthDataSource {
    abstract register(dto: RegisterUserDto): Promise<UserEntity>
    abstract login(dto: LoginUserDto): Promise<UserEntity>
}