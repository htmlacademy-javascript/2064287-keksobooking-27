import { generatedRandomAD } from './data.js';
import { hideElement } from './util.js';

const TYPE_ARRAY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCards = generatedRandomAD(1);
const similarListFragment = document.createDocumentFragment();


similarCards.forEach((similarCard) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = similarCard.offer.title || hideElement(card.querySelector('.popup__title'));
  card.querySelector('.popup__text--address').textContent = similarCard.offer.address || hideElement(card.querySelector('.popup__text--address'));
  card.querySelector('.popup__text--price').textContent = `${similarCard.offer.price} ₽/ночь` || hideElement(card.querySelector('.popup__text--price'));
  card.querySelector('.popup__type').textContent = TYPE_ARRAY[similarCard.offer.type] || hideElement(card.querySelector('.popup__type'));
  card.querySelector('.popup__text--capacity').textContent = `${similarCard.offer.rooms} комнаты для ${similarCard.offer.guests} гостей` || hideElement(card.querySelector('.popup__text--capacity'));
  card.querySelector('.popup__text--time').textContent = `Заезд после ${similarCard.offer.checkin}, выезд до ${similarCard.offer.checkout}` || hideElement(card.querySelector('.popup__text--time'));
  card.querySelector('.popup__description').textContent = similarCard.offer.description || hideElement(card.querySelector('.popup__description'));

  if (!similarCard.offer.photos) {
    hideElement(card.querySelector('.popup__photos'));
  } else {
    similarCard.offer.photos.forEach((photo, index) => {
      const imageContainer = card.querySelector('.popup__photos');
      const similarPhotoFragment = document.createDocumentFragment();
      const image = imageContainer.querySelector('.popup__photo').cloneNode(true);
      image.src = photo;
      if (index === 0) {
        imageContainer.innerHTML = '';
      }
      similarPhotoFragment.append(image);
      imageContainer.append(similarPhotoFragment);

    });
  }

  if (!similarCard.offer.features) {
    hideElement(card.querySelector('.popup__features'));
  } else {
    const featuresListContainer = card.querySelector('.popup__features');
    const similarFeatureFragment = document.createDocumentFragment();

    similarCard.offer.features.forEach((feature) => {
      const featureItem = featuresListContainer.querySelector(`.popup__feature--${feature}`);

      if (featureItem) {
        similarFeatureFragment.append(featureItem);
      }
    });
    featuresListContainer.innerHTML = '';
    featuresListContainer.append(similarFeatureFragment);
  }
  card.querySelector('.popup__avatar').src = similarCard.avatar;


  similarListFragment.appendChild(card);
});
mapCanvas.appendChild(similarListFragment);
