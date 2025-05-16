import { Request, Response } from 'express';
import { StripeService } from '../service/stripeServices';
import { ExtendedRequest } from '../types/types';
import cartRepository from '../repository/cartRepository';
import { calculateTotalAmount, transformCartProducts } from '../utils/cartUtils';
import { getPrimaryShippingAddress } from '../utils/orderUtils';
import ordersRepositories from '../repository/ordersRepositories';
import { getPaymentService } from '../service/paymentServicesFactory';

const stripeService = new StripeService();


const createStripeCheckoutSession = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const paymentMethod = 'Stripe';

    const cartProducts = await cartRepository.findCartProductsByAttribute("user", req.user._id);
    if (!cartProducts || cartProducts.length === 0) {
      return res.status(404).json({ status: 'error', message: 'No products found in cart' });
    }

    const transformedProducts = transformCartProducts(cartProducts);
    const totalAmount = calculateTotalAmount(transformedProducts);
    const primaryAddress = getPrimaryShippingAddress(req.user.addresses);

    if (!primaryAddress) {
      return res.status(400).json({ status: 'error', message: 'Primary address not found' });
    }

    const order = await ordersRepositories.saveOrder({
      user: req.user._id,
      totalAmount,
      items: transformedProducts.map(p => ({
        product: p._id,
        productName: p.productName,
        quantity: p.quantity,
        price: p.price,
        discount: p.discount,
        images: p.images,
        originalPrice: p.originalPrice,
      })),
      paymentMethod,
      shippingAddress: {
        street: primaryAddress.street,
        city: primaryAddress.city,
        region: primaryAddress.region,
        postalCode: primaryAddress.postalCode,
        country: primaryAddress.country,
      },
      orderProcesses: [
        {
          process: 'Order Placed',
          date: new Date(),
        },
      ],
    });

    const paymentService = getPaymentService(paymentMethod);
    const session = await paymentService.createCheckoutSession({
      orderId: order._id,
      currency: "rwf",
      products: order.items.map(item => ({
        productName: item.productName,
        description: `Original: ${item.originalPrice} RWF, Discount: ${item.discount}%, Final: ${Math.round(item.originalPrice - (item.originalPrice * item.discount / 100))} RWF`,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        originalPrice: item.originalPrice,
        images: item.images,
      })),
      user: req.user.email,
    });

    if (!session) {
      return res.status(500).json({ status: 'error', message: 'Failed to create checkout session' });
    }

    await cartRepository.clearCart("user", req?.user?._id);

    return res.status(201).json({
      status: 201,
      message: "Checkout session created successfully",
      data: {
        order,
        session
      }
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Internal Server Error',
    });
  }
};

export const createCheckoutSession = async (req: any, res: Response): Promise<any> => {
  try {
    const { currency, products } = req.body;
    const checkoutUrl = await stripeService.createCheckoutSession({ currency, products });

    res.status(200).json({
      status: 'Checkout Successfully',
      CheckoutUrl: checkoutUrl,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const userPaySingleProductByStripe = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const orderData = {
      ...req.body,
      customer: req.user._id,
      paymentMethod: "Stripe",
      orderStatus: "Pending",
      currency: 'rwf'
    };

    const order = await ordersRepositories.saveSingleProductOrder(orderData);

    const paymentService = getPaymentService(orderData.paymentMethod);
    const { url, sessionId } = await paymentService.createSingleProductPayCheckoutSession({
      ...orderData,
      orderId: order._id,
      user: req.user
    });

    return res.status(201).json({
      status: 'success',
      message: "Payment initialized",
      data: { paymentUrl: url, orderId: order._id }
    });

  } catch (error: any) {
    console.error('Payment error:', error);
    const statusCode = error.message.includes('validation') ? 400 : 500;
    return res.status(statusCode).json({
      status: 'error',
      message: error.message || 'Payment processing failed'
    });
  }
};


export default {
  createStripeCheckoutSession,
  userPaySingleProductByStripe
};
