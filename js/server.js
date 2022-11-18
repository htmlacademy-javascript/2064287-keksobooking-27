const URL_TO_GET_DATA = 'https://27.javascript.pages.academy/keksobooking/data';
const URL_TO_SEND_DATA = 'https://27.javascript.pages.academy/keksobooking';


const getData = ((onSuccess, onFail) => {
  fetch(URL_TO_GET_DATA)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
});

const sendData = ((onSuccess, onFail, body) => {
  fetch(
    URL_TO_SEND_DATA,
    {
      method: 'POST',
      body,
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
});

export { getData, sendData };
