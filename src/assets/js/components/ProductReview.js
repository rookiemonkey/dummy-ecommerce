import HTMLStarRatings from './Stars';

export default function HTMLProductReview(review) {

    this.li = document.createElement('li');
    this.li.classList.add('review');

    const start = new Date(2012, 0, 1);
    const end = new Date();

    this.li.innerHTML = `
        <div class="review-header">
            <div class="review-header-avatar">
                <img src="${review.review_avatar}" />
            </div>
            <div class="review-header-meta">
                <h3>${review.review_name}</h3>
                ${new HTMLStarRatings(review.review_rating).container.outerHTML}
            </div>
        </div>
        <div class="review-body">
            ${review.review_details}
        </div>
        <div class="review-date">
            ${new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString()}
        </div>
    `
}