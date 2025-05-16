import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia"
})

export class PaymentRepository {
  async createCheckoutSession(data: {
    currency: string;
    products: Array<{
      productName: string;
      description?: string;
      quantity: number;
      price: number;
    }>;
  }) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'alipay'],
      line_items: data.products.map((product) => ({
        price_data: {
          currency: data.currency,
          product_data: {
            name: product.productName,
            description: product.description || '',
          },
          unit_amount: product.price * 100, 
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: 'https://http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://http://localhost:5173//cancel',
    });

    return session.url;
  }
  async paySingleProductByStripe(data: any) {
    const shortName = data.productName.length > 10
      ? `${data.productName.slice(0, 10)}...`
      : data.productName;

    const metadata = {
      order_by: String(data.user.fullNames),
      order_id: String(data.orderId),
      product_id: String(data.product),
      discounts: `${shortName}:${data.originalPrice}|${data.discount}%|${data.finalUnitPrice}`,
      currency: data.currency,
    };

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: data.currency,
            product_data: {
              name: data.productName,
              images: data.images,
            },
            unit_amount: Math.round(data.finalUnitPrice),
          },
          quantity: data.quantity,
        }],
        mode: 'payment',
        metadata,
        success_url: `${process.env.FRONTEND_URL}/my-orders?save_single_order=${String(data.orderId)}`,
        cancel_url: `${process.env.FRONTEND_URL}/my-orders?cancel_single_order=${String(data.orderId)}`,

      });

      return { url: session.url, sessionId: session.id };
    } catch (error) {
      console.error('Stripe session error:', error);
      throw new Error('Payment gateway error');
    }
  }
}
