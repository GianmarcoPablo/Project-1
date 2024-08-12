import { UserQueryDto } from "../../dtos/admin/user-query.dto";
import { AdminRepository } from "../../repositories/admin/admin.repository";

interface GetUsersUseCase {
    execute(dto: UserQueryDto): Promise<any>;
}

export class GetUsers implements GetUsersUseCase {

    constructor(
        private readonly repository: AdminRepository,
    ) { }

    async execute(dto: UserQueryDto): Promise<any> {
        return this.repository.getUsers(dto);
    }
}