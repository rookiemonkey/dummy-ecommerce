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

// routes to checkout
nav_checkout.onclick = () => Calzada.router('checkout')

// routes to search
nav_search.onclick = () => Calzada.router('search')