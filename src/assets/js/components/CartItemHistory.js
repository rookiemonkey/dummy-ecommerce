import toPhp from '../utilities/toFormat';

export default function HTMLCartItemHistory(cartHistory) {

    this.li = document.createElement('li');
    this.li.id = `history_${cartHistory.history_id}`

    const imgs_container = document.createElement('div');
    imgs_container.classList.add('cart-history-images');

    cartHistory.history_cart.forEach(item => {
        const img = document.createElement('img');
        img.src = item.product_image_sm;
        imgs_container.appendChild(img);
    })

    this.li.innerHTML = `
        <div class="cart-history-top">
            <h4>${cartHistory.history_date}</h4>
        </div>
        <div class="cart-history-bottom">
            ${imgs_container.outerHTML}
            <span class="cart-history-numitems">
                ${cartHistory.history_cart.length} item/s &nbsp; | 
            </h5>
            <span class="cart-history-total"> 
                &nbsp; ${toPhp(cartHistory.history_total)}
            </h5>
        </div>
    `

    document.querySelector('.list-carthistory').appendChild(this.li);
}