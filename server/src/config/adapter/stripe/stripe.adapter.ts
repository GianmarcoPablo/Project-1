import { Stripe } from 'stripe';

export class StripeAdapter {

    static get stripe(): Stripe {
        return new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2024-06-20",
            typescript: true,
        });
    }
}