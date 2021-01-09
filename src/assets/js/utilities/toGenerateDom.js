/**
 * generate DOM elements and append it
 * @param {*} arr array of data as basis
 * @param {*} model  what model to use for generation
 * @param {*} appendTo  where to append the generated dom element
 */

export default function generanteDom(arr, model, appendTo) {

    for (const product of arr) {

        const { li } = new model(product);

        document
            .querySelector(appendTo)
            .appendChild(li);

        // remove the loader once image is ready/downloaded
        const children = [...li.children];
        const _thisloader = children[0];
        const _thisimg = children[1];

        _thisimg.onload = () => {
            _thisimg.style.display = 'block';
            _thisloader.remove();
        }

    }

}