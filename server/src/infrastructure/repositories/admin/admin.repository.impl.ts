import { AdminDatasource } from "../../../domain/datasources/admin/admin.datasource";
import { UserQueryDto } from "../../../domain/dtos/admin/user-query.dto";
import { AdminRepository } from "../../../domain/repositories/admin/admin.repository";


export class AdminRepositoryImpl implements AdminRepository {
    constructor(
        private readonly datasource: AdminDatasource,
    ) { }

    getUsers(dto: UserQueryDto): Promise<any> {
        return this.datasource.getUsers(dto);
    }

}