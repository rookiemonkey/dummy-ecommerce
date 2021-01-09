import Calzada from '../main';
import HTMLProduct from './Product';
import variables from '../utilities/_variables';
import toPhp from '../utilities/toFormat';
import img_start from '../../images/star.svg';

const { baseurl, apikey } = variables;

export default function HTMLCartItem(product) {

    this.li = document.createElement('li');
    this.li.id = `cart_${product._id}`;

    this.li.innerHTML = `
        <img src="${product.product_image_md}" />
        <div class="cart-item-meta">
            <div class="cart-item-metatop">
                <h2>
                    ${product.product_name} 
                </h2>
                <span>
                    ${product.product_ratings}  
                    <img src="${img_start}" />&nbsp; |
                </span>
                <span>&nbsp; ${toPhp(product.product_price)}  &nbsp; |</span>
                <span>&nbsp; Quantity: ${product.product_quantity}</span>
            </div>

            <span class='cart-item-total'>
                ${toPhp(product.product_price * product.product_quantity)}
                <i class="ion-android-remove-circle"
                    id="rmv_${product._id}" 
                    title="Remove ${product.product_name} from cart?">
                </i>
            </span>
        </div>
    `

    // onclick will make an HTTP request and route to product route
    this.li.onclick = async () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        const raw = await fetch(`${baseurl}/api/v1/products/${product._id}?apikey=${apikey}`)
        const parsed = await raw.json();
        Calzada.router('product');
        new HTMLProduct(parsed.data);
    }

}