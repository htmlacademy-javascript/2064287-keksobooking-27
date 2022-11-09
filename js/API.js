const getData = ((onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) =>
      data.slice(0, 10)
    )
    .then((info) => {
      onSuccess(info);
    })
    .catch(() => {
      onFail('Не удалось соединиться с сервером. Попробуйте ещё раз');
    });
});

const sendData = ((onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
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
