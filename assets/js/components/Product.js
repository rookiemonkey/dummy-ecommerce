import Calzada from '../main';
import HTMLProductReview from './ProductReview';
import HTMLStarRatings from './Stars';
import toPhp from '../utilities/toFormat';

export default function HTMLProduct(product) {

    this.container = document.createElement('div');
    this.container.classList.add('product-main-container');

    this.container.innerHTML = `
        <div class="product-container">
            <div class="product-image-container">
                <img src="${product.product_image_lg}" />
            </div>
            <div class="product-meta-container">
                <h1>${product.product_name}</h1>
                <h3>${product.product_department} - <span>${product.product_type}</span></h3>
                <div class="status">
                    ${new HTMLStarRatings(product.product_ratings).container.outerHTML}
                    <span>${product.product_sales} Sold &nbsp;| </span>
                    <span>${product.product_stock} Stocks Left</span>
                </div>

                <p class="product_price">${toPhp(product.product_price)}</p>

                <div class="product_quantity">
                    <label>Quantity: </label>
                    <input id="quantity_${product._id}" name="quantity" type="number" min="1" step="1" value="1" />
                </div>

                <div class="product_actions">
                    <button class="btn_addToCart" id="addToCart_${product._id}">
                        <i class="ion-ios-cart"></i> 
                        &nbsp; Add To Cart
                    </button>
                    <button class="btn_buyNow" id="buyNow_${product._id}">
                        <i class="ion-bag"></i> 
                        &nbsp; Buy Now
                    </button>
                </div>

                <p>${product.product_description}</p>
            </div>
        </div>

        <ul class="reviews-container">
            <h4>Product Reviews</h4>
        </ul>
    `

    // append to DOM, create review elements and append it as well
    document.getElementById('product-route').appendChild(this.container)
    product.product_reviews.forEach(p => new HTMLProductReview(p))

    // attach event listeners after appending to DOM
    const quantity = document.getElementById(`quantity_${product._id}`);
    const addtocart = document.getElementById(`addToCart_${product._id}`);
    const buynow = document.getElementById(`buyNow_${product._id}`);

    // EVENT: Add to Cart!
    addtocart.onclick = () => {
        Calzada.addToCart({
            _id: product._id,
            product_name: product.product_name,
            product_quantity: parseInt(quantity.value),
            product_image_sm: product.product_image_sm,
            product_image_md: product.product_image_md,
            product_ratings: product.product_ratings,
            product_price: product.product_price
        })

        quantity.value = 1;
        Calzada.notifier
            .showMessage(`Successfully added ${product.product_name} to your cart!`, 'success')
    }

    // EVENT: Buy Now!, add to cart then route to checkout
    buynow.onclick = () => {
        Calzada.addToCart({
            _id: product._id,
            product_name: product.product_name,
            product_quantity: parseInt(quantity.value),
            product_image_sm: product.product_image_sm,
            product_image_md: product.product_image_md,
            product_ratings: product.product_ratings,
            product_price: product.product_price
        })

        quantity.value = 1;
        Calzada.toCheckout();
    }
}