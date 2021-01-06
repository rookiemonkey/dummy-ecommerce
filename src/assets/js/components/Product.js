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
                    <span class="quantity_label">Quantity: </span>
                    <button id="quantity_minus_${product._id}" class="quantity_minus">-</button>
                    <span id="quantity_${product._id}" class="quantity_count">1</span>
                    <button id="quantity_add_${product._id}" class="quantity_add">+</button>
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
    const quantity_add = document.getElementById(`quantity_add_${product._id}`);
    const quantity_minus = document.getElementById(`quantity_minus_${product._id}`);
    const addtocart = document.getElementById(`addToCart_${product._id}`);
    const buynow = document.getElementById(`buyNow_${product._id}`);



    // EVENT: Add/Minus quantity!
    quantity_add.onclick = () => {
        const quantity_value = parseInt(quantity.textContent);
        if (quantity_value == 10) return null
        quantity.textContent = `${quantity_value + 1}`
        evaluateQuantity()
    }

    quantity_minus.onclick = () => {
        const quantity_value = parseInt(quantity.textContent);
        if (quantity_value == 1) return null
        quantity.textContent = `${quantity_value - 1}`
        evaluateQuantity()
    }

    // Utility to style the +/- buttons
    function evaluateQuantity() {
        const quantity_value = parseInt(quantity.textContent);

        if (quantity_value > 1 && quantity_value < 10) {
            quantity_add.removeAttribute('disabled')
            quantity_minus.removeAttribute('disabled')
            quantity_add.classList.remove('quantity_add_disabled')
            quantity_minus.classList.remove('quantity_minus_disabled')
        }

        if (quantity_value == 1) {
            quantity_minus.setAttribute('disabled', 'disabled');
            quantity_minus.classList.add('quantity_minus_disabled')
        }

        if (quantity_value == 10) {
            quantity_add.setAttribute('disabled', 'disabled')
            quantity_add.classList.add('quantity_add_disabled')
        }
    }

    evaluateQuantity()



    // EVENT: Add to Cart!
    addtocart.onclick = () => {
        Calzada.addToCart({
            _id: product._id,
            product_name: product.product_name,
            product_quantity: parseInt(quantity.textContent),
            product_image_sm: product.product_image_sm,
            product_image_md: product.product_image_md,
            product_ratings: product.product_ratings,
            product_price: product.product_price
        })

        quantity.textContent = 1;
        Calzada.notifier
            .showMessage(`Successfully added ${product.product_name} to your cart!`, 'success')
    }



    // EVENT: Buy Now!, add to cart then route to checkout
    buynow.onclick = () => {
        Calzada.addToCart({
            _id: product._id,
            product_name: product.product_name,
            product_quantity: parseInt(quantity.textContent),
            product_image_sm: product.product_image_sm,
            product_image_md: product.product_image_md,
            product_ratings: product.product_ratings,
            product_price: product.product_price
        })

        quantity.textContent = 1;
        Calzada.toCheckout();
    }
}