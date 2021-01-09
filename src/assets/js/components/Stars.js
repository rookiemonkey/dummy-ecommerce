import img_star from '../../images/star.svg';
import img_staroff from '../../images/star_off.svg';

export default function HTMLStarRatings(rating) {

    this.container = document.createElement('span');

    for (let i = 1; i <= 5; i++) {

        const img = document.createElement('img')

        i <= rating
            ? img.setAttribute('src', img_star)
            : img.setAttribute('src', img_staroff)

        this.container.appendChild(img);

    }

}