import { HashPasswordAdapter, JwtAdapter, StripeAdapter } from '../../../config';
import { prisma } from '../../../databases';
import { AuthDataSource } from '../../../domain/datasources';
import { LoginUserDto, RegisterUserDto, ValidateEmailDto } from '../../../domain/dtos';
import { UserEntity } from '../../../domain/entities';
import { CustomError } from '../../../domain/errors';
import { UserMapper } from '../../mappers';
import { EmailService } from '../../services/mails/email.service';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDataSource {

    constructor(
        private readonly emailService: EmailService,
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

            const exists = await prisma.user.findUnique({ where: { email } });
            if (exists) throw CustomError.badRequest('User already exists');

            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: this.hashPassword(password),
                    firstname: firstname,
                    lastname: lastname,
                }
            });

            await this.senEmailValidation(user.email);

            const customer = await StripeAdapter.stripe.customers.create({
                email: email,
                name: firstname + ' ' + lastname,
                metadata: {
                    userId: user.id
                }
            })

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    customerId: customer.id
                }
            })

            return UserMapper.userEntityFromObject({ ...user });

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();

        }
    }

    async validateEmail(dto: ValidateEmailDto): Promise<boolean> {
        try {
            const user = await prisma.user.findUnique({ where: { email: dto.email } });
            if (!user) throw CustomError.internalServer("Email not exists");
            if (user.verificationCode !== dto.code) throw CustomError.badRequest("Invalid code");
            if (user.verificationCodeExpires && user.verificationCodeExpires < new Date()) throw CustomError.badRequest("Code expired");

            await prisma.user.update({
                where: { email: dto.email },
                data: { emailVerified: true, verificationCode: null, verificationCodeExpires: null }
            })

            return true;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getMyUser(id: string): Promise<UserEntity> {
        try {
            const user = await prisma.user.findUnique(
                {
                    where: { id },
                    include: {
                        imageUser: true
                    }
                }
            );
            if (!user) throw CustomError.badRequest("User not found");
            return new UserEntity(
                user.id,
                user.firstname,
                user.lastname,
                user.email,
                user.password,
                user.roles,
                user.customerId || undefined,
                user.imageUser ? {
                    id: user.imageUser.id,
                    publicId: user.imageUser.publicId!,
                    url: user.imageUser.url!,
                    format: user.imageUser.format!,
                    width: user.imageUser.width!,
                    height: user.imageUser.height!,
                    bytes: user.imageUser.bytes!,
                    userId: user.imageUser.userId,
                } : undefined
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }



    private async senEmailValidation(email: string) {
        const code = this.generateCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos desde ahora

        await prisma.user.update({
            where: { email },
            data: {
                verificationCode: code,
                verificationCodeExpires: expiresAt
            }
        })

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
                <h1 style="text-align: center; color: #333;">Valida tu correo</h1>
                <p style="text-align: center; color: #555;">Para completar tu registro, por favor, utilize su codigo de verificacion: ${code}</p>
            </div>
        `;

        const options = {
            to: email,
            subject: 'Verifica tu correo electrónico',
            htmlBody: html,
            text: `Tu código de verificación es: ${code}. Este código expirará en 15 minutos.`,
            attachments: [],
        };

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer("Error sending email verification code");
        return true;
    }



    private generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}

