
// MODEL for the whole application
const Calzada = (function Application() {

    // emulating private variables
    let cart = new Array();
    let search_query = '';
    let search_page = 1;
    let department_page = 1;
    const routes = document.querySelectorAll('[data-route]');
    const route_search = document.querySelector('[data-route="search"]');
    const route_department = document.querySelector('[data-route="department"]');
    const input = document.getElementById('nav_search_input');
    const dropdown = document.querySelector('.nav-dropdown');

    return class App {

        // ROUTES: home, search, product, checkout, department
        static router = route => {
            routes.forEach(el => {
                const target = el.dataset.route.toLowerCase() === route.toLowerCase()

                if (!target && el.dataset.route != 'home') {
                    el.style.display = 'none';
                    el.innerHTML = '';
                }

                if (!target && el.dataset.route == 'home') {
                    el.style.display = 'none';
                }

                if (target && el.dataset.route != 'home') {
                    document.querySelector('.nav-brand').innerHTML = `
                        <img src="/assets/images/logo.svg">
                        <h2>Calzada</h2>
                    `
                }

                if (target && route == 'home') {
                    el.style.display = 'block'
                    document.querySelector('.nav-brand').innerHTML = `
                        <img src="/assets/images/logo.svg">
                    `
                }

                if (route != 'search') {
                    search_query = '';
                    search_page = 1;
                }

                if (target)
                    el.style.display = 'block'

            })
        }

        static notifier = new HTMLNotifier()

        static slides = () => showSlides();

        static search = async () => {
            search_query = input.value;
            const url1 = `${baseurl}/api/v1/products/search`
            const url2 = `?apikey=${apikey}&term=${search_query}&page=${search_page}`;
            const raw = await fetch(`${url1}${url2}`);
            const { data, page, lastPage } = await raw.json();
            const btn_next = document.createElement('span');
            const btn_prev = document.createElement('span');

            // generate initial html
            route_search.innerHTML = `
                <h3 id="search_header">Matching resuts for <span>'${search_query}'</span></h3>
                <ul id="list-search"></ul>
            `

            // generate pagination if needed
            if (lastPage > 1) {
                switch (true) {
                    case page == 1:
                        break;
                    // page == 1  render next only
                    // page > 1 && page < lastPage  render prev/next
                    // page > 1 && page == lastPage render prev only
                }
            }

            // generate the product cards if there are results
            if (data.length) {
                generanteDom(data, HTMLProductCard, '#list-search')
            } else {
                const h2 = document.createElement('h2');
                h2.textContent = 'No Matching Results found :(';
                document.querySelector('#list-search').appendChild(h2);
            }

            input.value = '';
            this.router('search');
        }

        static department = async (deptId, deptName) => {
            const url1 = `${baseurl}/api/v1/departments/${deptId}`
            const url2 = `?apikey=${apikey}&page=${department_page}`;
            const raw = await fetch(`${url1}${url2}`);
            const { data, page, lastPage } = await raw.json();

            // generate initial html
            route_department.innerHTML = `
                <h3 id="search_header">${deptName} Department</h3>
                <ul id="list-department"></ul>
            `

            // generate the product cards
            generanteDom(data, HTMLProductCard, '#list-department')

            this.router('department')
        }

        static dropdown = () => {
            dropdown.style.display == 'none'
                ? dropdown.style.display = 'block'
                : dropdown.style.display = 'none'
        }

        static addToCart = newProduct => {
            const isOnCart = cart.some(cartProd => cartProd.id == newProduct.id)

            isOnCart
                ? cart = cart.map(cartProd => {
                    cartProd.id == newProduct.id
                        ? cartProd.quantity += newProduct.quantity
                        : null

                    return cartProd
                })
                : cart.push(newProduct)

            // update badge count
            console.log(cart)
            document.querySelector('#badge').textContent = cart.length
        }

        static checkOutCart() {

            if (!currentUser) return alert('Please login first')

            if (!currentUser.user_creditcard) return alert('Please complete your billing account')

            const { user_history, user_cart } = currentUser;
            const newCartHistory = new CartHistory(user_cart)
            user_history.push(newCartHistory);
            currentUser.user_cart = new Cart();

        }
    }
})();

