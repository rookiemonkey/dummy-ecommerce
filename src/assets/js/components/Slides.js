
export default function HTMLHomeSlide(slideNumber, slideDesc) {

    this.div = document.createElement('div');
    this.div.classList.add('slide');
    this.div.classList.add('fade');

    this.div.innerHTML = `
        <p>${slideDesc}</p>
        <img src="${require(`../../images/slide${slideNumber}.svg`).default}" />
    `

}