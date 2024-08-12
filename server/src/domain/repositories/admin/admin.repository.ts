import { UserQueryDto } from "../../dtos/admin/user-query.dto";

export abstract class AdminRepository {
    abstract getUsers(dto: UserQueryDto): Promise<any>
}