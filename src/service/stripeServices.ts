import { PaymentRepository } from "../repository/paymentRepositories";


const paymentRepository = new PaymentRepository();

export class StripeService {
  async createCheckoutSession(data: any) {
    return await paymentRepository.createCheckoutSession(data);
  }
  async createSingleProductPayCheckoutSession(data: any) {
    return await paymentRepository.paySingleProductByStripe(data);
  }
}
