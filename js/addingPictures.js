const AVATAR_INPUT = document.querySelector('.ad-form__field input[type=file]');
const AVATAR_PREVIEW = document.querySelector('.ad-form-header__preview img');
const PHOTO_INPUT = document.querySelector('.ad-form__upload input[type=file]');
const PHOTO_PREVIEW = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

AVATAR_INPUT.addEventListener('change', () => {
  const file = AVATAR_INPUT.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    AVATAR_PREVIEW.src = URL.createObjectURL(file);
  }
});

PHOTO_INPUT.addEventListener('change', () => {
  const file = PHOTO_INPUT.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const photoPreviewTag = document.createElement('img');
    photoPreviewTag.src = URL.createObjectURL(file);
    photoPreviewTag.style.width = '100%';
    PHOTO_PREVIEW.appendChild(photoPreviewTag);
  }
});
