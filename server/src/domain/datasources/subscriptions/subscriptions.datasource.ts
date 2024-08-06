import { CreateCheckoutSessionDto } from "../../dtos";

export abstract class SubscriptionsDatasource {
    abstract createCheckoutSession(data: CreateCheckoutSessionDto): Promise<any>
}