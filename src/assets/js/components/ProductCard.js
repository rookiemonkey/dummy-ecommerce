import Calzada from '../main';
import HTMLProduct from './Product';
import toPhp from '../utilities/toFormat';
import toTopScroll from '../utilities/toTopScroll';
import variables from '../utilities/_variables';
import img_start from '../../images/star.svg';
import img_loader from '../../images/loader_card.svg';
const { baseurl, apikey } = variables;

export default function HTMLProductCard(product) {
    this.li = document.createElement('li');
    this.li.setAttribute('data-product_id', product._id);
    this.li.classList.add('transition-scroll');
    this.li.classList.add('show-on-scroll');


    // NOTE: loader first before the actualy image, if not, it will break
    this.li.innerHTML = `
        <div id="cardloader_${product._id}" class="cardloader-container">
            <img src="${img_loader}" />
        </div>
        <img src="${product.product_image_md}" 
            alt="${product.product_name}" 
            title="${product.product_name}"
            id="cardimg_${product._id}"
            style="display: none" />
        <div class="productcard-meta">
            <h4>${product.product_name}</h4>
            <div class="productcard-meta-details">
                <div class="productcard-meta-details-left">
                    <span class="ratings">
                        ${product.product_ratings} <img src="${img_start}" />
                    </span>
                    <span class="type">${product.product_department}</span>
                </div>
                <span class="price">${toPhp(product.product_price)}</span>
            </div>
        </div>
    `

    // onclick will make an HTTP request and route to product route
    this.li.onclick = async () => {
        toTopScroll();

        const url = `${baseurl}/api/v1/products/${product._id}?apikey=${apikey}&similarities=true`;
        const raw = await fetch(url);
        const parsed = await raw.json();

        Calzada.router('product');
        new HTMLProduct(parsed.data);
    }

}