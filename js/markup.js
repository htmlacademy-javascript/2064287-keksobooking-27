import { generatedRandomAD } from './data.js';
import { hideElement } from './util.js';

const TYPE_OBJECT = {
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
  card.querySelector('.popup__type').textContent = TYPE_OBJECT[similarCard.offer.type] || hideElement(card.querySelector('.popup__type'));
  card.querySelector('.popup__text--capacity').textContent = `${similarCard.offer.rooms} комнаты для ${similarCard.offer.guests} гостей` || hideElement(card.querySelector('.popup__text--capacity'));
  card.querySelector('.popup__text--time').textContent = `Заезд после ${similarCard.offer.checkin}, выезд до ${similarCard.offer.checkout}` || hideElement(card.querySelector('.popup__text--time'));
  card.querySelector('.popup__description').textContent = similarCard.offer.description || hideElement(card.querySelector('.popup__description'));

  const photoContainer = card.querySelector('.popup__photos');
  if (!similarCard.offer.photos) {
    hideElement(photoContainer);
  } else {
    const imageTemplate = photoContainer.querySelector('.popup__photo');
    photoContainer.innerHTML = '';
    similarCard.offer.photos.forEach((photo) => {
      const image = imageTemplate.cloneNode(true);
      const similarPhotoFragment = document.createDocumentFragment();
      image.src = photo;
      similarPhotoFragment.append(image);
      photoContainer.append(similarPhotoFragment);
    });
  }

  const featuresListContainer = card.querySelector('.popup__features');
  if (!similarCard.offer.features) {
    hideElement(featuresListContainer);
  } else {
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
