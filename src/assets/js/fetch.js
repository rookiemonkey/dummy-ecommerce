import HTMLProductCard from './components/ProductCard';
import HTMLDropDownItem from './components/DropdownItem';
import HTMLDepartmentCard from './components/DepartmentCard';
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

// Hide the preloader once all of the HTTP requests has reponded back wiht 200 status
Promise.all([
    renderDepartments(),
    renderTopRated(), renderTopSales()
])

    .then(() => {
        const main = document.querySelector('main');
        const preloader = document.querySelector('.preloader')
        main.style.display = 'block';
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 500)
    })

    .catch(e => {
        alert("Please check your console!")
        console.log(e)
    })