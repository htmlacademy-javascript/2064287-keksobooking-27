const ERROR_SHOW_TIME = 10000;
const BODY = document.querySelector('body');

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


const showError = (message) => {
  const adSection = document.querySelector('.notice');
  adSection.style.position = 'relative';
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.bottom = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '25px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  adSection.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const getStatusMessage = ((element) => {
  BODY.append(element);
});

const removeStatusMessage = ((element) => {
  if (element.parentNode) {
    element.parentNode.removeChild(element);}
  // BODY.removeChild(element);
});

const closeStatusMessageByClick = (statusMessage) => {
  statusMessage.addEventListener('click', () => {
    removeStatusMessage(statusMessage);
  });
};
const closeStatusMessageByPress = (statusMessage) => {
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeStatusMessage(statusMessage);
    }
  });
};

const closeStatusMessageByButton = (statusMessage, button) => {
  button.addEventListener('click', () => {
    removeStatusMessage(statusMessage);
  });
};


export {getRandomArrayElement, getRandomIntegerNumber, getShuffledArrayWithRandomLength, getRandomFloatingPointNumber,
  hideElement, showError, getStatusMessage, removeStatusMessage, closeStatusMessageByClick, closeStatusMessageByPress, closeStatusMessageByButton};
