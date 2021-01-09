import randomId from '../utilities/getRandomId';

export default function Cart() {
    this.cart_id = randomId();
    this.cart_total = 0;
    this.cart_products = new Array();
    this.cart_calculate = () => {
        this.cart_total = this.cart_products
            .reduce((acc, next) => acc + (parseFloat(next.product_price) * next.product_quantity), 0)
    }
}