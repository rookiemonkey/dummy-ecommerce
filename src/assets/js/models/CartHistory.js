import randomId from '../utilities/getRandomId';

export default function CartHistory(cartInstance) {
    const date = new Date()
    const dateStr = date.toDateString();
    const timeStr = date.toLocaleTimeString();

    this.history_id = randomId();
    this.history_date = `${dateStr} ${timeStr}`;
    this.history_total = cartInstance.cart_total;
    this.history_cart = cartInstance.cart_products;
    this.history_cartId = cartInstance.cart_id
}