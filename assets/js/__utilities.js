// =================================================================
// UTILITY FUNCTIONS/VARIABLES
// =================================================================
const baseurl = 'http://localhost:5050';
const apikey = 'gFKVHZjIK_Wt';

let slideIndex = 0;

const slidesDescription = [
    'Movie Peripherals available! Go Grab one for netflix nights!',
    'Almost eveything is right at your fingertips!',
    'Needs something for your sports? We got you covered!',
    'Techy? We got some laptops for you to try',
    'Your comfort foods are available here!',
    'Summer needs are on the go. Get that bathing suit you always wanted!',
    'Grab some medicine and keep your self healthy!',
    'Make use of your green thumb and help the environment!'
];

const navIcons = {
    'Gadgets': 'ion-usb',
    'Appliances': 'ion-monitor',
    'Health & Beauty': 'ion-ios-body',
    'Babies': 'ion-egg',
    'Groceries': 'ion-ios-nutrition',
    'Pets': 'ion-ios-paw',
    'Fashion Women': 'ion-woman',
    'Fashion Men': 'ion-man',
    'Accessories': 'ion-ios-rose',
    'Sports & Lifestyle': 'ion-ios-basketball',
    'Automotive': 'ion-model-s'
}




// show slides and start it right away
function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const slideshowParent = document.querySelector('#slideshow');


    // HOME: generate the slides for the slideshow
    for (let count = 1; count < slidesDescription.length; count++) {
        const { div } = new HTMLHomeSlide(count, slidesDescription[count - 1])
        slideshowParent.appendChild(div);
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) slideIndex = 1

    slides[slideIndex - 1].style.display = "flex";

    setTimeout(showSlides, 3500);
}



// generate a random num in between given min and max num
function randomNum(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

// generate an object containing the form data inputs
function parseFormData(formData) {
    const formdataParsed = {};

    [...formData].forEach(formitem => {
        formdataParsed[formitem[0]] = formitem[1]
    });

    return formdataParsed;
}

// generate a random uuid from faker.js :D
function randomId() {
    const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const replacePlaceholders = function (placeholder) {
        const random = randomNum(0, 15);
        const value = placeholder == 'x' ? random : (random & 0x3 | 0x8);
        return value.toString(16);
    };
    return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
}


/**
 * generate DOM elements and append it
 * @param {*} arr array of data as basis
 * @param {*} model  what model to use for generation
 * @param {*} appendTo  where to append the generated dom element
 */
function generanteDom(arr, model, appendTo) {
    arr.forEach(product => {
        const { li } = new model(product);
        document
            .querySelector(appendTo)
            .appendChild(li);
    })
}