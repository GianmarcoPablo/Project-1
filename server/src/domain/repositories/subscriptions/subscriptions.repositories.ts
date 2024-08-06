import { CreateCheckoutSessionDto } from "../../dtos";

export abstract class SubscriptionsRepository {
    abstract createCheckoutSession(data: CreateCheckoutSessionDto): Promise<any>
}