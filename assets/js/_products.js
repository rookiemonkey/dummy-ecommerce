const baseurl = 'http://localhost:5050';

(async function getProductCounts() {
    const header_gadget = document.getElementById('header-gadget');
    const header_appliances = document.getElementById('header-appliances');
    const header_healthandbeauty = document.getElementById('header-healthandbeauty');
    const header_babies = document.getElementById('header-babies');
    const header_groceries = document.getElementById('header-groceries');
    const header_pets = document.getElementById('header-pets');
    const header_fashionwomen = document.getElementById('header-fashionwomen');
    const header_fashionmen = document.getElementById('header-fashionmen');
    const header_accesories = document.getElementById('header-accessories');
    const header_sportsandlifestyle = document.getElementById('header-sportsandlifestyle');
    const header_automotive = document.getElementById('header-automotive');

    const raw = await fetch(`${baseurl}/api/v1/departments?apikey=gFKVHZjIK_Wt`);
    const { data } = await raw.json();

    const appendNumProducts = (element, num) => {
        element.innerHTML = `
            ${element.textContent} <span class="num-products">- ${num} items available!</span>
        `;
    }

    data.forEach(dept => {
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
            case dept.department_name === 'Accesories':
                appendNumProducts(header_accesories, dept.department_numProducts)
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

(async function renderTopRated() {
    const raw = await fetch(`${baseurl}/api/v1/products/toprated?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#toprated-cards');
})();

(async function renderTopSales() {
    const raw = await fetch(`${baseurl}/api/v1/products/topsales?apikey=gFKVHZjIK_Wt&limit=3`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLHomeTopSales, '#topsales-cards');
})();

(async function renderGadgetGrid() {
    const raw = await fetch(`${baseurl}/api/v1/departments/gadgets?apikey=gFKVHZjIK_Wt&limit=4`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-gadgets');
})();

(async function renderAppliancesGrid() {
    const raw = await fetch(`${baseurl}/api/v1/departments/appliances?apikey=gFKVHZjIK_Wt&limit=4`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-appliances');
})();

(async function renderHealthAndBeautyRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/healthandbeauty?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-healthandbeauty')
})();

(async function renderBabiesRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/babies?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-babies')
})();

(async function renderGroceriesRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/groceries?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-groceries')
})();

(async function renderPetsRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/pets?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-pets')
})();

(async function renderFashionWomenRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/fashionwomen?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-fashionwomen')
})();

(async function renderFashionMenRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/fashionmen?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-fashionmen')
})();

(async function renderAccesoriesRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/accessories?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-accessories')
})();

(async function rendersSportsAndLifestyleRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/sportsandlifestyle?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-sportsandlifestyle')
})();

(async function rendersAutomotiveRow() {
    const raw = await fetch(`${baseurl}/api/v1/departments/automotive?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#list-automotive')
})();