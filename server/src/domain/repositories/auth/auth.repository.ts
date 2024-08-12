import { RegisterUserDto, LoginUserDto, ValidateEmailDto } from "../../dtos";
import { UserEntity } from "../../entities";

export abstract class AuthRepository {
    abstract register(dto: RegisterUserDto): Promise<UserEntity>
    abstract login(dto: LoginUserDto): Promise<UserEntity>
    abstract validateEmail(dto: ValidateEmailDto): Promise<boolean>
    abstract getMyUser(id: string): Promise<UserEntity>
}