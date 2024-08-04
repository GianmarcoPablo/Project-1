import { RegisterUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export abstract class AuthRepository {
    abstract register(dto: RegisterUserDto): Promise<UserEntity>
    abstract login(dto: LoginUserDto): Promise<UserEntity>
}