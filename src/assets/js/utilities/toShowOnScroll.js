import isElementInViewport from './isInViewPort';

const scroll = window.requestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };

export default function showOnScroll() {
    const elementsToShow = document.querySelectorAll('.show-on-scroll');

    elementsToShow.forEach(function (element) {

        // check if the element is inside the view port, by using the defined function
        if (isElementInViewport(element)) {
            element.classList.add('is-visible');

        }

        else {
            element.classList.remove('is-visible');
        }
    })

    // everytime something changes with the requestAnimationFrame
    scroll(showOnScroll);
}