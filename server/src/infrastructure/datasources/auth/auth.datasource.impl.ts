import { HashPasswordAdapter, StripeAdapter } from '../../../config';
import { prisma } from '../../../databases';
import { AuthDataSource } from '../../../domain/datasources';
import { LoginUserDto, RegisterUserDto } from '../../../domain/dtos';
import { UserEntity } from '../../../domain/entities';
import { CustomError } from '../../../domain/errors';
import { UserMapper } from '../../mappers';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDataSource {

    constructor(
        private readonly hashPassword: HashFunction = HashPasswordAdapter.hash,
        private readonly comparePassword: CompareFunction = HashPasswordAdapter.compare,
    ) { }



    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) throw CustomError.badRequest('User does not exists - email');
            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Password is not valid');
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { firstname, email, lastname, password } = registerUserDto;

        try {

            // 1. Verificar si el correo existe
            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) throw CustomError.badRequest('User already exists');

            // 1. Hash de contraseña
            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: this.hashPassword(password),
                    firstname: firstname,
                    lastname: lastname,
                }
            });

            // 2. crear con stripe el customer

            const customer = await StripeAdapter.stripe.customers.create({
                email: email,
                name: firstname + ' ' + lastname,
                metadata: {
                    userId: user.id
                }
            })

            const rpta = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    customerId: customer.id
                }
            })

            console.log(rpta)

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject({ ...user });

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

}

