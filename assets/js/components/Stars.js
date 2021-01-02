
export default function HTMLStarRatings(rating) {

    this.container = document.createElement('span');

    for (let i = 1; i <= 5; i++) {

        const img = document.createElement('img')

        i <= rating
            ? img.setAttribute('src', '/assets/images/star.svg')
            : img.setAttribute('src', '/assets/images/star_off.svg')

        this.container.appendChild(img);

    }

}