// MODEL for customers
function User(fullname, email, password) {
    const date = new Date()
    const dateStr = date.toDateString();
    const timeStr = date.toLocaleTimeString();

    this.user_id = faker.random.uuid();
    this.user_accountCreation = `${dateStr} ${timeStr}`;
    this.user_fullname = fullname;
    this.user_email = email;
    this.user_password = password;
    this.user_creditcard = '';
    this.user_cart = new Cart();       // contains product objects
    this.user_history = new Array();   // contains instances of Cart once bought
}

// MODEL for cart
function Cart() {
    this.cart_total = 0;
    this.cart_products = new Array();
    this.cart_recaculate = () => {
        this.cart_total = this.cart_products
            .reduce((acc, next) => acc + (parseFloat(next.product_price) * next.quantity), 0)
    }
}

// MODEL for cart history, stored inside User.user_history
function CartHistory(cartInstance) {
    const date = new Date()
    const dateStr = date.toDateString();
    const timeStr = date.toLocaleTimeString();

    this.history_id = faker.random.uuid();
    this.history_date = `${dateStr} ${timeStr}`;
    this.history_total = cartInstance.cart_total;
    this.history_cart = cartInstance.cart_products;
}

// MODEL for HOME's product card component
function HTMLProductCard(product) {
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
                <span class="price">₱ ${product.product_price}</span>
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

// MODEL for HOME's top sales product card component
function HTMLHomeTopSales(product) {
    this.li = document.createElement('li');
    this.li.setAttribute('data-product_id', product._id);

    this.li.innerHTML = `
        <p class="product-sales">${product.product_sales} Sold!</p>
        <img 
            src="${product.product_image_md}" 
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
                <span class="price">₱ ${product.product_price}</span>
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

// MODEL for PRODUCT route's product component
function HTMLProduct(product) {
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

                <p class="product_price">₱ ${product.product_price}</p>

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
            id: product._id,
            name: product.product_name,
            quantity: parseInt(quantity.value),
            image: product.product_image_lg
        })

        quantity.value = 1;
        Calzada.notifier.showMessage('Successfully added to your cart!', 'success')
    }
}

// MODEL for PRODUCT route's product review component
function HTMLProductReview(review) {
    this.container = document.createElement('li');
    this.container.classList.add('review');
    const start = new Date(2012, 0, 1);
    const end = new Date();

    this.container.innerHTML = `
        <div class="review-header">
            <div class="review-header-avatar">
                <img src="/assets/images/avatar.svg" />
            </div>
            <div class="review-header-meta">
                <h3>${review.review_name}</h3>
                ${new HTMLStarRatings(review.review_rating).container.outerHTML}
            </div>
        </div>
        <div class="review-body">
            ${review.review_details}
        </div>
        <div class="review-date">
            ${new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString()}
        </div>
    `

    document.querySelector('.reviews-container').appendChild(this.container);
}

// MODEL for HOME's slideshow slide component
function HTMLHomeSlide(slideNumber, slideDesc) {
    this.div = document.createElement('div');
    this.div.classList.add('slide');
    this.div.classList.add('fade');

    this.div.innerHTML = `
        <p>${slideDesc}</p>
        <img src="/assets/images/slide${slideNumber}.svg" />
    `
}

// MODEL for star ratings component
function HTMLStarRatings(rating) {
    this.container = document.createElement('span');

    for (let i = 1; i <= 5; i++) {
        const img = document.createElement('img')

        i <= rating
            ? img.setAttribute('src', '/assets/images/star.svg')
            : img.setAttribute('src', '/assets/images/star_off.svg')

        this.container.appendChild(img);
    }
}

// ELEMENT model for notifications
function HTMLNotifier() {
    this.initialize = () => {
        this.hideTimeout = null;
        this.element = document.createElement("div");
        this.element.className = "notify";
        document.body.appendChild(this.element);
    }
    this.showMessage = (message, state) => {
        clearTimeout(this.hideTimeout);
        this.element.textContent = message;
        this.element.className = "notify notify--visible";

        if (state) {
            this.element.classList.add(`notify--${state}`);
        }

        this.hideTimeout = setTimeout(() => {
            this.element.classList.remove("notify--visible");
        }, 3000);
    }
}