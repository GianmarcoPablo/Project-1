import { AuthRepository } from "../../repositories";


interface UserReturn {
    data: {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
        customerId?: string,
        imageUser?: string,
    }
}

interface GetMyUserUseCase {
    execute(id: string): Promise<UserReturn>;
}

export class GetMyUser implements GetMyUserUseCase {

    constructor(
        private readonly authResository: AuthRepository,
    ) { }

    async execute(id: string): Promise<UserReturn> {
        const user = await this.authResository.getMyUser(id);
        return {
            data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                imageUser: user.imageUser?.url,
                customerId: user.customerId,
            }
        };
    }

}