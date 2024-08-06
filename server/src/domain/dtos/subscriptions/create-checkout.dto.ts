export class CreateCheckoutSessionDto {

    constructor(
        public priceId: string,
        public customerId: string,
    ) { }


    static create(object: { [key: string]: any; }): [string?, CreateCheckoutSessionDto?] {

        const { priceId, customerId } = object;

        if (!priceId) return ['Missing priceId'];
        if (!customerId) return ['Missing customerId'];


        return [
            undefined,
            new CreateCheckoutSessionDto(priceId, customerId)
        ];
    }
}