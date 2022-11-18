import { isFileTypeMatches } from './util.js';

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarDefaultImage = 'img/muffin-grey.svg';

const photoInput = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');
const photoPreviewTag = document.createElement('img');


const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const setAvatarImg = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    isFileTypeMatches(file, FILE_TYPES);

    if (isFileTypeMatches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

const setPhotoImg = () => {
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    isFileTypeMatches(file, FILE_TYPES);

    if (isFileTypeMatches) {
      photoPreviewTag.src = URL.createObjectURL(file);
      photoPreviewTag.style.width = '100%';
      photoPreview.appendChild(photoPreviewTag);
    }
  });
};

const clearPreviewFields = () => {
  avatarPreview.src = avatarDefaultImage;

  if (photoPreviewTag.parentNode) {
    photoPreviewTag.parentNode.removeChild(photoPreviewTag);
  }
};

setAvatarImg();
setPhotoImg();

export { clearPreviewFields };
