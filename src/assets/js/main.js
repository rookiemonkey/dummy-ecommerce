import Cart from './models/Cart';
import CartHistory from './models/CartHistory';
import HTMLProductCard from './components/ProductCard';
import HTMLCartInit from './components/Cart';
import HTMLCartForm from './components/CartForm';
import HTMLCartItem from './components/CartItem';
import HTMLCartItemHistory from './components/CartItemHistory';
import HTMLNotifier from './components/Notifier';
import HTMLMoreButton from './components/Btn_More';
import toPhp from './utilities/toFormat';
import generanteDom from './utilities/toGenerateDom';
import parseFormData from './utilities/getFormData';
import showSlides from './utilities/toShowSlides';
import variables from './utilities/_variables';
import img_logo from '../images/logo.svg';
import img_empty from '../images/empty.svg';
import img_emptyCart from '../images/cart_empty.svg';
import img_emptyCartHistory from '../images/cart_emptyhistory.svg';

const { baseurl, apikey } = variables;

// MODEL for the whole application
const Calzada = (function Application() {

    // emulating private variables
    let CalzadaCart = new Cart();
    let CalzadaCartHistory = new Array();
    const pagination = {
        search_query: '',
        search_page: 1,
        department_query: '',
        department_page: 1
    }
    const routes = document.querySelectorAll('[data-route]');
    const route_search = document.querySelector('[data-route="search"]');
    const route_department = document.querySelector('[data-route="department"]');
    const route_checkout = document.querySelector('[data-route="checkout"]');
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
                        <img src="${img_logo}">
                        <h2>Calzada</h2>
                    `
                }

                if (target && route == 'home') {
                    el.style.display = 'block'
                    document.querySelector('.nav-brand').innerHTML = `
                        <img src="${img_logo}">
                    `
                }

                if (route != 'search') {
                    pagination.search_query = ''
                    pagination.search_page = 1
                    input.value = ''
                }

                if (route != 'department') {
                    pagination.department_query = ''
                    pagination.department_page = 1
                }

                if (target)
                    el.style.display = 'block'

            })
        }

        static notifier = new HTMLNotifier()

        static slides = () => showSlides();

        static toSearch = async () => {
            try {

                // searching w/o query to match
                if (!input.value)
                    return this.notifier.showMessage('Please enter a query', 'error')

                // initial search
                if (!pagination.search_query)
                    pagination.search_query = input.value;

                // another search after initial, reset everything 
                if (pagination.search_query
                    && input.value
                    && pagination.search_query != input.value) {
                    pagination.search_query = input.value;
                    pagination.search_page = 1;
                    route_search.innerHTML = `
                        <h3 id="search_header">Matching resuts for <span>'${pagination.search_query}'</span></h3>
                        <ul id="list-search"></ul>
                    `
                }

                const { search_query, search_page } = pagination;
                const url1 = `${baseurl}/api/v1/products/search`
                const url2 = `?apikey=${apikey}&term=${search_query}&page=${search_page}`;
                const raw = await fetch(`${url1}${url2}`);
                const { success, message, data, page, lastPage } = await raw.json();

                // throw error if there is no results
                if (!success) throw new Error(message)

                // generate initial html
                if (!document.querySelector('#list-search')) {
                    route_search.innerHTML = `
                    <h3 id="search_header">Matching resuts for <span>'${search_query}'</span></h3>
                    <ul id="list-search"></ul>
                `
                }

                // generate more button 
                if (!document.querySelector('#btn_more_searchresults') && lastPage > 1) {
                    const props = { id: 'searchresults', page: 'search_page', route: 'search' }
                    const { button } = new HTMLMoreButton(props)
                    route_search.appendChild(button)
                }

                // remove more button if last page
                if (page == lastPage) {
                    this.notifier.showMessage(`You've reached the last page`, 'success')
                    document.querySelector('#btn_more_searchresults').remove()
                }

                // generate the product cards if there are results
                generanteDom(data, HTMLProductCard, '#list-search')

                this.router('search');
            }

            catch (error) {
                route_search.innerHTML = `
                        <div class="search_noresults">
                            <img src="${img_empty}" />
                            <h3>${error.message}</h3>
                        </div>
                    `
                this.router('search');
            }
        }

        static toDepartment = async event => {
            const { target } = event;
            const { department_query } = pagination;
            const deptId = target.getAttribute('deptId');
            const deptName = target.getAttribute('deptName');

            // reset to first page if switched to a different department
            if (department_query != deptId) {
                pagination.department_page = 1;
            }

            const url1 = `${baseurl}/api/v1/departments/${deptId}`
            const url2 = `?apikey=${apikey}&page=${pagination.department_page}`;
            const raw = await fetch(`${url1}${url2}`);
            const { data, page, lastPage } = await raw.json();

            // generate initial html
            if (!document.querySelector('#list-department') || department_query != deptId) {
                route_department.innerHTML = `
                    <h3 id="search_header">${deptName} Department</h3>
                    <ul id="list-department"></ul>
                `
            }

            // generate more button 
            if (!document.querySelector('#btn_more_departmentresults') && lastPage > 1) {
                const props = {
                    id: 'departmentresults',
                    page: 'department_page',
                    route: 'department',
                    department_id: deptId,
                    department_name: deptName
                }
                const { button } = new HTMLMoreButton(props);
                route_department.appendChild(button);
            }

            // remove more button if last page
            if (page == lastPage) {
                this.notifier.showMessage(`You've reached the last page`, 'success')
                document.querySelector('#btn_more_departmentresults').remove()
            }

            // generate the product cards
            generanteDom(data, HTMLProductCard, '#list-department');

            pagination.department_query = deptId;
            this.router('department');
        }

        static toCheckout = () => {
            this.router('checkout');

            // generate initial elements of the cart
            route_checkout.appendChild(new HTMLCartInit().parent);

            // generate cart form
            new HTMLCartForm(CalzadaCart.cart_total);

            // generate cart items
            CalzadaCart.cart_products.forEach(cartItem => {
                const { li } = new HTMLCartItem(cartItem);
                document.querySelector('.list-cart').appendChild(li);
                document.querySelector(`#rmv_${cartItem._id}`).onclick = event => {
                    event.stopPropagation();
                    this.remFromCart(event);
                }
            })

            // generate cart history items
            CalzadaCartHistory.forEach(cartHistory => new HTMLCartItemHistory(cartHistory))

            // generate an illustration if cart is empty, remove .list-cart
            if (!CalzadaCart.cart_products.length) {
                document.querySelector('.list-cart').remove();

                const container = document.createElement('div');
                container.id = 'emptycart_container'

                container.innerHTML = `
                    <img src="${img_emptyCart}" id='image_emptycart' />
                    <h3>Your cart is empty</h3>
                `

                document.querySelector('#checkout-route-container')
                    .insertAdjacentElement('afterbegin', container);
            }

            // generate an illustration if cart history is empty
            if (!CalzadaCartHistory.length) {
                const container = document.createElement('div');
                container.id = 'emptycarthistory_container'

                container.innerHTML = `
                    <img src="${img_emptyCartHistory}" id='image_emptycarthistory' />
                    <h3>No histories for past checkouts</h3>
                `

                document.querySelector('.sidebar-history')
                    .insertAdjacentElement('beforeend', container);
            }

        }

        static dropdown = () => {
            dropdown.style.display == 'none'
                ? dropdown.style.display = 'block'
                : dropdown.style.display = 'none'
        }

        static addToCart = newProduct => {
            const isOnCart = CalzadaCart.cart_products
                .some(cartProd => cartProd._id == newProduct._id)

            isOnCart
                ? CalzadaCart.cart_products = CalzadaCart.cart_products
                    .map(cartProd => {
                        cartProd.id == newProduct.id
                            ? cartProd.product_quantity += newProduct.product_quantity
                            : null

                        return cartProd
                    })
                : CalzadaCart.cart_products.push(newProduct)

            // update badge count
            document.querySelector('#badge').textContent = CalzadaCart.cart_products.length

            // recalculate the total of cart
            CalzadaCart.cart_calculate();
        }

        static remFromCart = event => {
            const targetId = event.target.id;
            const [_, idToRemove] = targetId.split('_');
            const item = document.querySelector(`#cart_${idToRemove}`);

            // update the cart 
            CalzadaCart.cart_products = CalzadaCart.cart_products
                .filter(cartItem => cartItem._id !== idToRemove)

            CalzadaCart.cart_calculate();

            // update the dom
            document.querySelector('#badge').textContent = CalzadaCart.cart_products.length
            document.querySelector('.total_cart_amount').textContent = toPhp(CalzadaCart.cart_total)
            item.classList.add('fadeout');
            setTimeout(() => item.remove(), 500)

            // bring back the illustration for empty cart after 500ms (relative to transition)
            // if the CalzadaCart.cart_products length is 0
            if (!CalzadaCart.cart_products.length) {
                setTimeout(() => {
                    document.querySelector('.list-cart').remove();
                    const container = document.createElement('div');
                    container.id = 'emptycart_container'

                    container.innerHTML = `
                    <img src="${img_emptyCart}" id='image_emptycart' />
                    <h3>Your cart is empty</h3>
                `

                    document.querySelector('#checkout-route-container')
                        .insertAdjacentElement('afterbegin', container);
                }, 500)
            }
        }

        static checkoutCart = async event => {
            event.preventDefault();

            if (!CalzadaCart.cart_products.length)
                return Calzada.notifier.showMessage('There is no item in your cart', 'error')

            // post request
            const form = document.querySelector('form.sidebar-cart');
            const formdata = parseFormData(new FormData(form));
            const raw = await fetch(`${baseurl}/api/v1/actions/checkout?apikey=${apikey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: CalzadaCart.cart_products })
            })
            const parsed = await raw.json();

            if (!parsed.success)
                this.notifier.showMessage('Something went wrong upon checkout', 'error')

            // append needed props to cart
            const cart_receiverName = formdata.fullname;
            const cart_receiverAddress = formdata.address;
            const cart_receiverContact = formdata.contact;

            CalzadaCart = {
                ...CalzadaCart,
                cart_receiverName,
                cart_receiverAddress,
                cart_receiverContact
            }

            // create instance of a cart history
            const NewCartHistory = new CartHistory(CalzadaCart);

            // update history state
            CalzadaCartHistory.push(NewCartHistory);

            // update history dom
            new HTMLCartItemHistory(NewCartHistory);

            // transition out all cart items
            CalzadaCart.cart_products.forEach(product => {
                const item = document.querySelector(`#cart_${product._id}`);
                item.classList.add('fadeout');
                setTimeout(() => item.remove(), 500)
            })

            // alert success
            this.notifier.showMessage('Successfully bought all your item!', 'success')

            // reset cart state / DOM
            CalzadaCart = new Cart();
            document.querySelector('#badge').textContent = CalzadaCart.cart_products.length
            document.querySelector('.total_cart_amount').textContent = `₱0.00`
            form.reset();

            if (document.querySelector('#emptycarthistory_container'))
                document.querySelector('#emptycarthistory_container').remove();


            // bring back the illustration for empty cart after 500ms (relative to transition)
            setTimeout(() => {
                document.querySelector('.list-cart').remove();
                const container = document.createElement('div');
                container.id = 'emptycart_container'

                container.innerHTML = `
                    <img src="${img_emptyCart}" id='image_emptycart' />
                    <h3>Your cart is empty</h3>
                `

                document.querySelector('#checkout-route-container')
                    .insertAdjacentElement('afterbegin', container);
            }, 500)
        }

        static incrementPage = key => pagination[key]++;
    }
})();


const copyright = document.getElementById('copyright');
const nav_brand = document.querySelector('.nav-brand');
const nav_search = document.getElementById('nav_search');
const nav_checkout = document.getElementById('nav_checkout');
const nav_departments = document.getElementById('nav_departments');

// onload of the document
document.addEventListener("DOMContentLoaded", () => {
    Calzada.slides();
    Calzada.notifier.initialize();
    copyright.textContent = `© ${new Date().getFullYear()} Calzada. All Rights Reserved`;
});

// routes to home when logo is clicked
nav_brand.onclick = () => Calzada.router('home')

// open/close dropdown
nav_departments.onclick = () => Calzada.dropdown();

// renders the cart
nav_checkout.onclick = () => Calzada.toCheckout();

// query to api then routes to search
nav_search.onclick = () => Calzada.toSearch();

export default Calzada;