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