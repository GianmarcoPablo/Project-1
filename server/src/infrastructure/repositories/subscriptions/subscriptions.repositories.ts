import { SubscriptionsDatasource } from "../../../domain/datasources/subscriptions/subscriptions.datasource";
import { CreateCheckoutSessionDto } from "../../../domain/dtos";
import { SubscriptionsRepository } from "../../../domain/repositories";

export class SubscriptionsRepositoryImpl implements SubscriptionsRepository {

    constructor(
        private readonly suscriptionsDatasource: SubscriptionsDatasource,
    ) { }

    createCheckoutSession(data: CreateCheckoutSessionDto): Promise<any> {
        return this.suscriptionsDatasource.createCheckoutSession(data);
    }
}