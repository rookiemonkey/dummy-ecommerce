import HTMLHomeSlide from '../components/Slides';
import vars from './_variables';

// HOME: generate the slides for the slideshow ONCE
for (let count = 1; count < vars.slide.slideDescription.length; count++) {
    const { div } = new HTMLHomeSlide(count, vars.slide.slideDescription[count - 1])
    document.querySelector('#slideshow').appendChild(div);
}

export default function showSlides() {
    const slides = document.getElementsByClassName("slide");

    // hide every slide for a moment
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // increment and go back to 1 if needed
    vars.slide.slideIndex++;

    if (vars.slide.slideIndex > slides.length) vars.slide.slideIndex = 1

    // show correct slide
    slides[vars.slide.slideIndex - 1].style.display = "flex";
}