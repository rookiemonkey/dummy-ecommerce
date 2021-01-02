import HTMLHomeSlide from '../components/Slides';
import vars from './_variables';

export default function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const slideshowParent = document.querySelector('#slideshow');

    // HOME: generate the slides for the slideshow
    for (let count = 1; count < vars.slide.slideDescription.length; count++) {
        const { div } = new HTMLHomeSlide(count, vars.slide.slideDescription[count - 1])
        slideshowParent.appendChild(div);
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    vars.slide.slideIndex++;

    if (vars.slide.slideIndex > slides.length) vars.slide.slideIndex = 1

    slides[vars.slide.slideIndex - 1].style.display = "flex";

    setTimeout(showSlides, 3500);
}