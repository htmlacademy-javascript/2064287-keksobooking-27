const getRandomFloatingPointNumber = (min, max, amountCharactersAfterPoint) => {
  if (min < 0 || max < 0 || amountCharactersAfterPoint < 0) {
    return NaN;
  }

  if (min < max) {
    return +(Math.random() * (max - min) + min).toFixed(amountCharactersAfterPoint);
  }
  return getRandomFloatingPointNumber(max, min, amountCharactersAfterPoint);
};

const getRandomIntegerNumber = (min, max) => getRandomFloatingPointNumber(min, max, 0);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = getRandomIntegerNumber(0, i);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

const getShuffledArrayWithRandomLength = (array) => shuffleArray([...array]).slice(getRandomIntegerNumber(0, array.length - 1));
const getRandomArrayElement = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

const hideElement = (element) => element.classList.add('hidden');

export {getRandomArrayElement, getRandomIntegerNumber, getShuffledArrayWithRandomLength, getRandomFloatingPointNumber, hideElement};
