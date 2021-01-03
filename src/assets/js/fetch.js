import Calzada from './main';
import HTMLProductCard from './components/ProductCard';
import HTMLHomeTopSales from './components/ProductCardTopSales';
import variables from './utilities/_variables';
import generanteDom from './utilities/toGenerateDom';

const { baseurl, apikey, navIcons } = variables;

(async function getProductCounts() {
    const nav_dropdown = document.querySelector('.nav-dropdown');
    const header_gadget = document.getElementById('header-gadget');
    const header_appliances = document.getElementById('header-appliances');
    const header_healthandbeauty = document.getElementById('header-healthandbeauty');
    const header_babies = document.getElementById('header-babies');
    const header_groceries = document.getElementById('header-groceries');
    const header_pets = document.getElementById('header-pets');
    const header_fashionwomen = document.getElementById('header-fashionwomen');
    const header_fashionmen = document.getElementById('header-fashionmen');
    const header_accessories = document.getElementById('header-accessories');
    const header_sportsandlifestyle = document.getElementById('header-sportsandlifestyle');
    const header_automotive = document.getElementById('header-automotive');

    const raw = await fetch(`${baseurl}/api/v1/departments?apikey=${apikey}`);
    const { data } = await raw.json();

    const appendNumProducts = (element, num) => {
        element.innerHTML = `
            ${element.textContent} <span class="num-products">- ${num} items available!</span>
        `;
    }

    data.forEach(dept => {

        // create each element on dropdown
        const li = document.createElement('li');
        li.setAttribute('deptId', dept.department_id);
        li.setAttribute('deptName', dept.department_name);
        li.onclick = event => Calzada.toDepartment(event);
        li.innerHTML = `
            <span><i class="${navIcons[dept.department_name]}"></i></span>
            ${dept.department_name}
        `
        nav_dropdown.appendChild(li);


        // create each department row on home
        switch (true) {
            case dept.department_name === 'Gadgets':
                appendNumProducts(header_gadget, dept.department_numProducts)
                break;
            case dept.department_name === 'Appliances':
                appendNumProducts(header_appliances, dept.department_numProducts)
                break;
            case dept.department_name === 'Health & Beauty':
                appendNumProducts(header_healthandbeauty, dept.department_numProducts)
                break;
            case dept.department_name === 'Babies':
                appendNumProducts(header_babies, dept.department_numProducts)
                break;
            case dept.department_name === 'Groceries':
                appendNumProducts(header_groceries, dept.department_numProducts)
                break;
            case dept.department_name === 'Pets':
                appendNumProducts(header_pets, dept.department_numProducts)
                break;
            case dept.department_name === 'Fashion Women':
                appendNumProducts(header_fashionwomen, dept.department_numProducts)
                break;
            case dept.department_name === 'Fashion Men':
                appendNumProducts(header_fashionmen, dept.department_numProducts)
                break;
            case dept.department_name === 'Accessories':
                appendNumProducts(header_accessories, dept.department_numProducts)
                break;
            case dept.department_name === 'Sports & Lifestyle':
                appendNumProducts(header_sportsandlifestyle, dept.department_numProducts)
                break;
            case dept.department_name === 'Automotive':
                appendNumProducts(header_automotive, dept.department_numProducts)
                break;
        }
    })
})();

async function renderTopRated() {
    const raw = await fetch(`${baseurl}/api/v1/products/toprated?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#toprated-cards');
};

async function renderTopSales() {
    const raw = await fetch(`${baseurl}/api/v1/products/topsales?apikey=${apikey}&limit=3`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLHomeTopSales, '#topsales-cards');
};

async function renderGadgetGrid() {
    const raw = await fetch(`${baseurl}/api/v1/departments/gadgets?apikey=${apikey}&limit=4`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-gadgets');
};

async function renderAppliancesGrid() {
    const raw = await fetch(`${baseurl}/api/v1/departments/appliances?apikey=${apikey}&limit=4`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-appliances');
};

async function renderHealthAndBeautyRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/healthandbeauty?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-healthandbeauty')
};

async function renderBabiesRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/babies?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-babies')
};

async function renderGroceriesRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/groceries?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-groceries')
};

async function renderPetsRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/pets?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-pets')
};

async function renderFashionWomenRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/fashionwomen?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-fashionwomen')
};

async function renderFashionMenRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/fashionmen?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-fashionmen')
};

async function renderAccesoriesRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/accessories?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-accessories')
};

async function rendersSportsAndLifestyleRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/sportsandlifestyle?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-sportsandlifestyle')
};

async function rendersAutomotiveRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/automotive?apikey=${apikey}&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-automotive')
};

// Hide the preloader once all of the HTTP requests has reponded back wiht 200 status
Promise.all([
    renderTopRated(), renderTopSales(),
    renderGadgetGrid(), renderAppliancesGrid(),
    renderBabiesRow(), renderHealthAndBeautyRow(),
    renderGroceriesRow(), renderPetsRow(),
    renderFashionWomenRow(), renderFashionMenRow(),
    renderAccesoriesRow(), rendersSportsAndLifestyleRow(),
    rendersAutomotiveRow()
])
    .then(() => {
        const main = document.querySelector('main');
        const preloader = document.querySelector('.preloader')
        main.style.display = 'block';
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 500)
    })
    .catch(() => alert('Reached Maximum API Call Limit :D'))