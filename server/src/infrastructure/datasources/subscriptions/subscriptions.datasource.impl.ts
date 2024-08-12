import { SubscriptionsDatasource } from "../../../domain/datasources/subscriptions/subscriptions.datasource";
import { CreateCheckoutSessionDto } from "../../../domain/dtos";
import { StripeAdapter } from "../../../config";
import { CustomError } from "../../../domain/errors";

export class SubscriptionsDatasourceImpl implements SubscriptionsDatasource {

    constructor(
        public readonly stripe = StripeAdapter.stripe,
    ) { }

    async createCheckoutSession(data: CreateCheckoutSessionDto): Promise<any> {
        try {
            const session = await this.stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ['card'],
                customer: data.customerId,
                line_items: [
                    {
                        price: data.priceId,
                        quantity: 1,
                    }
                ],
                success_url: `${process.env.FRONTEND_URL}/subscriptions/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            })


            return session.id
        } catch (error) {
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

}