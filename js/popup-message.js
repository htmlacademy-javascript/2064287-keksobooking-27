
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const body = document.querySelector('body');


const getSuccessMessage = (() => {
  body.appendChild(successMessage);
  document.addEventListener('keydown', onWindowKeydown);
});

const getErrorMessage = (() => {
  body.appendChild(errorMessage);
  document.addEventListener('keydown', onWindowKeydown);
});

const removeSuccessMessage = (() => {
  if (successMessage.parentNode) {
    successMessage.parentNode.removeChild(successMessage);
  }
  document.removeEventListener('keydown', onWindowKeydown);
});


const removeErrorMessage = (() => {
  if (errorMessage.parentNode) {
    errorMessage.parentNode.removeChild(errorMessage);
  }
  document.removeEventListener('keydown', onWindowKeydown);
});

const onStatusMessageClick = () => {
  removeSuccessMessage();
  removeErrorMessage();
};


errorMessage.addEventListener('click', onStatusMessageClick);
successMessage.addEventListener('click', onStatusMessageClick);


function onWindowKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeSuccessMessage();
    removeErrorMessage();
  }
}

const onButtonClick = () => {
  removeErrorMessage(errorMessage);
};

errorButton.addEventListener('click', onButtonClick);


export { getSuccessMessage, getErrorMessage, errorMessage, successMessage };

