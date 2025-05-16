import { StripeService } from "./stripeServices";

export const getPaymentService = (method: string) => {
    switch (method.toLowerCase()) {
        case 'stripe':
            return new StripeService();
        // case 'paypal':
        //   return new PaypalService();
        // case 'flutterwave':
        //   return new FlutterwaveService();
        default:
            throw new Error(`Unsupported payment method: ${method}`);
    }
};
