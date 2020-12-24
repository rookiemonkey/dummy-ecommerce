const baseurl = 'http://localhost:5050';
const products = new Array();
const productsTopRated = new Array();
const productsTopSales = new Array();

(async function getTopRated() {
    const raw = await fetch(`${baseurl}/api/v1/products/toprated?apikey=gFKVHZjIK_Wt&limit=5`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLHomeTopRated, '#toprated-cards');
})();

(async function getTopSales() {
    const raw = await fetch(`${baseurl}/api/v1/products/topsales?apikey=gFKVHZjIK_Wt&limit=3`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLHomeTopSales, '#topsales-cards');
})();

(async function getGadgetGrid() {
    const raw = await fetch(`${baseurl}/api/v1/departments/gadgets?apikey=gFKVHZjIK_Wt&limit=4`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLHomeProductGrid, '#list-gadgets');
})();

(async function getAppliancesGrid() {
    const raw = await fetch(`${baseurl}/api/v1/departments/appliances?apikey=gFKVHZjIK_Wt&limit=4`)
    const parsed = await raw.json();
    generanteDom(parsed.data, HTMLHomeProductGrid, '#list-appliances');
})();