export default function randomNum(minNum, maxNum) {

    return Math
        .floor(Math.random() * (maxNum - minNum + 1)) + minNum

}