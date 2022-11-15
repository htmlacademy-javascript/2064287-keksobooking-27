import { isFileTypeMatches } from './util.js';

const AVATAR_INPUT = document.querySelector('.ad-form__field input[type=file]');
const AVATAR_PREVIEW = document.querySelector('.ad-form-header__preview img');
const AVATAR_DEFAULT_IMAGE = 'img/muffin-grey.svg';

const PHOTO_INPUT = document.querySelector('.ad-form__upload input[type=file]');
const PHOTO_PREVIEW = document.querySelector('.ad-form__photo');
const PHOTO_PREVIEW_TAG = document.createElement('img');


const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const setAvatarImg = () => {
  AVATAR_INPUT.addEventListener('change', () => {
    const file = AVATAR_INPUT.files[0];
    isFileTypeMatches(file, FILE_TYPES);

    if (isFileTypeMatches) {
      AVATAR_PREVIEW.src = URL.createObjectURL(file);
    }
  });
};

const setPhotoImg = () => {
  PHOTO_INPUT.addEventListener('change', () => {
    const file = PHOTO_INPUT.files[0];
    isFileTypeMatches(file, FILE_TYPES);

    if (isFileTypeMatches) {
      PHOTO_PREVIEW_TAG.src = URL.createObjectURL(file);
      PHOTO_PREVIEW_TAG.style.width = '100%';
      PHOTO_PREVIEW.appendChild(PHOTO_PREVIEW_TAG);
    }
  });
};

const clearPreviewFields = () => {
  AVATAR_PREVIEW.src = AVATAR_DEFAULT_IMAGE;

  if (PHOTO_PREVIEW_TAG.parentNode) {
    PHOTO_PREVIEW_TAG.parentNode.removeChild(PHOTO_PREVIEW_TAG);
  }
};

setAvatarImg();
setPhotoImg();

export { clearPreviewFields };
