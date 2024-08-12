import { prisma } from "../../../databases";
import { AdminDatasource } from "../../../domain/datasources/admin/admin.datasource";
import { UserQueryDto } from "../../../domain/dtos/admin/user-query.dto";

export class AdminDatasourceImpl implements AdminDatasource {

    async getUsers(dto: UserQueryDto): Promise<any> {
        const { page = 1, limit = 10, isPremiun, isVerified, orderBy } = dto;


        const skip = (page - 1) * limit;

        const where: any = {};
        if (isPremiun !== undefined) {
            where.isPremiun = isPremiun;
        }
        if (isVerified !== undefined) {
            where.emailVerified = isVerified;
        }

        const orderByClause: any = {};
        if (orderBy) {
            const [field, direction] = orderBy.split(':');
            orderByClause[field] = direction.toLowerCase();
        } else {
            orderByClause.createdAt = 'desc'; // Default ordering
        }

        const [users, totalCount] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: orderByClause,
            }),
            prisma.user.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            users,
            pagination: {
                page,
                limit,
                totalPages,
                totalCount,
            },
        };
    }
}