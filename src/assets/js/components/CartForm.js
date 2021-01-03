import Calzada from '../main';
import toPhp from '../utilities/toFormat';

export default function HTMLCartForm(total) {
    const form = document.querySelector('form.sidebar-cart');

    form.innerHTML = `
        <h2>Receiver's Information</h2>

        <div class="form_group">
            <label for="checkout_fullname">Full Name:</label>
            <input id="checkout_fullname" name="fullname" type="text" autocomplete="off" required />
        </div>

        <div class="form_group">
            <label for="checkout_address">Address:</label>
            <input id="checkout_address" name="address" type="text" autocomplete="off" required />
        </div>

        <div class="form_group">
            <label for="checkout_contact">Contact Number:</label>
            <input id="checkout_contact" name="contact" type="tel" autocomplete="off" required />
        </div>

        <div class="form_buttons">
            <div class="total_cart">
                <small class="total_cart_label">Total</small>
                <span class="total_cart_amount">${toPhp(total)}</span>
            </div>
            <button class="form_button"><i class="ion-checkmark-circled"></i> &nbsp; Checkout</button>
        </div>
    `

    form.onsubmit = event => Calzada.checkoutCart(event)
}