import { UserEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";



export class UserMapper {


    static userEntityFromObject(object: { [key: string]: any }) {

        const { id, _id, firstname, lastname, email, password, roles } = object;

        if (!id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!firstname) throw CustomError.badRequest('Missing name');
        if (!lastname) throw CustomError.badRequest('Missing lastName');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');
        if (!roles) throw CustomError.badRequest('Missing roles');


        return new UserEntity(
            _id || id,
            firstname,
            lastname,
            email,
            password,
            roles
        );
    }




}