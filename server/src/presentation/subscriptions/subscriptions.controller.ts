import { Response, Request } from "express";
import { CustomError } from "../../domain/errors";
import { SubscriptionsRepository } from "../../domain/repositories";
import { CreateCheckoutSessionDto } from "../../domain/dtos";
import { CreateCheckoutSession } from "../../domain/use-cases/subscriptions/create-checkout-session.use-case";
import Stripe from "stripe";
import { prisma } from "../../databases";

export class SubscriptionsController {

    constructor(
        private readonly subscriptionsRepository: SubscriptionsRepository,
        private readonly stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    ) { }


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    createCheckoutSession = (req: Request, res: Response) => {
        const [error, dto] = CreateCheckoutSessionDto.create(req.body);
        if (error) return res.status(400).json({ error: error });
        new CreateCheckoutSession(this.subscriptionsRepository)
            .execute(dto!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }

    webhook = async (req: Request, res: Response) => {
        const sig = req.headers['stripe-signature'];
        let event;
        console.log(process.env.STRIPE_WEBHOOK_SECRET)
        try {
            event = this.stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (error: any) {
            console.log(error)
            res.status(400).send(`Webhook Error: ${error.message}`);
            return;
        }

        console.log('✅ Success:', event?.id);

        switch (event?.type) {
            case "customer.subscription.created":
                console.log("llega aca v2")
                await this.customerSubscriptionCreated(event);
                break;
            case "customer.subscription.updated":
                await this.customerSubscriptionUpdated(event);
                break;
            case "customer.subscription.deleted":
                await this.customerSubscriptionDeleted(event);
                break;
            case "invoice.payment_succeeded":
                await this.invoicePaymentSucceeded(event);
                break;
            case "invoice.payment_failed":
                await this.invoicePaymentFailed(event);
                break;
            default:
                console.log("Unhandled event type " + event?.type);
        }
    }

    private customerSubscriptionCreated = async (event: Stripe.Event) => {
        try {
            const subscription = event.data.object as Stripe.Subscription;
            console.log(subscription.items.data[0].price.recurring)
            console.log(subscription.items.data[0].price.recurring?.interval)
            const customerId = subscription.customer as string;
            const user = await prisma.user.findUnique({ where: { customerId } });
            if (!user) throw CustomError.notFound("User not found");
            await prisma.subscription.create({
                data: {
                    subscriptionId: subscription.id,
                    userId: user.id,
                    status: subscription.status,
                    planId: subscription.items.data[0].price.id,
                    price: subscription.items.data[0].price.unit_amount!,
                    currentPeriodStart: new Date(subscription.current_period_start * 1000),
                    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    isMonthly: subscription.items.data[0].price.recurring?.interval === 'month',
                    isYearly: subscription.items.data[0].price.recurring?.interval === 'year',
                }
            })

            await prisma.user.update({
                where: { id: user.id },
                data: { isPremiun: true }
            })
        } catch (error) {
            console.log(error)
        }

    }

    private customerSubscriptionUpdated = async (event: Stripe.Event) => {
        try {
            const subscription = event.data.object as Stripe.Subscription;

            await prisma.subscription.update({
                where: { subscriptionId: subscription.id },
                data: {
                    status: subscription.status,
                    currentPeriodStart: new Date(subscription.current_period_start * 1000),
                    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    cancelAtPeriodEnd: subscription.cancel_at_period_end,
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    private customerSubscriptionDeleted = (event: Stripe.Event) => {
        try {

        } catch (error) {

        }
    }

    private invoicePaymentSucceeded = async (event: Stripe.Event) => {
        try {
            const invoice = event.data.object as Stripe.Invoice;
            const customerId = invoice.customer as string;
            const user = await prisma.user.findUnique({ where: { customerId } });
            if (!user) throw CustomError.notFound("User not found");

            await prisma.invoice.create({
                data: {
                    stripeInvoiceId: invoice.id,
                    userId: user.id,
                    amountDue: invoice.amount_due,
                    amountPaid: invoice.amount_paid,
                    status: invoice.status!,
                    invoiceUrl: invoice.hosted_invoice_url!,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    private invoicePaymentFailed = (event: Stripe.Event) => {
        console.log("invoice.payment_failed");
        console.log(event.data)
    }
}