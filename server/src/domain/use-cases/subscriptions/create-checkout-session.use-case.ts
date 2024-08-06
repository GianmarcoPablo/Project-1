import { CreateCheckoutSessionDto } from "../../dtos";
import { SubscriptionsRepository } from "../../repositories";

interface CreateCheckoutSessionUseCase {
    execute(data: CreateCheckoutSessionDto): Promise<any>
}


export class CreateCheckoutSession implements CreateCheckoutSessionUseCase {

    constructor(
        private readonly subscriptionsRepository: SubscriptionsRepository
    ) { }

    execute(data: CreateCheckoutSessionDto): Promise<any> {
        return this.subscriptionsRepository.createCheckoutSession(data);
    }
}