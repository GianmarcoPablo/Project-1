import { UserQueryDto } from "../../dtos/admin/user-query.dto";

export abstract class AdminDatasource {
    abstract getUsers(dto: UserQueryDto): Promise<any>
}