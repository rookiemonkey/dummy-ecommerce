import HTMLProductCard from './components/ProductCard';
import HTMLDropDownItem from './components/DropdownItem';
import HTMLDepartmentCard from './components/DepartmentCard';
import HTMLMoreButton from './components/Btn_More';
import variables from './utilities/_variables';
import generanteDom from './utilities/toGenerateDom';

const { baseurl, apikey } = variables;

async function renderDepartments() {

    const raw = await fetch(`${baseurl}/api/v1/departments?apikey=${apikey}`);

    const { status, statusText } = raw;
    if (status != 200) throw new Error(statusText)

    const { data } = await raw.json();

    data.forEach(dept => {

        // create dropdown elemnts for each department
        new HTMLDropDownItem(dept);

        // create department card for each department
        new HTMLDepartmentCard(dept);

    })
};

async function renderTopRated() {
    const raw = await fetch(`${baseurl}/api/v1/products/toprated?apikey=${apikey}&limit=10`)

    const { status, statusText } = raw;
    if (status != 200) throw new Error(statusText)

    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#toprated-cards');
};

async function renderTopSales() {
    const raw = await fetch(`${baseurl}/api/v1/products/topsales?apikey=${apikey}&limit=10`)

    const { status, statusText } = raw;
    if (status != 200) throw new Error(statusText)

    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#topsales-cards');
};

async function renderRandomProducts() {

    // disable cache for this request
    const url = `${baseurl}/api/v1/products/random?apikey=${apikey}`
    const raw = await fetch(url, { cache: "no-store" })

    const { status, statusText } = raw;
    if (status != 200) throw new Error(statusText)

    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLProductCard, '#randomproducts-cards');

    if (!document.getElementById('btn_more_randomresults')) {
        const parent = document.getElementById('randomproducts');
        const { button } = new HTMLMoreButton({ id: 'randomresults', route: 'home' })

        parent.appendChild(button)
        button.onclick = async () => await renderRandomProducts()
    }

}

// Hide the preloader once all of the HTTP requests has reponded back wiht 200 status
Promise.all([
    renderDepartments(),
    renderTopRated(), renderTopSales(),
    renderRandomProducts()
])

    .then(() => {
        const main = document.querySelector('main');
        const preloader = document.querySelector('.preloader')
        main.style.display = 'block';
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 500)
    })

    .catch(e => {
        alert("Store is closed. Please come back tomorrow!")
        console.log(e)
    })