const URL_TO_GET_DATA = 'https://27.javascript.pages.academy/keksobooking/data';
const URL_TO_SEND_DATA = 'https://27.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => fetch(URL_TO_GET_DATA)
  .then((response) => response.json())
  .then((offers) => {
    onSuccess(offers);
  })
  .catch(() => {
    onFail();
  });

const sendData = (formData, onSuccess, onFail) => fetch(URL_TO_SEND_DATA,
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => {
    onFail();
  });

export { getData, sendData };
