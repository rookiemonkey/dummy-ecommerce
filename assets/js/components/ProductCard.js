import Calzada from '../main';
import HTMLProduct from './Product';
import toPhp from '../utilities/toFormat';
import variables from '../utilities/_variables';
const { baseurl, apikey } = variables;

export default function HTMLProductCard(product) {
    this.li = document.createElement('li');
    this.li.setAttribute('data-product_id', product._id);

    this.li.innerHTML = `
        <img src="${product.product_image_md}" 
            alt="${product.product_name}" 
            title="${product.product_name}" />
        <div class="productcard-meta">
            <h4>${product.product_name}</h4>
            <div class="productcard-meta-details">
                <div class="productcard-meta-details-left">
                    <span class="ratings">
                        ${product.product_ratings} <img src="/assets/images/star.svg" />
                    </span>
                    <span class="type">${product.product_department}</span>
                </div>
                <span class="price">${toPhp(product.product_price)}</span>
            </div>
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