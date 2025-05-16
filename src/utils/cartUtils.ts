export const calculateDiscountedPrice = (price: number, discount?: number): number => {
    if (!discount || discount <= 0) return price;
    if (discount >= 100) return 0;
    return price - (price * discount / 100);
};

export const transformCartProducts = (cartProducts: any[]) => {
    return cartProducts.map((product: any) => {
        const originalPrice = product.product.price;
        const discount = product.product.discount || 0;
        const finalPrice = calculateDiscountedPrice(originalPrice, discount);

        return {
            _id: product.product._id,
            productName: product.product.productName,
            description: `(${discount}% off)`,
            quantity: product.quantity,
            price: finalPrice,
            originalPrice,
            discount,
            images: product.product.images,
        };
    });
};

export const calculateTotalAmount = (products: any[]) =>
    products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);
