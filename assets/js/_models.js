
// MODEL for the whole application
function Application() {

    // emulating private variables
    const users = new Array();
    const routes = document.querySelectorAll('[data-route]');
    const secret = 'This application is not secured :D'
    let currentUser = null;

    return class App {

        static router = route => {
            routes.forEach(el => {
                el.dataset.route.toLowerCase() === route.toLowerCase()
                    ? el.style.display = 'block'
                    : el.style.display = 'none'
            })
        }

        static getUser = () => console.log(currentUser)

        static createUser(fullname, email, password) {
            const encryptedPassword = CryptoJS.AES.encrypt(password, secret).toString()
            const isEmailExisting = users.some(user => user.user_email === email)

            if (isEmailExisting) return alert("User already exists")

            const newUser = new User(fullname, email, encryptedPassword);
            users.push(newUser)
        }

        static loginUser(email, password) {
            const foundUser = users.find(user => {
                const decryptedPassword = CryptoJS
                    .AES
                    .decrypt(user.user_password, secret)
                    .toString(CryptoJS.enc.Utf8)

                return user.user_email === email && decryptedPassword === password
            })

            if (!foundUser) return alert("User doesn't exists")

            currentUser = foundUser;
        }

        static logoutUser() {
            currentUser = null
        }

        static setUserBillingAccount(creditCardNum) {
            currentUser.user_creditcard = creditCardNum
        }

        static addToCart(productId) {

            if (!currentUser) return alert('Please login first')

            const { cart_products, cart_recaculate } = currentUser.user_cart;

            const isOnCart = cart_products
                .some(cartProduct => cartProduct.product_id === productId)

            if (isOnCart) return alert('Product is already on cart')

            const foundProduct = products
                .find(product => product.product_id === productId)

            if (!foundProduct) return alert("Product doesn't exists")

            foundProduct.quantity = 1;
            cart_products.push(foundProduct)
            cart_recaculate()

        }

        static addToCartQuantity(action, productId) {

            if (!currentUser) return alert('Please login first')

            const { cart_products, cart_recaculate } = currentUser.user_cart;

            const foundProduct = cart_products
                .find(cartProduct => cartProduct.product_id === productId)

            if (!foundProduct) return alert("Product is not on your cart")

            switch (action) {
                case 'ADD':
                    foundProduct.quantity += 1;
                    break;
                case 'MINUS':
                    foundProduct.quantity === 1
                        ? currentUser.user_cart.cart_products = cart_products
                            .filter(cartProduct => cartProduct.product_id !== productId)
                        : foundProduct.quantity -= 1
                    break;
            }

            cart_recaculate()
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
}

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

// MODEL for HOME's product card layout
function HTMLProductCard(product) {
    this.li = document.createElement('li');

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
                <span class="price">₱${product.product_price}</span>
            </div>
        </div>
    `
}

// MODEL for HOME's top sales product card
function HTMLHomeTopSales(product) {
    this.li = document.createElement('li');

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
                <span class="price">₱${product.product_price}</span>
            </div>
        </div>
    `
}

// MODEL for HOME's slideshow slides
function HTMLHomeSlide(slideNumber, slideDesc) {
    this.div = document.createElement('div');
    const p = document.createElement('p');
    const img = document.createElement('img');
    p.textContent = slideDesc;
    img.setAttribute('src', `/assets/images/slide${slideNumber}.svg`)
    this.div.appendChild(p);
    this.div.appendChild(img);
    this.div.classList.add('slide');
    this.div.classList.add('fade');
}