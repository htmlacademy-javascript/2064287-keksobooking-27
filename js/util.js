const ERROR_SHOW_TIME = 7000;
const body = document.querySelector('body');


const hideElement = (element) => element.classList.add('hidden');


const showError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '25px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = message;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const getStatusMessage = ((element) => {
  body.appendChild(element);
});

const removeStatusMessage = ((element) => {
  if (element.parentNode) {
    element.parentNode.removeChild(element);}
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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isFileTypeMatches = (file, filenameExtensions) => {
  const fileName = file.name.toLowerCase();
  return filenameExtensions.some((it) => fileName.endsWith(it));
};


export { hideElement, showError, getStatusMessage, closeStatusMessageByClick, closeStatusMessageByPress, closeStatusMessageByButton,
  debounce, isFileTypeMatches};
