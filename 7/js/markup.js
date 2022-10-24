import { generatedRandomAD } from './data.js';
import { hideElement } from './util.js';

const ListOfTypes = {
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

const setCardTitle = (card, title) => {
  const titleElement = card.querySelector('.popup__title');
  if (title) {
    titleElement.textContent = title;
  } else {
    hideElement(titleElement);
  }
};

const setCardAddress = (card, address) => {
  const addressElement = card.querySelector('.popup__text--address');
  if (address) {
    addressElement.textContent = address;
  } else {
    hideElement(addressElement);
  }
};

const setCardPrice = (card, price) => {
  const priceElement = card.querySelector('.popup__text--price');
  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  } else {
    hideElement(priceElement);
  }
};

const setCardType = (card, type) => {
  const typeElement = card.querySelector('.popup__type');
  if (type) {
    typeElement.textContent = ListOfTypes[type];
  } else {
    hideElement(typeElement);
  }
};

const setCardCapacity = (card, rooms, guests) => {
  const capacityElement = card.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    hideElement(capacityElement);
  }
};

const setCardTime = (card, checkin, checkout) => {
  const timeElement = card.querySelector('.popup__text--time');
  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    hideElement(timeElement);
  }
};

const setCardDescription = (card, description) => {
  const descriptionElement = card.querySelector('.popup__description');
  if (description) {
    descriptionElement.textContent = description;
  } else {
    hideElement(descriptionElement);
  }
};
const setCardAvatar = (card, avatar) => {
  const avatarElement = card.querySelector('.popup__avatar');
  if (avatar) {
    avatarElement.src = avatar;
  } else {
    hideElement(avatarElement);
  }
};


similarCards.forEach((similarCard) => {
  const card = cardTemplate.cloneNode(true);

  setCardTitle(card, similarCard.offer.title);
  setCardAddress(card, similarCard.offer.address);
  setCardPrice(card, similarCard.offer.price);
  setCardType(card, similarCard.offer.type);
  setCardCapacity(card, similarCard.offer.rooms, similarCard.offer.guests);
  setCardTime(card, similarCard.offer.checkin, similarCard.offer.checkout);
  setCardDescription(card, similarCard.offer.description);
  setCardAvatar(card, similarCard.avatar);

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

  similarListFragment.appendChild(card);
});

mapCanvas.appendChild(similarListFragment);
