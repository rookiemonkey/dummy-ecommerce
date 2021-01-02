/**
 * generate DOM elements and append it
 * @param {*} arr array of data as basis
 * @param {*} model  what model to use for generation
 * @param {*} appendTo  where to append the generated dom element
 */

export default function generanteDom(arr, model, appendTo) {

    arr.forEach(product => {

        const { li } = new model(product);

        document
            .querySelector(appendTo)
            .appendChild(li);

    })

}