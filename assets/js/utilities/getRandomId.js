import randomNum from './getRandomNum';

export default function randomId() {

    const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    const replacePlaceholders = function (placeholder) {

        const random = randomNum(0, 15);

        const value = placeholder == 'x'
            ? random
            : (random & 0x3 | 0x8);

        return value.toString(16);

    };

    return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
}
